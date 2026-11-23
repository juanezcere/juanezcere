import {
  Atom,
  AudioLines,
  Bot,
  Box,
  Braces,
  Code2,
  Cpu,
  Layers3,
  Palette,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

interface TechnologyTagProps {
  readonly label: string;
  readonly compact?: boolean;
}

const ICONS: readonly { readonly pattern: RegExp; readonly icon: LucideIcon }[] = [
  { pattern: /^c$|c\+\+|embedded/i, icon: Cpu },
  { pattern: /react/i, icon: Atom },
  { pattern: /typescript/i, icon: Code2 },
  { pattern: /javascript/i, icon: Braces },
  { pattern: /vue/i, icon: Layers3 },
  { pattern: /vite/i, icon: Zap },
  { pattern: /tailwind|css|design/i, icon: Palette },
  { pattern: /canvas|webgl|glsl|shader/i, icon: Sparkles },
  { pattern: /audio|dsp/i, icon: AudioLines },
  { pattern: /python/i, icon: Bot },
  { pattern: /rest|api|websocket|soap/i, icon: Server },
  { pattern: /clean arch|storybook|aria/i, icon: ShieldCheck },
  { pattern: /zustand|state/i, icon: Workflow },
  { pattern: /blender|design/i, icon: Box },
];

export function TechnologyTag({ label, compact = false }: TechnologyTagProps) {
  const Icon = ICONS.find((item) => item.pattern.test(label))?.icon ?? Code2;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-glass-border bg-glass-hover ${
        compact ? 'px-2 py-0.5 text-[0.72rem]' : 'px-2.5 py-1 text-[0.78rem]'
      }`}
    >
      <Icon size={compact ? 12 : 13} aria-hidden="true" className="text-accent" />
      {label}
    </span>
  );
}
