import { Users, AlertTriangle, BookOpen, Calendar, Award, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: '0', label: 'MEMBERS', color: 'text-cyan-core' },
  { icon: AlertTriangle, value: '0', label: 'THREATS TRACKED', color: 'text-red-threat' },
  { icon: BookOpen, value: '0', label: 'RESOURCES', color: 'text-white-primary' },
  { icon: Calendar, value: '0', label: 'MONTHLY EVENTS', color: 'text-cyan-core' },
  { icon: Award, value: '0', label: 'CERTIFICATIONS', color: 'text-red-threat' },
  { icon: Globe, value: '0', label: 'COUNTRIES', color: 'text-white-primary' },
];

export default function StatsSection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #020408 0%, #060D1E 50%, #020408 100%)' }}>
      {/* Cyan line sweep */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-5 rounded-xl bg-surface border border-border"
              >
                <div className="w-11 h-11 rounded-full bg-cyan-ghost flex items-center justify-center mx-auto mb-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className={`font-display font-extrabold block ${stat.color}`} style={{ fontSize: 'clamp(24px, 3vw, 48px)' }}>
                  {stat.value}
                </span>
                <p className="font-mono text-white-ghost mt-1" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>
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
