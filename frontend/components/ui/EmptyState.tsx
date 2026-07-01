'use client';

import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  variant?: 'default' | 'radar' | 'terminal' | 'scan';
  className?: string;
}

export default function EmptyState({ icon, title, description, action, variant = 'default', className = '' }: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`}>
      {variant === 'radar' && <RadarAnimation />}
      {variant === 'terminal' && <TerminalAnimation />}
      {variant === 'scan' && <ScanAnimation />}
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

function RadarAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
        <div className="absolute inset-0 rounded-full border border-white/5" />
        <div className="absolute inset-[30px] rounded-full border border-white/5" />
        <div className="absolute inset-[60px] rounded-full border border-white/5" />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(124,92,255,0.15) 30deg, transparent 60deg)',
            animation: 'radar-sweep 3s linear infinite',
          }}
        />
      </div>
    </div>
  );
}

function TerminalAnimation() {
  const lines = [
    'Initializing threat feeds...',
    'Compiling resource library...',
    'Syncing tool database...',
    'Loading guide content...',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div className="absolute top-4 left-4 right-4 font-mono text-[11px] text-aurora-cyan/40 space-y-1">
        {lines.map((line, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{ animationDelay: `${i * 1.5}s`, animationDuration: '3s' }}
          >
            <span className="text-aurora-violet/50">$</span> {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScanAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-full h-[2px] opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--aurora-violet), var(--aurora-cyan), transparent)',
          animation: 'scan-line 4s linear infinite',
        }}
      />
    </div>
  );
}
