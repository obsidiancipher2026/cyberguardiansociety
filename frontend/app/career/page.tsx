'use client';

import { useState, useEffect } from 'react';
import { Shield, Briefcase, GraduationCap, Heart, Clock, Users, Award, Loader2 } from 'lucide-react';
import api from '@/utils/api';
import OpeningModal from '@/components/ui/OpeningModal';
import ClickableText from '@/components/ui/ClickableText';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardPortal,
} from '@/components/animate-ui/primitives/radix/hover-card';

const benefits = [
  { icon: Briefcase, title: 'Career Growth', desc: 'Gain valuable experience and build your professional portfolio.', color: 'text-cyan-core' },
  { icon: Users, title: 'Network', desc: 'Connect with industry professionals and expand your circle.', color: 'text-teal-accent' },
  { icon: GraduationCap, title: 'Learning', desc: 'Access exclusive training materials and workshops.', color: 'text-purple-glow' },
  { icon: Award, title: 'Recognition', desc: 'Earn certificates, badges, and community recognition.', color: 'text-[#FFB300]' },
  { icon: Clock, title: 'Flexible Hours', desc: 'Volunteer on your own schedule, from anywhere in the world.', color: 'text-cyan-dim' },
  { icon: Heart, title: 'Impact', desc: 'Make a real difference in cybersecurity education and defense.', color: 'text-red-threat' },
];

interface Opening {
  id: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
}

export default function CareerPage() {
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpening, setSelectedOpening] = useState<Opening | null>(null);

  useEffect(() => {
    api.get('/openings')
      .then((res) => setOpenings(res.data.data || []))
      .catch(() => setOpenings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-20 overflow-hidden hero-mesh">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="terminal-eyebrow mb-4 inline-block">CAREER & VOLUNTEERING</span>
          <h1 className="font-display font-extrabold text-red-threat mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Join the <span className="text-cyan-core">CGS Team</span>
          </h1>
          <p className="text-white-muted max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
            Turn your passion for cybersecurity into impact. Explore volunteer opportunities and
            contribute to a global mission of digital defense.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-abyss">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="terminal-eyebrow mb-4 inline-block">OPEN POSITIONS</span>
            <h2 className="font-display font-bold text-red-threat mb-3" style={{ fontSize: 'clamp(24px, 3vw, 30px)' }}>
              Open Volunteer <span className="text-cyan-core">Positions</span>
            </h2>
            <p className="text-white-muted max-w-xl mx-auto" style={{ fontSize: '15px' }}>
              We are looking for passionate individuals to join our mission. No prior experience required — just dedication and a willingness to learn.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 bg-surface border border-border rounded-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Loader2 className="w-6 h-6 text-cyan-core animate-spin mx-auto mb-3" />
              <p className="text-white-muted" style={{ fontSize: '13px' }}>Loading openings...</p>
            </div>
          ) : openings.length === 0 ? (
            <div className="text-center py-16 bg-surface border border-border rounded-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Briefcase className="w-10 h-10 text-white-ghost mx-auto mb-3" />
              <p className="text-white-muted mb-1" style={{ fontSize: '15px' }}>No open positions right now.</p>
              <p className="text-white-ghost" style={{ fontSize: '13px' }}>Check back soon — we are always growing.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openings.map((opening) => (
                <div
                  key={opening.id}
                  className="cyber-card p-6 relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedOpening(opening)}
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-core to-red-threat" />
                  <div className="flex items-start justify-between mb-3">
                    <HoverCard openDelay={200} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <h3 className="font-display font-semibold text-red-threat cursor-pointer hover:text-cyan-core transition-colors" style={{ fontSize: '15px' }}>{opening.title}</h3>
                      </HoverCardTrigger>
                      <HoverCardPortal>
                        <HoverCardContent side="top" sideOffset={8} className="w-80">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-white">{opening.title}</p>
                              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-ghost text-cyan-core tracking-wider uppercase">{opening.type}</span>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-4">{opening.description}</p>
                            {opening.tags && opening.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {opening.tags.map((tag, i) => (
                                  <span key={i} className="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-red-threat/10 text-red-threat tracking-wider">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </HoverCardContent>
                      </HoverCardPortal>
                    </HoverCard>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-ghost text-cyan-core tracking-wider uppercase shrink-0 ml-2">
                      {opening.type}
                    </span>
                  </div>
                  <p className="text-white-muted mb-4 line-clamp-3" style={{ fontSize: '13px' }}>{opening.description}</p>
                  {opening.tags && opening.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {opening.tags.map((tag, i) => (
                        <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-red-threat/10 text-red-threat tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-cyan-core text-[13px] font-medium">
                    View Details →
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="terminal-eyebrow mb-4 inline-block">BENEFITS</span>
            <h2 className="font-display font-bold text-red-threat" style={{ fontSize: 'clamp(24px, 3vw, 30px)' }}>
              Why Volunteer With <span className="text-cyan-core">CGS</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((ben) => {
              const Icon = ben.icon;
              return (
                <div key={ben.title} className="cyber-card p-6 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-ghost flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${ben.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-red-threat mb-1" style={{ fontSize: '15px' }}>{ben.title}</h3>
                    <ClickableText text={ben.desc} className="text-white-muted" style={{ fontSize: '13px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <OpeningModal opening={selectedOpening} onClose={() => setSelectedOpening(null)} />
    </div>
  );
}
