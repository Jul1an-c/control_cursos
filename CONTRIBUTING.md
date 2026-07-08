# Cómo agregar otro pensum USAC

La app tiene el pensum de Ingeniería en Ciencias y Sistemas (CLAR 2025). Si querés agregar otra carrera USAC, otro año de Sistemas, o incluso otra universidad, seguí estos pasos.

---

## Estructura

Cada carrera tiene su propio archivo dentro de la carpeta `data/`.

- [`data/pensums.js`](data/pensums.js) — lista de carreras disponibles (metadata)
- [`data/usac_sistemas_clar2025.js`](data/usac_sistemas_clar2025.js) — cursos de Sistemas USAC CLAR 2025 (ejemplo)

Para agregar una nueva, **creás un archivo nuevo** y lo registrás en `data/pensums.js`.

## 1. Convención de nombres

Usá el formato `{universidad}_{carrera}_{plan}` para evitar colisiones:

```
Archivo:  usac_electronica_clar2025.js
ID:       usac_electronica_clar2025

Archivo:  usac_sistemas_clar2015.js   (pensum anterior)
ID:       usac_sistemas_clar2015

Archivo:  usac_agronomia_2025.js
ID:       usac_agronomia_2025
```

### ¿Misma carrera pero otro año?

Si ya existe Sistemas CLAR 2025 y vos tenés el pensum de otro año:

```
usac_sistemas_clar2025.js   → el que ya existe
usac_sistemas_2015.js       → versión 2015
```

### ¿De otra universidad?

Si alguien de otra universidad quiere agregar su carrera, el formato sigue siendo el mismo:

```
{universidad}_{carrera}_{plan}.js     → Universidad, Carrara, Plan
```

## 2. Crear el archivo de tu carrera

Creá un archivo nuevo en `data/` con el nombre de tu carrera, ej: `data/usac_electronica_clar2025.js`.

> Funciona con cualquier cantidad de semestres (4, 8, 10, 12...) — la app se adapta automáticamente.

Estructura del archivo:

```js
window.PENSUM_DATA = {
  id: 'usac_electronica_clar2025',
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
```

> **Importante**: el archivo debe empezar con `window.PENSUM_DATA =` para que la app pueda leerlo.

### Campos de cada curso

| Campo | Tipo | Descripción |
|---|---|---|
| `codigo` | `string` | Código del curso (con comillas). Ej: `"0101"` |
| `nombre` | `string` | Nombre completo del curso |
| `creditos` | `number` | Cantidad de créditos |
| `area` | `string` | Debe coincidir exactamente con una clave de `areas` |
| `obligatorio` | `boolean` | `true` = obligatorio, `false` = optativo |
| `prerrequisitos` | `array` | Lista de códigos de cursos requeridos. Vacío `[]` si no tiene |
| `semestre` | `number` | Número de semestre (1, 2, 3, etc.) |

### Personalizar colores

Podés cambiar los colores de cada área a cualquier color hexadecimal:

```
color: '#ff6b6b'   → rojo
color: '#845ef7'   → violeta
color: '#20c997'   → verde agua
color: '#ff922b'   → naranja
```

---

## 3. Registrar la carrera en el listado

Agregá una entrada en [`data/pensums.js`](data/pensums.js) dentro del array `PENSUMS_META`:

```js
{
  id: 'usac_electronica_clar2025',
  nombre: 'Ingeniería Electrónica',
  abreviatura: 'Electrónica',
  universidad: 'USAC - CLAR 2025',
  archivo: 'data/usac_electronica_clar2025.js'
}
```

El campo `archivo` debe apuntar al archivo que creaste en el paso 1.

## 4. Pasos para contribuir

1. Hacé un **fork** del repositorio (botón "Fork" en GitHub).
2. Creá tu archivo de datos en `data/` (ej: `data/usac_electronica_clar2025.js`) con el template del paso 2.
3. Registrá tu carrera en `data/pensums.js` dentro del array `PENSUMS_META` (paso 3).
4. **Verificá que funciona**: abrí `index.html` en tu navegador, seleccioná tu carrera y revisá que los cursos, prerrequisitos y áreas se vean correctos.
5. Confirmá tus cambios:
   ```bash
   git add data/usac_electronica_clar2025.js data/pensums.js
   git commit -m "Agrega pensum de Ingeniería Electrónica - USAC"
   git push origin main
   ```
6. En GitHub, creá un **Pull Request** desde tu fork al repositorio original.

---

## 5. Tips importantes

- ✅ Los códigos de curso deben ser **strings** (con comillas). Usá `"0101"`, no `0101`.
- ✅ Los prerrequisitos deben coincidir exactamente con los `codigo` de otros cursos.
- ✅ Si un prerrequisito no existe en la lista, se mostrará igual pero sin funcionalidad al hacer clic.
- ✅ Podés tener cursos sin prerrequisitos (dejá el array vacío `[]`).
- ❌ No modifiques otros pensums existentes, solo agregá el tuyo al final del array.
- ❌ No borres los demás archivos del proyecto.

---

## Dudas

Si algo no te queda claro, abrí un **Issue** en GitHub con tu pregunta.
