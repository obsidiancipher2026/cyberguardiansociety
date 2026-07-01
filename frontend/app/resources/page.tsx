'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Loader2, BookOpen, Wrench, AlertTriangle, Library, Bell } from 'lucide-react';
import api from '@/utils/api';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import AuroraGlow from '@/components/ui/AuroraGlow';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  url: string;
}

const categories = [
  { name: 'Guides', icon: BookOpen, color: 'aurora-violet', description: 'Step-by-step tutorials and walkthroughs' },
  { name: 'Workshops', icon: Wrench, color: 'aurora-cyan', description: 'Hands-on training sessions and labs' },
  { name: 'Threat Reports', icon: AlertTriangle, color: 'aurora-emerald', description: 'Latest threat intelligence and analysis' },
  { name: 'Tool Library', icon: Library, color: 'signal-amber', description: 'Curated security tools and utilities' },
];

const terminalLines = [
  { prefix: '~', text: 'scanning resource database...', delay: 0 },
  { prefix: '>', text: 'intel feeds: syncing', delay: 800 },
  { prefix: '>', text: 'tool repository: indexing', delay: 1600 },
  { prefix: '~', text: 'status: compiling intelligence', delay: 2400 },
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get('/resources', { params: { limit: 50 } });
        setResources(res.data.data || []);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  useEffect(() => {
    if (loading || resources.length > 0) return;
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev < terminalLines.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, [loading, resources.length]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <section className="relative py-[140px] overflow-hidden">
        <AuroraGlow color="violet" size={800} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24 text-center">
          <RevealOnScroll>
            <span className="mono-label text-aurora-cyan mb-4 inline-block">RESOURCES</span>
            <h1 className="font-display font-extrabold text-text-primary mb-4" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
              <span className="gradient-text">Cyber</span> Resources
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto" style={{ fontSize: '15px' }}>
              Tools, documentation, and learning materials to sharpen your cybersecurity edge.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Terminal Typing / Empty State */}
      <section className="pb-[100px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <RevealOnScroll delay={100}>
            {loading ? (
              <div className="glass-card p-8 text-center max-w-lg mx-auto">
                <Loader2 className="w-5 h-5 text-aurora-cyan animate-spin mx-auto mb-3" />
                <p className="text-text-muted text-[13px]">Loading resources...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="glass-card overflow-hidden max-w-lg mx-auto">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
                  <span className="mono-label text-[10px] text-aurora-cyan tracking-wider">TERMINAL</span>
                </div>
                <div className="bg-base rounded-b-2xl p-6 font-mono text-[13px] min-h-[140px]">
                  {terminalLines.map((line, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 mb-1 transition-opacity duration-300 ${i <= activeLine ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <span className="text-aurora-violet select-none">{line.prefix}</span>
                      <span className="text-aurora-cyan">{line.text}</span>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <span className="text-aurora-violet select-none">&gt;</span>
                    <span className="text-text-muted animate-pulse">_</span>
                  </div>
                </div>
              </div>
            ) : null}
          </RevealOnScroll>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-[140px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <RevealOnScroll>
            <div className="section-label justify-center">Categories</div>
            <h2 className="section-title text-center">
              Explore by <span className="gradient-text">Domain</span>
            </h2>
            <p className="section-subtitle mx-auto text-center">
              Browse our growing library of cybersecurity resources organized by focus area.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <RevealOnScroll key={cat.name} delay={i * 80}>
                  <div className="glass-card p-7 relative overflow-hidden group hover:border-white/[0.12] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-${cat.color}/10 flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${cat.color}`} />
                      </div>
                      <span className={`mono-label text-${cat.color} text-[10px]`}>COMING SOON</span>
                    </div>
                    <h3 className="font-display font-semibold text-text-primary mb-2" style={{ fontSize: '15px' }}>
                      {cat.name}
                    </h3>
                    <p className="text-text-secondary text-[13px] leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid (when data exists) */}
      {resources.length > 0 && (
        <section className="pb-[140px]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
            <RevealOnScroll>
              <div className="section-label justify-center">All Resources</div>
              <h2 className="section-title text-center">Available <span className="gradient-text">Resources</span></h2>
              <p className="section-subtitle mx-auto text-center">
                Explore the latest tools, guides, and intelligence from the community.
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {resources.map((r, i) => (
                <RevealOnScroll key={r.id} delay={i * 60}>
                  <div className="glass-card p-6 h-full flex flex-col group hover:border-white/[0.12] transition-all duration-300">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      {r.url ? (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display font-semibold text-text-primary hover:text-aurora-violet transition-colors"
                          style={{ fontSize: '15px' }}
                        >
                          {r.title}
                        </a>
                      ) : (
                        <h3 className="font-display font-semibold text-text-primary" style={{ fontSize: '15px' }}>
                          {r.title}
                        </h3>
                      )}
                      <span className="mono-label text-aurora-violet text-[9px] shrink-0">{r.category}</span>
                    </div>
                    <p className="text-text-secondary mb-4 line-clamp-3 flex-1 text-[13px] leading-relaxed">
                      {r.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <span className="mono-label text-aurora-cyan text-[9px]">{r.level}</span>
                      {r.url && (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[13px] text-aurora-cyan hover:text-aurora-violet transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" /> Access
                        </a>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Email Capture */}
      <section className="pb-[140px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <RevealOnScroll>
            <div className="glass-card p-10 md:p-14 text-center max-w-2xl mx-auto relative overflow-hidden">
              <AuroraGlow color="mixed" size={400} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-aurora-violet/10 flex items-center justify-center mx-auto mb-5">
                  <Bell className="w-6 h-6 text-aurora-violet" />
                </div>
                <h2 className="section-title mb-3">Get <span className="gradient-text">Notified</span></h2>
                <p className="text-text-secondary text-[14px] mb-8 max-w-md mx-auto">
                  Be the first to know when new resources, tools, and intelligence reports go live.
                </p>

                {subscribed ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-aurora-emerald/10 border border-aurora-emerald/20">
                    <span className="mono-label text-aurora-emerald text-[11px]">You&apos;re on the list — we&apos;ll be in touch.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      required
                      className="flex-1 bg-surface border border-white/[0.08] rounded-xl px-5 py-3 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-aurora-violet/40 transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-aurora-violet text-white font-medium text-[14px] hover:bg-aurora-violet/90 transition-colors shrink-0"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
