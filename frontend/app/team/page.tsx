import { Shield, Linkedin, Twitter, Globe, Code, PenTool, Server, Lock } from 'lucide-react';

const teamMembers = [
  { name: 'Alex Rivera', role: 'Founder & Lead Security Architect', expertise: 'Threat Intelligence', icon: Shield },
  { name: 'Sarah Chen', role: 'Head of Research', expertise: 'Vulnerability Research', icon: Code },
  { name: 'Marcus Johnson', role: 'CTF Director', expertise: 'Penetration Testing', icon: PenTool },
  { name: 'Priya Patel', role: 'Community Manager', expertise: 'Security Operations', icon: Globe },
  { name: 'James Wilson', role: 'Content Lead', expertise: 'Security Education', icon: Server },
  { name: 'Elena Rodriguez', role: 'Lab Coordinator', expertise: 'Network Security', icon: Lock },
];

const roles = [
  { title: 'Security Researchers', count: '200+', desc: 'Active researchers contributing to threat intelligence' },
  { title: 'CTF Players', count: '1,000+', desc: 'Competitive cybersecurity enthusiasts' },
  { title: 'Mentors', count: '50+', desc: 'Experienced professionals guiding newcomers' },
  { title: 'Contributors', count: '500+', desc: 'Community members actively contributing' },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyber-blue-light/20 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-blue)]/30 bg-[#1E293B]/50 backdrop-blur-sm mb-4">
            <Shield className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
            <span className="text-[var(--accent-blue)] text-xs font-medium">Our Team</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Meet Our </span>
            <span className="text-gradient-mix">Cyber Guardians</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
            The dedicated professionals protecting the digital frontier through expertise, innovation, and collaboration.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
            <span className="text-white">Core </span>
            <span className="text-gradient-blue">Leadership</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => {
              const Icon = member.icon;
              return (
                <div key={member.name} className="bg-surface-primary border border-[var(--border-color)] rounded-xl p-5 hover:border-[var(--accent-blue)]/30 transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-red)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{member.name}</h3>
                      <p className="text-xs text-[var(--accent-blue)]">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] bg-surface-tertiary px-2 py-0.5 rounded text-[var(--text-secondary)]">{member.expertise}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
            <span className="text-white">Community </span>
            <span className="text-gradient-red">Roles</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => (
              <div key={role.title} className="bg-surface-primary border border-[var(--border-color)] rounded-xl p-5 text-center hover:border-[var(--accent-red)]/30 transition-all">
                <span className="text-2xl font-bold text-[var(--accent-blue)] block mb-1">{role.count}</span>
                <h3 className="text-sm font-semibold text-white mb-1">{role.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            <span className="text-white">Join Our </span>
            <span className="text-gradient-mix">Team</span>
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            We are always looking for passionate cybersecurity enthusiasts to join our community.
            Whether you are a beginner or an expert, there is a place for you here.
          </p>
        </div>
      </section>
    </div>
  );
}
