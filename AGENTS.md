# AGENTS.md

Portfolio personal con UI inspirada en el inicio de Xbox Series X. `ABOUT.md`
(en español) es la especificación funcional y de arquitectura; léelo antes de
implementar. Este archivo solo cubre lo que no es evidente desde el código.

## Estado actual vs. objetivo

- Las **Fases 1 a 5** están implementadas: dominio puro en `src/domain/`, estado
  global en `src/application/state/` (`SettingsProvider`, `ThemeProvider`,
  `NavigationProvider`, `ProfileProvider`, `ProjectsProvider`,
  `ProjectModalProvider`), infraestructura en `src/infrastructure/`
  (repositorios JSON, localStorage, i18next, reloj) y shell React en
  `src/presentation/`.
- `TopBar` tiene `ProfileBanner`, `NavTabs` y `SystemControls`; `HomeView`
  incluye dashboard, fondo dinámico, carrusel y accesos rápidos. Las vistas
  About/Projects/Settings son definitivas y `ProjectModal` muestra el detalle
  del proyecto. No hay router: la navegación es estado (`NavigationProvider`).
- El prototipo vanilla se conserva en `prototype/index.html` y sigue siendo la
  **fuente de verdad visual**. No lo borres ni lo edites salvo para comparar.
- React 19, TypeScript, `@vitejs/plugin-react`, i18next/react-i18next,
  Tailwind CSS v4, Framer Motion y lucide-react ya están instalados.
  ESLint/Prettier/Husky **no**; no los asumas.
- `pnpm lint` falla porque ESLint no está instalado; `pnpm test` falla por
  diseño (`exit 1`). `pnpm type-check` sí funciona.
- No instales dependencias sin preguntar antes.
- Los 5 proyectos seed están en `public/projects.json`; reemplázalos por
  proyectos reales cuando estén disponibles. Cada proyecto guarda
  `translations` para `es/en/pt/fr/de`, su `imageUrl` apunta a
  `public/images/projects/` y acepta `repositoryUrl`/`demoUrl` HTTP(S)
  opcionales mostrados en el modal.
- La hoja de vida se sirve desde `public/cv.pdf`; el botón de `AboutView`
  apunta a `/cv.pdf` y el archivo real debe colocarse ahí sin tocar código.
- El perfil (nombre, badge, avatares light/dark, `stack`, `email` y
  `socialLinks`) vive en `public/profile.json`; editarlo no requiere tocar
  código. Los avatares están en `public/images/profile/` y `ProfileBanner`
  elige el avatar según `mode`. El título y el bio están en `translations` por
  idioma dentro del mismo JSON, con fallback a español.
- Los diccionarios i18n están en `public/locales/{es,en,pt,fr,de}.json` y se
  cargan con `fetch` antes de renderizar. Deben mantener las mismas claves que
  `es.json`.

## Comandos

Usa siempre pnpm (pin `pnpm@12.21.0` en `package.json`), nunca npm/yarn.

```bash
pnpm install
pnpm dev
pnpm type-check
pnpm lint
pnpm build
pnpm preview
```

## Arquitectura objetivo

Definida en `ABOUT.md`. Respeta esa estructura exacta (`domain` /
`application` / `infrastructure` / `presentation`, `main.tsx` como composition
root) y la dirección de dependencias:

- `presentation → application → domain`; `infrastructure` implementa los
  contratos definidos en `domain`.
- `domain` debe ser puro: sin imports de React ni de infraestructura.
- `SettingsProvider` es la única fuente de verdad de `AppSettings` y persiste
  en localStorage; `ThemeProvider` deriva tema/modo de él y
  `NavigationProvider` solo maneja la vista activa. El idioma se sincroniza
  con i18next mediante el callback inyectado en `main.tsx`.
- La persistencia usa `LocalStorageService` (namespace `juanezcere`) y la clave
  `app-settings.v1`; los diccionarios viven en `public/locales/*.json` y se
  cargan por `fetch` en `main.tsx` junto con `public/profile.json` y
  `public/projects.json`.
- El perfil sigue el mismo patrón: `IUserProfileRepository` en dominio,
  `JsonUserProfileRepository` en infraestructura y `ProfileProvider` en
  aplicación. Nombre/badge/avatares salen del JSON; título y bio se localizan
  con `application/use_cases/localize_profile.ts` según `settings.language`.
- Los proyectos usan `IProjectRepository` / `JsonProjectRepository`; el dominio
  guarda `translations` por idioma y el caso de uso
  `application/use_cases/localize_project.ts` resuelve el idioma activo con
  fallback a español. `ProjectsProvider` expone los proyectos ya localizados.
- El proyecto activo se persiste como `activeProjectId` dentro de `AppSettings`
  y `HomeView` lo mantiene sincronizado con el carrusel.
- `ProjectModalProvider` guarda solo el `selectedProjectId` en memoria;
  `ProjectModal` resuelve el proyecto localizado desde `ProjectsProvider` y
  gestiona `Escape`, backdrop, foco y scroll lock. `SettingsView` restablece
  tema, modo, idioma y `activeProjectId` a `DEFAULT_APP_SETTINGS`.
- Tailwind v4 se integra con `@tailwindcss/vite`; `global.css` define `@theme`
  mapeando los tokens de `tokens.css` a utilidades (`bg-accent`, `text-text-secondary`,
  `bg-glass`, etc.). Las clases `.glass-panel`/`.glass-popover` están en
  `@layer components` para que las utilidades Tailwind puedan sobrescribirlas.
- El reloj vive en `src/infrastructure/time/clock_service.ts` y se consume con
  el hook `src/presentation/hooks/use_clock.ts`; usa formato de 24 horas, se
  actualiza cada segundo y su tooltip muestra la fecha localizada.
- `TechnologyTag` centraliza las etiquetas de stack/tecnologías con ícono
  lucide; `LANGUAGES` incluye la bandera mostrada en el menú y en `SettingsView`.

Contratos de UI ya fijados en el prototipo (mantenerlos al migrar a React):

- Tema de acento vía `html[data-theme]` con 7 ids: `xbox-green`, `cyber-blue`,
  `crimson-red`, `solar-amber`, `neon-purple`, `emerald-mint`, `gold-edition`.
- Modo vía `html[data-mode]`: `dark` | `light`.
- Textos vía i18next/`useTranslation` en React (el prototipo usaba
  `data-i18n`); idiomas: `es`, `en`, `pt`, `fr`, `de` (español por defecto).
  Persistencia de preferencias en `localStorage`.
- Usa variables CSS (`--accent`, `--bg-base`, `--glass-*`, etc.), no colores
  hardcodeados.
- Layout superior: perfil a la izquierda, tabs de íconos al centro
  (`home`, `about`, `projects`, `settings`), reloj + tema/modo/idioma a la
  derecha.

## Convenciones

- Documentación y copy de UI en español; identificadores de código en inglés.
- Ramas: `main` (producción), `qa`, `dev`. Trabaja en `{category}/{name}`
  (`feat/`, `fix/`, `refactor/`, `docs/`, `chore/`). Flujo
  `feat/* → dev → qa → main`; nunca push/commit directo a esas tres ramas.
- Commits: Conventional Commits con prefijo `(AI)`, en inglés (regla del
  equipo; el historial previo aún no la sigue).
- Tests futuros en `tests/[module].test.*`, cobertura mínima 80 % (aún sin
  framework configurado).

## Gotchas

- `.gitignore` excluye `.github/` y `scripts/`: la CI y los scripts de merge no
  están versionados. No los edites esperando que se commiteen.
- `.github/workflows/ci.yaml` es de Python (`uv`/`ruff`/`mypy`/`pytest`) y no
  valida el frontend. No lo uses como fuente de verdad de los comandos JS.
- `scripts/merge_*.sh` están rotos (`git merge dev` sobre `dev`, `git push dev`
  sin remoto/refspec). No los ejecutes sin corregirlos.
- `prototype/index.html` carga Lucide desde el CDN de unpkg e imágenes remotas
  de Unsplash; necesita red. La versión React usa `lucide-react` local.
- La UI existente está en `src/presentation/components/top_bar/`,
  `src/presentation/components/dashboard/`,
  `src/presentation/components/projects/`, `src/presentation/views/`,
  `src/presentation/layouts/` y `src/presentation/styles/`; no hay router. La
  navegación es estado (`NavigationProvider`).
- `HomeView` consume `ProjectsProvider` y mantiene el foco del carrusel con
  flechas `←/→`; `Enter` y la tarjeta activa abren el modal. El fondo y las
  tarjetas usan `framer-motion`.
