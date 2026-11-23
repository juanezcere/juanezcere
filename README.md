## Hola 👋

# Soy Juan Esteban García Cardona.
<div align="center">

<img src="https://github.com/juanezcere/juanezcere.github.io/blob/master/light_photo.jpg?raw=true#gh-light-mode-only" alt="Foto del desarrollador con fondo oscuro" width="200">
<img src="https://github.com/juanezcere/juanezcere.github.io/blob/master/dark_photo.jpg?raw=true#gh-dark-mode-only" alt="Foto del desarrollador con fondo claro" width="200">

</div>

✨ Ingeniero electrónico con amplia experiencia en desarrollo y diseño de hardware y software, con un enfoque especial en sistemas embebidos y algoritmos.

⚡ Mi versatilidad se basa en el dominio de diversos lenguajes de programación como Python, C, C++ y Javascript, así como en la creación de scripts y el desarrollo de APIs.
Además, poseo una sólida experiencia en el desarrollo frontend, utilizando HTML, CSS y JavaScript, y trabajando con frameworks como Vue.js y React.

💻 Mi pasión por la programación se refleja en mi capacidad para desarrollar soluciones integrales de software, incluyendo pequeños videojuegos, y mi habilidad para trabajar con tecnologías web, como API REST y SOAP. Apasionado por la innovación y la investigación, lo que me permite mantenerme actualizado en las últimas tendencias tecnológicas. Mi capacidad de aprendizaje y trabajo en equipo me permiten adaptarme fácilmente a nuevos entornos y colaborar eficientemente en proyectos complejos.

🌱 Actualmente estoy trabajando con [PiMedica S.A.](https://pimedica.com/).

💼 Con mis conocimientos he desarrollado en empresas como
<div align="center">

[<img src="https://github.com/juanezcere/juanezcere.github.io/blob/master/Logo-pimedica-f.png?raw=true" alt="Logo de PiMedica" width="70px">](https://pimedica.com/) &nbsp; |  &nbsp; [<img src="https://github.com/juanezcere/juanezcere.github.io/blob/master/k2k_brand.png?raw=true" alt="Logo de K2K Soluciones" width="70px">](https://k2ksoluciones.com/) &nbsp; |  &nbsp; [<img src="https://github.com/juanezcere/juanezcere.github.io/blob/master/taclla_brand.png?raw=true" alt="Logo de Taclla" width="70px">](https://taclla.com/)

</div>

### Contacto

<div align="center">

💬 [Número telefónico]() &nbsp; |  &nbsp; 📫 [Correo electrónico](mailto:juanezcere@gmail.com)

</div>

### Redes sociales

<div align="center">

📄 [Page](https://juanezcere.github.io/) &nbsp; |  &nbsp; 📂 [GitHub](https://github.com/juanezcere) &nbsp; |  &nbsp; 🔭 [LinkedIn](https://www.linkedin.com/in/juan-esteban-garcia-cardona-221222238/) &nbsp; |  &nbsp; 👨‍💻 [Youtube](https://www.youtube.com/@MrJuanezzz)

</div>

## Portfolio

Aplicación web interactiva de portafolio profesional inspirada en la interfaz de usuario (UI) de inicio de Xbox Series X. El sistema transforma la experiencia de navegación tradicional en un dashboard dinámico donde cada proyecto se presenta como una tarjeta interactiva (tipo game tile) que modifica en tiempo real el fondo panorámico (Hero Background) al recibir el foco, integrando personalización visual completa (temas de acento, modo claro/oscuro) e internacionalización.

### Stack Tecnológico

- Core & Bundler: React 19 + TypeScript (modo estricto) + Vite.
- Estilos & UI: Tailwind CSS (mediante variables CSS nativas para el cambio dinámico de los 7 colores de acento y modos claro/oscuro) + Framer Motion (para transiciones fluidas tipo consola, escalado de tarjetas y cambios de fondo).
- Iconografía: Lucide React (para las pestañas centrales, controles superiores e indicadores de sistema).Internacionalización (i18n): i18next + react-i18next (soporte estructurado para 5 idiomas con detección y persistencia).
- Gestión de Estado & Persistencia: React Context API (para preferencias de usuario: tema, modo, idioma y proyecto activo) sincronizado con localStorage.
- Calidad de Código: TypeScript estricto y `pnpm typecheck`; ESLint + Prettier + Husky quedan pendientes.
- Arquitectura por Capas y Estructura de Carpetas

El proyecto sigue una Arquitectura por Capas desacoplada y orientada a los principios SOLID, separando estrictamente la lógica de dominio, la obtención/adaptación de datos y la presentación visual:

```
src/
├── domain/                  # Capa 1: Reglas de negocio puras y contratos (sin dependencias de React)
│   ├── entities/            # Interfaces y tipos (Project, UserProfile, ThemeConfig, Language)
│   ├── repositories/        # Contratos/Interfaces de acceso a datos (IProjectRepository)
│   └── constants/           # Configuraciones inmutables (7 colores de acento, 5 idiomas soportados)
│
├── application/             # Capa 2: Casos de uso y lógica de orquestación
│   ├── use_cases/           # Lógica específica (ej. filter_projects, get_featured_projects)
│   └── state/               # Stores o Contextos globales (ThemeContext, SettingsContext)
│
├── infrastructure/          # Capa 3: Implementaciones técnicas y fuentes de datos
│   ├── repositories/        # Implementación concreta (JsonProjectRepository / ApiRepository)
│   ├── storage/             # Adaptador de persistencia (LocalStorageService)
│   ├── i18n/                # Configuración; diccionarios en public/locales (es, en, pt, fr, de)
│   └── time/                # Servicio de reloj en tiempo real
│
├── presentation/            # Capa 4: Interfaz de usuario (Componentes y Vistas)
│   ├── components/
│   │   ├── common/          # Átomos reutilizables (IconButton, AccentBorder, GlassCard)
│   │   ├── top_bar/         # Barra superior dividida en sus 3 zonas:
│   │   │   ├── ProfileBanner.tsx      # Izquierda: Foto, nombre y título profesional
│   │   │   ├── NavTabs.tsx            # Centro: 4 íconos (Home, Info, Proyectos, Ajustes)
│   │   │   └── SystemControls.tsx     # Derecha: Reloj + 3 íconos (Tema, Modo, Idioma)
│   │   ├── dashboard/       # Componentes del escenario principal:
│   │   │   ├── DynamicBackdrop.tsx    # Fondo inmersivo reactivo al proyecto seleccionado
│   │   │   ├── ProjectCarousel.tsx    # Fila horizontal de tarjetas (activa ampliada + secundarias)
│   │   │   └── QuickAccessRow.tsx     # Fila inferior de accesos directos / destacados
│   │   └── projects/        # ProjectModal: detalle con teclado, foco y enlaces opcionales
│   ├── views/               # Vistas correspondientes a cada pestaña (HomeView, AboutView, ProjectsView, SettingsView)
│   └── layouts/             # Shell principal con la barra superior fija y contenedor dinámico
│
└── main.tsx                 # Punto de entrada e inyección de dependencias
```

### Datos editables

El contenido y los diccionarios viven en `public/` para poder editarlos sin
tocar código:

```
public/
├── images/                  # Avatares e imágenes de proyectos (sin red al renderizar)
│   ├── profile/             # light.jpg y dark.jpg
│   └── projects/            # Una imagen por id de proyecto
├── profile.json              # Perfil con translations es/en/pt/fr/de
├── projects.json            # Proyectos con translations es/en/pt/fr/de
└── locales/                 # Diccionarios de interfaz (es, en, pt, fr, de)
```

Cada proyecto de `projects.json` conserva datos compartidos (`id`,
`technologies`, `imageUrl`, `featured`, `year` y `links` opcionales) y agrupa
`title`, `category` y `description` dentro de `translations`. En `profile.json`,
el nombre, el badge, los avatares, `stack`, `email` y `socialLinks` son
compartidos, mientras que `title` y `bio` se agrupan por idioma dentro de
`translations`. El idioma activo se resuelve con fallback a español en ambos
casos. Las rutas de `avatarUrls` e `imageUrl` apuntan a archivos dentro de
`public/images/`, por lo que la interfaz no depende de imágenes remotas.

### Puesta en Marcha

Una vez inicializado el repositorio, el flujo estándar de ejecución y validación local será:
Instalación de dependencias:

```bash
pnpm install
```

Ejecución en entorno de desarrollo:

```bash
pnpm dev
```

Verificación de tipos y linter:

```bash
pnpm lint
```

Compilación para producción:

```bash
pnpm build
```

### Metodología de Desarrollo
Para garantizar un código limpio, escalable y fiel a los principios SOLID, el desarrollo se dividirá en 5 fases incrementales:

Fase 1: Definición del Dominio y Contratos (Principio de Inversión de Dependencias - DIP)

- Definir las interfaces de las entidades (Project, ThemeAccent, AppSettings) y los puertos (IProjectRepository) antes de tocar cualquier componente visual.
- Configurar las variables CSS raíz (--accent-color, --bg-surface, --text-primary) para soportar dinámicamente los 7 colores y los 2 modos sin re-renderizados innecesarios.

Fase 2: Capa de Infraestructura y Estado Global (Responsabilidad Única - SRP)

- Implementar el repositorio de proyectos (datos estructurados en TypeScript/JSON), el servicio de localStorage para recordar la configuración del usuario y los archivos de traducción para los 5 idiomas.
- Crear los proveedores de estado (ThemeProvider, NavigationProvider).

Fase 3: Construcción del Shell y Barra Superior (TopBar)

- Desarrollar el layout base respetando la distribución espacial del dashboard:
    - Izquierda: Banner compacto con avatar circular, nombre y título.
    - Centro: Navegación por íconos con indicador visual activo.
    - Derecha: Reloj sincronizado al minuto y menús desplegables/cíclicos para los 7 temas, modo claro/oscuro y 5 idiomas.

Fase 4: Escenario Principal e Interactividad del Carrusel (Abierto/Cerrado - OCP)

- Construir el ProjectCarousel donde la tarjeta activa escala ligeramente con borde luminoso del color de acento y dispara la actualización suave del DynamicBackdrop.
- Implementar soporte de navegación tanto por ratón/táctil como por teclado (flechas izquierda/derecha) para emular la experiencia nativa de consola.

Fase 5: Vistas Secundarias, Pulido y Optimización

- Implementar las vistas de detalle de información personal, catálogo completo de proyectos con filtros por tecnología y panel de configuración avanzado.
- Auditar rendimiento (lazy loading de imágenes de fondo en alta resolución) y accesibilidad (aria-labels en todos los botones de íconos).

Estado: Fase 5 implementada. `AboutView` consume perfil/stack/contacto desde
`public/profile.json`; `ProjectsView` aplica filtros multiselección por
tecnología (OR); `SettingsView` refleja tema, modo e idioma y restablece
preferencias; `ProjectModal` se abre desde la tarjeta activa (clic o `Enter`),
desde "Destacado" y desde el catálogo, con cierre por `Escape`, backdrop y
botón, además de foco atrapado y restaurado.
