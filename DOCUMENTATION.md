# Documentación del Proyecto: Manuel.Team Portfolio

## 1. Descripción General
Este proyecto es un portafolio personal para un desarrollador Full Stack, diseñado con un enfoque en "estética premium", alto rendimiento y una experiencia de usuario fluida. El sitio es totalmente responsivo, soporta múltiples idiomas (Inglés/Español) y cuenta con un modo oscuro/claro persistente.

## 2. Funcionalidades Principales

### 2.1. Navegación Responsiva (Navbar)
- **Diseño Adaptativo**: Barra de navegación fija en la parte superior para escritorio, que se transforma en un menú de hamburguesa en dispositivos móviles.
- **Efectos Visuales**: Fondo translúcido (`backdrop-blur`) que se activa al hacer scroll o abrir el menú móvil.
- **Interacción**: Animaciones suaves al abrir/cerrar el menú utilizando `framer-motion`.

### 2.2. Internacionalización (i18n)
- **Soporte Multi-idioma**: El sitio está disponible en Inglés (predeterminado) y Español.
- **Enrutamiento**: 
  - `/`: Versión en Inglés.
  - `/es`: Versión en Español.
- **Persistencia**: La selección de idioma navega a la ruta correspondiente, cargando el contenido adecuado desde `src/data/portfolio.json`.

### 2.3. Modo Oscuro/Claro (Theming)
- **Toggle Dinámico**: Botón en la barra de navegación para alternar entre temas.
- **Persistencia**: La preferencia del usuario se guarda en `localStorage` y se respeta en futuras visitas.
- **Detección Automática**: Se detecta la preferencia del sistema operativo (prefers-color-scheme) en la primera carga.
- **Implementación CSS**: Uso de variables CSS nativas y la clase `.dark` de Tailwind para un cambio de tema instantáneo sin "flicker".

## 3. Arquitectura y Tecnologías

### 3.1. Stack Tecnológico
- **Framework Principal**: [Astro](https://astro.build/) (v5). Elegido por su rendimiento ("Islands Architecture") y capacidad de generar HTML estático.
- **UI Framework**: [React](https://react.dev/) (v19). Utilizado para componentes interactivos como la `Navbar`.
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (v4 beta/Vite). Utilizado para un diseño rápido, mantenible y responsivo.
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/). Para animaciones complejas de UI (menú móvil, transiciones).
- **Iconos**: [Lucide React](https://lucide.dev/). Iconos ligeros y consistentes.

### 3.2. Estructura del Proyecto
```
/
├── src/
│   ├── components/    # Componentes UI (React y Astro)
│   │   └── Navbar.tsx # Componente principal de navegación
│   ├── layouts/       # Plantillas base
│   │   └── Layout.astro # Layout principal con <head>, estilos globales y scripts
│   ├── pages/         # Rutas del sitio
│   │   ├── index.astro # Página de inicio (Inglés)
│   │   └── es/
│   │       └── index.astro # Página de inicio (Español)
│   ├── styles/
│   │   └── global.css # Estilos globales y configuración de Tailwind
│   └── data/
│       └── portfolio.json # Fuente de datos centralizada (textos, proyectos, etc.)
├── public/            # Activos estáticos
└── tailwind.config.mjs # Configuración de Tailwind (colores, fuentes)
```

### 3.3. Flujo de Datos
- Los datos del portafolio están desacoplados de la vista y residen en `src/data/portfolio.json`.
- Las páginas (`index.astro`, `es/index.astro`) importan este JSON y pasan los datos correspondientes (nodo `en` o `es`) a los componentes como props.

## 4. Buenas Prácticas Implementadas

### 4.1. Rendimiento (Performance)
- **Islands Architecture**: La mayor parte del sitio es HTML estático generado por Astro. Solo la `Navbar` se hidrata en el cliente (`client:load`) porque requiere interactividad inmediata.
- **Carga de Fuentes**: Uso de `font-display: swap` (implícito en Google Fonts) y pre-conexión a servidores de fuentes.

### 4.2. Mantenibilidad
- **Variables CSS**: Uso de variables CSS (`--app-bg`, `--app-text`) para definir el tema. Esto facilita cambiar la paleta de colores globalmente desde un solo lugar (`Layout.astro`).
- **Componentes Reutilizables**: La UI se divide en componentes pequeños y enfocados.
- **Centralización de Contenido**: Todo el texto está en un archivo JSON, lo que facilita la traducción y actualización sin tocar el código.

### 4.3. Accesibilidad (a11y)
- **HTML Semántico**: Uso correcto de etiquetas `<nav>`, `<main>`, `<ul>`, `<li>`.
- **Contraste**: Colores ajustados para asegurar legibilidad en ambos modos.
- **Atributos ARIA**: Etiquetas `aria-label` en botones de iconos (como el toggle de tema y menú).

## 5. Guía de Desarrollo

### Comandos Principales
- `pnpm dev`: Inicia el servidor de desarrollo local.
- `pnpm build`: Construye el sitio para producción.
- `pnpm preview`: Vista previa de la build de producción.

### Cómo agregar un nuevo idioma
1. Agregar una nueva clave (ej. `fr`) en `src/data/portfolio.json`.
2. Crear una carpeta `src/pages/fr/`.
3. Copiar `src/pages/index.astro` a `src/pages/fr/index.astro`.
4. Actualizar la importación de datos para usar `portfolioData.fr`.
5. Actualizar `Navbar.tsx` para incluir el nuevo enlace en el selector de idiomas.
