'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Linkedin,
  Instagram,
  MessageCircle,
  Mail,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react';
import { siteInfo, navLinks, socialLinks } from '@/utils/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIconsCol1 = [
    { href: socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: socialLinks.instagram, icon: Instagram, label: 'Instagram' },
    { href: socialLinks.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
    { href: socialLinks.email, icon: Mail, label: 'Email' },
  ];

  const programs = [
    { label: 'Web Development', href: '/what-cgs-do' },
    { label: 'AI & Machine Learning', href: '/what-cgs-do' },
    { label: 'Cybersecurity', href: '/what-cgs-do' },
    { label: 'Computer Science', href: '/what-cgs-do' },
    { label: 'UI & UX Design', href: '/what-cgs-do' },
    { label: 'Leadership Development', href: '/what-cgs-do' },
  ];

  return (
    <footer className="relative bg-abyss overflow-hidden">
      {/* Top cyan glow border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
      <div className="absolute top-0 left-0 w-[200px] h-px bg-electric/50 blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 - Logo & Social */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-electric/20 flex items-center justify-center border border-electric/30 overflow-hidden backdrop-blur-sm">
                <Image src="/logo.png" alt="CyberGuardiansSociety" width={32} height={32} className="object-contain" />
              </div>
              <span className="font-display font-bold text-sm tracking-tight">
                <span className="text-white-primary">Cyber</span>
                <span className="text-red">Guardians</span>
                <span className="text-electric">Society</span>
              </span>
            </Link>
            <p className="text-[13px] text-white-muted leading-relaxed max-w-xs">
              {siteInfo.description}
            </p>
            <div className="flex items-center gap-2">
              {socialIconsCol1.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                   className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-white-ghost hover:text-electric hover:border-electric/40 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm text-red mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white-muted hover:text-electric transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Our Programs */}
          <div>
            <h3 className="font-display font-semibold text-sm text-red mb-5">Our Programs</h3>
            <ul className="space-y-3">
              {programs.map((prog) => (
                <li key={prog.label} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-electric-dim shrink-0" />
                  <Link
                    href={prog.href}
                    className="text-[13px] text-white-muted hover:text-electric transition-colors duration-200"
                  >
                    {prog.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Connect */}
          <div className="space-y-5">
            <h3 className="font-display font-semibold text-sm text-red mb-5">Connect With Us</h3>
            <div className="flex items-center gap-2 text-[13px] text-white-muted">
              <Mail className="w-3.5 h-3.5 text-electric" />
              <a href="mailto:cyberguardianssociety@gmail.com" className="hover:text-electric transition-colors">
                cyberguardianssociety@gmail.com
              </a>
            </div>
            <div className="space-y-3 pt-2">
              <Link href="/career">
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-electric text-void text-[13px] font-semibold hover:brightness-110 transition-all duration-200 hover:-translate-y-0.5">
                  <HeartHandshake className="w-4 h-4" />
                  Volunteer With Us
                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-mono text-white-ghost tracking-wider">
            &copy; {currentYear} {siteInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-[11px] font-mono text-white-ghost hover:text-white-muted transition-colors tracking-wider"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] font-mono text-white-ghost hover:text-white-muted transition-colors tracking-wider"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-[11px] font-mono text-white-ghost hover:text-white-muted transition-colors tracking-wider"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
