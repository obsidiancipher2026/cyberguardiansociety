'use client';

import { useEffect, useRef, useState } from 'react';
import { Linkedin, Github, Instagram, Mail, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role_badge: string;
  title: string;
  specialty: string;
  bio: string;
  more_detail: string;
  skills: string[];
  certs: string[];
  socials: Record<string, string>;
  photo: string;
}

const team: TeamMember[] = [
  {
    name: 'Shayan Ahmed',
    role_badge: 'Founder',
    title: 'Founder & Director',
    specialty: 'Cybersecurity Strategy · Leadership',
    bio: 'Provides strategic vision, leads organizational growth, oversees operations, and drives the long-term mission of Cyber Guardians Society.',
    more_detail: 'Responsible for setting the overall direction of the organization, establishing partnerships, securing resources, and ensuring the team stays aligned with the mission of making cybersecurity education accessible to all.',
    skills: ['Leadership', 'Cybersecurity Strategy', 'Community Building', 'Project Management'],
    certs: ['CISSP', 'CEH', 'CISM'],
    socials: { linkedin: 'https://www.linkedin.com/in/shayanahmedmughal/', instagram: 'https://www.instagram.com/shayanahmed806/', github: 'https://github.com/OperationZero-GHH', gmail: 'mailto:sakingplays@gmail.com', whatsapp: 'https://wa.me/923261458036' },
    photo: '/images/team/shayan-ahmed.jpeg',
  },
  {
    name: 'Muhammad Saad',
    role_badge: 'Deputy Lead',
    title: 'Deputy Lead Coordinator',
    specialty: 'Operations · Strategic Planning',
    bio: 'Supports organizational leadership by coordinating teams, managing day-to-day operations, and ensuring successful execution of projects and community objectives.',
    more_detail: 'Oversees inter-department communication, tracks project milestones, facilitates decision-making, and steps in to lead initiatives when needed to maintain operational continuity.',
    skills: ['Operations Management', 'Team Coordination', 'Strategic Planning'],
    certs: ['PMP', 'ITIL'],
    socials: {},
    photo: '/images/team/muhammad-saad.jpeg',
  },
  {
    name: 'Muhammad Taha',
    role_badge: 'Technical Lead',
    title: 'Technical Department Lead',
    specialty: 'Penetration Testing · CTF Design',
    bio: 'Leads cybersecurity initiatives, develops CTF challenges, conducts security assessments, and ensures technical infrastructure reliability.',
    more_detail: 'Manages the technical team, designs hands-on cybersecurity training modules, oversees lab infrastructure, and drives technical content development for workshops and events.',
    skills: ['Web Development', 'Network Security', 'CTF Design', 'Penetration Testing'],
    certs: ['OSCP', 'CEH', 'PNPT'],
    socials: {},
    photo: '/images/team/muhammad-taha.jpeg',
  },
  {
    name: 'Esha Javed',
    role_badge: 'Graphics Lead',
    title: 'Graphics Design Department Lead',
    specialty: 'Brand Identity · UI/UX Design',
    bio: 'Creates impactful visual content, maintains brand consistency, and develops professional designs for events, campaigns, and community identity.',
    more_detail: 'Leads the design team in creating social media graphics, event banners, presentation templates, and maintains the visual identity guidelines across all CGS platforms.',
    skills: ['Graphic Design', 'Brand Identity', 'UI/UX Design', 'Visual Storytelling'],
    certs: ['Adobe ACE', 'Google UX'],
    socials: {},
    photo: '/images/team/esha-javed.jpeg',
  },
  {
    name: 'Jannat Fatima',
    role_badge: 'Media Lead',
    title: 'Media & Communications Lead',
    specialty: 'Content Writing · Digital Marketing',
    bio: 'Manages official communications, social media platforms, public announcements, and digital engagement for the community.',
    more_detail: 'Develops content calendars, writes press releases, manages social media accounts, analyzes engagement metrics, and ensures consistent brand messaging across all channels.',
    skills: ['Content Writing', 'Social Media Management', 'Public Relations', 'Digital Marketing'],
    certs: ['Google Digital Marketing', 'Hootsuite'],
    socials: { linkedin: 'https://www.linkedin.com/in/jannat-rajput-2367a038b' },
    photo: '/images/team/jannat-fatima.jpg',
  },
  {
    name: 'Muhammad Asad',
    role_badge: 'Events Lead',
    title: 'Event Management Lead',
    specialty: 'Event Planning · Public Speaking',
    bio: 'Plans, organizes, and executes community events, workshops, competitions, and initiatives ensuring smooth coordination and exceptional experiences.',
    more_detail: 'Handles end-to-end event logistics, coordinates with speakers and sponsors, manages registration systems, and leads post-event analysis to continuously improve the event experience.',
    skills: ['Event Planning', 'Video Editing', 'Public Speaking', 'Team Leadership'],
    certs: ['CMP', 'PMP'],
    socials: { linkedin: 'https://www.linkedin.com/in/asad-malik-9624883b6', instagram: 'https://www.instagram.com/asadziaa__', github: 'https://github.com/azumalik1122-ctrl', gmail: 'mailto:azumalik1122@gmail.com' },
    photo: '/images/team/muhammad-asad.jpeg',
  },
  {
    name: 'Bisma Soomro',
    role_badge: 'Community Lead',
    title: 'Community & Outreach Lead',
    specialty: 'Community Management · Networking',
    bio: 'Builds relationships with members and partners, fosters engagement, and leads outreach and networking initiatives.',
    more_detail: 'Develops community engagement strategies, manages member onboarding, organizes networking events, and builds partnerships with educational institutions and industry organizations.',
    skills: ['Community Management', 'Outreach', 'Networking', 'Event Coordination'],
    certs: ['Community Mgmt', 'CRM'],
    socials: { linkedin: 'https://www.linkedin.com/in/bisma-soomro-4637773b6' },
    photo: '/images/team/bisma-soomro.jpeg',
  },
  {
    name: 'Wania Fatima',
    role_badge: 'Content Lead',
    title: 'Content & Documentation Lead',
    specialty: 'Technical Writing · Documentation',
    bio: 'Develops and manages high-quality written content and technical documentation ensuring clear communication across all community resources.',
    more_detail: 'Oversees content creation for the website, blog posts, tutorials, documentation, and resource libraries. Ensures all content meets quality standards and aligns with the community mission.',
    skills: ['Technical Writing', 'Documentation', 'Content Strategy', 'Editing'],
    certs: ['Technical Writing Pro', 'DocOps'],
    socials: { linkedin: 'https://www.linkedin.com/in/wania-fatima/' },
    photo: '/images/team/wania-fatima.jpeg',
  },
];

const socialIcons: Record<string, { icon: React.ElementType; color: string }> = {
  linkedin: { icon: Linkedin, color: 'hover:text-[#0A66C2]' },
  github: { icon: Github, color: 'hover:text-white' },
  instagram: { icon: Instagram, color: 'hover:text-[#E4405F]' },
  gmail: { icon: Mail, color: 'hover:text-[#EA4335]' },
  whatsapp: { icon: MessageCircle, color: 'hover:text-[#25D366]' },
};

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const allIndices = new Set(team.map((_, i) => i));
          if (reducedMotion) {
            setVisibleCards(allIndices);
          } else {
            team.forEach((_, i) => {
              setTimeout(() => {
                setVisibleCards((prev) => new Set(prev).add(i));
              }, i * 100);
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const handleCardInteraction = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const isFlipped = (i: number) => flipped.has(i);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .team-grid-section {
          background: #0A0E14;
          position: relative;
        }
        .team-grid-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(239,68,68,0.04) 0%, transparent 50%);
          pointer-events: none;
        }
        .header-accent-line {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #3B82F6, #EF4444);
          border-radius: 2px;
          margin: 16px auto 0;
        }

        .team-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .team-card-inner.flipped {
          transform: rotateY(180deg);
        }
        .team-card-front,
        .team-card-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(160deg, rgba(17,22,31,0.95), rgba(13,17,23,0.98));
          border: 1px solid rgba(59,130,246,0.12);
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .team-card-back {
          transform: rotateY(180deg);
          justify-content: center;
          text-align: center;
          gap: 10px;
          padding: 28px 20px;
          overflow-y: auto;
        }
        .team-card-wrapper {
          perspective: 1200px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .team-card-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .team-card-wrapper:hover .team-card-front {
          border-color: rgba(59,130,246,0.35);
          box-shadow: 0 8px 40px rgba(59,130,246,0.12), 0 0 60px rgba(59,130,246,0.05);
        }
        .team-card-wrapper:hover .team-card-back {
          border-color: rgba(239,68,68,0.35);
          box-shadow: 0 8px 40px rgba(239,68,68,0.12), 0 0 60px rgba(239,68,68,0.05);
        }

        .avatar-ring {
          position: relative;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #3B82F6, #EF4444);
          box-shadow: 0 0 12px rgba(59,130,246,0.2);
          transition: box-shadow 0.3s ease;
        }
        .avatar-ring.pulsing {
          animation: avatarPulse 4s ease-in-out infinite;
        }
        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(59,130,246,0.2); }
          50% { box-shadow: 0 0 24px rgba(59,130,246,0.35); }
        }
        .team-card-wrapper:hover .avatar-ring {
          box-shadow: 0 0 24px rgba(59,130,246,0.4);
        }

        .cert-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(59,130,246,0.08);
          color: #60A5FA;
          border: 1px solid rgba(59,130,246,0.2);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .team-card-wrapper:hover .cert-badge {
          background: rgba(59,130,246,0.15);
          border-color: rgba(59,130,246,0.35);
        }

        .flip-hint {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: rgba(59,130,246,0.5);
          transition: background 0.2s ease, color 0.2s ease;
          cursor: pointer;
          z-index: 5;
          pointer-events: auto;
        }
        .team-card-wrapper:hover .flip-hint {
          background: rgba(59,130,246,0.2);
          color: #60A5FA;
        }
        .team-card-wrapper.flipped-state .flip-hint {
          background: rgba(239,68,68,0.2);
          color: #EF4444;
          border-color: rgba(239,68,68,0.3);
        }

        @media (prefers-reduced-motion: reduce) {
          .team-card-inner { transition: none; }
          .team-card-wrapper { transition: none; }
          .team-card-wrapper.visible { transition: none; }
          .avatar-ring { animation: none !important; }
          .team-card-wrapper:hover .team-card-front,
          .team-card-wrapper:hover .team-card-back { transition: none; }
        }
      ` }} />

      <div className="team-grid-section relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-core uppercase mb-4 inline-block">
              — OUR TEAM —
            </span>
            <h2 className="font-display font-extrabold text-red-threat leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Meet the Defenders of<br />Your Digital Assets
            </h2>
            <p className="text-white-muted mt-4 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)' }}>
              Decades of combined experience in threat intelligence, penetration testing, and incident response.
            </p>
            <div className="header-accent-line" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, i) => {
              const hasPhoto = !!member.photo;
              const initials = member.name.split(' ').map(n => n[0]).join('');
              const hasSocials = Object.keys(member.socials).length > 0;
              const flipped = isFlipped(i);

              return (
                <div
                  key={member.name}
                  className={`team-card-wrapper ${visibleCards.has(i) ? 'visible' : ''} ${flipped ? 'flipped-state' : ''}`}
                  style={{ transitionDelay: reducedMotion ? '0ms' : `${i * 80}ms` }}
                >
                  <div
                    className="team-card-inner"
                    style={{ minHeight: '420px' }}
                    onClick={() => { handleCardInteraction(i); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardInteraction(i); } }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${member.name} — ${flipped ? 'Show front' : 'Show details'}`}
                  >
                    {/* Front Face */}
                    <div className="team-card-front">
                      {/* Flip hint icon */}
                      <div
                        className="flip-hint"
                        onClick={(e) => { e.stopPropagation(); handleCardInteraction(i); }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); handleCardInteraction(i); } }}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {flipped ? '✕' : '↻'}
                      </div>

                      {/* Avatar */}
                      <div className={`avatar-ring ${reducedMotion ? '' : 'pulsing'} mb-5 mt-2`}>
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-[#0D1117]">
                          {hasPhoto ? (
                            <Image
                              src={member.photo}
                              alt={`${member.name} — ${member.title}`}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-core/10 to-red-threat/10">
                              <span className="text-2xl font-bold text-white/15">{initials}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Name & Title */}
                      <h3 className="font-display font-bold text-white-primary text-center text-lg leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-cyan-core text-xs font-medium mt-1 text-center">
                        {member.title}
                      </p>

                      {/* Specialty */}
                      <p className="text-white-ghost text-[11px] font-mono mt-2 text-center leading-relaxed">
                        {member.specialty}
                      </p>

                      {/* Cert Badges */}
                      <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                        {member.certs.map((cert) => (
                          <span key={cert} className="cert-badge">{cert}</span>
                        ))}
                      </div>

                      {/* Social Links */}
                      {hasSocials && (
                        <div className="flex items-center justify-center gap-2.5 mt-auto pt-5">
                          {Object.entries(member.socials).map(([key, href]) => {
                            const s = socialIcons[key];
                            if (!s) return null;
                            const Icon = s.icon;
                            return (
                              <a
                                key={key}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-white-ghost ${s.color} transition-colors p-1.5 rounded-lg hover:bg-white/[0.04]`}
                                aria-label={`${member.name} on ${key}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Icon className="w-4 h-4" />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Back Face */}
                    <div className="team-card-back">
                      <div
                        className="flip-hint"
                        onClick={(e) => { e.stopPropagation(); handleCardInteraction(i); }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); handleCardInteraction(i); } }}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {flipped ? '✕' : '↻'}
                      </div>

                      <h3 className="font-display font-bold text-white-primary text-base">
                        {member.name}
                      </h3>
                      <p className="text-red-threat text-xs font-medium mb-1">{member.title}</p>

                      <p className="text-white-muted text-xs leading-relaxed mt-2">
                        {member.bio}
                      </p>
                      <p className="text-white-ghost text-[11px] leading-relaxed mt-2 border-l-2 border-cyan-core/30 pl-3 text-left">
                        {member.more_detail}
                      </p>

                      {/* Full cert list on back */}
                      {member.certs.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                          {member.certs.map((cert) => (
                            <span key={cert} className="cert-badge">{cert}</span>
                          ))}
                        </div>
                      )}

                      {/* Social links on back */}
                      {hasSocials && (
                        <div className="flex items-center justify-center gap-2.5 mt-auto pt-3">
                          {Object.entries(member.socials).map(([key, href]) => {
                            const s = socialIcons[key];
                            if (!s) return null;
                            const Icon = s.icon;
                            return (
                              <a
                                key={key}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-white-ghost ${s.color} transition-colors p-1.5 rounded-lg hover:bg-white/[0.04]`}
                                aria-label={`${member.name} on ${key}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Icon className="w-4 h-4" />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
