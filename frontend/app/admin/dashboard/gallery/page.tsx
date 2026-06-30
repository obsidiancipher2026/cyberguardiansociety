'use client';

import { useState, useEffect } from 'react';
import { Camera, Plus, Edit, Trash2, Search, X, Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/animate-ui/primitives/radix/alert-dialog';
import api from '@/utils/api';
import toast from 'react-hot-toast';

interface GalleryItem {
  id: string; title: string; description: string; imageUrl: string; category: string; published: boolean; createdAt: string;
}

export default function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', category: 'general', published: true });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params: any = { search, limit: 50 };
      if (filter) params.category = filter;
      const res = await api.get('/admin/gallery', { params }); setItems(res.data.data || []);
    } catch {} finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, [search, filter]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData(); formData.append('file', file);
      const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm({ ...form, imageUrl: res.data.data.url }); toast.success('Image uploaded');
    } catch (err: any) { toast.error(err.message || 'Upload failed'); } finally { setUploading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editingId) { await api.put(`/admin/gallery/${editingId}`, form); toast.success('Updated'); }
      else { await api.post('/admin/gallery', form); toast.success('Created'); }
      setShowForm(false); setEditingId(null); setForm({ title: '', description: '', imageUrl: '', category: 'general', published: true });
      fetchData();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed'); } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="page-title">
        <Camera style={{ color: '#00E5FF' }} />
        <h1>Gallery</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: '0 0 50%' }}>
          <svg className="search-icon" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--text-ghost)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search gallery..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" style={{ paddingLeft: 38 }} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="filter-select">
          <option value="">All Categories</option>
          <option value="general">General</option>
          <option value="certificates">Certificates</option>
          <option value="collaboration">Collaboration</option>
          <option value="sponsors">Sponsors</option>
          <option value="bootcamps">Bootcamps</option>
          <option value="sessions">Sessions</option>
        </select>
        <div style={{ flex: 1 }} />
        <Button onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: '', description: '', imageUrl: '', category: 'general', published: true }); }} variant="default"><Plus className="w-4 h-4" /> Add Photo</Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{editingId ? 'Edit Photo' : 'New Photo'}</h3>
            <Button type="button" onClick={() => setShowForm(false)} variant="ghost" size="icon"><X className="w-4 h-4" /></Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" required />
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description (optional)" rows={2} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-ghost)', marginBottom: 6, display: 'block' }}>Upload Image</label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 16px', borderRadius: 6, border: '1px dashed var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13 }}>
                  <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Choose Image'}
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} style={{ display: 'none' }} />
                </label>
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text-ghost)', marginBottom: 6, display: 'block' }}>Or Image URL</label>
                <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
              </div>
            </div>
            {form.imageUrl && <img src={form.imageUrl} alt="Preview" style={{ width: 128, height: 96, objectFit: 'cover', borderRadius: 8 }} />}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="general">General</option>
                <option value="certificates">Certificates</option>
                <option value="collaboration">Collaboration</option>
                <option value="sponsors">Sponsors</option>
                <option value="bootcamps">Bootcamps</option>
                <option value="sessions">Sessions</option>
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
          <Camera style={{ color: 'var(--text-ghost)', opacity: 0.5 }} />
          <h3>No photos yet</h3>
          <p>Add gallery images to showcase your community.</p>
        </div>
      ) : (
        <div className="cyber-card" style={{ padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {items.map((item) => (
              <div key={item.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }} className="group">
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />}
                <div style={{ padding: 12 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: 'var(--blue-muted)', color: 'var(--blue-text)' }}>{item.category}</span>
                    <span style={{ fontSize: 11, color: item.published ? 'var(--green-glow)' : 'var(--text-ghost)' }}>{item.published ? 'Published' : 'Draft'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                    <Button onClick={() => { setForm({ title: item.title, description: item.description || '', imageUrl: item.imageUrl, category: item.category, published: item.published }); setEditingId(item.id); setShowForm(true); }} variant="secondary" size="icon"><Edit className="w-[14px] h-[14px]" /></Button>
                    <Button onClick={() => setDeleteId(item.id)} variant="destructive" size="icon"><Trash2 className="w-[14px] h-[14px]" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Photo</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this photo? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (!deleteId) return;
              try { await api.delete(`/admin/gallery/${deleteId}`); toast.success('Deleted'); fetchData(); } catch { toast.error('Failed'); }
              setDeleteId(null);
            }} style={{ background: 'var(--red-glow)', color: '#fff' }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
