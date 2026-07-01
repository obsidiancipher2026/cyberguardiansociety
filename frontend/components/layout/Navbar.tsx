'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import MobileMenu from '@/components/layout/MobileMenu';
import { navLinks, socialLinks } from '@/utils/constants';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/animate-ui/primitives/animate/tooltip';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    <TooltipProvider>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-nav scrolled'
            : 'glass-nav'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-electric/20 flex items-center justify-center border border-electric/30 overflow-hidden backdrop-blur-sm">
                <Image src="/logo.png" alt="CyberGuardiansSociety" width={32} height={32} className="object-contain" />
              </div>
              <span className="font-display font-bold text-base tracking-tight">
                <span className="text-white-primary">Cyber</span>
                <span className="text-red">Guardians</span>
                <span className="text-electric">Society</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-white-primary'
                        : 'text-white-muted hover:text-white-primary'
                    }`}
                  >
                    {link.label}
                      {isActive && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-electric rounded-full" />
                        )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2">
                {socialIcons.map((social) => (
                  <Tooltip key={social.label}>
                    <TooltipTrigger asChild>
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-white-muted hover:text-electric hover:bg-surface-raised transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-4 h-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{social.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/career"
                    className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2 rounded-md border border-electric text-electric text-[13px] font-medium hover:bg-electric hover:text-void transition-all duration-200"
                    style={{
                      animation: 'glow-pulse 4s ease-in-out infinite',
                    }}
                  >
                    Join CGS
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Apply Now</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setMobileOpen(true)}
                    className="lg:hidden p-2 rounded-lg hover:bg-surface-raised transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-5 h-5 text-white-primary" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Menu</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}
    </TooltipProvider>
  );
}
