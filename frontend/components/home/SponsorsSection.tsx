import { Shield, Building2, GraduationCap, Cloud } from 'lucide-react';

const sponsors = [
  { name: 'TechCorp Security', icon: Shield, tier: 'Platinum' },
  { name: 'DataShield Inc.', icon: Building2, tier: 'Gold' },
  { name: 'CyberEdu Foundation', icon: GraduationCap, tier: 'Gold' },
  { name: 'CloudDefense Labs', icon: Cloud, tier: 'Silver' },
  { name: 'NetGuard Systems', icon: Shield, tier: 'Silver' },
  { name: 'SecureStack', icon: Building2, tier: 'Silver' },
];

const tiers = [
  { label: 'Platinum', color: 'text-electric', dot: 'bg-electric' },
  { label: 'Gold', color: 'text-cyan', dot: 'bg-cyan' },
  { label: 'Silver', color: 'text-text-muted', dot: 'bg-text-muted' },
];

export default function SponsorsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-label justify-center">Sponsors & Collaborators</div>
          <h2 className="section-title">Trusted by Industry Leaders</h2>
          <p className="section-subtitle mx-auto">
            We partner with organizations that share our vision of a safer digital world. Together, we amplify our impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {tiers.map((tier) => (
            <div key={tier.label} className="glass-card-static p-6 text-center">
              <div className={`w-3 h-3 rounded-full ${tier.dot} mx-auto mb-3`} />
              <h3 className={`font-display font-semibold text-lg ${tier.color}`}>{tier.label}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {sponsors.map((sponsor) => {
            const Icon = sponsor.icon;
            const tierColor = sponsor.tier === 'Platinum' ? 'text-electric border-electric/30' : sponsor.tier === 'Gold' ? 'text-cyan border-cyan/30' : 'text-text-muted border-border';
            return (
              <div key={sponsor.name} className={`glass-card-static p-5 text-center border ${tierColor}`}>
                <Icon className="w-8 h-8 mx-auto mb-2 opacity-60" />
                <p className="text-xs font-medium text-text-muted">{sponsor.name}</p>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${sponsor.tier === 'Platinum' ? 'text-electric' : sponsor.tier === 'Gold' ? 'text-cyan' : 'text-text-ghost'}`}>
                  {sponsor.tier}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
