let cursosGlobal = [];

// Cargar ambos archivos JSON y combinarlos
Promise.all([
  fetch('cursos/cursos1_5.json').then(res => res.json()),
  fetch('cursos/cursos6_10.json').then(res => res.json())
])
.then(([data1, data2]) => {
  cursosGlobal = [...data1, ...data2];
  cargarDesdeStorage();
  mostrarCursos();
})
.catch(error => {
  console.error('Error al cargar los cursos:', error);
});

function cargarDesdeStorage() {
  const guardado = JSON.parse(localStorage.getItem('cursosCompletados')) || {};
  cursosGlobal.forEach(curso => {
    curso.completado = guardado[curso.codigo] || false;
  });
}

function guardarEnStorage() {
  const estado = {};
  cursosGlobal.forEach(curso => {
    estado[curso.codigo] = curso.completado;
  });
  localStorage.setItem('cursosCompletados', JSON.stringify(estado));
}

function mostrarCursos() {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';

  const agrupado = {};
  cursosGlobal.forEach(curso => {
    if (!agrupado[curso.semestre]) agrupado[curso.semestre] = [];
    agrupado[curso.semestre].push(curso);
  });

  for (let semestre in agrupado) {
    const columna = document.createElement('div');
    columna.className = 'col-md-6';
    columna.innerHTML = `<h4 class="text-center mb-3">Semestre ${semestre}</h4>`;

    agrupado[semestre].forEach(curso => {
      const areaClass = {
        'Ciencias de la computación': 'area-ciencias',
        'Metodología de sistemas': 'area-metodologia',
        'Desarrollo de software': 'area-desarrollo',
        'General': 'area-general'
      }[curso.area.trim()] || 'area-general';

      // Tarjeta principal del curso
      const card = document.createElement('div');
      card.className = `curso-card d-flex align-items-center rounded p-2 mb-3 ${areaClass}`;
      if (curso.completado) {
        card.classList.add('curso-completado');
      }

      // Barra de color lateral y tooltip (separado del hover global)
      const colorBar = document.createElement('div');
      colorBar.className = `color-bar ${areaClass}`;
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip-area';
      tooltip.textContent = curso.area.toUpperCase();
      colorBar.appendChild(tooltip);
      card.appendChild(colorBar);

      // Contenido a la izquierda (código y créditos)
      const datos = document.createElement('div');
      datos.className = 'text-center px-2';
      datos.style.width = '70px';
      datos.innerHTML = `
        <div class="fw-bold">${curso.codigo}</div>
        <small class="text-muted">${curso.creditos} cr.</small>
      `;
      card.appendChild(datos);

      // Contenido central (nombre y prerrequisitos)
      const contenido = document.createElement('div');
      contenido.className = 'flex-grow-1 px-2 bg-light rounded d-flex flex-column justify-content-center';
      contenido.style.minHeight = '60px';
      contenido.innerHTML = `
        <div class="fw-semibold">${curso.nombre}</div>
        ${curso.prerrequisitos.length > 0
          ? `<div class="mt-1">Prerrequisitos: ${curso.prerrequisitos.map(pr => `<a href="#" class="text-decoration-none text-primary prereq-link" data-codigo="${pr}">${pr}</a>`).join(', ')}`
          : '<small class="text-muted">Sin prerrequisitos</small>'}
      `;
      card.appendChild(contenido);

      // Punto obligatorio + checkbox
      const checkContainer = document.createElement('div');
      checkContainer.className = 'd-flex align-items-center gap-4 ms-4';

      if (curso.obligatorio) {
        const punto = document.createElement('span');
        punto.className = 'obligatorio-dot';
        punto.textContent = '•';
        checkContainer.appendChild(punto);
      }

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.className = 'form-check-input';
      check.id = `chk-${curso.codigo}`;
      check.checked = curso.completado;
      checkContainer.appendChild(check);

      card.appendChild(checkContainer);

      // Evento del checkbox
      check.addEventListener('change', () => {
        curso.completado = check.checked;
        guardarEnStorage();
        if (curso.completado) {
          card.classList.add('curso-completado');
        } else {
          card.classList.remove('curso-completado');
        }
      });

      // Eventos de prerrequisitos
      const links = contenido.querySelectorAll('.prereq-link');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const cod = e.target.dataset.codigo;
          const cursoRef = cursosGlobal.find(c => c.codigo === cod);
          if (cursoRef) {
            document.getElementById('modal-body-content').innerHTML = `
              <strong>${cursoRef.codigo} - ${cursoRef.nombre}</strong><br>
              Créditos: ${cursoRef.creditos}<br>
              Área: ${cursoRef.area}<br>
              Estado: ${cursoRef.completado ? '✅ Completado' : '❌ No completado'}
            `;
            const modal = new bootstrap.Modal(document.getElementById('modalCurso'));
            modal.show();
          }
        });
      });

      columna.appendChild(card);
    });

    contenedor.appendChild(columna);
  }
}
