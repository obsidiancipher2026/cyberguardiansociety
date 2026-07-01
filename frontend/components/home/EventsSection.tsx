'use client';

import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const events = [
  {
    title: 'Monthly Cyber Threat Briefing',
    date: 'Every First Saturday',
    time: '3:00 PM UTC',
    location: 'Virtual (Discord)',
    type: 'Webinar',
  },
  {
    title: 'CTF: Capture The Flag',
    date: 'Bi-Weekly Friday',
    time: '6:00 PM UTC',
    location: 'Virtual (CTF Platform)',
    type: 'Competition',
  },
  {
    title: 'Hands-on Workshop: Web Security',
    date: 'Every Third Sunday',
    time: '2:00 PM UTC',
    location: 'Virtual (Zoom)',
    type: 'Workshop',
  },
];

export default function EventsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label">Upcoming Events</div>
            <h2 className="section-title">Join Our Next Session</h2>
            <p className="section-subtitle">Regular meetups, workshops, and CTF competitions designed to sharpen your skills.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-electric hover:text-electric/80 transition-colors shrink-0"
          >
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.title} className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-electric bg-electric/10 px-2 py-0.5 rounded-full">
                  {event.type}
                </span>
              </div>
              <h3 className="font-display font-semibold text-white-primary text-lg mb-4">{event.title}</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-text-muted">
                  <Calendar className="w-4 h-4 text-electric shrink-0" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-text-muted">
                  <Clock className="w-4 h-4 text-cyan shrink-0" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-text-muted">
                  <MapPin className="w-4 h-4 text-red shrink-0" />
                  {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
