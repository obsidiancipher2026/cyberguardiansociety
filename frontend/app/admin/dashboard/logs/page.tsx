'use client';

import { useState, useEffect } from 'react';
import { FileText, Search, Trash2, Loader2, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/animate-ui/primitives/radix/alert-dialog';
import api from '@/utils/api';
import toast from 'react-hot-toast';

interface AppLog {
  id: string; level: string; message: string; source: string; metadata: any; createdAt: string;
}

export default function LogsManagementPage() {
  const [logs, setLogs] = useState<AppLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [clearing, setClearing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params: any = { search, limit: 100 };
      if (levelFilter) params.level = levelFilter;
      const res = await api.get('/admin/logs', { params });
      setLogs(res.data.data || []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [search, levelFilter]);

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to clear ALL logs? This cannot be undone.')) return;
    setClearing(true);
    try { await api.delete('/admin/logs'); toast.success('All logs cleared'); fetchData(); } catch { toast.error('Failed'); } finally { setClearing(false); }
  };

  const levelBadge = (level: string) => {
    const map: Record<string, { cls: string; icon: React.ReactNode }> = {
      info: { cls: 'badge-info', icon: <Info className="w-[14px] h-[14px]" /> },
      warn: { cls: 'badge-warn', icon: <AlertTriangle className="w-[14px] h-[14px]" /> },
      error: { cls: 'badge-error', icon: <AlertTriangle className="w-[14px] h-[14px]" /> },
      debug: { cls: 'badge-debug', icon: null },
    };
    const m = map[level] || map.info;
    return (
      <span className={m.cls} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {m.icon} {level.toUpperCase()}
      </span>
    );
  };

  return (
    <div>
      <div className="page-title">
        <FileText style={{ color: 'var(--green-glow)' }} />
        <h1>Logs</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <svg className="search-icon" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--text-ghost)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search logs..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" style={{ paddingLeft: 38 }} />
        </div>
        <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="filter-select">
          <option value="">All Levels</option>
          <option value="info">Info</option>
          <option value="warn">Warning</option>
          <option value="error">Error</option>
          <option value="debug">Debug</option>
        </select>
        <Button variant="destructive" onClick={handleClearAll} disabled={clearing} className="btn-destructive">
          {clearing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Clear All Logs
        </Button>
      </div>

      {loading ? (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
      ) : logs.length === 0 ? (
        <div className="empty-state">
          <FileText style={{ color: 'var(--text-ghost)', opacity: 0.5 }} />
          <h3>No log entries</h3>
          <p>System events will appear here as they occur.</p>
        </div>
      ) : (
        <div className="cyber-card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-code)', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 500, color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Level</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 500, color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Message</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 500, color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Source</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 500, color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={log.id} style={{
                    borderBottom: '1px solid var(--border-default)',
                    background: i % 2 === 0 ? 'rgba(59,130,246,0.02)' : 'transparent',
                  }}>
                    <td style={{ padding: '10px 16px' }}>{levelBadge(log.level)}</td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-primary)', maxWidth: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.message}</td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-ghost)' }}>{log.source}</td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-ghost)', whiteSpace: 'nowrap' }}>{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
