'use client';

import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex M.',
    role: 'Security Analyst',
    content: 'CGS transformed my career. The mentorship program and hands-on CTFs gave me the practical skills I needed to land my first role in cybersecurity.',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Computer Science Student',
    content: 'The community here is incredible. Everyone is willing to help, and the weekly workshops cover exactly what universities do not teach.',
    rating: 5,
  },
  {
    name: 'James R.',
    role: 'IT Professional',
    content: 'I have been in IT for years, but CGS helped me specialize in security. The threat intelligence briefings alone are worth joining.',
    rating: 5,
  },
  {
    name: 'Priya L.',
    role: 'Penetration Tester',
    content: 'The advanced CTF challenges pushed me to think like an attacker. I reference what I learned here almost daily in my work.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-void">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/30 via-transparent to-abyss/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-label justify-center">Testimonials</div>
          <h2 className="section-title">What Our Members Say</h2>
          <p className="section-subtitle mx-auto">
            Hear from the people who make this community great — our members.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 md:p-10 text-center relative">
            <Quote className="w-10 h-10 text-electric/30 mx-auto mb-6" />

            <p className="text-lg md:text-xl text-white-primary leading-relaxed mb-8 font-display">
              &ldquo;{testimonials[current].content}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-cyan fill-cyan/40" />
              ))}
            </div>

            <div className="mb-6">
              <p className="font-display font-semibold text-white-primary">{testimonials[current].name}</p>
              <p className="text-sm text-text-muted">{testimonials[current].role}</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full glass-card-static flex items-center justify-center hover:border-electric/40 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-text-muted" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-electric w-5' : 'bg-text-ghost'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full glass-card-static flex items-center justify-center hover:border-electric/40 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
