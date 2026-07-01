import { Shield, Building2, GraduationCap, Cloud } from 'lucide-react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const sponsors = [
  { name: 'TechCorp Security', icon: Shield, tier: 'Platinum' },
  { name: 'DataShield Inc.', icon: Building2, tier: 'Gold' },
  { name: 'CyberEdu Foundation', icon: GraduationCap, tier: 'Gold' },
  { name: 'CloudDefense Labs', icon: Cloud, tier: 'Silver' },
  { name: 'NetGuard Systems', icon: Shield, tier: 'Silver' },
  { name: 'SecureStack', icon: Building2, tier: 'Silver' },
];

const tierStyles: Record<string, { size: string; border: string; text: string; iconSize: string }> = {
  Platinum: { size: 'w-full py-8', border: 'border-aurora-violet/20', text: 'text-aurora-violet', iconSize: 'w-12 h-12' },
  Gold: { size: 'w-full py-6', border: 'border-aurora-cyan/15', text: 'text-aurora-cyan', iconSize: 'w-10 h-10' },
  Silver: { size: 'w-full py-5', border: 'border-white/[0.06]', text: 'text-text-muted', iconSize: 'w-8 h-8' },
};

export default function SponsorsSection() {
  const platinum = sponsors.filter((s) => s.tier === 'Platinum');
  const gold = sponsors.filter((s) => s.tier === 'Gold');
  const silver = sponsors.filter((s) => s.tier === 'Silver');

  return (
    <section className="relative py-[140px] overflow-hidden bg-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-aurora opacity-20" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 lg:px-24">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="section-label justify-center">Sponsors & Collaborators</div>
            <h2 className="section-title">Trusted by <span className="gradient-text">Industry Leaders</span></h2>
            <p className="section-subtitle mx-auto">
              We partner with organizations that share our vision of a safer digital world.
            </p>
          </div>
        </RevealOnScroll>

        {/* Tier-based sizing — Platinum largest, Silver smallest */}
        <div className="space-y-4">
          {/* Platinum */}
          <RevealOnScroll delay={0}>
            <div className="grid grid-cols-1 gap-4">
              {platinum.map((s) => {
                const Icon = s.icon;
                const style = tierStyles[s.tier];
                return (
                  <div
                    key={s.name}
                    className={`glass-card-static ${style.size} ${style.border} flex items-center justify-center gap-4`}
                  >
                    <Icon className={`${style.iconSize} ${style.text} opacity-60`} />
                    <span className={`font-display font-semibold text-xl ${style.text}`}>{s.name}</span>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>

          {/* Gold */}
          <RevealOnScroll delay={100}>
            <div className="grid grid-cols-2 gap-4">
              {gold.map((s) => {
                const Icon = s.icon;
                const style = tierStyles[s.tier];
                return (
                  <div
                    key={s.name}
                    className={`glass-card-static ${style.size} ${style.border} flex items-center justify-center gap-3`}
                  >
                    <Icon className={`${style.iconSize} ${style.text} opacity-50`} />
                    <span className={`font-display font-medium text-base ${style.text}`}>{s.name}</span>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>

          {/* Silver */}
          <RevealOnScroll delay={200}>
            <div className="grid grid-cols-3 gap-4">
              {silver.map((s) => {
                const Icon = s.icon;
                const style = tierStyles[s.tier];
                return (
                  <div
                    key={s.name}
                    className={`glass-card-static ${style.size} ${style.border} flex flex-col items-center justify-center gap-2`}
                  >
                    <Icon className={`${style.iconSize} ${style.text} opacity-40`} />
                    <span className={`text-xs font-medium ${style.text}`}>{s.name}</span>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
