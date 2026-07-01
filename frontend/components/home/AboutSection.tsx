import { Shield, Users, BookOpen, Globe } from 'lucide-react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const pillars = [
  {
    icon: Shield,
    title: 'Cyber Defense',
    description: 'Collaborative threat intelligence and real-time attack monitoring to protect our digital ecosystem.',
    featured: true,
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'A diverse network of experts and learners sharing knowledge across every domain.',
  },
  {
    icon: BookOpen,
    title: 'Education First',
    description: 'Workshops, training, and certifications for the next generation of defenders.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Members from across the world united by a common mission.',
  },
];

export default function AboutSection() {
  return (
    <section className="relative py-[140px] overflow-hidden bg-base">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24">
        <RevealOnScroll>
          <div className="mb-16">
            <div className="section-label">About CGS</div>
            <h2 className="section-title">
              Protecting the <span className="gradient-text">Digital Frontier</span>, Together
            </h2>
            <p className="section-subtitle">
              CyberGuardiansSociety is a global community dedicated to cybersecurity education, collaboration, and collective defense.
            </p>
          </div>
        </RevealOnScroll>

        {/* Bento grid — 1 featured + 3 smaller */}
        <div className="bento-grid">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <RevealOnScroll
                key={pillar.title}
                delay={i * 80}
                className={
                  pillar.featured
                    ? 'bento-featured glass-card p-8 flex flex-col justify-between'
                    : 'glass-card p-6 flex flex-col justify-between'
                }
              >
                <div>
                  <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-aurora-violet" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                {pillar.featured && (
                  <div className="mt-6 pt-4 border-t border-white/[0.06]">
                    <span className="mono-label text-aurora-cyan">Core Focus</span>
                  </div>
                )}
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
