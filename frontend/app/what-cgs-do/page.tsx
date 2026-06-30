'use client';

import { useState, useEffect } from 'react';
import { Shield, Search, BookOpen, Users, Globe, Award, Target, Zap, Lock, Eye, Brain, Server, Radio, FileText, Briefcase, ArrowRight, HeartHandshake, Code, Cpu, Wifi, Fingerprint, Bug, Network, KeyRound, Radar, Loader2 } from 'lucide-react';
import api from '@/utils/api';

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
  { icon: Code, title: 'Penetration Testing', desc: 'Simulating real-world attacks to find vulnerabilities before exploiters do. Expertise in Kali Linux, Burp Suite, and Metasploit.', color: 'var(--accent-red)' },
  { icon: Bug, title: 'Malware Analysis', desc: 'Reverse engineering malicious software to understand behavior and develop countermeasures. Tools: IDA Pro, Ghidra, OllyDbg.', color: 'var(--accent-blue)' },
  { icon: Radar, title: 'Incident Response', desc: 'Rapid detection and containment of security breaches. Skills in forensics, log analysis, and threat hunting.', color: 'var(--accent-purple)' },
  { icon: Cpu, title: 'Cloud Security', desc: 'Securing AWS, Azure, and GCP environments. IAM policies, container security, and cloud-native threat detection.', color: 'var(--accent-blue)' },
  { icon: Cpu, title: 'AI & ML Security', desc: 'Defending against AI-powered attacks and securing machine learning pipelines. Adversarial AI and prompt injection defense.', color: 'var(--accent-red)' },
  { icon: Network, title: 'Network Security', desc: 'Firewall management, IDS/IPS configuration, and network traffic analysis. Skills: Wireshark, Snort, Zeek.', color: 'var(--accent-purple)' },
  { icon: KeyRound, title: 'Cryptography', desc: 'Implementing encryption, key management, and PKI infrastructure. Understanding TLS, RSA, AES, and post-quantum crypto.', color: 'var(--accent-blue)' },
  { icon: Fingerprint, title: 'Digital Forensics', desc: 'Evidence collection, disk imaging, memory analysis, and chain of custody. Tools: Autopsy, Volatility, FTK Imager.', color: 'var(--accent-red)' },
];

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
              color: defaultSkills[i % defaultSkills.length]?.color || 'var(--accent-blue)',
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
      } catch (error) {
        // Use defaults on error
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent-purple)]/20 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-purple)]/30 bg-[#131C2E]/50 backdrop-blur-sm mb-4">
            <Shield className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
            <span className="text-[var(--accent-purple)] text-xs font-medium">What We Do</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="text-white">What </span>
            <span className="text-gradient-mix">CGS</span>
            <span className="text-white"> Does</span>
          </h1>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            CyberGuardiansSociety is more than a community — we are a movement dedicated to
            securing the digital world through education, collaboration, and innovation.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--accent-purple)' }} />
          <span className="ml-3 text-sm text-[var(--text-secondary)]">Loading content...</span>
        </div>
      ) : (
        <>
          <section className="py-10 md:py-14 bg-surface-secondary/50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-lg md:text-xl font-bold text-center mb-6">
                <span className="text-white">Our Core </span>
                <span className="text-gradient-purple">Focus Areas</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {coreAreas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <div key={area.title} className="neuo neuo-sm p-4 group">
                      <Icon className="w-4 h-4 text-[var(--accent-purple)] mb-1.5 group-hover:text-[var(--accent-blue)] transition-colors" />
                      <h3 className="text-xs font-semibold text-white mb-1">{area.title}</h3>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{area.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-lg md:text-xl font-bold text-center mb-6">
                <span className="text-white">Programs & </span>
                <span className="text-gradient-blue">Initiatives</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {programs.map((prog) => {
                  const Icon = prog.icon;
                  return (
                    <div key={prog.title} className="neuo neuo-sm p-4">
                      <div className="flex items-center gap-3 mb-1.5">
                        <div className="w-9 h-9 rounded-lg bg-[var(--accent-blue)]/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[var(--accent-blue)]" />
                        </div>
                        <h3 className="text-xs font-semibold text-white">{prog.title}</h3>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] ml-[48px]">{prog.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14 bg-surface-secondary/50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-lg md:text-xl font-bold text-center mb-2">
                <span className="text-white">Current In-Demand </span>
                <span className="text-gradient-mix">Skills</span>
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)] text-center max-w-xl mx-auto mb-6">
                Master the most sought-after cybersecurity skills that industries are actively hiring for in 2026 and beyond.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.title} className="neuo neuo-sm p-4 group">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--accent-blue)]/15 to-[var(--accent-purple)]/15 flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4" style={{ color: skill.color }} />
                      </div>
                      <h3 className="text-xs font-semibold text-white mb-1">{skill.title}</h3>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{skill.desc}</p>
                    </div>
                  );
                })}
              </div>
              <div className="text-center">
                <a href="/technical-programs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-red)] text-white text-sm font-semibold clay group">
                  Join Technical Development Programs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-lg md:text-xl font-bold text-center mb-2">
                <span className="text-white">Join CGS </span>
                <span className="text-gradient-brp">Team</span>
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)] text-center max-w-xl mx-auto mb-8">
                Be part of a dedicated team of cybersecurity professionals and volunteers working together to secure the digital world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {teamRoles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <div key={role.title} className="neuo p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent-purple)]/15 to-[var(--accent-red)]/15 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[var(--accent-purple)]" />
                        </div>
                        <h3 className="text-sm font-semibold text-white">{role.title}</h3>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{role.desc}</p>
                    </div>
                  );
                })}
              </div>
              <div className="text-center">
                <a href="/career" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-red)] text-white text-sm font-semibold clay group">
                  <HeartHandshake className="w-4 h-4" />
                  Join CGS Team
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14 bg-surface-secondary/50">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="text-lg md:text-xl font-bold mb-3">
                <span className="text-white">Ready to Be Part of </span>
                <span className="text-gradient-red">Something Bigger</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mb-6">
                Whether you are taking your first steps in cybersecurity or you are a seasoned professional,
                CGS has a place for you. Join us and help secure tomorrow, today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="/career" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] text-white text-sm font-semibold clay">
                  Join CGS
                </a>
                <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--accent-blue)]/50 text-white text-sm font-semibold clay">
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
