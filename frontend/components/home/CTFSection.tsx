'use client';

import { Terminal, Trophy, Users as UsersIcon, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ctfs = [
  {
    title: 'CGS Capture The Flag',
    description: 'Bi-weekly CTF challenges covering web exploitation, cryptography, reverse engineering, and forensics.',
    difficulty: 'All Levels',
    participants: '50+',
    rating: 4.8,
  },
  {
    title: 'Bug Bounty Simulation',
    description: 'Practice real-world bug hunting in a controlled environment with our custom vulnerable applications.',
    difficulty: 'Intermediate',
    participants: '30+',
    rating: 4.6,
  },
  {
    title: 'Annual Cyber Championship',
    description: 'Our flagship competition featuring complex multi-stage attack scenarios and live team collaboration.',
    difficulty: 'Advanced',
    participants: '100+',
    rating: 4.9,
  },
];

export default function CTFSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-void">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/30 via-transparent to-abyss/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-label justify-center">Featured CTFs</div>
          <h2 className="section-title">Test Your Skills</h2>
          <p className="section-subtitle mx-auto">
            Real-world cybersecurity challenges designed by industry professionals to push your limits and build practical expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ctfs.map((ctf) => (
            <div key={ctf.title} className="glass-card p-6 group">
              <div className="w-10 h-10 rounded-xl bg-red/10 border border-red/20 flex items-center justify-center mb-5 group-hover:bg-red/20 transition-colors">
                <Terminal className="w-5 h-5 text-red" />
              </div>
              <h3 className="font-display font-semibold text-white-primary text-lg mb-2">{ctf.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-5">{ctf.description}</p>
              <div className="flex items-center justify-between text-xs text-text-ghost">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-cyan fill-cyan/30" />
                  {ctf.rating}
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5 text-electric" />
                  {ctf.participants}
                </div>
                <span className="px-2 py-0.5 rounded-full bg-electric/10 text-electric text-[10px] font-semibold uppercase tracking-wider">
                  {ctf.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-text-muted text-sm font-medium hover:border-electric/50 hover:text-electric transition-all duration-200"
          >
            Explore All Challenges
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
