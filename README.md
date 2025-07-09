# Visualizador de Cursos - Ingeniería en Sistemas USAC

Este proyecto permite visualizar, organizar y hacer seguimiento del avance en los cursos de Ingeniería en Sistemas de la USAC (pénsum 2025). Ideal para planificar, marcar cursos completados y ver los prerrequisitos de forma interactiva.

<img src="docs/demo1.gif" alt="Vista general del sistema" width="600"/>

---

## 🚀 Funcionalidades

<table>
  <tr>
    <td align="center">
      <strong>Visualización semestral de cursos</strong><br>
      <img src="docs/dm_vist_gen.gif" alt="Mostrando Semestral" width="250" />
    </td>
    <td align="center">
      <strong>Colores por área (Desarrollo, Metodología, Ciencias.)</strong><br>
      <img src="docs/dem_ar.gif" alt="Mostrando Colores" width="250" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Marcar cursos como completados (guardado local)</strong><br>
      <img src="docs/dem_marcar.gif" alt="Marcado De Cursos Completos" width="250" />
    </td>
    <td align="center">
      <strong>Prerrequisitos interactivos con vista emergente</strong><br>
      <img src="docs/dem_prerrequisitos.gif" alt="Vista general de prerrequisitos" width="250" />
    </td>
  </tr>
</table>

---

## 📦 Cómo usar

1. Clona o descarga este repositorio:

    ```bash
    git clone https://github.com/Jul1an-c/cursos_sistemas_2025.git
    cd cursos_sistemas_2025
    ```

    ![Vista De Descarga](docs/descargar_repositorio.gif)

2. Abre el proyecto con un **servidor local** (no funciona al abrir `index.html` directamente):

    ### Opción 1: Live Server (VS Code)
    - Abre el proyecto en Visual Studio Code.
    - Instala la extensión **Live Server**.
    - Haz clic derecho en `index.html` → **"Open with Live Server"**.

    ### Opción 2: Python
    ```bash
    python -m http.server 8000
    ```
    Luego abre: [http://localhost:8000](http://localhost:8000)

3. Marca los cursos que ya completaste.
4. Tu progreso se guarda automáticamente en el navegador usando `localStorage`.

> ℹ️ Este proyecto no requiere instalación ni backend, pero **sí debe abrirse desde un servidor local** por restricciones del navegador al usar `fetch()` con archivos locales.

---

## 📁 Sobre la carpeta `docs/`

La carpeta `docs/` contiene únicamente los **GIFs de demostración** usados en este README.  
No es necesaria para el funcionamiento del proyecto y puede eliminarse si deseas reducir el tamaño del repositorio.

---

## 🛠 Tecnologías utilizadas

- HTML + CSS + JavaScript
- Bootstrap 5
