'use client';

import { Shield, Code, BookOpen, Users, Target, Zap, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInView } from '@/hooks/useAnimations';

const trainingCards = [
  {
    icon: Shield,
    title: 'Hands-On Labs',
    desc: 'Practice real-world cybersecurity scenarios in our state-of-the-art virtual labs with guided exercises.',
  },
  {
    icon: Code,
    title: 'Capture The Flag',
    desc: 'Participate in weekly CTF challenges designed to test and improve your technical skills progressively.',
  },
  {
    icon: BookOpen,
    title: 'Structured Courses',
    desc: 'Follow our curated learning paths from beginner fundamentals to advanced exploitation techniques.',
  },
  {
    icon: Users,
    title: 'Peer Mentorship',
    desc: 'Get paired with experienced security professionals who guide you through your learning journey.',
  },
  {
    icon: Target,
    title: 'Live Workshops',
    desc: 'Attend interactive workshops conducted by industry experts covering the latest security topics.',
  },
  {
    icon: Zap,
    title: 'Skill Assessments',
    desc: 'Track your progress with regular assessments and benchmarks to measure your growing expertise.',
  },
  {
    icon: Award,
    title: 'Certification Prep',
    desc: 'Prepare for industry certifications like CEH, OSCP, CISSP with our dedicated training modules.',
  },
  {
    icon: Shield,
    title: 'Research Projects',
    desc: 'Contribute to real cybersecurity research projects and build your professional portfolio.',
  },
];

export default function TrainingSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'var(--void)' }}>
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className={`text-center mb-12 ${isInView ? 'animate-slideInUp' : 'opacity-0 translate-y-4'}`}>
          <span className="terminal-eyebrow mb-4 inline-block">TRAINING ECOSYSTEM</span>
          <h2 className="font-display font-bold text-red-threat mb-3" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
            How We Train Our <span className="text-cyan-core">Enthusiasts and Learners</span>
          </h2>
          <p className="text-white-muted max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
            Our comprehensive training ecosystem ensures every member grows from where they are
            to where they want to be in their cybersecurity journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trainingCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`group cyber-card p-6 ${isInView ? 'animate-slideInUp' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: `${100 + index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-ghost to-red-threat/10 flex items-center justify-center mb-4 group-hover:from-cyan-core/15 group-hover:to-red-threat/15 transition-all duration-250">
                  <Icon className="w-6 h-6 text-red-threat" />
                </div>
                <h3 className="font-display font-semibold text-red-threat mb-2" style={{ fontSize: '15px' }}>{card.title}</h3>
                <p className="text-white-muted leading-relaxed" style={{ fontSize: '13px' }}>{card.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="inline-block transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]">
            <Link href="/what-cgs-do" className="inline-flex items-center gap-2 text-cyan-core text-sm font-medium hover:underline underline-offset-4 group">
              Explore More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
