const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.gif': 'image/gif',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function fetchUsac(target, res, depth = 0) {
  if (depth > 5) {
    res.writeHead(508, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Demasiadas redirecciones');
    return;
  }

  const options = {
    headers: {
      'Accept-Encoding': 'identity',
      'User-Agent': 'Mozilla/5.0 (compatible; HorariosProxy/1.0)',
    },
  };

  https.get(target, options, (proxyRes) => {
    if ([301, 302, 303, 307, 308].includes(proxyRes.statusCode) && proxyRes.headers.location) {
      proxyRes.resume();
      const next = new URL(proxyRes.headers.location, target).href;
      fetchUsac(next, res, depth + 1);
      return;
    }

    let data = '';
    proxyRes.setEncoding('utf8');
    proxyRes.on('data', (chunk) => { data += chunk; });
    proxyRes.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  }).on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error de proxy: ' + err.message);
  });
}

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (reqUrl.pathname === '/proxy') {
    const target = reqUrl.searchParams.get('url');
    if (!target) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Falta el parámetro url');
      return;
    }
    if (!/^https:\/\/usuarios\.ingenieria\.usac\.edu\.gt\//.test(target)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Solo se permite el dominio de USAC');
      return;
    }
    fetchUsac(target, res);
    return;
  }

  let relPath = decodeURIComponent(reqUrl.pathname);
  if (relPath === '/') relPath = '/index.html';
  const filePath = path.join(ROOT, relPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Acceso denegado');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Archivo no encontrado');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Planificador: http://localhost:${PORT}/pages/horarios.html`);
});
