'use client';

import { HeartHandshake, Code, PenTool, Globe, MessageCircle, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const roles = [
  { icon: Code, title: 'Developer', description: 'Build and maintain our platforms, tools, and CTF challenges.' },
  { icon: PenTool, title: 'Content Creator', description: 'Write guides, create video tutorials, and develop training materials.' },
  { icon: Globe, title: 'Community Manager', description: 'Help grow and moderate our community across all platforms.' },
  { icon: MessageCircle, title: 'Mentor', description: 'Guide newcomers and share your expertise through structured programs.' },
  { icon: Shield, title: 'Security Researcher', description: 'Contribute to threat intelligence and vulnerability research.' },
];

export default function VolunteerSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-void">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/30 via-transparent to-abyss/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-label justify-center">Volunteer Opportunities</div>
          <h2 className="section-title">Contribute to the Mission</h2>
          <p className="section-subtitle mx-auto">
            Whether you are a seasoned professional or just starting out, there is a place for you at CGS. Your skills can make a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div key={role.title} className="glass-card p-6 text-center group">
                <div className="w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan/20 transition-colors">
                  <Icon className="w-5 h-5 text-cyan" />
                </div>
                <h3 className="font-display font-semibold text-white-primary text-base mb-2">{role.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{role.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/career"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-electric text-white text-sm font-semibold shadow-btn hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
          >
            <HeartHandshake className="w-4 h-4" />
            Apply to Volunteer
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
