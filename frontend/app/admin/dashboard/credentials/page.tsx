'use client';

import { useState, useEffect } from 'react';
import { Key, Loader2, Save, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import api from '@/utils/api';
import toast from 'react-hot-toast';

export default function CredentialsManagementPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ email: '', fullName: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const res = await api.get('/admin/credentials');
        if (res.data.success) {
          setForm({ ...form, email: res.data.data.email || '', fullName: res.data.data.fullName || '' });
        }
      } catch {} finally { setLoading(false); }
    };
    fetchCredentials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setSaving(true);
    try {
      const payload: any = { email: form.email, fullName: form.fullName };
      if (form.newPassword) {
        payload.currentPassword = form.currentPassword;
        payload.newPassword = form.newPassword;
      }
      await api.put('/admin/credentials', payload);
      toast.success('Credentials updated');
      setForm({ ...form, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed'); } finally { setSaving(false); }
  };

  if (loading) {
    return <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <div className="page-title">
        <Key style={{ color: 'var(--blue-glow)' }} />
        <h1>Change Credentials</h1>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: '40px 48px',
      }}>
        <div className="form-group">
          <label>Full Name</label>
          <input value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder="Your name" style={{ width: '100%', height: 48 }} />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <div style={{ position: 'relative' }}>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="admin@cyberguardians.com" required style={{ width: '100%', height: 48, paddingRight: 36 }} />
            <Lock className="w-4 h-4" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-ghost)' }} />
          </div>
        </div>

        <div className="gradient-divider" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Key className="w-4 h-4" style={{ color: 'var(--blue-glow)' }} />
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--blue-text)' }}>Change Password</h3>
        </div>

        <div className="form-group">
          <label>Current Password</label>
          <div style={{ position: 'relative' }}>
            <input type={showCurrent ? 'text' : 'password'} value={form.currentPassword} onChange={e => setForm({ ...form, currentPassword: e.target.value })} placeholder="Enter current password" style={{ width: '100%', height: 48, paddingRight: 36 }} />
            <Button type="button" variant="ghost" size="icon" onClick={() => setShowCurrent(!showCurrent)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-ghost)', cursor: 'pointer', padding: 0 }}>
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="form-group">
          <label>New Password</label>
          <div style={{ position: 'relative' }}>
            <input type={showNew ? 'text' : 'password'} value={form.newPassword} onChange={e => setForm({ ...form, newPassword: e.target.value })} placeholder="Enter new password" style={{ width: '100%', height: 48, paddingRight: 36 }} />
            <Button type="button" variant="ghost" size="icon" onClick={() => setShowNew(!showNew)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-ghost)', cursor: 'pointer', padding: 0 }}>
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Confirm new password" style={{ width: '100%', height: 48 }} />
        </div>

        <Button type="submit" variant="default" disabled={saving} className="btn-primary" style={{ width: '100%', height: 50, justifyContent: 'center' }}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
        </Button>
      </form>
    </div>
  );
}
