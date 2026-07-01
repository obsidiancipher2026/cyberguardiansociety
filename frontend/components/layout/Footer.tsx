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
    <>
      {/* Closing CTA Band — one strong final moment */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-aurora-subtle" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-aurora-violet/10 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
          <span className="mono-label text-aurora-cyan">Join the mission</span>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold mt-4 mb-5 leading-tight">
            Ready to protect the{' '}
            <span className="gradient-text">digital frontier</span>?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-[480px] mx-auto">
            Become part of a community building the next generation of cybersecurity defenders.
          </p>
          <Link
            href="/career"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-semibold text-text-primary border border-aurora-violet/40 bg-aurora-violet/[0.08] hover:bg-aurora-violet/[0.15] hover:border-aurora-violet/60 transition-all duration-200"
          >
            <HeartHandshake className="w-4 h-4" />
            Apply to Volunteer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-base overflow-hidden">
        {/* Aurora gradient hairline top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-aurora opacity-30" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1 - Logo & Social */}
            <div className="space-y-5">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.08] overflow-hidden bg-surface/50">
                  <Image src="/logo.png" alt="CGS" width={36} height={36} className="object-contain" />
                </div>
                <span className="font-display font-bold text-sm tracking-tight">
                  <span className="text-text-primary">Cyber</span>
                  <span className="text-aurora-violet">Guardians</span>
                  <span className="text-text-secondary">Society</span>
                </span>
              </Link>
              <p className="text-[13px] text-text-secondary leading-relaxed max-w-xs">
                {siteInfo.description}
              </p>
              {/* Square social icons with hairline border */}
              <div className="flex items-center gap-2">
                {socialIconsCol1.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/[0.06] text-text-muted hover:text-aurora-cyan hover:border-aurora-cyan/30 hover:shadow-glow-cyan transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h3 className="mono-label text-text-muted mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-text-secondary hover:text-aurora-cyan transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Our Programs */}
            <div>
              <h3 className="mono-label text-text-muted mb-5">Our Programs</h3>
              <ul className="space-y-3">
                {programs.map((prog) => (
                  <li key={prog.label} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-aurora-violet/60 shrink-0" />
                    <Link
                      href={prog.href}
                      className="text-[13px] text-text-secondary hover:text-aurora-cyan transition-colors duration-200"
                    >
                      {prog.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Connect */}
            <div className="space-y-5">
              <h3 className="mono-label text-text-muted mb-5">Connect With Us</h3>
              <div className="flex items-center gap-2 text-[13px] text-text-secondary">
                <Mail className="w-3.5 h-3.5 text-aurora-violet" />
                <a href="mailto:cyberguardianssociety@gmail.com" className="hover:text-aurora-cyan transition-colors">
                  cyberguardianssociety@gmail.com
                </a>
              </div>
              <div className="space-y-3 pt-2">
                <Link href="/career">
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-aurora-violet/30 bg-aurora-violet/[0.06] text-text-primary text-[13px] font-semibold hover:bg-aurora-violet/[0.12] hover:border-aurora-violet/50 transition-all duration-200 hover:-translate-y-0.5">
                    <HeartHandshake className="w-4 h-4 text-aurora-violet" />
                    Volunteer With Us
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] font-mono text-text-muted tracking-wider">
              &copy; {currentYear} {siteInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacy"
                className="text-[11px] font-mono text-text-muted hover:text-text-secondary transition-colors tracking-wider"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[11px] font-mono text-text-muted hover:text-text-secondary transition-colors tracking-wider"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-[11px] font-mono text-text-muted hover:text-text-secondary transition-colors tracking-wider"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
