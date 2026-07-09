# Cómo agregar otro pensum USAC

La app tiene el pensum de Ingeniería en Ciencias y Sistemas (CLAR 2025). Si querés agregar otra carrera de la USAC o el pensum de otro año de Sistemas, seguí estos pasos.

---

## Estructura

Cada carrera tiene su propio archivo dentro de la carpeta `data/`.

* [`data/pensums.js`](data/pensums.js) — lista de carreras disponibles (metadata)
* [`data/usac_sistemas_clar2025.js`](data/usac_sistemas_clar2025.js) — cursos de Sistemas USAC CLAR 2025 (ejemplo)

Para agregar una nueva, **creás un archivo nuevo** y lo registrás en `data/pensums.js`.

## 1. Convención de nombres

Usá el formato `{universidad}_{carrera}_{plan}` para evitar colisiones (todas las carreras son de la USAC):

```text
Archivo:  usac_electronica_clar2025.js
ID:       usac_electronica_clar2025

Archivo:  usac_sistemas_clar2015.js   (pensum anterior)
ID:       usac_sistemas_clar2015
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
      'Potencia':           { color: '#e8a838', label: 'Potencia'},
      'Electrotécnia':      { color: '#00b050', label: 'Electrotécnia'},
      'General(Sistemas)':  { color: '#f97316', label: 'General(Color predominante)'}
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

> **Importante:** el archivo debe empezar con `window.PENSUM_DATA =` para que la app pueda leerlo.

### Campos de cada curso

| Campo            | Tipo      | Descripción                                                   |
| ---------------- | --------- | ------------------------------------------------------------- |
| `codigo`         | `string`  | Código del curso (con comillas). Ej: `"0101"`                 |
| `nombre`         | `string`  | Nombre completo del curso                                     |
| `creditos`       | `number`  | Cantidad de créditos                                          |
| `area`           | `string`  | Debe coincidir exactamente con una clave de `areas`           |
| `obligatorio`    | `boolean` | `true` = obligatorio, `false` = optativo                      |
| `prerrequisitos` | `array`   | Lista de códigos de cursos requeridos. Vacío `[]` si no tiene |
| `semestre`       | `number`  | Número de semestre (1, 2, 3, etc.)                            |

### Personalizar colores

Podés cambiar los colores de cada área a cualquier color hexadecimal:

```text
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

El campo `archivo` debe apuntar al archivo que creaste en el paso 2.

---

## 4. Cómo contribuir

### ¿Qué es un Fork?

Un **fork** es una copia de este repositorio en tu propia cuenta de GitHub. Esto te permite realizar cambios sin afectar el proyecto original.

Cuando terminés tus modificaciones, podés crear un **Pull Request (PR)** para proponer que esos cambios sean incorporados al repositorio principal.

---

### Opción A: Contribuir desde GitHub Web (recomendado)

Si solo vas a agregar o modificar uno o dos archivos, no necesitás instalar Git ni usar la terminal.

1. Hacé un **Fork** del repositorio usando el botón **Fork** en GitHub.
2. Se creará una copia del proyecto en tu propia cuenta.
3. Dentro de tu fork:

   * Creá tu archivo en `data/` (por ejemplo `data/usac_electronica_clar2025.js`).
   * Agregá la entrada correspondiente en `data/pensums.js`.
   * También podés subir archivos directamente desde tu computadora usando **Add file → Upload files**.
4. GitHub te pedirá confirmar los cambios. Creá el commit desde la misma página.
5. Presioná **Contribute → Open Pull Request**.
6. Escribí una breve descripción indicando qué carrera o pensum agregaste y enviá el Pull Request.

---

### Opción B: Contribuir usando Git

1. Hacé un **Fork** del repositorio.

2. Cloná tu fork localmente:

   ```bash
   git clone URL_DE_TU_FORK
   ```

3. Creá tu archivo de datos en `data/` (ej: `data/usac_electronica_clar2025.js`) usando el template del paso 2.

4. Registrá tu carrera en `data/pensums.js` dentro del array `PENSUMS_META`.

5. Verificá que todo funcione correctamente:

   * Abrí `index.html` en tu navegador.
   * Seleccioná tu carrera.
   * Revisá que los cursos, prerrequisitos y áreas se visualicen correctamente.

6. Confirmá los cambios:

   ```bash
   git add data/usac_electronica_clar2025.js data/pensums.js
   git commit -m "Agrega pensum de Ingeniería Electrónica - USAC"
   git push origin main
   ```

7. Desde GitHub, creá un **Pull Request** desde tu fork hacia este repositorio.

---

### Antes de enviar el Pull Request

Verificá lo siguiente:

* El archivo nuevo está dentro de `data/`.
* El `id` del archivo coincide con el registrado en `PENSUMS_META`.
* El campo `archivo` apunta al archivo correcto.
* Todos los prerrequisitos hacen referencia a códigos existentes.
* La carrera aparece en el selector y carga correctamente.
* No modificaste ni eliminaste otros pensums existentes.
* No eliminaste ni modificaste configuraciones ajenas a tu contribución.

---

## 5. Tips importantes

* ✅ Los códigos de curso deben ser **strings** (con comillas). Usá `"0101"`, no `0101`.
* ✅ Los prerrequisitos deben coincidir exactamente con los `codigo` de otros cursos.
* ✅ Si un prerrequisito no existe en la lista, se mostrará igual pero sin funcionalidad al hacer clic.
* ✅ Podés tener cursos sin prerrequisitos (dejá el array vacío `[]`).
* ✅ Si es tu primera contribución, podés hacer todo el proceso directamente desde GitHub sin instalar Git.
* ❌ No modifiques otros pensums existentes, solo agregá el tuyo al final del array.
* ❌ No borres los demás archivos del proyecto.

---

## Dudas

Si algo no te queda claro, abrí un **Issue** en GitHub con tu pregunta.
