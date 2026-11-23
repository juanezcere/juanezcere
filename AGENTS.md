# AGENTS.md

Portfolio personal con UI inspirada en el inicio de Xbox Series X. `README.md`
(en español) es la especificación funcional y de arquitectura; léelo antes de
implementar. Este archivo solo cubre lo que no es evidente desde el código.

## Estado actual vs. objetivo

- Las **Fases 1, 2 y 3** están implementadas: dominio puro en `src/domain/`,
  estado global en `src/application/state/` (`SettingsProvider`,
  `ThemeProvider`, `NavigationProvider`), infraestructura en
  `src/infrastructure/` (`StaticProjectRepository`, localStorage, i18next,
  reloj) y shell React en `src/presentation/` (`AppShell` + `TopBar` con
  `ProfileBanner`, `NavTabs` y `SystemControls`).
- Las vistas de Home/About/Projects/Settings siguen siendo placeholders; no
  hay dashboard, carrusel ni router todavía. Eso es Fase 4-5.
- El prototipo vanilla se conserva en `prototype/index.html` y sigue siendo la
  **fuente de verdad visual**. No lo borres ni lo edites salvo para comparar.
- React 19, TypeScript, `@vitejs/plugin-react`, i18next/react-i18next,
  Tailwind CSS v4, Framer Motion y lucide-react ya están instalados.
  ESLint/Prettier/Husky **no**; no los asumas.
- `pnpm lint` falla porque ESLint no está instalado; `pnpm test` falla por
  diseño (`exit 1`). `pnpm typecheck` sí funciona.
- No instales dependencias sin preguntar antes.
- Los 5 proyectos de `src/infrastructure/repositories/data/projects.ts` son
  datos seed copiados del prototipo (imágenes remotas de Unsplash); deben
  reemplazarse por proyectos reales cuando estén disponibles.
- El perfil (nombre, badge y avatares light/dark) vive en
  `src/infrastructure/repositories/data/profile.json`; editarlo no requiere
  tocar código. `ProfileBanner` elige el avatar según `mode`. El título
  profesional se traduce desde i18n (`profile.title`).

## Comandos

Usa siempre pnpm (pin `pnpm@12.21.0` en `package.json`), nunca npm/yarn.

```bash
pnpm install
pnpm dev        # Vite sirve index.html (entrada React)
pnpm typecheck  # tsc --noEmit
pnpm build      # tsc --noEmit && vite build
pnpm preview
```

## Arquitectura objetivo

Definida en `README.md`. Respeta esa estructura exacta (`domain` /
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
  `app-settings.v1`; los diccionarios viven en
  `src/infrastructure/i18n/locales/*.json` y deben mantener las mismas claves
  que `es.json`.
- El perfil sigue el mismo patrón: `IUserProfileRepository` en dominio,
  `StaticUserProfileRepository` en infraestructura y `ProfileProvider` en
  aplicación. Nombre/badge/avatares salen del JSON; el título sale de i18n
  (`profile.title`).
- Tailwind v4 se integra con `@tailwindcss/vite`; `global.css` define `@theme`
  mapeando los tokens de `tokens.css` a utilidades (`bg-accent`, `text-text-secondary`,
  `bg-glass`, etc.). Las clases `.glass-panel`/`.glass-popover` están en
  `@layer components` para que las utilidades Tailwind puedan sobrescribirlas.
- El reloj vive en `src/infrastructure/time/clock_service.ts` y se consume con
  el hook `src/presentation/hooks/use_clock.ts`; se actualiza cada segundo.

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
  `src/presentation/layouts/` y `src/presentation/styles/`; no hay vistas
  finales ni router. La navegación es estado (`NavigationProvider`).
- `StaticProjectRepository` aún no está cableado en `main.tsx`; se conectará
  cuando el carrusel lo consuma (Fase 4). El perfil sí está cableado vía
  `ProfileProvider`.
