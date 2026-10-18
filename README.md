# Manuel.team

Portafolio bilingüe de Manuel Almaguer, generado como HTML estático con Astro,
React y Tailwind CSS. Las páginas públicas son `/` (inglés) y `/es/` (español).

## Requisitos

- Node **22.23.3 LTS**, fijado en `.nvmrc` (mínimo admitido: 22.22.0).
- pnpm **10.32.1**, declarado en `packageManager`.
- Astro 7.4.0, integración React 7.1.0 y Tailwind CSS 4.3.3.

Con nvm para Windows:

```powershell
nvm install 22.23.3
nvm use 22.23.3
corepack enable pnpm
pnpm install --frozen-lockfile
```

El proyecto usa **pnpm** y `pnpm-lock.yaml` como única fuente de versiones
resueltas. Conserva el lockfile al instalar o actualizar dependencias.
Si vienes de una instalación con npm, elimina primero `node_modules` y vuelve
a instalar con pnpm para evitar que se carguen dependencias antiguas.

Si la red usa certificados del almacén del sistema, Node puede utilizarlos con
`$env:NODE_OPTIONS='--use-system-ca'` antes de instalar los paquetes.

## Comandos

| Comando | Resultado |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo en localhost:4321 |
| `pnpm test` | Compilación de producción y pruebas de regresión |
| `pnpm build` | Sitio estático en `dist/` |
| `pnpm preview` | Vista previa local de `dist/` |

Las pruebas comprueban metadatos, idiomas, CV, enlaces locales, HTML estático,
perfiles y acciones de la portada, visibilidad y orden de proyectos,
publicaciones desplegables y estilos.
La revisión de navegador cubre además menú, temas, teclado y tamaños de pantalla.

## Contenido y publicación

- `src/data/portfolio.json`: textos y datos en ambos idiomas.
- `src/pages/`: páginas públicas.
- `src/layouts/Layout.astro`: metadatos, idiomas y estructura compartida.
- `src/styles/global.css`: temas y estilos globales.
- `public/`: imágenes, CV, sitemap y verificación de Search Console.
- `firebase.json`: Firebase Hosting sirve únicamente `dist/`.

La compilación no publica el sitio. La migración conserva Firebase Hosting
estático y no requiere un adaptador de servidor.

Detalles adicionales en [DOCUMENTATION.md](DOCUMENTATION.md).
