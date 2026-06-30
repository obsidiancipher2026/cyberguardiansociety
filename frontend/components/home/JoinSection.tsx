'use client';

import { HeartHandshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInView } from '@/hooks/useAnimations';

export default function JoinSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden bg-abyss">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_60%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className={`text-center mb-12 ${isInView ? 'animate-slideInUp' : 'opacity-0 translate-y-4'}`}>
          <span className="terminal-eyebrow mb-4 inline-block">JOIN THE MOVEMENT</span>
          <h2 className="font-display font-bold text-red-threat mb-3" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
            Join the <span className="text-cyan-core">CGS Movement</span>
          </h2>
          <p className="text-white-muted max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
            Become part of something bigger. Whether you want to learn, teach, or defend,
            there is a place for you in the CyberGuardians Society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Volunteer Card */}
          <div className={`group cyber-card p-7 text-center ${isInView ? 'animate-slideInUp' : 'opacity-0 translate-y-4'}`} style={{ borderTop: '3px solid var(--cyan-core)', animationDelay: '150ms' }}>
            <div className="w-12 h-12 rounded-full bg-cyan-ghost flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-6 h-6 text-cyan-core" />
            </div>
            <h3 className="font-display font-bold text-red-threat mb-2">Join as a Volunteer</h3>
            <p className="text-white-muted mb-5 leading-relaxed" style={{ fontSize: '13px' }}>
              Contribute your skills and passion. Help us organize events, create content,
              mentor newcomers, and shape the future of cybersecurity education.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {['Mentor', 'Content Creator', 'Event Organizer', 'Researcher'].map((tag) => (
                <span key={tag} className="font-mono text-[10px] bg-cyan-ghost text-cyan-core px-2.5 py-1 rounded-full tracking-wider uppercase">{tag}</span>
              ))}
            </div>
            <div className="transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]">
              <Link href="/career">
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-cyan-core text-void text-sm font-semibold hover:brightness-110 transition-all duration-200">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>

          {/* Student Card */}
          <div className={`group cyber-card p-7 text-center ${isInView ? 'animate-slideInUp' : 'opacity-0 translate-y-4'}`} style={{ borderTop: '3px solid #EF4444', animationDelay: '300ms' }}>
            <div className="w-12 h-12 rounded-full bg-red-threat/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-threat" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-display font-bold text-red-threat mb-2">Join as a Student</h3>
            <p className="text-white-muted mb-5 leading-relaxed" style={{ fontSize: '13px' }}>
              Start your cybersecurity journey. Access courses, labs, mentorship,
              and a community that supports your growth from beginner to expert.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {['Beginner Friendly', 'Free Access', 'Mentorship', 'Certifications'].map((tag) => (
                <span key={tag} className="font-mono text-[10px] bg-red-threat/10 text-red-threat px-2.5 py-1 rounded-full tracking-wider uppercase">{tag}</span>
              ))}
            </div>
            <div className="transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]">
              <Link href="/career">
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-red-threat text-white-primary text-sm font-semibold hover:brightness-110 transition-all duration-200">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
