'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContentPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="p-8 text-center text-[var(--text-secondary)]">
      Redirecting to dashboard...
    </div>
  );
}
