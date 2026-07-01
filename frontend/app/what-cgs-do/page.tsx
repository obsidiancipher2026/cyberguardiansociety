'use client';

import { useState, useEffect } from 'react';
import {
  Shield, Search, BookOpen, Users, Globe, Award, Target, Zap, Lock,
  Eye, Brain, Server, Radio, FileText, Briefcase, ArrowRight, HeartHandshake,
  Code, Cpu, Wifi, Fingerprint, Bug, Network, KeyRound, Radar, Loader2, ChevronDown,
} from 'lucide-react';
import api from '@/utils/api';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import AuroraGlow from '@/components/ui/AuroraGlow';

interface CgsSection {
  id: number;
  title: string;
  description: string;
  type: 'core-area' | 'program' | 'skill' | 'team-role';
  icon: string;
  order: number;
}

const iconMap: Record<string, any> = {
  Shield, Search, BookOpen, Users, Globe, Award, Target, Zap, Lock, Eye, Brain,
  Server, Radio, FileText, Briefcase, ArrowRight, HeartHandshake, Code, Cpu,
  Wifi, Fingerprint, Bug, Network, KeyRound, Radar,
};

const defaultCoreAreas = [
  { icon: Search, title: 'Threat Intelligence', desc: 'Aggregating and analyzing global threat data to provide real-time intelligence on emerging cyber threats, vulnerabilities, and attack patterns.' },
  { icon: BookOpen, title: 'Security Education', desc: 'Providing structured learning paths, courses, and hands-on labs for cybersecurity enthusiasts at every skill level.' },
  { icon: Users, title: 'Community Building', desc: 'Fostering a global community where cybersecurity professionals and learners collaborate, share knowledge, and grow together.' },
  { icon: Globe, title: 'Global Defense', desc: 'Building a distributed network of security sensors and honeypots to monitor and defend against cyber threats worldwide.' },
  { icon: Award, title: 'Certification & Recognition', desc: 'Offering skill validation programs, badges, and certificates that recognize cybersecurity expertise and contributions.' },
  { icon: Target, title: 'CTF Competitions', desc: 'Organizing regular Capture The Flag competitions that challenge participants with real-world cybersecurity scenarios.' },
  { icon: Zap, title: 'Rapid Response', desc: 'Coordinating rapid response teams to address emerging threats and provide timely security advisories to the community.' },
  { icon: Lock, title: 'Vulnerability Research', desc: 'Conducting and publishing responsible vulnerability research, CVEs, and proof-of-concept exploits for educational purposes.' },
];

const defaultPrograms = [
  { icon: Eye, title: 'Mentorship Program', desc: 'One-on-one guidance from experienced cybersecurity professionals' },
  { icon: Brain, title: 'Think Tanks', desc: 'Collaborative research groups tackling complex security challenges' },
  { icon: Server, title: 'Lab Infrastructure', desc: 'Free access to virtual labs for hands-on security practice' },
  { icon: Radio, title: 'Threat Feeds', desc: 'Real-time threat intelligence streams for security teams' },
  { icon: FileText, title: 'Research Papers', desc: 'Published research on cutting-edge cybersecurity topics' },
  { icon: Briefcase, title: 'Career Support', desc: 'Job boards, resume reviews, and career guidance for members' },
];

const defaultSkills = [
  { icon: Code, title: 'Penetration Testing', desc: 'Simulating real-world attacks to find vulnerabilities before exploiters do. Expertise in Kali Linux, Burp Suite, and Metasploit.', category: 'offensive' },
  { icon: Bug, title: 'Malware Analysis', desc: 'Reverse engineering malicious software to understand behavior and develop countermeasures. Tools: IDA Pro, Ghidra, OllyDbg.', category: 'offensive' },
  { icon: Fingerprint, title: 'Digital Forensics', desc: 'Evidence collection, disk imaging, memory analysis, and chain of custody. Tools: Autopsy, Volatility, FTK Imager.', category: 'offensive' },
  { icon: Radar, title: 'Incident Response', desc: 'Rapid detection and containment of security breaches. Skills in forensics, log analysis, and threat hunting.', category: 'defensive' },
  { icon: Network, title: 'Network Security', desc: 'Firewall management, IDS/IPS configuration, and network traffic analysis. Skills: Wireshark, Snort, Zeek.', category: 'defensive' },
  { icon: Lock, title: 'Cryptography', desc: 'Implementing encryption, key management, and PKI infrastructure. Understanding TLS, RSA, AES, and post-quantum crypto.', category: 'defensive' },
  { icon: Cpu, title: 'Cloud Security', desc: 'Securing AWS, Azure, and GCP environments. IAM policies, container security, and cloud-native threat detection.', category: 'infrastructure' },
  { icon: Wifi, title: 'AI & ML Security', desc: 'Defending against AI-powered attacks and securing machine learning pipelines. Adversarial AI and prompt injection defense.', category: 'infrastructure' },
];

const skillCategories = [
  { key: 'offensive', label: 'Offensive Security', color: 'text-alert-coral' },
  { key: 'defensive', label: 'Defensive Security', color: 'text-aurora-cyan' },
  { key: 'infrastructure', label: 'Infrastructure & AI', color: 'text-aurora-emerald' },
] as const;

const defaultTeamRoles = [
  { title: 'Security Researchers', desc: 'Conduct vulnerability research and publish CVEs to help protect the global community.', icon: Shield },
  { title: 'Mentors', desc: 'Guide newcomers through their cybersecurity journey with one-on-one mentorship.', icon: BookOpen },
  { title: 'Content Creators', desc: 'Create tutorials, blog posts, videos, and training materials for the community.', icon: FileText },
  { title: 'Event Organizers', desc: 'Plan and coordinate webinars, CTF competitions, workshops, and meetups.', icon: Target },
];

function getIcon(iconName: string): any {
  return iconMap[iconName] || Shield;
}

export default function WhatCGSDoPage() {
  const [coreAreas, setCoreAreas] = useState(defaultCoreAreas);
  const [programs, setPrograms] = useState(defaultPrograms);
  const [skills, setSkills] = useState(defaultSkills);
  const [teamRoles, setTeamRoles] = useState(defaultTeamRoles);
  const [loading, setLoading] = useState(true);
  const [selectedCoreArea, setSelectedCoreArea] = useState(0);
  const [openProgram, setOpenProgram] = useState<number | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await api.get('/cgs-content');
        const data = response.data.data;

        if (data && data.length > 0) {
          const coreAreaItems = data.filter((s: CgsSection) => s.type === 'core-area');
          const programItems = data.filter((s: CgsSection) => s.type === 'program');
          const skillItems = data.filter((s: CgsSection) => s.type === 'skill');
          const teamRoleItems = data.filter((s: CgsSection) => s.type === 'team-role');

          if (coreAreaItems.length > 0) {
            setCoreAreas(coreAreaItems.map((s: CgsSection) => ({
              icon: getIcon(s.icon),
              title: s.title,
              desc: s.description,
            })));
          }
          if (programItems.length > 0) {
            setPrograms(programItems.map((s: CgsSection) => ({
              icon: getIcon(s.icon),
              title: s.title,
              desc: s.description,
            })));
          }
          if (skillItems.length > 0) {
            setSkills(skillItems.map((s: CgsSection, i: number) => ({
              icon: getIcon(s.icon),
              title: s.title,
              desc: s.description,
              category: defaultSkills[i % defaultSkills.length]?.category || 'offensive',
            })));
          }
          if (teamRoleItems.length > 0) {
            setTeamRoles(teamRoleItems.map((s: CgsSection) => ({
              icon: getIcon(s.icon),
              title: s.title,
              desc: s.description,
            })));
          }
        }
      } catch {
        // Use defaults on error
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-base">
      <section className="relative overflow-hidden py-24">
        <AuroraGlow color="mixed" size={800} className="top-[-200px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24 text-center">
          <RevealOnScroll>
            <span className="mono-label inline-flex items-center gap-2 mb-6">
              <Shield className="w-3.5 h-3.5" />
              What We Do
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h1 className="section-title mb-4">
              <span className="gradient-word">What CGS Does</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="section-subtitle mx-auto">
              CyberGuardiansSociety is more than a community — we are a movement dedicated to
              securing the digital world through education, collaboration, and innovation.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-6 h-6 animate-spin text-aurora-violet" />
          <span className="ml-3 text-sm text-text-secondary">Loading content...</span>
        </div>
      ) : (
        <>
          <section className="py-[140px]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
              <RevealOnScroll>
                <span className="section-label">Core Focus Areas</span>
                <h2 className="section-title mb-2">
                  Our Core <span className="gradient-word">Focus Areas</span>
                </h2>
                <p className="section-subtitle mb-16">
                  Eight pillars forming the backbone of our mission to secure the digital landscape.
                </p>
              </RevealOnScroll>

              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                <RevealOnScroll delay={100}>
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                    {coreAreas.map((area, i) => {
                      const Icon = area.icon;
                      return (
                        <button
                          key={area.title}
                          onClick={() => setSelectedCoreArea(i)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all duration-200 flex-shrink-0 ${
                            selectedCoreArea === i
                              ? 'bg-aurora-violet/10 border border-aurora-violet/30 text-text-primary'
                              : 'border border-transparent hover:bg-white/[0.03] text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 ${selectedCoreArea === i ? 'text-aurora-violet' : 'text-text-muted'}`} />
                          <span className="text-sm font-medium">{area.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                  <div className="glass-card-static p-8 lg:p-10">
                    {(() => {
                      const Icon = coreAreas[selectedCoreArea].icon;
                      return (
                        <>
                          <div className="w-12 h-12 rounded-xl bg-aurora-violet/10 border border-aurora-violet/20 flex items-center justify-center mb-6">
                            <Icon className="w-6 h-6 text-aurora-violet" />
                          </div>
                          <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                            {coreAreas[selectedCoreArea].title}
                          </h3>
                          <p className="text-text-secondary leading-relaxed">
                            {coreAreas[selectedCoreArea].desc}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </section>

          <section className="py-[140px] bg-surface">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
              <RevealOnScroll>
                <span className="section-label">Programs &amp; Initiatives</span>
                <h2 className="section-title mb-2">
                  Programs &amp; <span className="gradient-word">Initiatives</span>
                </h2>
                <p className="section-subtitle mb-16">
                  Structured programs designed to accelerate your growth and maximize your impact.
                </p>
              </RevealOnScroll>

              <div className="max-w-3xl">
                {programs.map((prog, i) => {
                  const Icon = prog.icon;
                  const isOpen = openProgram === i;
                  return (
                    <RevealOnScroll key={prog.title} delay={i * 60}>
                      <div className="accordion-item">
                        <button
                          className="accordion-trigger"
                          onClick={() => setOpenProgram(isOpen ? null : i)}
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-sm font-semibold text-aurora-violet/60 w-8">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <Icon className="w-5 h-5 text-aurora-cyan" />
                            <span className="text-base">{prog.title}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                          <div className="pl-16 pb-5">
                            <p className="text-sm text-text-secondary leading-relaxed">{prog.desc}</p>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-[140px]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
              <RevealOnScroll>
                <span className="section-label">In-Demand Skills</span>
                <h2 className="section-title mb-2">
                  Current In-Demand <span className="gradient-word">Skills</span>
                </h2>
                <p className="section-subtitle mb-16">
                  Master the most sought-after cybersecurity skills that industries are actively hiring for in 2026 and beyond.
                </p>
              </RevealOnScroll>

              {skillCategories.map((cat) => {
                const categorySkills = skills.filter((s) => s.category === cat.key);
                if (categorySkills.length === 0) return null;
                return (
                  <RevealOnScroll key={cat.key} className="mb-12 last:mb-0">
                    <h3 className={`font-mono text-xs font-semibold tracking-[0.15em] uppercase mb-6 ${cat.color}`}>
                      {cat.label}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categorySkills.map((skill) => {
                        const Icon = skill.icon;
                        return (
                          <div key={skill.title} className="glass-card p-6 group">
                            <div className="w-10 h-10 rounded-xl bg-aurora-violet/10 border border-aurora-violet/15 flex items-center justify-center mb-4 group-hover:border-aurora-violet/30 transition-colors">
                              <Icon className="w-5 h-5 text-aurora-violet" />
                            </div>
                            <h4 className="text-sm font-semibold text-text-primary mb-1.5">{skill.title}</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">{skill.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </RevealOnScroll>
                );
              })}

              <RevealOnScroll className="mt-12">
                <div className="text-center">
                  <a href="/technical-programs" className="btn-primary">
                    Join Technical Development Programs
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          <section className="py-[140px] bg-surface">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
              <RevealOnScroll>
                <span className="section-label">Join CGS Team</span>
                <h2 className="section-title mb-2">
                  Join CGS <span className="gradient-word">Team</span>
                </h2>
                <p className="section-subtitle mb-16">
                  Be part of a dedicated team of cybersecurity professionals and volunteers working together to secure the digital world.
                </p>
              </RevealOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {teamRoles.map((role, i) => {
                  const Icon = role.icon;
                  return (
                    <RevealOnScroll key={role.title} delay={i * 80}>
                      <div className="glass-card p-6 group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-aurora-violet/10 border border-aurora-violet/15 flex items-center justify-center flex-shrink-0 group-hover:border-aurora-violet/30 transition-colors">
                            <Icon className="w-6 h-6 text-aurora-violet" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-text-primary mb-1.5">{role.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{role.desc}</p>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>

              <RevealOnScroll className="mt-12">
                <div className="text-center">
                  <a href="/career" className="btn-primary">
                    <HeartHandshake className="w-4 h-4" />
                    Join CGS Team
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          <section className="py-[140px]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-24 text-center">
              <RevealOnScroll>
                <span className="section-label">Get Started</span>
                <h2 className="section-title mb-4">
                  Ready to Be Part of <span className="gradient-word">Something Bigger</span>
                </h2>
                <p className="section-subtitle mx-auto mb-10">
                  Whether you are taking your first steps in cybersecurity or you are a seasoned professional,
                  CGS has a place for you. Join us and help secure tomorrow, today.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="/career" className="btn-primary">
                    Join CGS
                  </a>
                  <a href="/contact" className="btn-outline">
                    Contact Us
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
