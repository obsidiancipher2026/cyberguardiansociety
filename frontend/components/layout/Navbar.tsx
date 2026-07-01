'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import MobileMenu from '@/components/layout/MobileMenu';
import { navLinks, socialLinks } from '@/utils/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const socialIcons = [
    { href: socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: socialLinks.instagram, icon: Instagram, label: 'Instagram' },
    { href: socialLinks.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-nav scrolled'
            : 'glass-nav'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.08] overflow-hidden bg-surface/50">
                <Image src="/logo.png" alt="CGS" width={36} height={36} className="object-contain" />
              </div>
              <span className="font-display font-bold text-[15px] tracking-tight hidden sm:block">
                <span className="text-text-primary">Cyber</span>
                <span className="text-aurora-violet">Guardians</span>
                <span className="text-text-secondary">Society</span>
              </span>
            </Link>

            {/* Desktop Nav — left-weighted, not edge-to-edge */}
            <nav className="hidden lg:flex items-center gap-1 ml-12">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-gradient-aurora" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Social Icons — hidden on mobile */}
              <div className="hidden lg:flex items-center gap-1">
                {socialIcons.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg text-text-muted hover:text-aurora-cyan hover:bg-white/[0.04] transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Join CGS — solid aurora-violet */}
              <Link
                href="/career"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white rounded-lg bg-aurora-violet hover:bg-aurora-violet/90 transition-all duration-200"
              >
                Join CGS
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-text-primary" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}
