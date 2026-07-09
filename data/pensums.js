/*
  ─── LISTADO DE CARRERAS DISPONIBLES ───

  Cada entrada en este array representa una carrera/pensum.
  El campo "archivo" apunta al archivo JS que contiene los cursos.

  Para agregar una nueva carrera:
    1. Creá un archivo en data/ con los cursos (ej: data/usac_electronica_clar2025.js)
    2. Agregá una entrada acá abajo en este array

  ─── CONVENCIÓN DE NOMBRES ───
  Archivo:   {universidad}_{carrera}_{plan}.js
  ID:        {universidad}_{carrera}_{plan}

  Ejemplos:
    usac_electronica_clar2025.js   → USAC, Electrónica, plan CLAR 2025
    usac_sistemas_clar2015.js      → USAC, Sistemas, pensum anterior a CLAR 2015
    usac_agronomia_clar2025.js     → USAC, Agronomía, plan CLAR 2025
*/

const PENSUMS_META = [
  {
    /* --- Ingeniería en Ciencias y Sistemas - USAC (CLAR 2025) --- */
    id: 'usac_sistemas_clar2025',
    nombre: 'Ingeniería en Ciencias y Sistemas',
    abreviatura: 'Sistemas',
    universidad: 'USAC - CLAR 2025',
    archivo: 'data/usac_sistemas_clar2025.js'
  }

  // ─── Acá se agregan más carreras ───
  // {
  //   id: 'usac_electronica_clar2025',
  //   nombre: 'Ingeniería Electrónica',
  //   abreviatura: 'Electrónica',
  //   universidad: 'USAC - CLAR 2025',
  //   archivo: 'data/usac_electronica_clar2025.js'
  // }
];
