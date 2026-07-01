'use client';

import { BookOpen, Video, FileText, Link as LinkIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    icon: BookOpen,
    title: 'Guides & Tutorials',
    description: 'Step-by-step guides covering everything from basic security hygiene to advanced penetration testing.',
    color: 'text-electric',
    border: 'border-electric/20',
    bg: 'bg-electric/10',
    count: '12+ Guides',
  },
  {
    icon: Video,
    title: 'Workshop Recordings',
    description: 'Access recordings of past workshops, seminars, and expert-led training sessions on demand.',
    color: 'text-red',
    border: 'border-red/20',
    bg: 'bg-red/10',
    count: '24+ Videos',
  },
  {
    icon: FileText,
    title: 'Threat Reports',
    description: 'Monthly threat intelligence briefings and analysis reports from our research team.',
    color: 'text-cyan',
    border: 'border-cyan/20',
    bg: 'bg-cyan/10',
    count: '8+ Reports',
  },
  {
    icon: LinkIcon,
    title: 'Tool Library',
    description: 'Curated collection of open-source security tools, scripts, and utilities recommended by our community.',
    color: 'text-electric',
    border: 'border-electric/20',
    bg: 'bg-electric/10',
    count: '30+ Tools',
  },
];

export default function ResourcesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label">Learning Resources</div>
            <h2 className="section-title">Everything You Need to Grow</h2>
            <p className="section-subtitle">Curated learning materials, tools, and threat intelligence to support your cybersecurity journey.</p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-electric hover:text-electric/80 transition-colors shrink-0"
          >
            Browse Library
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title} className="glass-card p-6 group">
                <div className={`w-11 h-11 rounded-xl ${cat.bg} ${cat.border} border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-5.5 h-5.5 ${cat.color}`} />
                </div>
                <h3 className="font-display font-semibold text-white-primary text-base mb-2">{cat.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-5">{cat.description}</p>
                <span className="text-[11px] font-mono text-text-ghost tracking-wider uppercase">{cat.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
