import type { Project } from '../../../domain/entities/project';

export const PROJECTS = [
  {
    id: 'nebula-cloud-os',
    title: 'Nebula Cloud OS',
    category: 'REACT • TYPESCRIPT',
    description:
      'Sistema operativo web con gestión de ventanas translúcidas, sistema de archivos virtual y sincronización en tiempo real.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'WebSockets'],
    imageUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    featured: true,
  },
  {
    id: 'aether-analytics',
    title: 'Aether Analytics',
    category: 'FINTECH DASHBOARD',
    description:
      'Plataforma de visualización financiera de baja latencia con motores gráficos WebGL y arquitectura limpia por capas.',
    technologies: ['TypeScript', 'Canvas API', 'Tailwind', 'Clean Arch'],
    imageUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
    featured: true,
  },
  {
    id: 'vortex-audio-engine',
    title: 'Vortex Audio Engine',
    category: 'WEB AUDIO • DSP',
    description:
      'Sintetizador modular en el navegador con visualización de espectro en tiempo real y exportación de pistas.',
    technologies: ['Web Audio API', 'React', 'TypeScript', 'GLSL'],
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    featured: true,
  },
  {
    id: 'chrono-task-ai',
    title: 'ChronoTask AI',
    category: 'PRODUCTIVITY',
    description:
      'Gestor inteligente de sprints y flujos de trabajo con automatización de tareas y modo enfoque inmersivo.',
    technologies: ['Vite', 'React', 'Zustand', 'REST API'],
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    featured: false,
  },
  {
    id: 'solstice-design-system',
    title: 'Solstice Design System',
    category: 'UI LIBRARY',
    description:
      'Librería de componentes accesibles con soporte nativo para Glassmorphism, tokens semánticos y temas dinámicos.',
    technologies: ['TypeScript', 'CSS Variables', 'Storybook', 'ARIA'],
    imageUrl:
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1400&q=80',
    featured: false,
  },
] as const satisfies readonly Project[];
