import { Shield, Eye, Heart, Target, Users, BookOpen, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import AuroraGlow from '@/components/ui/AuroraGlow';

const TeamSection = dynamic(() => import('@/components/about/TeamSection'), { ssr: false });

const values = [
  { num: '01', icon: Shield, title: 'Integrity', desc: 'Upholding the highest ethical standards in all cybersecurity endeavors.' },
  { num: '02', icon: Eye, title: 'Vigilance', desc: 'Constant monitoring and proactive defense against emerging digital threats.' },
  { num: '03', icon: Heart, title: 'Community', desc: 'A supportive ecosystem where knowledge is freely shared and members uplift each other.' },
  { num: '04', icon: Target, title: 'Excellence', desc: 'Striving for quality in education, tools, and threat intelligence.' },
  { num: '05', icon: Users, title: 'Collaboration', desc: 'Working together across borders to defend the digital frontier.' },
  { num: '06', icon: BookOpen, title: 'Education', desc: 'Empowering individuals to protect themselves and others through knowledge.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero — shorter, standard pattern */}
      <section className="relative py-32 overflow-hidden bg-base">
        <AuroraGlow color="violet" size={600} className="top-[-30%] left-[-10%]" />
        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
          <RevealOnScroll>
            <span className="section-label justify-center">About Us</span>
            <h1 className="font-display font-extrabold text-text-primary mb-5" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              Securing Tomorrow,{' '}
              <span className="gradient-text">Today</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed text-[17px]">
              Our mission is to unite cybersecurity professionals, researchers, and
              enthusiasts in a collaborative community dedicated to making the digital
              world safer through shared knowledge and collective defense.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Core Values — numbered editorial list */}
      <section className="relative py-[140px] overflow-hidden bg-base">
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 lg:px-24">
          <RevealOnScroll>
            <div className="mb-16">
              <div className="section-label">Core Values</div>
              <h2 className="section-title">Our Core Values</h2>
            </div>
          </RevealOnScroll>

          <div className="space-y-0">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <RevealOnScroll key={v.title} delay={i * 60}>
                  <div className="flex items-start gap-6 py-6 border-b border-white/[0.06] group hover:bg-white/[0.01] transition-colors px-4 -mx-4 rounded-lg">
                    {/* Large mono number */}
                    <span className="font-mono text-4xl font-light text-white/[0.08] group-hover:text-aurora-violet/30 transition-colors shrink-0 w-16 text-right">
                      {v.num}
                    </span>
                    <div className="flex items-center gap-4 shrink-0">
                      <Icon className="w-5 h-5 text-aurora-violet" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-text-primary text-lg mb-1">
                        {v.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Presence / Map */}
      <section className="relative py-[140px] overflow-hidden bg-surface">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-aurora opacity-20" />
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 lg:px-24">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <div className="section-label justify-center">Presence</div>
              <h2 className="section-title">Our <span className="gradient-text">Presence</span></h2>
              <p className="section-subtitle mx-auto">
                Based in Nawabshah, Sindh, Pakistan — serving the global cybersecurity community.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="relative">
              {/* Floating location card */}
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base/90 border border-white/[0.08] backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-aurora-emerald animate-pulse" />
                <span className="mono-label text-aurora-cyan">Nawabshah, Pakistan</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/[0.08]" style={{ boxShadow: 'var(--shadow-card)' }}>
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
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
