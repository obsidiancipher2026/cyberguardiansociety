'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore, ADMIN_LOGIN_URL } from '@/store/adminStore';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, checkAuth } = useAdminStore();
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (isAuthenticated) {
        setVerified(true);
        return;
      }
      const authed = await checkAuth();
      if (!authed) {
        router.replace(ADMIN_LOGIN_URL);
      } else {
        setVerified(true);
      }
    };
    verify();
  }, [checkAuth, router, isAuthenticated]);

  if (!verified) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <div style={{ color: 'var(--text-secondary)' }}>Verifying authentication...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-base)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 0 }} className="lg:!ml-[260px]">
        <AdminTopBar />
        <div className="scanline" />
        <main style={{ flex: 1, padding: '24px 28px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
