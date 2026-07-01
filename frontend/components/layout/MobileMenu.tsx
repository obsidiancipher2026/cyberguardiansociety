'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Linkedin, Instagram, MessageCircle, Mail } from 'lucide-react';
import { navLinks, socialLinks } from '@/utils/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setVisible(true));
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    handleClose();
  }, [pathname]);

  const socialIcons = [
    { href: socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: socialLinks.instagram, icon: Instagram, label: 'Instagram' },
    { href: socialLinks.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
    { href: socialLinks.email, icon: Mail, label: 'Email' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-base/90 backdrop-blur-md z-40 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Full-screen menu */}
      <div className={`fixed inset-0 z-50 flex flex-col bg-base transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/[0.06]">
          <span className="font-display font-bold text-sm text-text-primary">Menu</span>
          <button
            onClick={handleClose}
            className="p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-text-primary" />
          </button>
        </div>

        {/* Nav links — staggered fade */}
        <nav className="flex-1 flex flex-col justify-center px-8 py-12">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClose}
                className={`block py-4 font-display text-3xl font-bold transition-all duration-300 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } ${
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                style={{ transitionDelay: visible ? `${80 + i * 50}ms` : '0ms' }}
              >
                {isActive && (
                  <span className="inline-block w-2 h-2 rounded-full bg-aurora-cyan mr-3 -translate-y-1" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom — socials + CTA */}
        <div className="px-8 pb-10 space-y-6">
          {/* Join CGS */}
          <Link
            href="/career"
            onClick={handleClose}
            className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl text-[15px] font-semibold text-text-primary border border-aurora-violet/40 bg-aurora-violet/[0.08] transition-all duration-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: visible ? `${80 + navLinks.length * 50}ms` : '0ms' }}
          >
            Join CGS
          </Link>

          {/* Social icons */}
          <div className={`flex items-center justify-center gap-3 transition-all duration-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
            style={{ transitionDelay: visible ? `${120 + navLinks.length * 50}ms` : '0ms' }}
          >
            {socialIcons.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/[0.06] text-text-muted hover:text-aurora-cyan hover:border-aurora-cyan/30 transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-4.5 h-4.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
