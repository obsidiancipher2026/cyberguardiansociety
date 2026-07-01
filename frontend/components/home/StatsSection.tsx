import { Users, Shield, BookOpen, Calendar, Award, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: '0+', label: 'Active Members', color: 'text-electric' },
  { icon: Shield, value: '0+', label: 'Threats Tracked', color: 'text-red' },
  { icon: BookOpen, value: '0+', label: 'Resources', color: 'text-cyan' },
  { icon: Calendar, value: '0+', label: 'Events Hosted', color: 'text-electric' },
  { icon: Award, value: '0+', label: 'Certifications', color: 'text-red' },
  { icon: Globe, value: '0+', label: 'Countries', color: 'text-cyan' },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #07111F 0%, #101827 50%, #07111F 100%)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center p-5 rounded-xl glass-card-static">
                <div className="w-11 h-11 rounded-full bg-electric/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className={`font-display font-extrabold block ${stat.color}`} style={{ fontSize: 'clamp(24px, 3vw, 48px)' }}>
                  {stat.value}
                </span>
                <p className="font-mono text-text-ghost mt-1 text-[11px] tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
