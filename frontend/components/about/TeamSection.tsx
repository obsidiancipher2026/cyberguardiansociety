'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { team, type TeamMember, type Tier } from '@/data/team';
import '@/styles/team.css';

const SOCIAL_ICONS: Record<string, string> = {
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  github: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
};

function SocialIcon({ platform }: { platform: string }) {
  const path = SOCIAL_ICONS[platform];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d={path} />
    </svg>
  );
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const tier = member.tier as Tier;
  const initials = member.name.split(' ').map(n => n[0]).join('');
  const hasSocials = Object.keys(member.socials).length > 0;
  const socialKeys = Object.keys(member.socials);

  return (
    <div
      className={`team-card ${tier}`}
      data-index={index}
      role="article"
      aria-label={`${member.name} — ${member.title}`}
    >
      <div className={`team-card-border-glow ${tier}`} aria-hidden="true" />

      <div className="team-card-content">
        <div className={`team-card-photo ${tier}`}>
          <div className={`team-card-photo-ring ${tier}`} aria-hidden="true" />
          {member.photo ? (
            <Image
              src={member.photo}
              alt={`${member.name} — ${member.title}`}
              width={tier === 'leadership' ? 140 : tier === 'core' ? 110 : 96}
              height={tier === 'leadership' ? 140 : tier === 'core' ? 110 : 96}
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0A0A0F]">
              <span style={{ fontSize: tier === 'leadership' ? 32 : 24, fontWeight: 700, color: 'rgba(255,255,255,0.1)' }}>
                {initials}
              </span>
            </div>
          )}
        </div>

        <div className={`team-role-badge ${tier}`}>
          {tier === 'leadership' && (
            <span className="leadership-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          )}
          {member.roleBadge}
        </div>

        <h3 className={`team-card-name ${tier}`}>{member.name}</h3>
        {member.specialty && (
          <p className="team-card-specialty">{member.specialty}</p>
        )}

        {member.bio && <p className="team-card-bio">{member.bio}</p>}

        {member.skills.length > 0 && (
          <div className="team-card-skills">
            {member.skills.slice(0, 4).map(skill => (
              <span key={skill} className="team-skill-tag">{skill}</span>
            ))}
          </div>
        )}

        {hasSocials && (
          <div className="team-card-socials">
            {socialKeys.map(platform => (
              <a
                key={platform}
                href={member.socials[platform]}
                target="_blank"
                rel="noopener noreferrer"
                className="team-social-link"
                aria-label={`${member.name} on ${platform}`}
                onClick={e => e.stopPropagation()}
              >
                <SocialIcon platform={platform} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      setVisible(true);
      section.querySelectorAll('.team-card').forEach(el => el.classList.add('visible'));
      headerRef.current?.classList.add('team-header-animate');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerRef.current?.classList.add('team-header-animate');

          const cards = section.querySelectorAll<HTMLElement>('.team-card');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, 300 + i * 80);
          });

          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const leadership = team.filter(m => m.tier === 'leadership');
  const core = team.filter(m => m.tier === 'core');
  const general = team.filter(m => m.tier === 'general');

  return (
    <section ref={sectionRef} className="team-section" aria-labelledby="team-title">
      <div className="team-glow-orbs" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="team-header">
          <span className="team-eyebrow">The Operators</span>
          <h2 id="team-title" className="team-title">
            Our <span className="accent-red">Team</span>
          </h2>
          <p className="team-subtitle">
            A collective of cybersecurity professionals, researchers, and enthusiasts united in defending the digital frontier.
          </p>
          <div className="team-divider" aria-hidden="true" />
        </div>

        {leadership.length > 0 && (
          <div className="team-grid-leadership">
            {leadership.map((member, i) => (
              <div key={member.name} className="team-card-leadership">
                <TeamCard member={member} index={i} />
              </div>
            ))}
          </div>
        )}

        {core.length > 0 && (
          <div className="team-grid-core">
            {core.map((member, i) => (
              <TeamCard key={member.name} member={member} index={leadership.length + i} />
            ))}
          </div>
        )}

        <div className="team-grid-general">
          {general.map((member, i) => (
            <TeamCard key={member.name} member={member} index={leadership.length + core.length + i} />
          ))}
        </div>
      </div>
    </section>
  );
}
