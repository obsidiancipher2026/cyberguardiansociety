'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit, Trash2, Search, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/animate-ui/primitives/radix/alert-dialog';
import api from '@/utils/api';
import toast from 'react-hot-toast';

interface Resource {
  id: string; title: string; description: string; category: string; level: string; url: string; published: boolean; createdAt: string;
}

export default function ResourcesManagementPage() {
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', category: 'whitepapers', level: 'beginner', url: '', published: true });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try { const res = await api.get('/admin/resources', { params: { search, limit: 50 } }); setItems(res.data.data || []); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) { await api.put(`/admin/resources/${editingId}`, form); toast.success('Updated'); }
      else { await api.post('/admin/resources', form); toast.success('Created'); }
      setShowForm(false); setEditingId(null); setForm({ title: '', description: '', category: 'whitepapers', level: 'beginner', url: '', published: true });
      fetchData();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed'); } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="page-title">
        <BookOpen style={{ color: 'var(--blue-glow)' }} />
        <h1>Resources</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: '0 0 70%' }}>
          <svg className="search-icon" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--text-ghost)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" style={{ paddingLeft: 38 }} />
        </div>
        <div style={{ flex: 1 }} />
        <Button onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: '', description: '', category: 'whitepapers', level: 'beginner', url: '', published: true }); }} variant="default"><Plus className="w-4 h-4" /> Add Resource</Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{editingId ? 'Edit Resource' : 'New Resource'}</h3>
            <Button type="button" onClick={() => setShowForm(false)} variant="ghost" size="icon"><X className="w-4 h-4" /></Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" required />
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" required rows={3} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="whitepapers">Whitepapers</option>
                <option value="video-tutorials">Video Tutorials</option>
                <option value="e-books">E-Books</option>
                <option value="tools">Tools</option>
                <option value="cheat-sheets">Cheat Sheets</option>
                <option value="external">External</option>
                <option value="labs">Labs</option>
                <option value="templates">Templates</option>
              </select>
              <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="URL (optional)" />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} /> Published
            </label>
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
          <BookOpen style={{ color: 'var(--text-ghost)', opacity: 0.5 }} />
          <h3>No resources added</h3>
          <p>Add learning materials to help the community grow.</p>
        </div>
      ) : (
        <div className="cyber-card" style={{ overflow: 'hidden' }}>
          {items.map((r) => (
            <div key={r.id} className="list-item">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{r.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--blue-muted)', color: 'var(--blue-text)' }}>{r.category}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-ghost)' }}>{r.level}</span>
                  <span style={{ fontSize: 11, color: r.published ? 'var(--green-glow)' : 'var(--text-ghost)' }}>{r.published ? 'Published' : 'Draft'}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 11, color: 'var(--text-ghost)' }}>{new Date(r.createdAt).toLocaleDateString()}</span>
                <Button onClick={() => { setForm({ title: r.title, description: r.description, category: r.category, level: r.level, url: r.url || '', published: r.published }); setEditingId(r.id); setShowForm(true); }} variant="secondary" size="icon"><Edit className="w-4 h-4" /></Button>
                <Button onClick={() => setDeleteId(r.id)} variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this resource? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (!deleteId) return;
              try { await api.delete(`/admin/resources/${deleteId}`); toast.success('Deleted'); fetchData(); } catch { toast.error('Failed'); }
              setDeleteId(null);
            }} style={{ background: 'var(--red-glow)', color: '#fff' }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
