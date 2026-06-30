import { useEffect, useRef } from 'react';
import { X, ExternalLink, Briefcase, Tag } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';

interface Opening {
  id: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
}

interface OpeningModalProps {
  opening: Opening | null;
  onClose: () => void;
}

export default function OpeningModal({ opening, onClose }: OpeningModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (opening) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [opening, onClose]);

  if (!opening) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden animate-scaleIn" style={{ boxShadow: '0 0 60px rgba(59,130,246,0.15), 0 0 0 1px var(--border)' }}>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--cyan-core)] to-[var(--red-threat)]" />

        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--abyss)] border border-[var(--border)] text-[var(--white-muted)] hover:text-[var(--white-primary)] hover:border-[var(--cyan-core)] transition-all z-10"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="p-6 md:p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--cyan-ghost)] flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-[var(--cyan-core)]" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-[var(--white-primary)] text-lg leading-tight mb-1">{opening.title}</h2>
              <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--cyan-ghost)] text-[var(--cyan-core)] tracking-wider uppercase inline-block">
                {opening.type}
              </span>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-[var(--white-muted)] leading-relaxed" style={{ fontSize: '14px', whiteSpace: 'pre-wrap' }}>{opening.description}</p>
          </div>

          {opening.tags && opening.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-1.5 mb-2">
                <Tag className="w-3.5 h-3.5 text-[var(--white-ghost)]" />
                <span className="font-mono text-[11px] text-[var(--white-ghost)] tracking-wider uppercase">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {opening.tags.map((tag, i) => (
                  <span key={i} className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[var(--cyan-ghost)] text-[var(--cyan-core)] tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
            <a
              href="https://wa.me/923261458036?text=Hi%2C%20I%27m%20interested%20in%20the%20CGS%20volunteer%20position"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--cyan-core)] text-white text-sm font-semibold hover:brightness-110 transition-all"
            >
              Apply via WhatsApp
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Button
              variant="outline"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--white-muted)] text-sm font-medium hover:border-[var(--cyan-core)] hover:text-[var(--cyan-core)] transition-all"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
