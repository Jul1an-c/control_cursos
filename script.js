let pensumActual = null;
let cursos = [];

const STORAGE_KEY = 'cursoControlProgreso';
const PENSUM_KEY = 'cursoControlPensum';
const REMINDER_KEY = 'cursoControlRecordatorio';
const REMINDER_THRESHOLD = 5;

const MIGRACIONES = {
  sistemas: 'sistemas_usac_clar2025'
};

/* ─── STORAGE ─── */
function obtenerProgreso() {
  const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  migrarIds(raw);
  return raw;
}

function migrarIds(progreso) {
  for (const [viejo, nuevo] of Object.entries(MIGRACIONES)) {
    if (progreso[viejo] && !progreso[nuevo]) {
      progreso[nuevo] = progreso[viejo];
      delete progreso[viejo];
    }
  }
}

function guardarProgreso(progreso) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
}

function obtenerPensumId() {
  const id = localStorage.getItem(PENSUM_KEY);
  return MIGRACIONES[id] || id;
}

function guardarPensumId(id) {
  localStorage.setItem(PENSUM_KEY, id);
}

function contarCambios() {
  return parseInt(localStorage.getItem(REMINDER_KEY)) || 0;
}

function incrementarCambios() {
  localStorage.setItem(REMINDER_KEY, contarCambios() + 1);
}

function resetearRecordatorio() {
  localStorage.setItem(REMINDER_KEY, 0);
}

/* ─── INICIO ─── */
function init() {
  const pensumId = obtenerPensumId();
  if (pensumId) {
    const meta = PENSUMS_META.find(p => p.id === pensumId);
    if (meta) {
      cargarPensumArchivo(meta).then(cargarPensum);
      return;
    }
  }
  mostrarSelectorPensum();
}

function cargarPensumArchivo(meta) {
  return new Promise((resolve, reject) => {
    document.querySelectorAll('script[data-pensum]').forEach(s => s.remove());
    const s = document.createElement('script');
    s.src = meta.archivo;
    s.dataset.pensum = meta.id;
    s.onload = () => {
      const data = window.PENSUM_DATA;
      delete window.PENSUM_DATA;
      resolve(data);
    };
    s.onerror = () => reject(new Error('No se pudo cargar ' + meta.archivo));
    document.head.appendChild(s);
  });
}

function cargarPensum(pensum) {
  pensumActual = pensum;
  guardarPensumId(pensum.id);

  cursos = pensum.cursos.map(c => ({ ...c }));

  const progreso = obtenerProgreso();
  const pData = progreso[pensum.id] || {};
  cursos.forEach(c => {
    c.completado = pData[c.codigo] || false;
  });

  actualizarHeader();
  mostrarLeyenda();
  mostrarCursos();
  actualizarProgreso();
  mostrarRecordatorioSiNecesario();
}

/* ─── HEADER ─── */
function actualizarHeader() {
  const nombreEl = document.getElementById('pensumNombre');
  const uniEl = document.getElementById('pensumUni');
  if (nombreEl) nombreEl.textContent = pensumActual?.abreviatura || '—';
  if (uniEl) uniEl.textContent = pensumActual?.universidad || '';
}

/* ─── SELECTOR DE PENSUM ─── */
function mostrarSelectorPensum() {
  const container = document.getElementById('modalPensumOpciones');
  if (!container) return;

  container.innerHTML = PENSUMS_META.map(p => `
    <div class="pensum-option" data-id="${p.id}">
      <div class="pensum-icon">🎓</div>
      <div class="pensum-option-name">${p.nombre}</div>
      <div class="pensum-option-uni">${p.universidad}</div>
    </div>
  `).join('') + `
    <div class="pensum-option" style="border-style:dashed;opacity:0.6;cursor:default;">
      <div class="pensum-icon" style="font-size:1.5rem;">+</div>
      <div class="pensum-option-name" style="font-size:0.8rem;">¿No está tu carrera?</div>
      <div class="pensum-option-uni" style="font-size:0.7rem;">Consultá CONTRIBUTING.md</div>
    </div>
  `;

  container.querySelectorAll('.pensum-option[data-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      const meta = PENSUMS_META.find(p => p.id === id);
      if (meta) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalBienvenida'));
        if (modal) modal.hide();
        cargarPensumArchivo(meta).then(cargarPensum);
      }
    });
  });

  const esPrimeraVez = !pensumActual;
  const modal = new bootstrap.Modal(document.getElementById('modalBienvenida'), {
    backdrop: esPrimeraVez ? 'static' : true,
    keyboard: !esPrimeraVez
  });
  modal.show();

  if (esPrimeraVez) {
    document.getElementById('modalBienvenida').addEventListener('hidden.bs.modal', () => {
      if (!pensumActual) mostrarSelectorPensum();
    }, { once: true });
  }
}

/* ─── LEYENDA ─── */
function mostrarLeyenda() {
  const container = document.getElementById('legendContainer');
  if (!container || !pensumActual) return;

  const areaClassMap = {
    'Ciencias de la computación': 'ciencias',
    'Metodología de sistemas': 'metodologia',
    'Desarrollo de software': 'desarrollo',
    'General': 'general'
  };

  container.innerHTML = Object.entries(pensumActual.areas).map(([key, val]) =>
    `<div class="legend-item">
      <span class="legend-dot area-${areaClassMap[key] || 'general'}"></span>
      ${val.label}
    </div>`
  ).join('');
}

/* ─── RENDERIZAR CURSOS ─── */
function mostrarCursos() {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';

  const agrupado = {};
  cursos.forEach(curso => {
    if (!agrupado[curso.semestre]) agrupado[curso.semestre] = [];
    agrupado[curso.semestre].push(curso);
  });

  const semestres = Object.keys(agrupado).sort((a, b) => a - b);

  semestres.forEach(semestre => {
    const col = document.createElement('div');
    col.className = 'col-lg-6';

    const wrapper = document.createElement('div');
    wrapper.className = 'semestre-wrapper';

    const total = agrupado[semestre].length;
    const completados = agrupado[semestre].filter(c => c.completado).length;

    const title = document.createElement('div');
    title.className = 'semestre-title';
    title.innerHTML = `
      Semestre ${semestre}
      <span class="semestre-count">${completados}/${total}</span>
    `;
    wrapper.appendChild(title);

    agrupado[semestre].forEach(curso => {
      wrapper.appendChild(crearCard(curso));
    });

    col.appendChild(wrapper);
    contenedor.appendChild(col);
  });

  actualizarProgreso();
}

function prereqsCompletados(curso) {
  return curso.prerrequisitos.every(pr => {
    const ref = cursos.find(c => c.codigo === pr);
    return ref && ref.completado;
  });
}

function prereqsPendientes(curso) {
  return curso.prerrequisitos.filter(pr => {
    const ref = cursos.find(c => c.codigo === pr);
    return !ref || !ref.completado;
  });
}

function crearCard(curso) {
  const areaKey = curso.area.trim();
  const areaInfo = pensumActual.areas[areaKey] || { color: '#666', label: areaKey };

  const areaClass = {
    'Ciencias de la computación': 'ciencias',
    'Metodología de sistemas': 'metodologia',
    'Desarrollo de software': 'desarrollo',
    'General': 'general'
  }[areaKey] || 'general';

  const disponible = curso.prerrequisitos.length === 0 || prereqsCompletados(curso);

  const card = document.createElement('div');
  card.className = `curso-card${curso.completado ? ' curso-completado' : ''}`;

  /* Color bar */
  const colorBar = document.createElement('div');
  colorBar.className = `color-bar area-${areaClass}`;
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip-area';
  tooltip.textContent = areaInfo.label.toUpperCase();
  colorBar.appendChild(tooltip);
  card.appendChild(colorBar);

  /* Body */
  const body = document.createElement('div');
  body.className = 'card-body';

  /* Left: code + credits */
  const codeSection = document.createElement('div');
  codeSection.className = 'card-code-section';
  codeSection.innerHTML = `
    <div class="card-code">${curso.codigo}</div>
    <div class="card-credits">${curso.creditos} cr.</div>
  `;
  body.appendChild(codeSection);

  /* Center: name + area + prereqs */
  const main = document.createElement('div');
  main.className = 'card-main';

  const nameRow = document.createElement('div');
  nameRow.style.display = 'flex';
  nameRow.style.alignItems = 'center';
  nameRow.style.flexWrap = 'wrap';
  nameRow.style.gap = '6px';

  const nameEl = document.createElement('span');
  nameEl.className = 'card-name';
  nameEl.textContent = curso.nombre;
  nameRow.appendChild(nameEl);

  if (!curso.completado && curso.prerrequisitos.length > 0) {
    const statusBadge = document.createElement('span');
    statusBadge.className = `card-status ${disponible ? 'status-disponible' : 'status-bloqueado'}`;
    statusBadge.textContent = disponible ? 'Disponible' : 'Faltan prerrequisitos';
    nameRow.appendChild(statusBadge);
  }

  main.appendChild(nameRow);

  if (curso.prerrequisitos.length > 0) {
    const prereqsEl = document.createElement('div');
    prereqsEl.className = 'card-prereqs';

    const totalPr = curso.prerrequisitos.length;
    const compPr = curso.prerrequisitos.filter(pr => {
      const ref = cursos.find(c => c.codigo === pr);
      return ref && ref.completado;
    }).length;

    prereqsEl.innerHTML = `
      <span style="font-size:0.72rem;color:var(--text-muted);">${compPr}/${totalPr} prerrequisitos</span>
      <div style="margin-top:2px;">
        ${curso.prerrequisitos.map(pr => {
          const ref = cursos.find(c => c.codigo === pr);
          const completado = ref ? ref.completado : false;
          return `<a href="#" class="prereq-link ${completado ? 'prereq-completado' : 'prereq-pendiente'}" data-codigo="${pr}">${pr}</a>`;
        }).join(' · ')}
      </div>
    `;
    main.appendChild(prereqsEl);
  }

  body.appendChild(main);

  /* Right: mandatory dot + checkbox */
  const actions = document.createElement('div');
  actions.className = 'card-actions';

  if (curso.obligatorio) {
    const dot = document.createElement('span');
    dot.className = 'obligatorio-dot';
    dot.textContent = '•';
    actions.appendChild(dot);
  }

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.className = 'form-check-input';
  check.id = `chk-${curso.codigo}`;
  check.checked = curso.completado;
  actions.appendChild(check);

  body.appendChild(actions);
  card.appendChild(body);

  /* Events: checkbox */
  check.addEventListener('change', () => {
    if (check.checked && !disponible && !curso.completado) {
      const pendientes = prereqsPendientes(curso);
      const lista = pendientes.map(pr => {
        const ref = cursos.find(c => c.codigo === pr);
        return ref ? `  • ${pr} — ${ref.nombre}` : `  • ${pr}`;
      }).join('\n');
      if (!confirm(
        `⚠️  No completaste todos los prerrequisitos de este curso:\n\n${lista}\n\n¿Marcar como completado de todas formas?`
      )) {
        check.checked = false;
        return;
      }
    }

    curso.completado = check.checked;
    guardarEstado();
    card.classList.toggle('curso-completado', curso.completado);
    incrementarCambios();
    recargarCards();
  });

  /* Events: prereq links */
  card.querySelectorAll('.prereq-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cod = e.target.dataset.codigo;
      const ref = cursos.find(c => c.codigo === cod);
      if (ref) {
        const areaR = pensumActual.areas[ref.area.trim()] || { label: ref.area };
        document.getElementById('modal-body-content').innerHTML = `
          <div class="mb-2"><strong>${ref.codigo}</strong> — ${ref.nombre}</div>
          <div class="mb-1">Créditos: ${ref.creditos}</div>
          <div class="mb-1">Área: ${areaR.label}</div>
          <div class="mb-1">Estado: ${ref.completado
            ? '<span style="color:#10b981">✅ Completado</span>'
            : '<span style="color:#e94560">❌ No completado</span>'}
          </div>
        `;
        new bootstrap.Modal(document.getElementById('modalCurso')).show();
      }
    });
  });

  return card;
}

function recargarCards() {
  mostrarCursos();
  actualizarProgreso();
  mostrarRecordatorioSiNecesario();
}

/* ─── ESTADO ─── */
function guardarEstado() {
  const progreso = obtenerProgreso();
  const pData = {};
  cursos.forEach(c => { pData[c.codigo] = c.completado; });
  progreso[pensumActual.id] = pData;
  guardarProgreso(progreso);
}

/* ─── PROGRESO ─── */
function actualizarProgreso() {
  if (!cursos.length) return;
  const total = cursos.length;
  const completados = cursos.filter(c => c.completado).length;
  const pct = Math.round((completados / total) * 100);

  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = `${completados}/${total} (${pct}%)`;
}

/* ─── RECORDATORIO EXPORTAR ─── */
function mostrarRecordatorioSiNecesario() {
  const banner = document.getElementById('exportReminder');
  const indicator = document.getElementById('unsavedIndicator');
  if (!banner) return;

  const cambios = contarCambios();
  if (cambios >= REMINDER_THRESHOLD) {
    banner.classList.add('show');
  }
  if (indicator) {
    indicator.style.display = cambios > 0 ? 'inline' : 'none';
    indicator.title = cambios > 0 ? `${cambios} cambio${cambios !== 1 ? 's' : ''} sin exportar` : '';
  }
}

function ocultarRecordatorio() {
  const banner = document.getElementById('exportReminder');
  if (banner) banner.classList.remove('show');
  resetearRecordatorio();
  mostrarRecordatorioSiNecesario();
}

/* ─── EXPORTAR / IMPORTAR ─── */
function exportarProgreso() {
  const data = obtenerProgreso();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `progreso-cursos-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  ocultarRecordatorio();
}

function importarProgreso() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        guardarProgreso(data);
        if (pensumActual) cargarPensum(pensumActual);
        alert('Progreso importado correctamente.');
      } catch {
        alert('El archivo no tiene un formato válido.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

/* ─── TEMA OSCURO ─── */
const TEMA_KEY = 'cursoControlTema';

function iniciarTema() {
  const guardado = localStorage.getItem(TEMA_KEY);
  const prefiereOscuro = guardado === 'dark' || (!guardado && window.matchMedia('(prefers-color-scheme: dark)').matches);
  aplicarTema(prefiereOscuro ? 'dark' : 'light');
}

function toggleTema() {
  const actual = document.documentElement.getAttribute('data-bs-theme') || 'light';
  aplicarTema(actual === 'dark' ? 'light' : 'dark');
}

function aplicarTema(tema) {
  document.documentElement.setAttribute('data-bs-theme', tema);
  localStorage.setItem(TEMA_KEY, tema);
  const btn = document.getElementById('btnTema');
  if (btn) btn.textContent = tema === 'dark' ? '☀️' : '🌙';
}

/* ─── SCROLL TO TOP ─── */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('btnScrollTop');
  if (!btn) return;
  btn.classList.toggle('show', window.scrollY > 400);
});

/* ─── EVENTOS ─── */
document.addEventListener('DOMContentLoaded', () => {
  init();

  document.getElementById('btnCambiarPensum')?.addEventListener('click', mostrarSelectorPensum);
  document.getElementById('btnExportar')?.addEventListener('click', exportarProgreso);
  document.getElementById('btnImportar')?.addEventListener('click', importarProgreso);
  document.getElementById('btnCerrarRecordatorio')?.addEventListener('click', ocultarRecordatorio);
  document.getElementById('btnTema')?.addEventListener('click', toggleTema);
  document.getElementById('btnScrollTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  iniciarTema();
});
