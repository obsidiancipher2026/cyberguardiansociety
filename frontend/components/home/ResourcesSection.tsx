'use client';

import { BookOpen, Video, FileText, Link as LinkIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const categories = [
  {
    icon: BookOpen,
    title: 'Guides & Tutorials',
    description: 'Step-by-step guides covering everything from basic security hygiene to advanced penetration testing.',
    color: 'text-aurora-violet',
    status: 'Coming Soon',
  },
  {
    icon: Video,
    title: 'Workshop Recordings',
    description: 'Access recordings of past workshops, seminars, and expert-led training sessions on demand.',
    color: 'text-aurora-cyan',
    status: 'Coming Soon',
  },
  {
    icon: FileText,
    title: 'Threat Reports',
    description: 'Monthly threat intelligence briefings and analysis reports from our research team.',
    color: 'text-aurora-emerald',
    status: 'Coming Soon',
  },
  {
    icon: LinkIcon,
    title: 'Tool Library',
    description: 'Curated collection of open-source security tools, scripts, and utilities.',
    color: 'text-signal-amber',
    status: 'Coming Soon',
  },
];

export default function ResourcesSection() {
  return (
    <section className="relative py-[140px] overflow-hidden bg-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-aurora opacity-20" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-label">Learning Resources</div>
              <h2 className="section-title">Everything You Need to <span className="gradient-text">Grow</span></h2>
              <p className="section-subtitle">
                Curated learning materials, tools, and threat intelligence to support your cybersecurity journey.
              </p>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-medium text-aurora-cyan hover:text-aurora-violet transition-colors shrink-0"
            >
              Browse Library
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>

        {/* 2x2 asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <RevealOnScroll
                key={cat.title}
                delay={i * 80}
                className={`glass-card p-7 ${i === 0 ? 'md:row-span-1' : ''}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <span className="badge-pending">{cat.status}</span>
                </div>
                <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                  {cat.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {cat.description}
                </p>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
