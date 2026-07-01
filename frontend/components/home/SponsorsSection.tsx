import Image from 'next/image';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const sponsors = [
  {
    name: 'TryHackMe',
    logo: '/images/sponsors/tryhackme.svg',
    tier: 'Gold',
    desc: 'Hands-on cybersecurity training platform.',
  },
];

export default function SponsorsSection() {
  return (
    <section className="relative py-[140px] overflow-hidden bg-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-aurora opacity-20" />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-24">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="section-label justify-center">Sponsors</div>
            <h2 className="section-title">
              Sponsor <span className="gradient-text">Partners</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Supported by organizations that believe in our mission.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <div className="glass-card p-10 flex flex-col items-center text-center group">
            <div className="w-32 h-32 rounded-2xl bg-surface border border-white/[0.08] flex items-center justify-center p-6 mb-6 group-hover:border-aurora-violet/30 transition-colors">
              <Image
                src={sponsors[0].logo}
                alt={sponsors[0].name}
                width={120}
                height={120}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-display font-semibold text-text-primary text-xl mb-2">
              {sponsors[0].name}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {sponsors[0].desc}
            </p>
            <span className="mt-4 badge-open">{sponsors[0].tier} Sponsor</span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
