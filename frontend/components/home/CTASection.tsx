'use client';

import { Shield, ArrowRight, Award, Zap } from 'lucide-react';
import Link from 'next/link';
import { useInView } from '@/hooks/useAnimations';

const ctaCards = [
  {
    icon: Shield,
    title: 'Join Our Mission',
    description: 'Become part of a global network defending the digital frontier.',
  },
  {
    icon: Award,
    title: 'Earn Recognition',
    description: 'Get certified and earn badges for your cybersecurity contributions.',
  },
  {
    icon: Zap,
    title: 'Stay Ahead',
    description: 'Access cutting-edge tools and intelligence before threats emerge.',
  },
];

export default function CTASection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'var(--void)' }}>
      {/* Center radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className={`w-14 h-14 rounded-full bg-cyan-ghost flex items-center justify-center mx-auto mb-5 border border-cyan-core/20 ${isInView ? 'animate-scaleIn' : 'opacity-0 scale-95'}`}>
          <Shield className="w-7 h-7 text-cyan-core" />
        </div>
        <h2 className={`font-display font-extrabold text-red-threat mb-4 ${isInView ? 'animate-slideInUp' : 'opacity-0 translate-y-4'}`} style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          Ready to Secure the <span className="text-cyan-core">Digital World</span>?
        </h2>
        <p className={`text-white-muted max-w-2xl mx-auto mb-10 ${isInView ? 'animate-slideInUp' : 'opacity-0 translate-y-4'}`} style={{ fontSize: '15px', animationDelay: '150ms' }}>
          Join thousands of cybersecurity professionals and enthusiasts working
          together to build a safer internet for everyone.
        </p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isInView ? 'animate-slideInUp' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '300ms' }}>
          <div className="transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-cyan-core text-void text-sm font-semibold hover:brightness-110 transition-all duration-200 hover:-translate-y-0.5">
              Get Involved
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]">
            <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md border border-border text-white-muted text-sm font-medium hover:border-cyan-core hover:text-cyan-core transition-all duration-200">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ctaCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`cyber-card p-6 text-left ${isInView ? 'animate-slideInUp' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: `${450 + index * 150}ms` }}
              >
                <Icon className="w-5 h-5 text-cyan-core mb-3" />
                <h3 className="font-display font-semibold text-red-threat mb-1" style={{ fontSize: '15px' }}>{card.title}</h3>
                <p className="text-white-muted" style={{ fontSize: '13px' }}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
