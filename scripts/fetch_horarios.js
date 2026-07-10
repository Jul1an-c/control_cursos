const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'data', 'horarios');

const URLS = {
  'semestre_1': 'https://usuarios.ingenieria.usac.edu.gt/horarios/semestre/1',
  'semestre_2': 'https://usuarios.ingenieria.usac.edu.gt/horarios/semestre/2',
  'vacaciones_junio': 'https://usuarios.ingenieria.usac.edu.gt/horarios/vacaciones/1',
  'vacaciones_diciembre': 'https://usuarios.ingenieria.usac.edu.gt/horarios/vacaciones/2',
};

const SM = { 'badge-blue': 'bl', 'badge-info': 'ci', 'badge-success': 'vd', 'badge-danger': 'rj' };
const DA = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];
const DL = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

function fetchHtml(target) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'Accept-Encoding': 'identity', 'User-Agent': 'Mozilla/5.0 (compatible; HorariosFetcher/1.0)' },
    };
    https.get(target, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return fetchHtml(new URL(res.headers.location, target).href).then(resolve, reject);
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (c) => { data += c; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function cellText(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function parse(html) {
  const out = [];
  const rows = html.match(/<tr[\s\S]*?<\/tr>/g) || [];
  for (const row of rows) {
    const cells = row.match(/<td[\s\S]*?<\/td>/g);
    if (!cells || cells.length < 8) continue;

    const raw0 = cellText(cells[0]);
    const m = raw0.match(/^(\d{4})\s+(.+)/);
    if (!m) continue;

    let starKey = null;
    const badge = cells[0].match(/badge-(\w+)/);
    if (badge && SM['badge-' + badge[1]]) starKey = SM['badge-' + badge[1]];

    const seccion = cellText(cells[1]);
    const modalidad = cellText(cells[2]);
    const inicio = cellText(cells[3]);
    const fin = cellText(cells[4]);
    const diasRaw = cellText(cells[5]);
    const dias = DL.filter((_, i) => new RegExp('\\b' + DA[i] + '\\b').test(diasRaw));
    const catedratico = cellText(cells[6]);
    const auxiliar = cellText(cells[7]);
    const btn = cellText(cells[8]);
    const restType = btn.includes('Ver') ? 'co' : 'sn';

    out.push({
      codigo: m[1],
      nombre: m[2].trim(),
      seccion,
      modalidad,
      inicio,
      fin,
      dias,
      catedratico,
      auxiliar,
      restType,
      starKey,
      key: [m[1], seccion, starKey || 'c', inicio, dias.join('')].join('-'),
    });
  }
  return out;
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [name, url] of Object.entries(URLS)) {
    try {
      const html = await fetchHtml(url);
      const cursos = parse(html);
      fs.writeFileSync(path.join(OUT_DIR, name + '.json'), JSON.stringify(cursos));
      console.log(`✓ ${name}: ${cursos.length} cursos (${JSON.stringify(cursos).length} bytes)`);
    } catch (e) {
      console.error(`✗ ${name}: ${e.message}`);
    }
  }
}

main();
