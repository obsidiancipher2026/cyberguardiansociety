'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/utils/api';
import {
  CursorProvider,
  CursorContainer,
  Cursor,
  CursorFollow,
} from '@/components/animate-ui/primitives/animate/cursor';
import {
  ScrollProgressProvider,
  ScrollProgressContainer,
  ScrollProgress,
} from '@/components/animate-ui/primitives/animate/scroll-progress';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith('/admin');
  const isMaintenance = pathname === '/maintenance';
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    async function checkMaintenance() {
      // Skip check for admin routes and maintenance page itself
      if (isAdmin || isMaintenance) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/site-settings/maintenance');
        const isMaint = response.data.data?.enabled || false;
        setMaintenanceMode(isMaint);

        if (isMaint) {
          router.push('/maintenance');
        }
      } catch (error) {
        // If API fails, allow access (fail open)
      } finally {
        setLoading(false);
      }
    }

    checkMaintenance();
  }, [isAdmin, isMaintenance, router, pathname]);

  useEffect(() => {
    setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  // For admin routes, render without navbar/footer
  if (isAdmin) {
    return <>{children}</>;
  }

  // For maintenance page, render without navbar/footer
  if (isMaintenance) {
    return <>{children}</>;
  }

  // If in maintenance mode and not admin, redirect to maintenance page
  if (maintenanceMode) {
    return <>{children}</>;
  }

  return (
    <ScrollProgressProvider direction="vertical">
      <ScrollProgressContainer global={true}>
        <CursorProvider global={true}>
          <CursorContainer>
            <Cursor />
            {isFinePointer && (
              <CursorFollow side="right" sideOffset={12}>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full backdrop-blur-sm border border-blue-500/20">
                  CGS
                </span>
              </CursorFollow>
            )}
          </CursorContainer>
          <div className={`flex flex-col min-h-screen ${isFinePointer ? 'cursor-none' : ''}`}>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </CursorProvider>
      </ScrollProgressContainer>
      <ScrollProgress color="#3b82f6" height={4} />
    </ScrollProgressProvider>
  );
}
