import Image from 'next/image';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const collaborators = [
  {
    name: 'Youth Empowerment',
    logo: '/images/sponsors/youth-empowerment.png',
    desc: 'Empowering youth through education and skill development programs.',
  },
  {
    name: 'Ninebyte Security',
    logo: '/images/sponsors/ninebyte.png',
    desc: 'Professional cybersecurity services and training provider.',
  },
  {
    name: 'QUEST Cybersecurity Student Society',
    logo: '/images/sponsors/quest.png',
    desc: 'Student-led cybersecurity community at QUEST University.',
  },
];

export default function CollaborationSection() {
  return (
    <section className="relative py-[140px] overflow-hidden bg-base">
      <div className="absolute inset-0 bg-gradient-aurora-subtle opacity-20" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 lg:px-24">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="section-label justify-center">Collaborators</div>
            <h2 className="section-title">
              Built With <span className="gradient-text">Partners</span>
            </h2>
            <p className="section-subtitle mx-auto">
              We collaborate with organizations that share our vision of cybersecurity education and community growth.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collaborators.map((c, i) => (
            <RevealOnScroll key={c.name} delay={i * 80}>
              <div className="glass-card p-8 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-2xl bg-surface border border-white/[0.08] flex items-center justify-center p-4 mb-5 group-hover:border-aurora-violet/30 transition-colors">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-display font-semibold text-text-primary text-base mb-2">
                  {c.name}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
