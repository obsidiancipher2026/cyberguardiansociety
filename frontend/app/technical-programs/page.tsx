'use client';

import { useState } from 'react';
import { Shield, ArrowRight, CheckCircle, Code, Bug, Radar, Cpu, Network, KeyRound, Fingerprint, Cloud, Send } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';

const programs = [
  { id: 'pen-test', label: 'Penetration Testing', icon: Code },
  { id: 'malware', label: 'Malware Analysis', icon: Bug },
  { id: 'incident', label: 'Incident Response', icon: Radar },
  { id: 'cloud', label: 'Cloud Security', icon: Cloud },
  { id: 'ai', label: 'AI & ML Security', icon: Cpu },
  { id: 'network', label: 'Network Security', icon: Network },
  { id: 'crypto', label: 'Cryptography', icon: KeyRound },
  { id: 'forensics', label: 'Digital Forensics', icon: Fingerprint },
];

export default function TechnicalProgramsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);

  const toggleProgram = (id: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent-blue)]/20 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-blue)]/30 bg-[#131C2E]/50 backdrop-blur-sm mb-4">
            <Shield className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
            <span className="text-[var(--accent-blue)] text-xs font-medium">Technical Programs</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="text-white">Join </span>
            <span className="text-gradient-brp">Technical Development</span>
            <span className="text-white"> Programs</span>
          </h1>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] max-w-2xl mx-auto">
            Apply to CGS technical development programs and build real-world cybersecurity skills through hands-on training.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-surface-secondary/50">
        <div className="max-w-3xl mx-auto px-4">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-blue)]/15 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-[var(--accent-blue)]" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Application Submitted!</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                Thank you for your interest. Our team will review your application and get back to you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-surface-card border border-[var(--border-color)] rounded-2xl p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Full Name</label>
                  <input type="text" placeholder="Your full name" required className="w-full px-3 py-2.5 text-xs rounded-xl border border-[var(--border-color)] bg-surface-primary text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/30 focus:border-[var(--accent-blue)] transition-all" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Email Address</label>
                  <input type="email" placeholder="your@email.com" required className="w-full px-3 py-2.5 text-xs rounded-xl border border-[var(--border-color)] bg-surface-primary text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/30 focus:border-[var(--accent-blue)] transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Phone Number</label>
                  <input type="tel" placeholder="+92 xxx xxxxxxx" className="w-full px-3 py-2.5 text-xs rounded-xl border border-[var(--border-color)] bg-surface-primary text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/30 focus:border-[var(--accent-blue)] transition-all" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Experience Level</label>
                  <select className="w-full px-3 py-2.5 text-xs rounded-xl border border-[var(--border-color)] bg-surface-primary text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/30 focus:border-[var(--accent-blue)] transition-all">
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-2 block">Select Programs</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {programs.map((prog) => {
                    const Icon = prog.icon;
                    const isSelected = selectedPrograms.includes(prog.id);
                    return (
                      <Button
                        key={prog.id}
                        type="button"
                        variant={isSelected ? 'default' : 'outline'}
                        onClick={() => toggleProgram(prog.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 text-white'
                            : 'bg-surface-primary text-[var(--text-secondary)] hover:border-[var(--accent-blue)]/30'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[var(--accent-blue)]' : 'text-[var(--text-muted)]'}`} />
                        {prog.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Why do you want to join?</label>
                <textarea rows={3} placeholder="Tell us about your interest in cybersecurity..." className="w-full px-3 py-2.5 text-xs rounded-xl border border-[var(--border-color)] bg-surface-primary text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]/30 focus:border-[var(--accent-blue)] transition-all resize-none"></textarea>
              </div>
              <Button type="submit" variant="default" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[var(--accent-purple)]/30 transition-all">
                <Send className="w-4 h-4" />
                Submit Application
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
