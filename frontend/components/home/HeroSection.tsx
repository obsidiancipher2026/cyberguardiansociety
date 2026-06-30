'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { siteInfo, socialLinks } from '@/utils/constants';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background: dark base with animated gradient orbs */}
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 bg-gradient-to-br from-void via-abyss to-void" />

      {/* Animated gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-core/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-red-threat/5 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-purple-glow/5 blur-[80px] animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Scan line overlay */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Terminal badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border border-cyan-core/20 bg-cyan-ghost/50 backdrop-blur-sm mb-6 transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-core tracking-[0.2em] uppercase">
                {siteInfo.tagline}
              </span>
            </div>

            {/* Main headline */}
            <h1
              className={`font-display font-extrabold leading-[1.05] mb-6 transition-all duration-700 delay-100 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              <span className="text-white-primary">Where </span>
              <span className="text-red-threat">Cyber</span>
              <span className="text-white-primary"> Defense</span>
              <br />
              <span className="text-white-primary">Meets </span>
              <span className="text-cyan-core">Community</span>
            </h1>

            {/* Description */}
            <p
              className={`text-white-muted max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ fontSize: 'clamp(14px, 1.5vw, 17px)' }}
            >
              A global network of cybersecurity enthusiasts, professionals, and learners collaborating to secure the digital frontier through shared knowledge and collective defense.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-3 mb-10 transition-all duration-700 delay-300 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link
                href="/career"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-red-threat to-red-threat/80 text-white-primary text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(239,68,68,0.3)] hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Join the Movement</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/what-cgs-do"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-white-muted text-sm font-medium hover:border-cyan-core/50 hover:text-cyan-core transition-all duration-300"
              >
                Explore Programs
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>


          </div>

          {/* Right: Logo */}
          <div
            className={`flex-1 flex items-center justify-center -mt-12 transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Image
              src="/logo.png"
              alt={siteInfo.name}
              width={200}
              height={200}
              className="object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.15)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-abyss to-transparent pointer-events-none" />
    </section>
  );
}
