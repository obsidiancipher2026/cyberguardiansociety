'use client';

import { useEffect, useState } from 'react';
import { Shield, Briefcase, BookOpen, Star, Camera, MessageSquare, FileText, Loader2 } from 'lucide-react';
import api from '@/utils/api';

interface DashboardStats {
  openings: number; resources: number; testimonials: number;
  gallery: number; contactSubmissions: number; logs: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ openings: 0, resources: 0, testimonials: 0, gallery: 0, contactSubmissions: 0, logs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [o, r, t, g, c, l] = await Promise.all([
          api.get('/admin/openings', { params: { limit: 1 } }).catch(() => ({ data: { total: 0 } })),
          api.get('/admin/resources', { params: { limit: 1 } }).catch(() => ({ data: { total: 0 } })),
          api.get('/admin/testimonials', { params: { limit: 1 } }).catch(() => ({ data: { total: 0 } })),
          api.get('/admin/gallery', { params: { limit: 1 } }).catch(() => ({ data: { total: 0 } })),
          api.get('/admin/contact-submissions', { params: { limit: 1 } }).catch(() => ({ data: { total: 0 } })),
          api.get('/admin/logs', { params: { limit: 1 } }).catch(() => ({ data: { total: 0 } })),
        ]);
        setStats({
          openings: o.data.total || 0, resources: r.data.total || 0, testimonials: t.data.total || 0,
          gallery: g.data.total || 0, contactSubmissions: c.data.total || 0, logs: l.data.total || 0,
        });
      } catch {} finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Career Openings', value: stats.openings, icon: Briefcase, accent: 'var(--blue-glow)', muted: 'rgba(59,130,246,0.12)', topBorder: true },
    { label: 'Resources', value: stats.resources, icon: BookOpen, accent: '#7B61FF', muted: 'rgba(123,97,255,0.12)', topBorder: true },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, accent: 'var(--amber-glow)', muted: 'var(--amber-dim)', topBorder: true },
    { label: 'Gallery Items', value: stats.gallery, icon: Camera, accent: '#00E5FF', muted: 'rgba(0,229,255,0.10)', topBorder: true },
    { label: 'Contact Submissions', value: stats.contactSubmissions, icon: MessageSquare, accent: 'var(--red-glow)', muted: 'var(--red-muted)', topBorder: true },
    { label: 'Log Entries', value: stats.logs, icon: FileText, accent: 'var(--green-glow)', muted: 'var(--green-dim)', topBorder: true },
  ];

  return (
    <div>
      <div className="page-title" style={{ color: 'var(--red-glow)' }}>
        <Shield style={{ color: 'var(--red-glow)' }} />
        <h1>Dashboard</h1>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, color: 'var(--text-secondary)' }}>
          <Loader2 className="w-5 h-5 animate-spin" style={{ marginRight: 8 }} /> Loading dashboard...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="cyber-card" style={{
                padding: 24, borderRadius: 'var(--radius-lg)',
                borderTop: card.topBorder ? `2px solid ${card.accent}` : undefined,
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--border-strong)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: card.muted, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon className="w-5 h-5" style={{ color: card.accent }} />
                </div>
                <p style={{ fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', marginTop: 12 }}>
                  {card.value.toLocaleString()}
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{card.label}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
