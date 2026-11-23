import type { ReactNode } from 'react';

interface GlassPanelProps {
  readonly className?: string;
  readonly children: ReactNode;
}

export function GlassPanel({ className = '', children }: GlassPanelProps) {
  return <div className={`glass-panel ${className}`}>{children}</div>;
}
