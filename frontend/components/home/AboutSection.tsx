import { Shield, Users, BookOpen, Globe } from 'lucide-react';

const pillars = [
  {
    icon: Shield,
    title: 'Cyber Defense',
    description: 'Collaborative threat intelligence and real-time attack monitoring to protect our digital ecosystem.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'A diverse network of experts and learners sharing knowledge across every domain of cybersecurity.',
  },
  {
    icon: BookOpen,
    title: 'Education First',
    description: 'Workshops, training programs, and certifications designed to build the next generation of defenders.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Members from across the world united by a common mission to make the internet safer for everyone.',
  },
];

export default function AboutSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-void">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/50 via-transparent to-abyss/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-label justify-center">About CGS</div>
          <h2 className="section-title">Protecting the Digital Frontier, Together</h2>
          <p className="section-subtitle mx-auto">
            CyberGuardiansSociety is a global community dedicated to cybersecurity education, collaboration, and collective defense. We believe security is a shared responsibility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="glass-card p-6 text-center group">
                <div className="w-12 h-12 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-electric/20 transition-colors">
                  <Icon className="w-6 h-6 text-electric" />
                </div>
                <h3 className="font-display font-semibold text-white-primary text-lg mb-2">{pillar.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
