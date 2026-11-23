# AGENTS.md

Portfolio personal con UI inspirada en el inicio de Xbox Series X. `README.md`
(en español) es la especificación funcional y de arquitectura; léelo antes de
implementar. Este archivo solo cubre lo que no es evidente desde el código.

## Estado actual vs. objetivo

- Las **Fases 1 y 2** están implementadas: dominio puro en `src/domain/`,
  estado global en `src/application/state/` (`SettingsProvider`,
  `ThemeProvider`, `NavigationProvider`) e infraestructura en
  `src/infrastructure/` (`StaticProjectRepository`, localStorage, i18next).
- `src/main.tsx` solo renderiza `PhaseStatus` como smoke test; **no hay UI
  real todavía**. El shell y la TopBar son la Fase 3.
- El prototipo vanilla se conserva en `prototype/index.html` y sigue siendo la
  **fuente de verdad visual**. No lo borres ni lo edites salvo para comparar.
- React 19, TypeScript, `@vitejs/plugin-react`, i18next y react-i18next ya
  están instalados. Tailwind, Framer Motion, Lucide React y
  ESLint/Prettier/Husky **no**; no los importes ni asumas que existen.
- `pnpm lint` falla porque ESLint no está instalado; `pnpm test` falla por
  diseño (`exit 1`). `pnpm typecheck` sí funciona.
- No instales dependencias sin preguntar antes.
- Los 5 proyectos de `src/infrastructure/repositories/data/projects.ts` son
  datos seed copiados del prototipo (imágenes remotas de Unsplash); deben
  reemplazarse por proyectos reales cuando estén disponibles.

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

Contratos de UI ya fijados en el prototipo (mantenerlos al migrar a React):

- Tema de acento vía `html[data-theme]` con 7 ids: `xbox-green`, `cyber-blue`,
  `crimson-red`, `solar-amber`, `neon-purple`, `emerald-mint`, `gold-edition`.
- Modo vía `html[data-mode]`: `dark` | `light`.
- Textos vía atributos `data-i18n`; idiomas: `es`, `en`, `pt`, `fr`, `de`
  (español por defecto). Persistencia de preferencias en `localStorage`.
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
  de Unsplash; necesita red. En la versión React se espera `lucide-react`
  (aún no instalado), no el CDN.
- `src/main.tsx` y `src/presentation/styles/` son el único código de
  presentación existente; no hay componentes de UI finales ni router todavía.
- `StaticProjectRepository` aún no está cableado en `main.tsx`; se conectará
  cuando el carrusel/vistas lo consuman (Fases 3-4).
