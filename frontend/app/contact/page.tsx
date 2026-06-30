'use client';

import { useState } from 'react';
import { Shield, Mail, MapPin, Linkedin, Instagram, MessageCircle, Send, CheckCircle, Clock, Loader2, Copy, Check } from 'lucide-react';
import { socialLinks } from '@/utils/constants';
import api from '@/utils/api';
import { Button } from '@/components/animate-ui/components/buttons/button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await api.post('/contact', {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('cyberguardianssociety@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialIcons = [
    { href: socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: socialLinks.instagram, icon: Instagram, label: 'Instagram' },
    { href: socialLinks.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-20 overflow-hidden hero-mesh">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="terminal-eyebrow mb-4 inline-block">CONTACT US</span>
          <h1 className="font-display font-extrabold text-red-threat mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Get In <span className="text-cyan-core">Touch</span>
          </h1>
          <p className="text-white-muted max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
            Have questions? Want to collaborate? We respond within 24-48 hours.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-abyss">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column — Info */}
            <div className="lg:col-span-2 space-y-5">
              <h3 className="font-display font-semibold text-red-threat mb-5" style={{ fontSize: '16px' }}>Reach Out To Us</h3>

              <div className="cyber-card p-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-ghost flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-cyan-core" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-white-ghost tracking-wider uppercase mb-1">Email</p>
                    <a href="mailto:cyberguardianssociety@gmail.com" className="text-[13px] text-cyan-core hover:underline block truncate">
                      cyberguardianssociety@gmail.com
                    </a>
                  </div>
                  <Button variant="ghost" size="icon" onClick={copyEmail} className="p-2 rounded-lg hover:bg-surface-raised transition-colors" title="Copy email">
                    {copied ? <Check className="w-4 h-4 text-teal-accent" /> : <Copy className="w-4 h-4 text-white-ghost" />}
                  </Button>
                </div>
              </div>

              <div className="cyber-card p-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-glow/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-purple-glow" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-white-ghost tracking-wider uppercase mb-1">Location</p>
                    <p className="text-[13px] text-white-muted">Nawabshah, Sindh, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="cyber-card p-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-teal-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-teal-accent" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-white-ghost tracking-wider uppercase mb-1">Response Time</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] text-white-muted">Within 24-48 hours</p>
                      <div className="w-2 h-2 rounded-full bg-teal-accent animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="font-display font-semibold text-red-threat pt-3" style={{ fontSize: '16px' }}>Follow Us</h3>
              <div className="flex items-center gap-3">
                {socialIcons.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-border text-white-ghost hover:text-cyan-core hover:border-cyan-core/40 transition-all duration-200 hover:-translate-y-0.5"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column — Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="text-center py-16 bg-surface border border-border rounded-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="w-16 h-16 rounded-full bg-teal-accent/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-teal-accent" />
                  </div>
                  <h3 className="font-display font-bold text-red-threat mb-2" style={{ fontSize: '20px' }}>Message Sent!</h3>
                  <p className="text-white-muted max-w-sm mx-auto" style={{ fontSize: '14px' }}>
                    Thank you for reaching out. We will get back to you within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 md:p-8 space-y-5" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <h3 className="font-display font-semibold text-red-threat" style={{ fontSize: '18px' }}>Send Us a Message</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-white-ghost tracking-wider uppercase block mb-1.5">Full Name</label>
                      <input type="text" name="name" placeholder="Your name" required className="w-full" />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-white-ghost tracking-wider uppercase block mb-1.5">Email</label>
                      <input type="email" name="email" placeholder="your@email.com" required className="w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-white-ghost tracking-wider uppercase block mb-1.5">Subject</label>
                    <input type="text" name="subject" placeholder="How can we help?" className="w-full" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-white-ghost tracking-wider uppercase block mb-1.5">Message</label>
                    <textarea name="message" rows={5} placeholder="Tell us what you are thinking..." required className="w-full resize-none" style={{ minHeight: '140px' }} />
                  </div>
                  <Button type="submit" variant="default" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-sm font-semibold hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {sending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
