/*
  ═══════════════════════════════════════════════════════════════
  PLANTILLA DE PENSUM
  ═══════════════════════════════════════════════════════════════

  Este archivo es un ejemplo real. Si querés agregar otra
  carrera, copia este archivo y reemplaza los datos.

  ─── REGLAS ───
  • El archivo DEBE empezar con: window.PENSUM_DATA = {
  • El id DEBE coincidir con el que pusiste en data/pensums.js
  • Las áreas en "areas" y "cursos[].area" deben coincidir exactamente
  • Los códigos de curso deben ser strings: "0101", no 101
  • Los prerrequisitos vacíos se escriben como []
  • Cualquier cantidad de semestres funciona (1, 4, 8, 10, 12...)
  • Cursos optativos: obligatorio: false
  • Si no hay prerrequisitos: prerrequisitos: []

  ─── EJEMPLO COMPLETO ───

  window.PENSUM_DATA = {
    id: 'usac_electronica_2025',
    nombre: 'Ingeniería Electrónica',
    abreviatura: 'Electrónica',
    universidad: 'USAC - CLAR 2025',
    areas: {
      'Matemática':       { color: '#e8a838', label: 'Matemática' },
      'Física':           { color: '#3b82f6', label: 'Física' },
      'Especialización':  { color: '#10b981', label: 'Especialización' },
      'General':          { color: '#f97316', label: 'General' }
    },
    cursos: [
      {
        codigo: '0001',
        nombre: 'Matemática Básica 1',
        creditos: 6,
        area: 'Matemática',
        obligatorio: true,
        prerrequisitos: [],
        semestre: 1
      },
      {
        codigo: '0002',
        nombre: 'Matemática Básica 2',
        creditos: 6,
        area: 'Matemática',
        obligatorio: true,
        prerrequisitos: ['0001'],
        semestre: 2
      }
    ]
  };
  ═══════════════════════════════════════════════════════════════
*/

window.PENSUM_DATA = {
  /* ─── Identificador único (debe coincidir con data/pensums.js) ─── */
  id: 'usac_sistemas_clar2025',
  nombre: 'Ingeniería en Ciencias y Sistemas',
  abreviatura: 'Sistemas',
  universidad: 'USAC - CLAR 2025',

  /* ─── Áreas académicas con sus colores ─── */
  areas: {
    'Ciencias de la computación': { color: '#f59e0b', label: 'Ciencias de la Computación' },
    'Metodología de sistemas':    { color: '#3b82f6', label: 'Metodología de Sistemas' },
    'Desarrollo de software':     { color: '#10b981', label: 'Desarrollo de Software' },
    'General':                    { color: '#f97316', label: 'General' }
  },

  /* ─── Lista de cursos ─── */
  cursos: [
    /* ─── SEMESTRE 1 ─── */
    { codigo: '0005', nombre: 'Técnicas de Estudio e Investigación', creditos: 3, area: 'General', obligatorio: true, prerrequisitos: [], semestre: 1 },
    { codigo: '0017', nombre: 'Área Social Humanística 1', creditos: 3, area: 'General', obligatorio: true, prerrequisitos: [], semestre: 1 },
    { codigo: '0101', nombre: 'Área Matemática Básica 1', creditos: 9, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: [], semestre: 1 },
    { codigo: '0006', nombre: 'Idioma Técnico 1', creditos: 3, area: 'General', obligatorio: false, prerrequisitos: [], semestre: 1 },
    { codigo: '0039', nombre: 'Deportes 1', creditos: 2, area: 'General', obligatorio: false, prerrequisitos: [], semestre: 1 },

    /* ─── SEMESTRE 2 ─── */
    { codigo: '0019', nombre: 'Área Social Humanística 2', creditos: 3, area: 'General', obligatorio: true, prerrequisitos: ['0017'], semestre: 2 },
    { codigo: '0103', nombre: 'Área Matemática Básica 2', creditos: 9, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0101'], semestre: 2 },
    { codigo: '0147', nombre: 'Física Básica', creditos: 5, area: 'General', obligatorio: true, prerrequisitos: ['0101'], semestre: 2 },
    { codigo: '0768', nombre: 'Introducción a los Algoritmos y Flujo de Datos', creditos: 4, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0101'], semestre: 2 },
    { codigo: '0960', nombre: 'Matemática para Computación 1', creditos: 5, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0101'], semestre: 2 },
    { codigo: '0008', nombre: 'Idioma Técnico 2', creditos: 3, area: 'General', obligatorio: false, prerrequisitos: ['0006'], semestre: 2 },
    { codigo: '0040', nombre: 'Deportes 2', creditos: 2, area: 'General', obligatorio: false, prerrequisitos: ['0039'], semestre: 2 },

    /* ─── SEMESTRE 3 ─── */
    { codigo: '0089', nombre: 'Comunicación Asertiva', creditos: 2, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0103', '0147', '0960'], semestre: 3 },
    { codigo: '0107', nombre: 'Área Matemática Intermedia 1', creditos: 9, area: 'General', obligatorio: true, prerrequisitos: ['0103'], semestre: 3 },
    { codigo: '0150', nombre: 'Física 1', creditos: 5, area: 'General', obligatorio: true, prerrequisitos: ['0103', '0147'], semestre: 3 },
    { codigo: '0770', nombre: 'Introducción a la Programación y Computación 1', creditos: 6, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0768', '0103', '0147', '0960'], semestre: 3 },
    { codigo: '0795', nombre: 'Lógica de Sistemas', creditos: 3, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0103', '0147', '0960'], semestre: 3 },
    { codigo: '0962', nombre: 'Matemática para Computación 2', creditos: 5, area: 'General', obligatorio: true, prerrequisitos: ['0103', '0147', '0960'], semestre: 3 },
    { codigo: '0001', nombre: 'Ética Profesional', creditos: 2, area: 'General', obligatorio: false, prerrequisitos: ['0019'], semestre: 3 },
    { codigo: '0009', nombre: 'Idioma Técnico 3', creditos: 3, area: 'General', obligatorio: false, prerrequisitos: ['0008'], semestre: 3 },

    /* ─── SEMESTRE 4 ─── */
    { codigo: '0112', nombre: 'Área Matemática Intermedia 2', creditos: 6, area: 'General', obligatorio: true, prerrequisitos: ['0107'], semestre: 4 },
    { codigo: '0114', nombre: 'Área Matemática Intermedia 3', creditos: 6, area: 'General', obligatorio: true, prerrequisitos: ['0107'], semestre: 4 },
    { codigo: '0152', nombre: 'Física 2', creditos: 6, area: 'General', obligatorio: true, prerrequisitos: ['0107', '0150'], semestre: 4 },
    { codigo: '0771', nombre: 'Introducción a la Programación y Computación 2', creditos: 6, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0107', '0770', '0795', '0962'], semestre: 4 },
    { codigo: '0964', nombre: 'Organización Computacional', creditos: 4, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0089', '0150', '0770', '0962'], semestre: 4 },
    { codigo: '2025', nombre: 'Prácticas Iniciales', creditos: 0, area: 'General', obligatorio: true, prerrequisitos: ['0089', '0107', '0770'], semestre: 4 },
    { codigo: '0010', nombre: 'Lógica', creditos: 1, area: 'General', obligatorio: false, prerrequisitos: ['0019'], semestre: 4 },
    { codigo: '0011', nombre: 'Idioma Técnico 4', creditos: 3, area: 'General', obligatorio: false, prerrequisitos: ['0009'], semestre: 4 },

    /* ─── SEMESTRE 5 ─── */
    { codigo: '0116', nombre: 'Matemática Aplicada 3', creditos: 5, area: 'General', obligatorio: true, prerrequisitos: ['0112', '0114'], semestre: 5 },
    { codigo: '0118', nombre: 'Matemática Aplicada 1', creditos: 5, area: 'General', obligatorio: true, prerrequisitos: ['0112', '0114'], semestre: 5 },
    { codigo: '0281', nombre: 'Sistemas Operativos 1', creditos: 6, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0964'], semestre: 5 },
    { codigo: '0732', nombre: 'Estadística 1', creditos: 5, area: 'General', obligatorio: true, prerrequisitos: ['0107', '0005'], semestre: 5 },
    { codigo: '0772', nombre: 'Estructuras de Datos', creditos: 6, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0089', '0771'], semestre: 5 },
    { codigo: '0778', nombre: 'Arquitectura de Computadores y Ensambladores 1', creditos: 5, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0964'], semestre: 5 },
    { codigo: '0018', nombre: 'Filosofía de la Ciencia', creditos: 1, area: 'General', obligatorio: false, prerrequisitos: ['0019'], semestre: 5 },

    /* ─── SEMESTRE 6 ─── */
    { codigo: '0722', nombre: 'Teoría de Sistemas 1', creditos: 4, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0732', '0772', '0116', '0118'], semestre: 6 },
    { codigo: '0601', nombre: 'Investigación de Operaciones 1', creditos: 6, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0771', '0732'], semestre: 6 },
    { codigo: '0014', nombre: 'Economía', creditos: 3, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0732'], semestre: 6 },
    { codigo: '0781', nombre: 'Organización de Lenguajes y Compiladores 2', creditos: 6, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0772', '0777'], semestre: 6 },
    { codigo: '0778', nombre: 'Arquitectura de Computadoras y Ensambladores 1', creditos: 5, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0796', '0964'], semestre: 6 },
    { codigo: '0773', nombre: 'Manejo e Implementación de Archivos', creditos: 5, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0772', '0796'], semestre: 6 },
    { codigo: '0122', nombre: 'Matemática Aplicada 4', creditos: 5, area: 'Ciencias de la computación', obligatorio: false, prerrequisitos: ['0118'], semestre: 6 },
    { codigo: '0120', nombre: 'Matemática Aplicada 2', creditos: 5, area: 'Ciencias de la computación', obligatorio: false, prerrequisitos: ['0118'], semestre: 6 },
    { codigo: '0200', nombre: 'Ingeniería Eléctrica 1', creditos: 6, area: 'General', obligatorio: false, prerrequisitos: ['0114', '0152'], semestre: 6 },

    /* ─── SEMESTRE 7 ─── */
    { codigo: '0724', nombre: 'Teoría de Sistemas 2', creditos: 4, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0601', '0722'], semestre: 7 },
    { codigo: '0603', nombre: 'Investigación de Operaciones 2', creditos: 6, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0601'], semestre: 7 },
    { codigo: '0734', nombre: 'Estadística 2', creditos: 5, area: 'Metodología de sistemas', obligatorio: false, prerrequisitos: ['0732'], semestre: 7 },
    { codigo: '0281', nombre: 'Sistemas Operativos 1', creditos: 6, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0778', '0781'], semestre: 7 },
    { codigo: '0779', nombre: 'Arquitectura de Computadoras y Ensambladores 2', creditos: 5, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0778'], semestre: 7 },
    { codigo: '0970', nombre: 'Redes de Computadoras 1', creditos: 5, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0773', '0778'], semestre: 7 },
    { codigo: '0774', nombre: 'Sistemas de Bases de Datos 1', creditos: 6, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0773'], semestre: 7 },
    { codigo: '2036', nombre: 'Prácticas Intermedias', creditos: 0, area: 'General', obligatorio: true, prerrequisitos: ['0773', '0777', '0778', '2025'], semestre: 7 },

    /* ─── SEMESTRE 8 ─── */
    { codigo: '0285', nombre: 'Sistemas Operativos 2', creditos: 4, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0281'], semestre: 8 },
    { codigo: '0975', nombre: 'Redes de Computadoras 2', creditos: 6, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0970'], semestre: 8 },
    { codigo: '0775', nombre: 'Sistemas de Bases de Datos 2', creditos: 7, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0281', '0774'], semestre: 8 },
    { codigo: '0283', nombre: 'Análisis y Diseño de Sistemas 1', creditos: 6, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0774'], semestre: 8 },
    { codigo: '0797', nombre: 'Seminario de Sistemas 1', creditos: 5, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0281', '0724', '0774'], semestre: 8 },
    { codigo: '0700', nombre: 'Ingeniería Económica 1', creditos: 4, area: 'General', obligatorio: false, prerrequisitos: ['0732'], semestre: 8 },

    /* ─── SEMESTRE 9 ─── */
    { codigo: '0729', nombre: 'Modelación y Simulación 1', creditos: 5, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0603', '0724'], semestre: 9 },
    { codigo: '0786', nombre: 'Sistemas Organizacionales y Gerenciales 1', creditos: 5, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0283', '0722'], semestre: 9 },
    { codigo: '0972', nombre: 'Inteligencia Artificial 1', creditos: 7, area: 'Ciencias de la computación', obligatorio: true, prerrequisitos: ['0724', '0775', '0781'], semestre: 9 },
    { codigo: '0966', nombre: 'Seguridad y Auditoría de Redes de Computadoras', creditos: 3, area: 'Ciencias de la computación', obligatorio: false, prerrequisitos: ['0975'], semestre: 9 },
    { codigo: '0785', nombre: 'Análisis y Diseño de Sistemas 2', creditos: 7, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0283'], semestre: 9 },
    { codigo: '0798', nombre: 'Seminario de Sistemas 2', creditos: 5, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0285', '0775', '0797'], semestre: 9 },
    { codigo: '0788', nombre: 'Sistemas Aplicados 1', creditos: 5, area: 'Desarrollo de software', obligatorio: false, prerrequisitos: ['0283'], semestre: 9 },
    { codigo: '0776', nombre: 'Bases de Datos Avanzadas', creditos: 5, area: 'Desarrollo de software', obligatorio: false, prerrequisitos: ['0775'], semestre: 9 },
    { codigo: '2009', nombre: 'Prácticas Finales Ingeniería Ciencias y Sistemas', creditos: 0, area: 'General', obligatorio: true, prerrequisitos: ['0283', '0285', '0975', '2036'], semestre: 9 },

    /* ─── SEMESTRE 10 ─── */
    { codigo: '0720', nombre: 'Modelación y Simulación 2', creditos: 6, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0729'], semestre: 10 },
    { codigo: '0787', nombre: 'Sistemas Organizacionales y Gerenciales 2', creditos: 6, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0786'], semestre: 10 },
    { codigo: '0790', nombre: 'Emprendedores de Negocios Informáticos', creditos: 6, area: 'Metodología de sistemas', obligatorio: false, prerrequisitos: ['0786'], semestre: 10 },
    { codigo: '0968', nombre: 'Inteligencia Artificial 2', creditos: 5, area: 'Ciencias de la computación', obligatorio: false, prerrequisitos: ['0972'], semestre: 10 },
    { codigo: '0974', nombre: 'Redes de Nueva Generación', creditos: 3, area: 'Ciencias de la computación', obligatorio: false, prerrequisitos: ['0975'], semestre: 10 },
    { codigo: '0780', nombre: 'Software Avanzado', creditos: 8, area: 'Desarrollo de software', obligatorio: true, prerrequisitos: ['0785'], semestre: 10 },
    { codigo: '0789', nombre: 'Sistemas Aplicados 2', creditos: 5, area: 'Desarrollo de software', obligatorio: false, prerrequisitos: ['0785', '0788'], semestre: 10 },
    { codigo: '0735', nombre: 'Auditoría de Proyectos de Software', creditos: 6, area: 'Desarrollo de software', obligatorio: false, prerrequisitos: ['0785'], semestre: 10 },
    { codigo: '7999', nombre: 'Seminario de Investigación EPS Sistemas', creditos: 3, area: 'Metodología de sistemas', obligatorio: false, prerrequisitos: ['0785', '0786', '0798'], semestre: 10 },
    { codigo: '0799', nombre: 'Seminario de Investigación', creditos: 3, area: 'Metodología de sistemas', obligatorio: true, prerrequisitos: ['0785', '0786', '0788'], semestre: 10 }
  ]
};
