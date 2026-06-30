'use client';

import { useState, useEffect } from 'react';
import { Shield, Star, Quote, GraduationCap, HeartHandshake, Loader2 } from 'lucide-react';
import api from '@/utils/api';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  type: string;
  role: string;
  rating: number;
}

export default function TestimonialsPage() {
  const [studentReviews, setStudentReviews] = useState<Testimonial[]>([]);
  const [volunteerReviews, setVolunteerReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-20 overflow-hidden hero-mesh">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="terminal-eyebrow mb-4 inline-block">TESTIMONIALS</span>
          <h1 className="font-display font-extrabold text-red-threat mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Community <span className="text-cyan-core">Stories</span>
          </h1>
          <p className="text-white-muted max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
            Hear from our community members about their cybersecurity journey and experiences.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-abyss">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-cyan-ghost flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-cyan-core" />
            </div>
            <h2 className="font-display font-bold text-red-threat" style={{ fontSize: 'clamp(20px, 2.5vw, 24px)' }}>
              Student <span className="text-cyan-core">Reviews</span>
            </h2>
          </div>
          {loading ? (
            <div className="text-center py-16 bg-surface border border-border rounded-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Loader2 className="w-6 h-6 text-cyan-core animate-spin mx-auto mb-3" />
              <p className="text-white-muted" style={{ fontSize: '13px' }}>Loading...</p>
            </div>
          ) : studentReviews.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 skeleton" />
                  <div className="relative z-10">
                    <Quote className="w-8 h-8 text-cyan-core/20 mb-4" />
                    <div className="h-3 bg-surface-raised rounded w-3/4 mb-2" />
                    <div className="h-3 bg-surface-raised rounded w-1/2 mb-4" />
                    <div className="h-3 bg-surface-raised rounded w-full mb-2" />
                    <div className="h-3 bg-surface-raised rounded w-2/3" />
                  </div>
                </div>
              ))}
              <div className="col-span-full text-center mt-4">
                <p className="text-white-ghost" style={{ fontSize: '13px' }}>Be the first to share your story. →</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentReviews.map((t) => (
                <div key={t.id} className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-core" />
                  <Quote className="w-8 h-8 text-cyan-core/20 mb-4" />
                  <p className="text-white-muted mb-5 line-clamp-4 italic" style={{ fontSize: '14px' }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-core to-purple-glow flex items-center justify-center text-void text-xs font-bold">{t.name.charAt(0)}</div>
                    <div>
                      <p className="text-[13px] font-semibold text-white-primary">{t.name}</p>
                      <p className="font-mono text-[10px] text-cyan-dim tracking-wider uppercase">{t.role || 'Student'}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-cyan-core text-cyan-core" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-purple-glow/10 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-purple-glow" />
            </div>
            <h2 className="font-display font-bold text-red-threat" style={{ fontSize: 'clamp(20px, 2.5vw, 24px)' }}>
              Volunteer <span className="text-purple-glow">Reviews</span>
            </h2>
          </div>
          {loading ? (
            <div className="text-center py-16 bg-surface border border-border rounded-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Loader2 className="w-6 h-6 text-purple-glow animate-spin mx-auto mb-3" />
              <p className="text-white-muted" style={{ fontSize: '13px' }}>Loading...</p>
            </div>
          ) : volunteerReviews.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 skeleton" />
                  <div className="relative z-10">
                    <Quote className="w-8 h-8 text-purple-glow/20 mb-4" />
                    <div className="h-3 bg-surface-raised rounded w-3/4 mb-2" />
                    <div className="h-3 bg-surface-raised rounded w-1/2 mb-4" />
                    <div className="h-3 bg-surface-raised rounded w-full mb-2" />
                    <div className="h-3 bg-surface-raised rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteerReviews.map((t) => (
                <div key={t.id} className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-purple-glow" />
                  <Quote className="w-8 h-8 text-purple-glow/20 mb-4" />
                  <p className="text-white-muted mb-5 line-clamp-4 italic" style={{ fontSize: '14px' }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-glow to-red-threat flex items-center justify-center text-white-primary text-xs font-bold">{t.name.charAt(0)}</div>
                    <div>
                      <p className="text-[13px] font-semibold text-white-primary">{t.name}</p>
                      <p className="font-mono text-[10px] text-purple-glow/70 tracking-wider uppercase">{t.role || 'Volunteer'}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-purple-glow text-purple-glow" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-abyss">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="terminal-eyebrow mb-4 inline-block">SHARE YOUR STORY</span>
          <h2 className="font-display font-bold text-red-threat mb-3" style={{ fontSize: 'clamp(24px, 3vw, 30px)' }}>
            Share Your <span className="text-cyan-core">Story</span>
          </h2>
          <p className="text-white-muted mb-6" style={{ fontSize: '15px' }}>
            Your experience could inspire the next generation of cybersecurity professionals.
            Join our community and become part of something bigger.
          </p>
          <div className="inline-flex items-center gap-2 text-white-ghost" style={{ fontSize: '13px' }}>
            <span className="font-mono">Join</span>
            <span className="text-cyan-core font-semibold">500+</span>
            <span className="font-mono">community members</span>
          </div>
        </div>
      </section>
    </div>
  );
}
