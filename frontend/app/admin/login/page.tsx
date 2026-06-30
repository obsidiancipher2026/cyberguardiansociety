'use client';

import AdminLoginForm from '@/components/admin/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-abyss">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white-primary mb-2">Admin Panel</h1>
          <p className="text-sm text-white-muted">Sign in to access the administration dashboard</p>
        </div>
        <div className="rounded-2xl border border-border bg-void/50 backdrop-blur-sm p-6 md:p-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
