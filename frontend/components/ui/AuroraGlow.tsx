'use client';

interface AuroraGlowProps {
  color?: 'violet' | 'cyan' | 'emerald' | 'mixed';
  size?: number;
  className?: string;
}

export default function AuroraGlow({ color = 'mixed', size = 600, className = '' }: AuroraGlowProps) {
  const gradients: Record<string, string> = {
    violet: 'radial-gradient(circle, rgba(124,92,255,0.2) 0%, transparent 70%)',
    cyan: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
    emerald: 'radial-gradient(circle, rgba(52,232,158,0.12) 0%, transparent 70%)',
    mixed: 'radial-gradient(circle, rgba(124,92,255,0.15) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)',
  };

  return (
    <div
      className={`aurora-glow ${className}`}
      style={{
        width: size,
        height: size,
        background: gradients[color],
      }}
    />
  );
}
