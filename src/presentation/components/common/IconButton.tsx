import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly onClick?: () => void;
  readonly active?: boolean;
  readonly pressed?: boolean;
  readonly indicator?: boolean;
  readonly size?: 'sm' | 'md';
  readonly iconSize?: number;
  readonly className?: string;
}

export function IconButton({
  icon: Icon,
  label,
  onClick,
  active = false,
  pressed,
  indicator = false,
  size = 'md',
  iconSize = 20,
  className = '',
}: IconButtonProps) {
  const sizeClass = size === 'sm' ? 'h-10 w-10' : 'h-11 w-11';
  const stateClass = active
    ? 'border-accent bg-accent-soft text-text-primary shadow-[0_0_16px_var(--accent-glow)]'
    : 'border-transparent text-text-secondary hover:bg-glass-hover hover:text-text-primary';

  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      className={`relative grid place-items-center rounded-full border transition-colors ${sizeClass} ${stateClass} ${className}`}
    >
      <Icon size={iconSize} aria-hidden="true" />
      {active && indicator ? (
        <span className="absolute -bottom-1 h-[3px] w-3.5 rounded-full bg-accent" />
      ) : null}
    </motion.button>
  );
}
