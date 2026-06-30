'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  image,
  imageAlt = '',
  title,
  subtitle,
  hoverable = true,
  onClick,
}: CardProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`bg-surface-light-primary dark:bg-surface-dark-primary border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 ease-out ${
        hoverable ? 'hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]' : ''
      } ${onClick ? 'w-full text-left' : ''} ${className}`}
    >
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        {title && (
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)] mb-3">{subtitle}</p>
        )}
        {children}
      </div>
    </Component>
  );
}
