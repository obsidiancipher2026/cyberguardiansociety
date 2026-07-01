'use client';

import { useState } from 'react';
import { Mail, MapPin, Clock, Linkedin, Instagram, MessageCircle, Send, CheckCircle, Loader2, Copy, Check, ChevronDown } from 'lucide-react';
import { socialLinks } from '@/utils/constants';
import api from '@/utils/api';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import AuroraGlow from '@/components/ui/AuroraGlow';

const faqItems = [
  {
    question: 'How long does it take to get a response?',
    answer: 'We typically respond within 24-48 hours during business days. For urgent matters, reach out via WhatsApp for faster assistance.',
  },
  {
    question: 'Do you offer cybersecurity training for organizations?',
    answer: 'Yes! We provide tailored cybersecurity awareness workshops and training programs for organizations of all sizes. Contact us to discuss your specific needs.',
  },
  {
    question: 'How can I report a security vulnerability?',
    answer: 'You can report vulnerabilities by emailing us directly or via our WhatsApp channel. We follow responsible disclosure practices and will acknowledge your report promptly.',
  },
  {
    question: 'Are your services available internationally?',
    answer: 'While our team is based in Pakistan, we collaborate with partners globally and offer remote consulting services to organizations worldwide.',
  },
  {
    question: 'How can I join the CyberGuardians Society?',
    answer: 'Visit our website for upcoming membership drives, or reach out via email/WhatsApp. We welcome cybersecurity enthusiasts, professionals, and students.',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="min-h-screen bg-[#05070C]">
      {/* Hero */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <AuroraGlow color="mixed" size={700} className="top-[-200px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24 text-center">
          <RevealOnScroll>
            <span className="section-label justify-center mb-4">CONTACT US</span>
            <h1 className="section-title mb-4">
              Get In <span className="gradient-word">Touch</span>
            </h1>
            <p className="section-subtitle mx-auto">
              Have questions? Want to collaborate? We respond within 24-48 hours.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="py-[140px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left Column — Info */}
            <div className="lg:col-span-2 space-y-6">
              <RevealOnScroll>
                <h3 className="text-text-primary text-lg font-semibold font-[family-name:var(--font-display)] mb-5">
                  Reach Out To Us
                </h3>
              </RevealOnScroll>

              {/* Map Embed */}
              <RevealOnScroll delay={100}>
                <div className="glass-card p-1 mb-6 overflow-hidden">
                  <iframe
                    title="Nawabshah, Sindh, Pakistan"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.0!2d68.37!3d26.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE1JzAwLjAiTiA2OMKwMjInMTIuMCJF!5e0!3m2!1sen!2s!4v1"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </RevealOnScroll>

              {/* Email */}
              <RevealOnScroll delay={150}>
                <div className="glass-card p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(124,92,255,0.1)] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#7C5CFF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="mono-label mb-1">Email</p>
                      <a
                        href="mailto:cyberguardianssociety@gmail.com"
                        className="text-[13px] text-[#22D3EE] hover:underline block truncate"
                      >
                        cyberguardianssociety@gmail.com
                      </a>
                    </div>
                    <button
                      onClick={copyEmail}
                      className="p-2 rounded-lg hover:bg-[#12161F] transition-colors"
                      title="Copy email"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-[#34E89E]" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#5B6472]" />
                      )}
                    </button>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Location */}
              <RevealOnScroll delay={200}>
                <div className="glass-card p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(124,92,255,0.1)] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#7C5CFF]" />
                    </div>
                    <div>
                      <p className="mono-label mb-1">Location</p>
                      <p className="text-[13px] text-[#9AA4B2]">Nawabshah, Sindh, Pakistan</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Response Time */}
              <RevealOnScroll delay={250}>
                <div className="glass-card p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(34,211,238,0.1)] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#22D3EE]" />
                    </div>
                    <div>
                      <p className="mono-label mb-1">Response Time</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] text-[#9AA4B2]">Within 24-48 hours</p>
                        <div className="w-2 h-2 rounded-full bg-[#34E89E] animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Social Links */}
              <RevealOnScroll delay={300}>
                <h3 className="text-text-primary text-lg font-semibold font-[family-name:var(--font-display)] pt-3 mb-4">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  {socialIcons.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0B0F17] border border-[rgba(255,255,255,0.08)] text-[#5B6472] hover:text-[#7C5CFF] hover:border-[rgba(124,92,255,0.25)] transition-all duration-200 hover:-translate-y-0.5"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column — Form */}
            <div className="lg:col-span-3">
              <RevealOnScroll delay={150}>
                {submitted ? (
                  <div className="text-center py-16 glass-card-static p-8">
                    <div className="w-16 h-16 rounded-full bg-[rgba(52,232,158,0.1)] flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-[#34E89E]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-[#F5F7FA] text-xl mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[#9AA4B2] max-w-sm mx-auto text-sm">
                      Thank you for reaching out. We will get back to you within 24-48 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="glass-card-static p-6 md:p-8 space-y-5"
                  >
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#F5F7FA] text-lg">
                      Send Us a Message
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="floating-label-group">
                        <input
                          type="text"
                          name="name"
                          placeholder=" "
                          required
                          className="w-full"
                        />
                        <label>Full Name</label>
                      </div>
                      <div className="floating-label-group">
                        <input
                          type="email"
                          name="email"
                          placeholder=" "
                          required
                          className="w-full"
                        />
                        <label>Email Address</label>
                      </div>
                    </div>
                    <div className="floating-label-group">
                      <input
                        type="text"
                        name="subject"
                        placeholder=" "
                        className="w-full"
                      />
                      <label>Subject</label>
                    </div>
                    <div className="floating-label-group">
                      <textarea
                        name="message"
                        rows={5}
                        placeholder=" "
                        required
                        className="w-full resize-none"
                        style={{ minHeight: '140px' }}
                      />
                      <label>Your Message</label>
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full justify-center"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-[140px] bg-[#0B0F17]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-4">FAQ</span>
              <h2 className="section-title mb-4">
                Frequently Asked <span className="gradient-word">Questions</span>
              </h2>
              <p className="section-subtitle mx-auto">
                Quick answers to common questions about reaching out and collaborating with us.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <div key={index} className="accordion-item">
                  <button
                    className="accordion-trigger"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#5B6472] transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180 text-[#7C5CFF]' : ''
                      }`}
                    />
                  </button>
                  <div className={`accordion-content ${openFaq === index ? 'open' : ''}`}>
                    <p className="text-[#9AA4B2] text-[15px] leading-relaxed pb-5">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
