'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Search, Trash2, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/animate-ui/primitives/radix/alert-dialog';
import api from '@/utils/api';
import toast from 'react-hot-toast';

interface Submission {
  id: string; name: string; email: string; subject: string; message: string; status: string; createdAt: string;
}

export default function ContactManagementPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params: any = { search, limit: 50 };
      if (filter) params.status = filter;
      const res = await api.get('/admin/contact-submissions', { params });
      setSubmissions(res.data.data || []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [search, filter]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try { await api.put(`/admin/contact-submissions/${id}/status`, { status }); toast.success('Status updated'); fetchData(); } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id: string) => {
    try { await api.delete(`/admin/contact-submissions/${id}`); toast.success('Deleted'); fetchData(); setSelected(null); } catch { toast.error('Failed'); }
  };

  const openWhatsApp = (s: Submission) => {
    const msg = `New contact form submission:\nName: ${s.name}\nEmail: ${s.email}\nSubject: ${s.subject}\nMessage: ${s.message}`;
    window.open(`https://api.whatsapp.com/send?phone=923261458036&text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div>
      <div className="page-title">
        <MessageSquare style={{ color: 'var(--red-glow)' }} />
        <h1>Contact Submissions</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <svg className="search-icon" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--text-ghost)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search submissions..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" style={{ paddingLeft: 38 }} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="filter-select">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '35% 1fr', gap: 16, minHeight: 500 }}>
        <div className="cyber-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-default)' }}>
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', height: 38, background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '0 12px', fontSize: 13, color: 'var(--text-primary)', outline: 'none' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
            ) : submissions.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-ghost)', fontSize: 13 }}>No submissions found</div>
            ) : (
              submissions.map((s) => (
                <Button variant="ghost" key={s.id} onClick={() => { setSelected(s); if (s.status === 'new') handleStatusUpdate(s.id, 'read'); }}
                  style={{
                    width: '100%', textAlign: 'left', padding: '14px 16px', cursor: 'pointer', display: 'block',
                    border: 'none', borderBottom: '1px solid var(--border-default)', background: 'transparent',
                    transition: 'background 0.15s ease',
                    ...(selected?.id === s.id ? { background: 'var(--bg-hover)' } : {}),
                    ...(s.status === 'new' ? { borderLeft: '3px solid var(--blue-glow)' } : {}),
                  }}
                  onMouseEnter={(e) => { if (selected?.id !== s.id) e.currentTarget.style.background = 'var(--bg-hover)' }}
                  onMouseLeave={(e) => { if (selected?.id !== s.id) e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{s.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-ghost)' }}>{new Date(s.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-ghost)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.subject || 'No subject'}</p>
                </Button>
              ))
            )}
          </div>
        </div>

        <div className="cyber-card" style={{ borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' }}>
          {selected ? (
            <div style={{ padding: 24, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{selected.name}</h2>
                  <p style={{ fontSize: 13, color: 'var(--blue-text)', marginTop: 2 }}>{selected.email}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Button variant="accent" onClick={() => openWhatsApp(selected)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,230,118,0.1)', color: 'var(--green-glow)', border: 'none', fontSize: 12, cursor: 'pointer' }}>
                    <Mail className="w-[14px] h-[14px]" /> WhatsApp
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => setDeleteId(selected.id)} className="icon-btn icon-btn-delete"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16, fontSize: 13 }}>
                <p style={{ color: 'var(--text-secondary)' }}><span style={{ color: 'var(--text-ghost)' }}>Subject:</span> {selected.subject || 'No subject'}</p>
                <p style={{ color: 'var(--text-secondary)' }}><span style={{ color: 'var(--text-ghost)' }}>Date:</span> {new Date(selected.createdAt).toLocaleString()}</p>
              </div>

              <div style={{ padding: 16, background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)', marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{selected.message}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-ghost)' }}>Mark as:</span>
                {['new', 'read', 'replied'].map(s => (
                  <Button variant="outline" key={s} onClick={() => handleStatusUpdate(selected.id, s)}
                    style={{
                      fontSize: 12, padding: '4px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                      border: 'none', transition: 'all 0.15s ease',
                      ...(selected.status === s
                        ? { background: 'var(--blue-muted)', color: 'var(--blue-text)' }
                        : { background: 'var(--bg-hover)', color: 'var(--text-secondary)' }),
                    }}
                  >{s.charAt(0).toUpperCase() + s.slice(1)}</Button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
              <MessageSquare style={{ width: 48, height: 48, color: 'var(--text-ghost)', opacity: 0.3, marginBottom: 12 }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Select a submission to read it</p>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Submission</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this submission? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (!deleteId) return;
              await handleDelete(deleteId);
              setDeleteId(null);
            }} style={{ background: 'var(--red-glow)', color: '#fff' }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
