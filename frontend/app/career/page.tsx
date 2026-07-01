'use client';

import { useState, useEffect } from 'react';
import {
  Shield,
  Briefcase,
  GraduationCap,
  Heart,
  Clock,
  Users,
  Award,
  ArrowRight,
  Loader2,
  Send,
} from 'lucide-react';
import api from '@/utils/api';
import OpeningModal from '@/components/ui/OpeningModal';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import EmptyState from '@/components/ui/EmptyState';
import AuroraGlow from '@/components/ui/AuroraGlow';

const benefits = [
  {
    icon: Briefcase,
    title: 'Career Growth',
    desc: 'Gain real-world experience and build a professional portfolio that stands out in the cybersecurity industry.',
    color: 'text-aurora-violet',
    bgColor: 'bg-aurora-violet/10',
  },
  {
    icon: Users,
    title: 'Professional Network',
    desc: 'Connect with seasoned professionals, mentors, and fellow volunteers across the global security community.',
    color: 'text-aurora-cyan',
    bgColor: 'bg-aurora-cyan/10',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    desc: 'Access exclusive training materials, workshops, and hands-on labs led by industry experts.',
    color: 'text-aurora-emerald',
    bgColor: 'bg-aurora-emerald/10',
  },
  {
    icon: Award,
    title: 'Public Recognition',
    desc: 'Earn certificates, digital badges, and community recognition for your contributions and milestones.',
    color: 'text-signal-amber',
    bgColor: 'bg-signal-amber/10',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    desc: 'Volunteer on your own time, from anywhere in the world — your pace, your commitment.',
    color: 'text-aurora-cyan',
    bgColor: 'bg-aurora-cyan/10',
  },
  {
    icon: Heart,
    title: 'Meaningful Impact',
    desc: 'Make a tangible difference in cybersecurity education and help defend communities from digital threats.',
    color: 'text-alert-coral',
    bgColor: 'bg-alert-coral/10',
  },
];

const steps = [
  {
    num: '01',
    title: 'Browse Openings',
    desc: 'Explore available volunteer positions and find the role that matches your skills and interests.',
  },
  {
    num: '02',
    title: 'Apply & Onboard',
    desc: 'Submit your application. Once accepted, you will receive access to our onboarding materials and Slack workspace.',
  },
  {
    num: '03',
    title: 'Contribute & Grow',
    desc: 'Start contributing to projects, attend workshops, and grow alongside a community of security-minded individuals.',
  },
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
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api
      .get('/openings')
      .then((res) => setOpenings(res.data.data || []))
      .catch(() => setOpenings([]))
      .finally(() => setLoading(false));
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      api
        .post('/notifications', { email: email.trim(), type: 'career_updates' })
        .catch(() => {});
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-base">
      {/* ── Hero ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <AuroraGlow color="mixed" size={700} className="top-[-200px] left-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24 text-center">
          <RevealOnScroll>
            <span className="section-label justify-center mb-6">Career &amp; Volunteering</span>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h1 className="section-title mb-5">
              Join the <span className="gradient-text">CGS Team</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <p className="section-subtitle mx-auto">
              Turn your passion for cybersecurity into impact. Explore volunteer opportunities
              and contribute to a global mission of digital defense.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="py-[140px] bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <span className="section-label justify-center mb-5">Open Positions</span>
              <h2 className="section-title">
                Volunteer <span className="gradient-text">Opportunities</span>
              </h2>
              <p className="section-subtitle mx-auto mt-4">
                We are looking for passionate individuals to join our mission. No prior experience
                required — just dedication and a willingness to learn.
              </p>
            </div>
          </RevealOnScroll>

          {loading ? (
            <RevealOnScroll delay={100}>
              <div className="glass-card-static p-16 text-center">
                <Loader2 className="w-6 h-6 text-aurora-violet animate-spin mx-auto mb-4" />
                <p className="text-text-secondary text-sm">Scanning for openings...</p>
              </div>
            </RevealOnScroll>
          ) : openings.length === 0 ? (
            <RevealOnScroll delay={100}>
              <EmptyState
                variant="radar"
                icon={<Briefcase />}
                title="No Open Positions Right Now"
                description="No active volunteer roles at the moment. Drop your email and we will notify you the moment new positions open."
                action={
                  !submitted ? (
                    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 mt-2 max-w-md mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="flex-1 px-4 py-3 bg-elevated border border-white/[0.08] rounded-lg text-text-primary text-sm placeholder:text-text-muted focus:border-aurora-violet focus:outline-none focus:ring-2 focus:ring-aurora-violet/20 transition-all"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-aurora-violet text-white text-sm font-semibold rounded-lg hover:bg-aurora-violet/90 transition-colors shrink-0"
                      >
                        <Send className="w-4 h-4" />
                        Notify Me
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center gap-2 text-aurora-emerald text-sm font-medium">
                      <Shield className="w-4 h-4" />
                      You are on the list. We will reach out when new positions open.
                    </div>
                  )
                }
              />
            </RevealOnScroll>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openings.map((opening, i) => (
                <RevealOnScroll key={opening.id} delay={i * 80}>
                  <div
                    className="glass-card p-6 group cursor-pointer"
                    onClick={() => setSelectedOpening(opening)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display font-semibold text-text-primary text-[15px] group-hover:text-aurora-violet transition-colors leading-snug">
                        {opening.title}
                      </h3>
                      <span className="mono-label text-aurora-cyan bg-aurora-cyan/10 px-2 py-0.5 rounded-full text-[10px] tracking-wider shrink-0 ml-3">
                        {opening.type}
                      </span>
                    </div>

                    <p className="text-text-secondary text-[13px] leading-relaxed line-clamp-3 mb-4">
                      {opening.description}
                    </p>

                    {opening.tags && opening.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {opening.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="mono-label text-aurora-violet bg-aurora-violet/10 px-2 py-0.5 rounded-full text-[10px] tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-aurora-violet text-[13px] font-medium group-hover:gap-2.5 transition-all">
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── How Volunteering Works ── */}
      <section className="py-[140px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-5">Process</span>
              <h2 className="section-title">
                How Volunteering <span className="gradient-text">Works</span>
              </h2>
              <p className="section-subtitle mx-auto mt-4">
                A simple, structured path from interest to active contribution.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* horizontal connector rail */}
            <div className="hidden md:block absolute top-[36px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-[2px] bg-gradient-to-r from-aurora-violet/40 via-aurora-cyan/30 to-aurora-emerald/20" />

            {steps.map((step, i) => (
              <RevealOnScroll key={step.num} delay={i * 120}>
                <div className="relative text-center px-6">
                  <div className="w-[72px] h-[72px] rounded-2xl bg-surface-raised border border-white/[0.08] flex items-center justify-center mx-auto mb-6 relative z-10">
                    <span className="mono-label text-aurora-violet text-lg font-bold tracking-tight">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-text-primary text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-[280px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Volunteer ── */}
      <section className="py-[140px] bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-5">Benefits</span>
              <h2 className="section-title">
                Why Volunteer With <span className="gradient-text">CGS</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="space-y-5 max-w-3xl mx-auto">
            {benefits.map((ben, i) => {
              const Icon = ben.icon;
              return (
                <RevealOnScroll key={ben.title} delay={i * 80}>
                  <div className="glass-card p-6 flex items-start gap-5">
                    <div
                      className={`w-12 h-12 rounded-xl ${ben.bgColor} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${ben.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-text-primary text-[15px] mb-1">
                        {ben.title}
                      </h3>
                      <p className="text-text-secondary text-[13px] leading-relaxed">
                        {ben.desc}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <OpeningModal opening={selectedOpening} onClose={() => setSelectedOpening(null)} />
    </div>
  );
}
