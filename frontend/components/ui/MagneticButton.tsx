'use client';

import { useRef, MouseEvent, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function MagneticButton({ children, className = '', strength = 0.3, onClick, href, type = 'button', disabled }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  const sharedProps = {
    className: `btn-gradient-border transition-transform duration-200 ease-out ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <a href={href} {...(sharedProps as any)}>
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as any}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...(sharedProps as any)}
    >
      {children}
    </button>
  );
}
