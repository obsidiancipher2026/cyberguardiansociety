'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { siteInfo } from '@/utils/constants';
import AuroraGlow from '@/components/ui/AuroraGlow';
import StatCounter from '@/components/ui/StatCounter';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generative SVG network visual — nodes and connecting lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const nodes: Node[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.getBoundingClientRect().width,
      y: Math.random() * canvas.getBoundingClientRect().height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      // Update positions
      if (!prefersReduced) {
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        });
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(124, 92, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-base">
      {/* Aurora glow backdrop */}
      <AuroraGlow color="violet" size={800} className="top-[-20%] left-[-10%]" />
      <AuroraGlow color="cyan" size={500} className="bottom-[-10%] right-[-5%]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-24 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left column — 55% */}
          <div className="flex-[0.55] text-center lg:text-left">
            {/* Eyebrow label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] mb-8">
              <Shield className="w-3.5 h-3.5 text-aurora-cyan" />
              <span className="mono-label text-aurora-cyan">{siteInfo.tagline}</span>
            </div>

            {/* Headline with one gradient word */}
            <h1 className="font-display font-extrabold leading-[1.05] mb-6 text-text-primary" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)' }}>
              Securing the{' '}
              <span className="gradient-text">Digital</span>{' '}
              Frontier,
              <br className="hidden sm:block" />
              Together as One
            </h1>

            <p className="text-text-secondary max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10 text-[17px]">
              A global community of cybersecurity professionals, enthusiasts, and learners collaborating to build a safer digital world through shared knowledge and collective defense.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-12">
              <Link
                href="/career"
                className="btn-gradient-border"
              >
                Join the Movement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/what-cgs-do"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.08] text-text-secondary text-sm font-medium hover:border-aurora-violet/30 hover:text-text-primary transition-all duration-200"
              >
                Explore Programs
              </Link>
            </div>

            {/* Inline stat strip — mono style, no boxed cards */}
            <div className="flex items-center gap-10 justify-center lg:justify-start">
              <StatCounter value={200} suffix="+" label="Members" />
              <StatCounter value={50} suffix="+" label="Events" />
              <StatCounter value={15} suffix="+" label="Countries" />
            </div>
          </div>

          {/* Right column — 45%: generative network visual */}
          <div className="flex-[0.45] flex items-center justify-center relative">
            {/* Glow behind the visual */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-aurora-violet/8 blur-[100px] pointer-events-none" />
            <canvas
              ref={canvasRef}
              className="w-full max-w-[420px] aspect-square rounded-2xl border border-white/[0.06] bg-white/[0.01]"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base to-transparent pointer-events-none" />
    </section>
  );
}
