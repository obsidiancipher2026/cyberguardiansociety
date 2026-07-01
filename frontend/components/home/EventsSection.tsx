'use client';

import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const events = [
  {
    title: 'Monthly Cyber Threat Briefing',
    date: 'Every First Saturday',
    time: '3:00 PM UTC',
    location: 'Virtual (Discord)',
    type: 'Webinar',
    live: true,
  },
  {
    title: 'CTF: Capture The Flag',
    date: 'Bi-Weekly Friday',
    time: '6:00 PM UTC',
    location: 'Virtual (CTF Platform)',
    type: 'Competition',
    live: false,
  },
  {
    title: 'Hands-on Workshop: Web Security',
    date: 'Every Third Sunday',
    time: '2:00 PM UTC',
    location: 'Virtual (Zoom)',
    type: 'Workshop',
    live: false,
  },
  {
    title: 'Incident Response Simulation',
    date: 'Monthly Wednesday',
    time: '5:00 PM UTC',
    location: 'Virtual (Discord)',
    type: 'Workshop',
    live: false,
  },
];

export default function EventsSection() {
  return (
    <section className="relative py-[140px] overflow-hidden bg-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-aurora opacity-20" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-label">Upcoming Events</div>
              <h2 className="section-title">Join Our Next Session</h2>
              <p className="section-subtitle">
                Regular meetups, workshops, and CTF competitions designed to sharpen your skills.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-aurora-cyan hover:text-aurora-violet transition-colors shrink-0"
            >
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealOnScroll>

        {/* Horizontal scroll rail */}
        <RevealOnScroll delay={100}>
          <div className="scroll-rail">
            {events.map((event) => (
              <div
                key={event.title}
                className="glass-card p-6 min-w-[300px] max-w-[340px]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="mono-label text-aurora-violet">{event.type}</span>
                  {event.live && <span className="badge-live">Live</span>}
                </div>
                <h3 className="font-display font-semibold text-text-primary text-lg mb-4">
                  {event.title}
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4 text-aurora-violet shrink-0" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <Clock className="w-4 h-4 text-aurora-cyan shrink-0" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <MapPin className="w-4 h-4 text-aurora-emerald shrink-0" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
