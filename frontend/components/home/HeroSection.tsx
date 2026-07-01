'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { siteInfo } from '@/utils/constants';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.setProperty('--x', `${x}px`);
      el.style.setProperty('--y', `${y}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-void">
      <div
        ref={ref}
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: 'translate(var(--x, 0px), var(--y, 0px))',
        }}
      >
        <div className="absolute top-[-15%] left-[-8%] w-[700px] h-[700px] rounded-full bg-electric/5 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-8%] w-[600px] h-[600px] rounded-full bg-red/5 blur-[120px]" />
        <div className="absolute top-[30%] right-[15%] w-[400px] h-[400px] rounded-full bg-cyan/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-8">
              <Shield className="w-3.5 h-3.5 text-electric" />
              <span className="text-xs font-medium text-electric">{siteInfo.tagline}</span>
            </div>

            <h1 className="font-display font-extrabold leading-[1.05] mb-6 text-white-primary" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              Securing the{' '}
              <span className="text-electric">Digital</span>{' '}
              Frontier,{' '}
              <br className="hidden sm:block" />
              Together as{' '}
              <span className="text-red">One</span>
            </h1>

            <p className="text-text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10 text-[16px]">
              A global community of cybersecurity professionals, enthusiasts, and learners collaborating to build a safer digital world through shared knowledge and collective defense.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/career"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-electric text-white text-sm font-semibold shadow-btn hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
              >
                Join the Movement
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/what-cgs-do"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-text-muted text-sm font-medium hover:border-electric/50 hover:text-electric transition-all duration-200"
              >
                Explore Programs
              </Link>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full glass animate-glow-pulse" />
              <div className="absolute inset-4 rounded-full glass flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-electric/20 border border-electric/30 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-electric" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  );
}
