'use client';

import { useState } from 'react';
import { Code, PenTool, Globe, MessageCircle, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const roles = [
  {
    icon: Code,
    title: 'Developer',
    description: 'Build and maintain our platforms, tools, and CTF challenges. Work with modern frameworks and contribute to open-source security tooling.',
    skills: ['React', 'Node.js', 'Python', 'DevOps'],
  },
  {
    icon: PenTool,
    title: 'Content Creator',
    description: 'Write guides, create video tutorials, and develop training materials that help thousands learn cybersecurity.',
    skills: ['Writing', 'Video Production', 'Technical Analysis'],
  },
  {
    icon: Globe,
    title: 'Community Manager',
    description: 'Help grow and moderate our community across Discord, LinkedIn, and other platforms.',
    skills: ['Communication', 'Social Media', 'Event Planning'],
  },
  {
    icon: MessageCircle,
    title: 'Mentor',
    description: 'Guide newcomers and share your expertise through structured mentorship programs.',
    skills: ['Teaching', 'Cybersecurity', 'Patience'],
  },
  {
    icon: Shield,
    title: 'Security Researcher',
    description: 'Contribute to threat intelligence and vulnerability research that protects our community.',
    skills: ['OSINT', 'Malware Analysis', 'CTF'],
  },
];

export default function VolunteerSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-[140px] overflow-hidden bg-base">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24">
        <RevealOnScroll>
          <div className="mb-12">
            <div className="section-label">Volunteer Opportunities</div>
            <h2 className="section-title">Contribute to the <span className="gradient-text">Mission</span></h2>
            <p className="section-subtitle">
              Whether you are a seasoned professional or just starting out, there is a place for you at CGS.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left — tab triggers */}
            <div className="lg:w-[320px] shrink-0">
              <div className="space-y-1">
                {roles.map((role, i) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.title}
                      onClick={() => setActive(i)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        active === i
                          ? 'bg-aurora-violet/[0.08] border border-aurora-violet/20 text-text-primary'
                          : 'border border-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.02]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 ${active === i ? 'text-aurora-violet' : 'text-text-muted'}`} />
                      <span className="font-medium text-sm">{role.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right — active role detail */}
            <div className="flex-1 glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const Icon = roles[active].icon;
                  return <Icon className="w-6 h-6 text-aurora-violet" />;
                })()}
                <h3 className="font-display font-semibold text-text-primary text-xl">
                  {roles[active].title}
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6">
                {roles[active].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {roles[active].skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-white/[0.08] bg-white/[0.02] text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <Link
                href="/career"
                className="inline-flex items-center gap-2 text-sm font-medium text-aurora-cyan hover:text-aurora-violet transition-colors"
              >
                Apply for This Role
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
