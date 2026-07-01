'use client';

import { Terminal, Trophy, Users as UsersIcon, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const ctfs = [
  {
    title: 'CGS Capture The Flag',
    description: 'Bi-weekly CTF challenges covering web exploitation, cryptography, reverse engineering, and forensics.',
    difficulty: 'All Levels',
    participants: '50+',
    rating: 4.8,
    flagship: true,
  },
  {
    title: 'Bug Bounty Simulation',
    description: 'Practice real-world bug hunting in a controlled environment.',
    difficulty: 'Intermediate',
    participants: '30+',
    rating: 4.6,
    flagship: false,
  },
  {
    title: 'Annual Cyber Championship',
    description: 'Our flagship competition featuring complex multi-stage attack scenarios.',
    difficulty: 'Advanced',
    participants: '100+',
    rating: 4.9,
    flagship: false,
  },
];

export default function CTFSection() {
  return (
    <section className="relative py-[140px] overflow-hidden bg-base">
      <div className="absolute inset-0 bg-gradient-aurora-subtle opacity-30" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24">
        <RevealOnScroll>
          <div className="mb-12">
            <div className="section-label">Featured CTFs</div>
            <h2 className="section-title">Test Your Skills</h2>
            <p className="section-subtitle">
              Real-world cybersecurity challenges designed by industry professionals to push your limits.
            </p>
          </div>
        </RevealOnScroll>

        {/* Bento layout — 1 large flagship + 2 stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Flagship — spans 2 columns */}
          <RevealOnScroll delay={0} className="lg:col-span-2">
            <div className="glass-card p-8 h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-aurora opacity-40" />
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl border border-aurora-violet/20 bg-aurora-violet/[0.08] flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-aurora-violet" />
                </div>
                <span className="badge-open">Open</span>
              </div>
              <h3 className="font-display font-bold text-text-primary text-2xl mb-3">
                {ctfs[0].title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8 max-w-lg">
                {ctfs[0].description}
              </p>
              <div className="flex items-center gap-6 text-sm text-text-muted">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-signal-amber fill-signal-amber/30" />
                  {ctfs[0].rating}
                </div>
                <div className="flex items-center gap-1.5">
                  <UsersIcon className="w-4 h-4 text-aurora-violet" />
                  {ctfs[0].participants}
                </div>
                <span className="mono-label text-aurora-cyan">{ctfs[0].difficulty}</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Stacked smaller cards */}
          <div className="flex flex-col gap-5">
            {ctfs.slice(1).map((ctf, i) => (
              <RevealOnScroll key={ctf.title} delay={100 + i * 80}>
                <div className="glass-card p-6 h-full group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-aurora-cyan" />
                    </div>
                    <span className="mono-label text-aurora-cyan">{ctf.difficulty}</span>
                  </div>
                  <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                    {ctf.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {ctf.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-signal-amber fill-signal-amber/30" />
                      {ctf.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="w-3.5 h-3.5 text-aurora-violet" />
                      {ctf.participants}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <RevealOnScroll delay={300}>
          <div className="mt-10">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-medium text-aurora-cyan hover:text-aurora-violet transition-colors"
            >
              Explore All Challenges
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
