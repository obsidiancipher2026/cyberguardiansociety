'use client';

import { useState, useEffect } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import api from '@/utils/api';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import EmptyState from '@/components/ui/EmptyState';
import AuroraGlow from '@/components/ui/AuroraGlow';

const filters = ['All', 'Certificates', 'Bootcamps', 'Sessions', 'Collaboration', 'Sponsors', 'Other'];
const filterMap: Record<string, string> = {
  'Certificates': 'certificates',
  'Bootcamps': 'bootcamps',
  'Sessions': 'sessions',
  'Collaboration': 'collaboration',
  'Sponsors': 'sponsors',
  'Other': 'other',
};

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const staticPosters: GalleryItem[] = [
  {
    id: 'poster-1',
    title: 'Collaboration with NineByte Security',
    description: '',
    imageUrl: '/images/gallery/collaborators.png',
    category: 'collaboration',
  },
  {
    id: 'poster-2',
    title: 'Collaboration with Youth Empowerment',
    description: '',
    imageUrl: '/images/gallery/collaborators-2.png',
    category: 'collaboration',
  },
  {
    id: 'poster-3',
    title: 'Collaboration with QUEST Cybersecurity Student Society',
    description: '',
    imageUrl: '/images/gallery/collaborators-3.png',
    category: 'collaboration',
  },
  {
    id: 'poster-4',
    title: 'Community Event',
    description: '',
    imageUrl: '/images/gallery/poster-1.jfif',
    category: 'sessions',
  },
  {
    id: 'poster-5',
    title: 'Project Glasswing',
    description: '',
    imageUrl: '',
    category: 'other',
  },
  {
    id: 'sponsor-1',
    title: 'NineByte Security',
    description: '',
    imageUrl: '/images/sponsors/ninebyte.png',
    category: 'sponsors',
  },
  {
    id: 'sponsor-2',
    title: 'Youth Empowerment',
    description: '',
    imageUrl: '/images/sponsors/youth-empowerment.png',
    category: 'sponsors',
  },
  {
    id: 'sponsor-3',
    title: 'QUEST Cybersecurity Student Society',
    description: '',
    imageUrl: '/images/sponsors/quest.png',
    category: 'sponsors',
  },
  {
    id: 'sponsor-4',
    title: 'TryHackMe',
    description: '',
    imageUrl: '/images/sponsors/tryhackme.svg',
    category: 'sponsors',
  },
];

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
        const apiItems = res.data.data || [];
        if (activeFilter === 'All') {
          setItems([...staticPosters, ...apiItems]);
        } else {
          setItems([
            ...staticPosters.filter(p => p.category === filterMap[activeFilter]),
            ...apiItems,
          ]);
        }
      } catch {
        setItems(activeFilter === 'All' ? staticPosters : staticPosters.filter(p => p.category === filterMap[activeFilter]));
      } finally { setLoading(false); }
    };
    fetchGallery();
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <AuroraGlow color="violet" size={800} className="absolute -top-40 left-1/2 -translate-x-1/2 opacity-60" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-24 text-center">
          <RevealOnScroll>
            <span className="mono-label mb-4 inline-block">GALLERY</span>
            <h1 className="font-display font-extrabold text-text-primary mb-4 section-title">
              Visual <span className="gradient-text">Cybersecurity</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto section-subtitle">
              Explore our journey, events, and cybersecurity achievements through our visual gallery.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <RevealOnScroll delay={100}>
            <div className="tab-list flex flex-wrap items-center justify-center gap-1 mb-10">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                const count = filter === 'All' ? items.length : items.filter(i => i.category === filterMap[filter]).length;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`tab-trigger relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-aurora-violet'
                        : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {filter}
                    <span className={`ml-1.5 text-[11px] ${isActive ? 'text-aurora-violet/60' : 'text-text-muted/60'}`}>
                      ({filter === 'All' ? items.length : count})
                    </span>
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>

          {loading ? (
            <div className="glass-card p-16 text-center">
              <Loader2 className="w-6 h-6 text-aurora-cyan animate-spin mx-auto mb-3" />
              <p className="text-text-muted text-sm">Loading gallery...</p>
            </div>
          ) : items.length === 0 ? (
            <RevealOnScroll delay={200}>
              <div className="glass-card p-8">
                <EmptyState
                  icon={<Camera className="w-12 h-12 text-text-muted/40" />}
                  title="Visual archives are being compiled"
                  description="Check back soon for new content."
                  variant="scan"
                />
              </div>
            </RevealOnScroll>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
              {items.map((item, idx) => (
                <RevealOnScroll key={item.id} delay={idx * 50} className="break-inside-avoid">
                  <div className="glass-card overflow-hidden group hover:border-aurora-violet/20 transition-all duration-300">
                    {item.imageUrl ? (
                      <div className="relative overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="mono-label text-[10px]">{item.category}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-aurora-violet/10 to-aurora-cyan/10">
                        <span className="text-text-muted text-sm font-medium">{item.title}</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-text-primary truncate text-sm">{item.title}</h3>
                      {item.description && (
                        <p className="text-text-muted mt-1 line-clamp-2 text-xs">{item.description}</p>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
