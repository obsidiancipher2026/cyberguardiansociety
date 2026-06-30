import { Shield, Eye, Heart, Target, Users, BookOpen, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

const TeamSection = dynamic(() => import('@/components/about/TeamSection'), { ssr: false });

const values = [
  { icon: Shield, title: 'Integrity', desc: 'Upholding the highest ethical standards in all cybersecurity endeavors.' },
  { icon: Eye, title: 'Vigilance', desc: 'Constant monitoring and proactive defense against emerging digital threats.' },
  { icon: Heart, title: 'Community', desc: 'A supportive ecosystem where knowledge is freely shared.' },
  { icon: Target, title: 'Excellence', desc: 'Striving for quality in education, tools, and threat intelligence.' },
  { icon: Users, title: 'Collaboration', desc: 'Working together across borders to defend the digital frontier.' },
  { icon: BookOpen, title: 'Education', desc: 'Empowering individuals to protect themselves and others.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-20 overflow-hidden hero-mesh">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="terminal-eyebrow mb-4 inline-block">ABOUT US</span>
          <h1 className="font-display font-extrabold text-red-threat mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Securing Tomorrow, <span className="text-cyan-core">Today</span>
          </h1>
          <p className="text-white-muted max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '15px' }}>
            Our mission is to unite cybersecurity professionals, researchers, and
            enthusiasts in a collaborative community dedicated to making the digital
            world safer through shared knowledge and collective defense.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-abyss">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="terminal-eyebrow mb-4 inline-block">OUR MISSION</span>
            <h2 className="font-display font-bold text-red-threat mb-3" style={{ fontSize: 'clamp(24px, 3vw, 30px)' }}>
              Founded in 2024
            </h2>
            <p className="text-white-muted leading-relaxed" style={{ fontSize: '15px' }}>
              CyberGuardiansSociety emerged from a simple but powerful idea:
              cybersecurity is strongest when we work together. What began as a small group of
              security professionals sharing threat intelligence has grown into a global community
              of thousands, united by a common purpose — defending the digital frontier.
            </p>
          </div>
        </div>
      </section>

      <TeamSection />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="terminal-eyebrow mb-4 inline-block">CORE VALUES</span>
            <h2 className="font-display font-bold text-red-threat" style={{ fontSize: 'clamp(24px, 3vw, 30px)' }}>
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="cyber-card p-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-ghost flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-cyan-core" />
                  </div>
                  <h3 className="font-display font-semibold text-red-threat mb-2" style={{ fontSize: '15px' }}>{v.title}</h3>
                  <p className="text-white-muted leading-relaxed" style={{ fontSize: '13px' }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-abyss">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="terminal-eyebrow mb-4 inline-block">PRESENCE</span>
          <h2 className="font-display font-bold text-red-threat mb-3" style={{ fontSize: 'clamp(24px, 3vw, 30px)' }}>
            Our Presence
          </h2>
          <p className="text-white-muted mb-6 max-w-xl mx-auto" style={{ fontSize: '15px' }}>
            We are based in Nawabshah, Sindh, Pakistan — serving the global cybersecurity community.
          </p>
          <div className="relative">
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-void/80 border border-cyan-core/30 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-teal-accent animate-pulse" />
              <span className="font-mono text-[10px] text-cyan-core tracking-wider uppercase">LIVE LOCATION</span>
            </div>
            <div className="rounded-xl overflow-hidden border border-border" style={{ boxShadow: 'var(--shadow-card)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115483.55582979719!2d68.38845335!3d26.2441569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c2e7b5b7b7b7b%3A0x7b7b7b7b7b7b7b7b!2sNawabshah%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="380"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nawabshah, Sindh, Pakistan"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
