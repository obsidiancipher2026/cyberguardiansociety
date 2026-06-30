'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { X, Sparkles } from 'lucide-react';
import { navLinks } from '@/utils/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 bottom-0 w-72 glass-strong border-l border-[var(--border-color)] z-50 shadow-xl animate-slideInRight">
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 overflow-hidden rounded">
              <Image src="/logo.png" alt="CGS" width={24} height={24} className="object-contain" />
            </div>
            <span className="font-bold text-sm text-[var(--text-primary)]">
              Menu
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-[var(--text-primary)]" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-surface-tertiary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/career"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-red)] text-white mt-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Join CGS
          </Link>
        </nav>
      </div>
    </>
  );
}
