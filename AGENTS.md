# AGENTS.md

Portfolio personal con UI inspirada en el inicio de Xbox Series X. `README.md`
(en español) es la especificación funcional y de arquitectura; léelo antes de
implementar. Este archivo solo cubre lo que no es evidente desde el código.

## Estado actual vs. objetivo

- La **Fase 1** está implementada: dominio puro en `src/domain/` (entidades,
  puerto `IProjectRepository`, constantes de 7 temas y 5 idiomas) y tokens CSS
  en `src/presentation/styles/tokens.css`. `src/main.tsx` solo renderiza un
  placeholder de verificación; aún no hay UI real.
- El prototipo vanilla se conserva en `prototype/index.html` y sigue siendo la
  **fuente de verdad visual**. No lo borres ni lo edites salvo para comparar.
- React 19, TypeScript y `@vitejs/plugin-react` ya están instalados. Tailwind,
  Framer Motion, Lucide React, i18next, ESLint/Prettier/Husky **no** están;
  no los importes ni asumas que existen.
- `pnpm lint` falla porque ESLint no está instalado; `pnpm test` falla por
  diseño (`exit 1`). `pnpm typecheck` sí funciona.
- No instales dependencias sin preguntar antes.

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
  presentación existente; no hay componentes ni router todavía.
