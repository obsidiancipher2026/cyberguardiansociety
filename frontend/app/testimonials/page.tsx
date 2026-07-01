'use client';

import { useState, useEffect } from 'react';
import { Shield, Star, Quote, GraduationCap, HeartHandshake, Loader2, PenLine, Users } from 'lucide-react';
import api from '@/utils/api';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import AuroraGlow from '@/components/ui/AuroraGlow';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  type: string;
  role: string;
  rating: number;
}

type FilterKey = 'all' | 'student' | 'volunteer';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'student', label: 'Students' },
  { key: 'volunteer', label: 'Volunteers' },
];

export default function TestimonialsPage() {
  const [studentReviews, setStudentReviews] = useState<Testimonial[]>([]);
  const [volunteerReviews, setVolunteerReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const [studentsRes, volunteersRes] = await Promise.all([
          api.get('/testimonials', { params: { type: 'student', limit: 20 } }),
          api.get('/testimonials', { params: { type: 'volunteer', limit: 20 } }),
        ]);
        setStudentReviews(studentsRes.data.data || []);
        setVolunteerReviews(volunteersRes.data.data || []);
      } catch { } finally { setLoading(false); }
    };
    fetchTestimonials();
  }, []);

  const allReviews: Testimonial[] = [...studentReviews, ...volunteerReviews];
  const filteredReviews = activeFilter === 'all'
    ? allReviews
    : allReviews.filter((r) => r.type === activeFilter);

  const accentColors: Record<string, { border: string; icon: string; text: string; star: string; avatar: string }> = {
    student: {
      border: 'bg-aurora-cyan',
      icon: 'text-aurora-cyan',
      text: 'text-aurora-cyan/40',
      star: 'fill-aurora-cyan text-aurora-cyan',
      avatar: 'from-aurora-cyan to-aurora-violet',
    },
    volunteer: {
      border: 'bg-aurora-violet',
      icon: 'text-aurora-violet',
      text: 'text-aurora-violet/40',
      star: 'fill-aurora-violet text-aurora-violet',
      avatar: 'from-aurora-violet to-aurora-emerald',
    },
  };

  const getAccent = (type: string) => accentColors[type] || accentColors.student;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-base">
        <AuroraGlow color="mixed" size={700} className="top-[-40%] left-[-15%]" />
        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
          <RevealOnScroll>
            <span className="section-label justify-center">Testimonials</span>
            <h1 className="font-display font-extrabold text-text-primary mb-5" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
              Community <span className="gradient-text">Stories</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed text-[17px]">
              Hear from our community members about their cybersecurity journey and
              experiences within CyberGuardians Society.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Filter Toggle + Testimonials Grid */}
      <section className="relative py-[140px] overflow-hidden bg-surface">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-aurora opacity-20" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24">
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
              <div>
                <div className="section-label">Testimonials</div>
                <h2 className="section-title text-[clamp(28px,3.5vw,40px)]">All <span className="gradient-text">Stories</span></h2>
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-base border border-white/[0.08]">
                {filters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeFilter === f.key
                        ? 'bg-aurora-violet/15 text-aurora-violet border border-aurora-violet/20'
                        : 'text-text-muted hover:text-text-secondary border border-transparent'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20 glass-card-static rounded-2xl">
              <Loader2 className="w-6 h-6 text-aurora-violet animate-spin mx-auto mb-3" />
              <p className="text-text-muted text-sm">Loading testimonials…</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredReviews.length === 0 && (
            <RevealOnScroll>
              <div className="text-center py-20 glass-card-static rounded-2xl">
                <Quote className="w-10 h-10 text-aurora-violet/20 mx-auto mb-4" />
                <p className="text-text-secondary text-[15px] mb-2">No testimonials yet</p>
                <p className="text-text-muted text-sm">Be the first to share your story with the community.</p>
              </div>
            </RevealOnScroll>
          )}

          {/* Testimonials Grid — masonry-like */}
          {!loading && filteredReviews.length > 0 && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredReviews.map((t, idx) => {
                const accent = getAccent(t.type);
                return (
                  <RevealOnScroll key={t.id} delay={idx * 40} className="break-inside-avoid">
                    <div className="glass-card p-6 relative overflow-hidden group">
                      {/* Left accent border */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${accent.border} opacity-60 group-hover:opacity-100 transition-opacity`} />

                      <Quote className={`w-8 h-8 ${accent.text} mb-4`} />
                      <p className="text-text-secondary mb-6 leading-relaxed italic text-[14px] line-clamp-5">
                        &ldquo;{t.text}&rdquo;
                      </p>

                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${accent.avatar} flex items-center justify-center text-base text-xs font-bold shrink-0`}>
                          {t.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-text-primary truncate">{t.name}</p>
                          <p className="mono-label text-[10px] text-text-muted tracking-wider">{t.role || (t.type === 'student' ? 'Student' : 'Volunteer')}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5 shrink-0">
                          {Array.from({ length: t.rating || 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${accent.star}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}

              {/* "Be the first" embedded card */}
              <RevealOnScroll delay={filteredReviews.length * 40} className="break-inside-avoid">
                <div className="glass-card p-6 border-dashed border-white/[0.12] flex flex-col items-center justify-center text-center min-h-[200px] hover:border-aurora-violet/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-aurora-violet/10 flex items-center justify-center mb-4">
                    <PenLine className="w-5 h-5 text-aurora-violet" />
                  </div>
                  <p className="text-text-primary font-semibold text-[15px] mb-1">Be the first to share your story</p>
                  <p className="text-text-muted text-sm">Your journey matters. Inspire others.</p>
                </div>
              </RevealOnScroll>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story — two-column */}
      <section className="relative py-[140px] overflow-hidden bg-base">
        <AuroraGlow color="cyan" size={500} className="top-[-20%] right-[-10%]" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — copy + community count */}
            <RevealOnScroll>
              <span className="section-label">Share Your Story</span>
              <h2 className="section-title mb-6">
                Your Voice <span className="gradient-text">Matters</span>
              </h2>
              <p className="text-text-secondary text-[17px] leading-relaxed mb-8 max-w-lg">
                Your experience could inspire the next generation of cybersecurity
                professionals. Share your journey, lessons learned, and growth within
                the CyberGuardians community.
              </p>

              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-surface border border-white/[0.08]">
                <Users className="w-5 h-5 text-aurora-emerald" />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-bold gradient-text">500+</span>
                  <span className="text-text-muted text-sm">community members</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Right — inline form */}
            <RevealOnScroll delay={100}>
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-aurora-violet/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-aurora-violet" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary text-[15px]">Share Your Experience</h3>
                    <p className="mono-label text-[10px] text-text-muted">All fields are optional</p>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mono-label text-[10px] text-text-muted mb-1.5 block">Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Chen"
                        className="w-full px-4 py-2.5 rounded-lg bg-base border border-white/[0.08] text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-aurora-violet/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="mono-label text-[10px] text-text-muted mb-1.5 block">Role</label>
                      <select className="w-full px-4 py-2.5 rounded-lg bg-base border border-white/[0.08] text-text-primary text-sm focus:outline-none focus:border-aurora-violet/40 transition-colors appearance-none">
                        <option value="student">Student</option>
                        <option value="volunteer">Volunteer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mono-label text-[10px] text-text-muted mb-1.5 block">Your Story</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your experience in the community…"
                      className="w-full px-4 py-2.5 rounded-lg bg-base border border-white/[0.08] text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-aurora-violet/40 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="mono-label text-[10px] text-text-muted mb-1.5 block">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" className="text-text-muted hover:text-signal-amber transition-colors">
                          <Star className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-aurora-violet hover:bg-aurora-violet/90 text-white text-sm font-semibold transition-colors"
                  >
                    Submit Testimonial
                  </button>
                </form>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
