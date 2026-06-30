'use client';

import { useState, useEffect } from 'react';
import { Shield, Camera, Loader2 } from 'lucide-react';
import api from '@/utils/api';
import { Button } from '@/components/animate-ui/components/buttons/button';

const filters = ['All', 'Certificates', 'Collaboration', 'Recent Sponsors', 'Bootcamps', 'Sessions'];
const filterMap: Record<string, string> = {
  'Certificates': 'certificates',
  'Collaboration': 'collaboration',
  'Recent Sponsors': 'sponsors',
  'Bootcamps': 'bootcamps',
  'Sessions': 'sessions',
};

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const params: any = { limit: 50 };
        if (activeFilter !== 'All') params.category = filterMap[activeFilter];
        const res = await api.get('/gallery', { params });
        setItems(res.data.data || []);
      } catch { } finally { setLoading(false); }
    };
    fetchGallery();
  }, [activeFilter]);

  return (
    <div className="min-h-screen">
      <section className="relative py-16 md:py-20 overflow-hidden hero-mesh">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="terminal-eyebrow mb-4 inline-block">GALLERY</span>
          <h1 className="font-display font-extrabold text-red-threat mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Visual <span className="text-cyan-core">Cybersecurity</span>
          </h1>
          <p className="text-white-muted max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
            Explore our journey, events, and cybersecurity achievements through our visual gallery.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-abyss">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              const count = filter === 'All' ? items.length : items.filter(i => i.category === filterMap[filter]).length;
              return (
                <Button
                  key={filter}
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? ''
                      : 'bg-surface border-border text-white-muted hover:text-red-threat hover:border-cyan-core/30'
                  }`}
                >
                  {filter}
                  <span className={`text-[10px] ${isActive ? 'text-void/60' : 'text-white-ghost'}`}>({filter === 'All' ? items.length : count})</span>
                </Button>
              );
            })}
          </div>

          {loading ? (
            <div className="text-center py-16 bg-surface border border-border rounded-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
              <Loader2 className="w-6 h-6 text-cyan-core animate-spin mx-auto mb-3" />
              <p className="text-white-muted" style={{ fontSize: '13px' }}>Loading...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="bg-surface border border-border rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 skeleton" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
                  </div>
                ))}
              </div>
              <div className="p-8 text-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-core/20 to-transparent" />
                <Camera className="w-12 h-12 text-white-ghost/30 mx-auto mb-4" />
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-ghost border border-cyan-core/20 mb-4">
                  <span className="font-mono text-[10px] text-cyan-core tracking-wider uppercase">GALLERY LOADING</span>
                </div>
                <p className="text-white-muted mb-1" style={{ fontSize: '15px' }}>Visual archives are being compiled.</p>
                <p className="text-white-ghost" style={{ fontSize: '13px' }}>Check back soon.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-surface border border-border rounded-xl overflow-hidden group hover:border-cyan-core/30 transition-all duration-300" style={{ boxShadow: 'var(--shadow-card)' }}>
                  {item.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-core text-void tracking-wider uppercase">{item.category}</span>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-red-threat truncate" style={{ fontSize: '14px' }}>{item.title}</h3>
                    {item.description && <p className="text-white-muted mt-1 line-clamp-2" style={{ fontSize: '12px' }}>{item.description}</p>}
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
