'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/utils/api';
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
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </ScrollProgressContainer>
      <ScrollProgress color="#3b82f6" height={4} />
    </ScrollProgressProvider>
  );
}
