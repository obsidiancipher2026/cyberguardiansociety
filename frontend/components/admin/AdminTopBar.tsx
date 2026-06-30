'use client';

import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';

export default function AdminTopBar() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <header style={{
      height: 60,
      borderBottom: '1px solid var(--border-default)',
      background: 'var(--bg-base)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
        {segments.map((seg, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && (
              <span style={{ color: 'var(--text-ghost)', opacity: 0.5 }}>
                /
              </span>
            )}
            <span style={{
              color: i === segments.length - 1 ? 'var(--text-primary)' : 'var(--text-ghost)',
              fontWeight: i === segments.length - 1 ? 500 : 400,
            }}>
              {seg.charAt(0).toUpperCase() + seg.slice(1)}
            </span>
          </span>
        ))}
      </nav>

      <Button variant="ghost" size="icon" style={{
        width: 36, height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', background: 'transparent',
        color: 'var(--text-secondary)', cursor: 'pointer',
        borderRadius: 6, position: 'relative',
        transition: 'all 0.3s ease',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--blue-glow)'; e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'scale(1)' }}
      >
        <Bell className="w-[18px] h-[18px]" />
        <span style={{
          position: 'absolute', top: 6, right: 6,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--red-glow)',
          boxShadow: '0 0 6px var(--red-glow)',
        }} />
      </Button>
    </header>
  );
}
