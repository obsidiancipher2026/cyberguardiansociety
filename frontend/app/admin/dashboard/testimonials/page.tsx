'use client';

import { useState, useEffect } from 'react';
import { Star, Plus, Edit, Trash2, Search, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/animate-ui/primitives/radix/alert-dialog';
import api from '@/utils/api';
import toast from 'react-hot-toast';

interface Testimonial {
  id: string; name: string; text: string; type: string; role: string; rating: number; published: boolean; createdAt: string;
}

export default function TestimonialsManagementPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', text: '', type: 'student', role: '', rating: 5, published: true });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params: any = { search, limit: 50 };
      if (filter) params.type = filter;
      const res = await api.get('/admin/testimonials', { params });
      setItems(res.data.data || []);
    } catch {} finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, [search, filter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) { await api.put(`/admin/testimonials/${editingId}`, form); toast.success('Updated'); }
      else { await api.post('/admin/testimonials', form); toast.success('Created'); }
      setShowForm(false); setEditingId(null); setForm({ name: '', text: '', type: 'student', role: '', rating: 5, published: true });
      fetchData();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed'); } finally { setSaving(false); }
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div>
      <div className="page-title">
        <Star style={{ color: 'var(--amber-glow)' }} />
        <h1>Testimonials</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: '0 0 65%' }}>
          <svg className="search-icon" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--text-ghost)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search testimonials..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" style={{ paddingLeft: 38 }} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="filter-select">
          <option value="">All Types</option>
          <option value="student">Students</option>
          <option value="volunteer">Volunteers</option>
        </select>
        <div style={{ flex: 1 }} />
        <Button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: '', text: '', type: 'student', role: '', rating: 5, published: true }); }} variant="default"><Plus className="w-4 h-4" /> Add Testimonial</Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h3>
            <Button type="button" onClick={() => setShowForm(false)} variant="ghost" size="icon"><X className="w-4 h-4" /></Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
              <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Role (optional)" />
            </div>
            <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="Testimonial text" required rows={3} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="student">Student</option>
                <option value="volunteer">Volunteer</option>
              </select>
              <select value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}>
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} /> Published
              </label>
            </div>
            <Button type="submit" disabled={saving} variant="default" style={{ alignSelf: 'flex-start' }}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} {editingId ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <Star style={{ color: 'var(--text-ghost)', opacity: 0.5 }} />
          <h3>No testimonials yet</h3>
          <p>Add testimonials to showcase community feedback.</p>
        </div>
      ) : (
        <div className="cyber-card" style={{ overflow: 'hidden' }}>
          {items.map((t) => (
            <div key={t.id} className="list-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--blue-muted)', color: 'var(--blue-text)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600, flexShrink: 0,
                }}>
                  {getInitials(t.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{t.name}</h3>
                  <p style={{ fontSize: 11, color: 'var(--text-ghost)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                    <span style={{ fontSize: 11, color: 'var(--amber-glow)' }}>{'★'.repeat(t.rating || 5)}</span>
                    <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: 'var(--blue-muted)', color: 'var(--blue-text)' }}>{t.type}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Button onClick={() => { setForm({ name: t.name, text: t.text, type: t.type, role: t.role || '', rating: t.rating || 5, published: t.published }); setEditingId(t.id); setShowForm(true); }} variant="secondary" size="icon"><Edit className="w-4 h-4" /></Button>
                <Button onClick={() => setDeleteId(t.id)} variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this testimonial? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (!deleteId) return;
              try { await api.delete(`/admin/testimonials/${deleteId}`); toast.success('Deleted'); fetchData(); } catch { toast.error('Failed'); }
              setDeleteId(null);
            }} style={{ background: 'var(--red-glow)', color: '#fff' }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
