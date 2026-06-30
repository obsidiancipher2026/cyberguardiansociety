'use client';

import { useState, useEffect } from 'react';
import { Shield, Loader2 } from 'lucide-react';
import api from '@/utils/api';

export default function MaintenancePage() {
  const [message, setMessage] = useState('We are currently performing scheduled maintenance. Please check back soon.');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMaintenanceStatus() {
      try {
        const response = await api.get('/site-settings/maintenance');
        if (response.data.data?.message) {
          setMessage(response.data.data.message);
        }
      } catch (error) {
        // Use default message
      } finally {
        setLoading(false);
      }
    }

    fetchMaintenanceStatus();

    // Auto-refresh every 30 seconds to check if maintenance is over
    const interval = setInterval(() => {
      window.location.reload();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary, #020408)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--accent-purple)]/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-lg w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent-purple)]/20 to-[var(--accent-blue)]/20 flex items-center justify-center border border-[var(--accent-purple)]/30">
              <Shield className="w-10 h-10 text-[var(--accent-purple)]" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 animate-pulse" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Scheduled Maintenance
        </h1>

        {loading ? (
          <div className="flex items-center justify-center gap-2 mb-6">
            <Loader2 className="w-4 h-4 animate-spin text-[var(--accent-purple)]" />
            <span className="text-sm text-[var(--text-secondary)]">Loading...</span>
          </div>
        ) : (
          <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
            {message}
          </p>
        )}

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-purple)]/30 bg-[var(--accent-purple)]/10">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-medium text-[var(--accent-purple)]">Maintenance in Progress</span>
        </div>

        <p className="mt-8 text-xs text-[var(--text-secondary)]/50">
          This page will automatically refresh when maintenance is complete.
        </p>
      </div>
    </div>
  );
}
