'use client';

import { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit, Trash2, Search, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/animate-ui/primitives/radix/alert-dialog';
import api from '@/utils/api';
import toast from 'react-hot-toast';

interface Opening {
  id: string; title: string; description: string; type: string; tags: string[]; status: string; createdAt: string;
}

export default function CareerManagementPage() {
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', type: 'volunteer', tags: '' });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchOpenings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/openings', { params: { search, limit: 50 } });
      setOpenings(res.data.data || res.data.openings || []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchOpenings(); }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editingId) { await api.put(`/admin/openings/${editingId}`, payload); toast.success('Opening updated'); }
      else { await api.post('/admin/openings', payload); toast.success('Opening created'); }
      setShowForm(false); setEditingId(null);
      setForm({ title: '', description: '', type: 'volunteer', tags: '' });
      fetchOpenings();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed'); } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="page-title">
        <Briefcase style={{ color: 'var(--blue-glow)' }} />
        <h1>Career Openings</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: '0 0 70%' }}>
          <svg className="search-icon" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--text-ghost)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search openings..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" style={{ paddingLeft: 38 }} />
        </div>
        <div style={{ flex: 1 }} />
        <Button onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: '', description: '', type: 'volunteer', tags: '' }); }} variant="default">
          <Plus className="w-4 h-4" /> Add Opening
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{editingId ? 'Edit Opening' : 'New Opening'}</h3>
            <Button type="button" onClick={() => setShowForm(false)} variant="ghost" size="icon"><X className="w-4 h-4" /></Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Job Title" required />
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" required rows={3} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="volunteer">Volunteer</option>
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
              <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="Tags (comma separated)" />
            </div>
            <Button type="submit" disabled={saving} variant="default" style={{ alignSelf: 'flex-start' }}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} {editingId ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
      ) : openings.length === 0 ? (
        <div className="empty-state">
          <Briefcase style={{ color: 'var(--text-ghost)', opacity: 0.5 }} />
          <h3>No openings yet</h3>
          <p>Add your first career opening to display positions on the site.</p>
        </div>
      ) : (
        <div className="cyber-card" style={{ overflow: 'hidden' }}>
          {openings.map((o) => (
            <div key={o.id} className="list-item">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{o.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--blue-muted)', color: 'var(--blue-text)' }}>{o.type}</span>
                  {o.tags?.slice(0, 2).map(t => (
                    <span key={t} style={{ fontSize: 11, color: 'var(--text-ghost)' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 11, color: 'var(--text-ghost)' }}>{new Date(o.createdAt).toLocaleDateString()}</span>
                <Button onClick={() => { setForm({ title: o.title, description: o.description, type: o.type, tags: o.tags?.join(', ') || '' }); setEditingId(o.id); setShowForm(true); }} variant="secondary" size="icon"><Edit className="w-4 h-4" /></Button>
                <Button onClick={() => setDeleteId(o.id)} variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Opening</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this opening? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (!deleteId) return;
              try { await api.delete(`/admin/openings/${deleteId}`); toast.success('Deleted'); fetchOpenings(); } catch { toast.error('Failed'); }
              setDeleteId(null);
            }} style={{ background: 'var(--red-glow)', color: '#fff' }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
