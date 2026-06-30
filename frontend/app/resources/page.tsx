'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import api from '@/utils/api';
import ClickableText from '@/components/ui/ClickableText';
import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardPortal,
  PreviewLinkCardContent,
} from '@/components/animate-ui/primitives/radix/preview-link-card';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  url: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get('/resources', { params: { limit: 50 } });
        setResources(res.data.data || []);
      } catch { } finally { setLoading(false); }
    };
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-20 overflow-hidden hero-mesh">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="terminal-eyebrow mb-4 inline-block">RESOURCES</span>
          <h1 className="font-display font-extrabold text-red-threat mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Cyber <span className="text-cyan-core">Resources</span>
          </h1>
          <p className="text-white-muted max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
            Access tools, documentation, and learning materials to enhance your cybersecurity skills.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-abyss">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-16 bg-surface border border-border rounded-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Loader2 className="w-6 h-6 text-cyan-core animate-spin mx-auto mb-3" />
              <p className="text-white-muted" style={{ fontSize: '13px' }}>Loading resources...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="bg-surface border border-border rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="p-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-ghost border border-cyan-core/20 mb-4">
                  <span className="font-mono text-[10px] text-cyan-core tracking-wider uppercase">TERMINAL</span>
                </div>
                <div className="max-w-md mx-auto bg-void rounded-lg p-6 border border-border font-mono text-left mb-6">
                  <p className="text-cyan-core text-[13px] mb-1">&gt;_ LOADING RESOURCES...</p>
                  <p className="text-white-ghost text-[13px] animate-pulse">|</p>
                </div>
                <p className="text-white-muted mb-1" style={{ fontSize: '15px' }}>No resources available yet.</p>
                <p className="text-white-ghost" style={{ fontSize: '13px' }}>Intelligence is being compiled.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((r) => (
                <div key={r.id} className="cyber-card p-6">
                  <div className="flex items-start justify-between mb-3">
                    {r.url ? (
                      <PreviewLinkCard href={r.url} side="top" sideOffset={8}>
                        <PreviewLinkCardTrigger href={r.url}>
                          <h3 className="font-display font-semibold text-red-threat hover:text-cyan-core transition-colors" style={{ fontSize: '15px' }}>{r.title}</h3>
                        </PreviewLinkCardTrigger>
                        <PreviewLinkCardPortal>
                          <PreviewLinkCardContent side="top" sideOffset={8}>
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-white truncate">{r.title}</p>
                              <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">{r.description}</p>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-purple-glow/10 text-purple-glow tracking-wider uppercase">{r.category}</span>
                                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-ghost text-cyan-core tracking-wider uppercase">{r.level}</span>
                              </div>
                            </div>
                          </PreviewLinkCardContent>
                        </PreviewLinkCardPortal>
                      </PreviewLinkCard>
                    ) : (
                      <h3 className="font-display font-semibold text-red-threat" style={{ fontSize: '15px' }}>{r.title}</h3>
                    )}
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-purple-glow/10 text-purple-glow tracking-wider uppercase shrink-0 ml-2">{r.category}</span>
                  </div>
                  <p className="text-white-muted mb-4 line-clamp-3" style={{ fontSize: '13px' }}>
                    <ClickableText text={r.description} />
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-ghost text-cyan-core tracking-wider uppercase">{r.level}</span>
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] text-cyan-core hover:underline">
                        <ExternalLink className="w-3 h-3" /> Access
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
