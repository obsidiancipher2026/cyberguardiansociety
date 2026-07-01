'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const testimonials = [
  {
    name: 'Alex M.',
    role: 'Security Analyst',
    content: 'CGS transformed my career. The mentorship program and hands-on CTFs gave me the practical skills I needed to land my first role in cybersecurity.',
  },
  {
    name: 'Sarah K.',
    role: 'Computer Science Student',
    content: 'The community here is incredible. Everyone is willing to help, and the weekly workshops cover exactly what universities do not teach.',
  },
  {
    name: 'James R.',
    role: 'IT Professional',
    content: 'I have been in IT for years, but CGS helped me specialize in security. The threat intelligence briefings alone are worth joining.',
  },
  {
    name: 'Priya L.',
    role: 'Penetration Tester',
    content: 'The advanced CTF challenges pushed me to think like an attacker. I reference what I learned here almost daily in my work.',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="relative py-[140px] overflow-hidden bg-base">
      <div className="absolute inset-0 bg-gradient-aurora-subtle opacity-20" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="section-label justify-center">Testimonials</div>
            <h2 className="section-title">What Our Members Say</h2>
            <p className="section-subtitle mx-auto">
              Hear from the people who make this community great.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-10 md:p-12 text-center relative">
              {/* Subtle quote watermark */}
              <Quote className="w-16 h-16 text-aurora-violet/10 mx-auto mb-6" />

              <p className="text-xl md:text-2xl text-text-primary leading-relaxed mb-8 font-display">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>

              <div className="mb-8">
                <p className="font-display font-semibold text-text-primary text-lg">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  {testimonials[current].role}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center hover:border-aurora-violet/30 hover:bg-aurora-violet/[0.06] transition-all duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 text-text-secondary" />
                </button>

                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === current
                          ? 'w-6 bg-gradient-aurora'
                          : 'w-1.5 bg-white/10 hover:bg-white/20'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center hover:border-aurora-violet/30 hover:bg-aurora-violet/[0.06] transition-all duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
