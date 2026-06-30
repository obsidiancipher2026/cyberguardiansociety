'use client';

import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'accent' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const variantStyles: Record<string, string> = {
  default: 'bg-[var(--cyan-core)] text-white hover:brightness-110',
  accent: 'bg-gradient-to-r from-[var(--cyan-core)] to-[var(--red-threat)] text-white hover:brightness-110',
  destructive: 'border border-[var(--border-red-strong)] text-[var(--red-threat)] hover:bg-[rgba(239,68,68,0.1)]',
  outline: 'border border-[var(--border)] text-[var(--white-muted)] hover:border-[var(--cyan-core)] hover:text-[var(--cyan-core)]',
  secondary: 'bg-[var(--surface-raised)] text-[var(--white-muted)] border border-[var(--border)] hover:text-[var(--white-primary)]',
  ghost: 'text-[var(--white-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--white-primary)]',
  link: 'text-[var(--cyan-core)] hover:underline underline-offset-4',
};

const sizeStyles: Record<string, string> = {
  default: 'px-5 py-2.5 text-sm',
  sm: 'px-3 py-1.5 text-xs',
  lg: 'px-7 py-3.5 text-base',
  icon: 'p-2',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'default',
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-[1.03] enabled:active:scale-[0.97]';

    return (
      <button
        ref={ref}
        className={`${base} ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.default} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
