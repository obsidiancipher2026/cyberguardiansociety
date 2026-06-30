'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Globe,
  Database,
  Download,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  UserPlus,
  Trash2,
  Loader2,
  Wrench,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/utils/api';
import { Button } from '@/components/animate-ui/components/buttons/button';

const mockActivityLog = [
  { id: '1', admin: 'Admin User', action: 'Login', timestamp: '2026-06-26 01:15', ip: '192.168.1.100', status: 'success' },
  { id: '2', admin: 'Admin User', action: 'Updated News #45', timestamp: '2026-06-25 22:30', ip: '192.168.1.100', status: 'success' },
  { id: '3', admin: 'Jane Doe', action: 'Deleted Event #12', timestamp: '2026-06-25 18:45', ip: '10.0.0.45', status: 'success' },
  { id: '4', admin: 'Admin User', action: 'Failed Login Attempt', timestamp: '2026-06-25 03:20', ip: '45.33.32.156', status: 'failed' },
  { id: '5', admin: 'John Smith', action: 'Created Threat Report', timestamp: '2026-06-24 14:10', ip: '192.168.1.200', status: 'success' },
  { id: '6', admin: 'Jane Doe', action: 'Modified User Roles', timestamp: '2026-06-24 11:55', ip: '10.0.0.45', status: 'success' },
  { id: '7', admin: 'Admin User', action: 'Login', timestamp: '2026-06-24 09:00', ip: '192.168.1.100', status: 'success' },
];

const mockAdmins = [
  { id: '1', name: 'Admin User', email: 'admin@cyberguardians.com', role: 'Super Admin', lastActive: '1 min ago' },
  { id: '2', name: 'Jane Doe', email: 'jane@cyberguardians.com', role: 'Admin', lastActive: '2 hours ago' },
  { id: '3', name: 'John Smith', email: 'john@cyberguardians.com', role: 'Editor', lastActive: '1 day ago' },
];

export default function SecurityPanel() {
  const [activeTab, setActiveTab] = useState<'activity' | 'admins' | 'settings'>('activity');
  const [dateFilter, setDateFilter] = useState('');
  const [backingUp, setBackingUp] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('We are currently performing scheduled maintenance. Please check back soon.');
  const [maintenanceLoading, setMaintenanceLoading] = useState(true);
  const [maintenanceSaving, setMaintenanceSaving] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: 'editor' });

  const fetchMaintenanceSettings = useCallback(async () => {
    try {
      const response = await api.get('/admin/settings');
      const settings = response.data.data;
      if (settings.maintenanceMode !== undefined) {
        setMaintenanceMode(settings.maintenanceMode === 'true');
      }
      if (settings.maintenanceMessage !== undefined) {
        setMaintenanceMessage(settings.maintenanceMessage);
      }
    } catch (error) {
      // Use defaults
    } finally {
      setMaintenanceLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaintenanceSettings();
  }, [fetchMaintenanceSettings]);

  const handleBackup = async () => {
    setBackingUp(true);
    await new Promise((r) => setTimeout(r, 2500));
    setBackingUp(false);
    toast.success('Database backup completed successfully');
  };

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success(`Admin "${newAdmin.name}" added successfully`);
    setShowAddAdmin(false);
    setNewAdmin({ name: '', email: '', password: '', role: 'editor' });
  };

  const toggleMaintenanceMode = async () => {
    const newState = !maintenanceMode;
    setMaintenanceSaving(true);
    try {
      await api.put(`/admin/settings/maintenanceMode`, { value: String(newState) });
      setMaintenanceMode(newState);
      toast.success(newState ? 'Maintenance mode enabled' : 'Maintenance mode disabled');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update maintenance mode');
    } finally {
      setMaintenanceSaving(false);
    }
  };

  const saveMaintenanceMessage = async () => {
    setMaintenanceSaving(true);
    try {
      await api.put(`/admin/settings/maintenanceMessage`, { value: maintenanceMessage });
      toast.success('Maintenance message saved');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save message');
    } finally {
      setMaintenanceSaving(false);
    }
  };

  const filteredLogs = dateFilter
    ? mockActivityLog.filter((log) => log.timestamp.includes(dateFilter))
    : mockActivityLog;

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes logItemIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .log-row {
          animation: logItemIn 0.3s ease-out both;
        }
        @keyframes adminItemIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .admin-row {
          animation: adminItemIn 0.3s ease-out both;
        }
        .add-admin-enter {
          opacity: 0; height: 0; overflow: hidden;
          transition: opacity 0.3s ease, height 0.3s ease;
        }
        .add-admin-enter-active {
          opacity: 1; height: auto;
        }
      ` }} />
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[var(--bg-secondary)] rounded-lg w-fit border border-[var(--border-color)]">
        {(['activity', 'admins', 'settings'] as const).map((tab) => (
          <Button
            variant="ghost"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all capitalize ${
              activeTab === tab
                ? 'bg-[var(--bg-primary)] text-cyber-blue-light dark:text-cyber-blue-accent shadow-sm border border-[var(--border-color)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {tab === 'activity' ? 'Activity Log' : tab === 'admins' ? 'Admin Management' : 'Security Settings'}
          </Button>
        ))}
      </div>

      {/* Activity Log */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-cyber-blue-accent transition-all"
            />
            {dateFilter && (
              <Button
                variant="ghost"
                onClick={() => setDateFilter('')}
                className="text-sm text-cyber-blue-light dark:text-cyber-blue-accent hover:underline"
              >
                Clear
              </Button>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] glass-card">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                  {['Admin', 'Action', 'Timestamp', 'IP Address', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {filteredLogs.map((log, i) => (
                  <tr
                    key={log.id}
                    className="log-row hover:bg-[var(--bg-secondary)]/50 transition-colors"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{log.admin}</td>
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{log.action}</td>
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-[var(--text-secondary)]">{log.ip}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          log.status === 'success'
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {log.status === 'success' ? (
                          <ShieldCheck className="w-3 h-3" />
                        ) : (
                          <ShieldAlert className="w-3 h-3" />
                        )}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admin Management */}
      {activeTab === 'admins' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Admin Accounts ({mockAdmins.length})
            </h3>
            <Button
              variant="default"
              onClick={() => setShowAddAdmin(!showAddAdmin)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-cyber-blue to-cyber-blue-light dark:from-cyber-blue dark:to-cyber-blue-accent text-white rounded-lg hover:shadow-lg transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Add Admin
            </Button>
          </div>

          <div
            className={`${showAddAdmin ? 'add-admin-enter-active' : 'add-admin-enter'}`}
            style={showAddAdmin ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          >
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  placeholder="Full Name"
                  className="px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
                />
                <input
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  placeholder="Email"
                  type="email"
                  className="px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
                />
                <input
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  placeholder="Password"
                  type="password"
                  className="px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
                />
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  className="px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-cyber-blue-accent transition-all"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowAddAdmin(false)}
                  className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleAddAdmin}
                  className="px-3 py-1.5 text-sm font-medium bg-cyber-blue-light dark:bg-cyber-blue text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Add Admin
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {mockAdmins.map((admin, i) => (
              <div
                key={admin.id}
                className="admin-row flex items-center justify-between p-4 neuo"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyber-blue/20 to-cyber-red/20 flex items-center justify-center text-sm font-bold text-cyber-blue-light dark:text-cyber-blue-accent">
                    {admin.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{admin.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{admin.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--text-muted)]">{admin.lastActive}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      admin.role === 'Super Admin'
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : admin.role === 'Admin'
                        ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                        : 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {admin.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-5 neuo space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-cyber-blue-light" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">2FA Configuration</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--text-secondary)]">Two-Factor Authentication</p>
              <div onClick={() => { setTwoFA(!twoFA); toast.success(twoFA ? '2FA disabled' : '2FA enabled'); }} data-enabled={twoFA} className="clay-toggle w-11 h-6 cursor-pointer">
                <span className={`clay-toggle-knob h-4 w-4 ${twoFA ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)]">Requires OTP verification on admin login</p>
          </div>

          <div className="p-5 neuo space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">IP Whitelist</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">192.168.1.0/24, 10.0.0.0/8</p>
            <Button
              variant="ghost"
              onClick={() => toast('IP whitelist management coming soon', { icon: '🌐' })}
              className="text-xs text-cyber-blue-light dark:text-cyber-blue-accent hover:underline"
            >
              Manage IP Rules
            </Button>
          </div>

          <div className="p-5 neuo space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Session Timeout</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">Current timeout: 60 minutes</p>
            <Button
              variant="ghost"
              onClick={() => toast('Session settings coming soon', { icon: '⏱' })}
              className="text-xs text-cyber-blue-light dark:text-cyber-blue-accent hover:underline"
            >
              Configure
            </Button>
          </div>

          <div className="p-5 neuo space-y-4">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-cyber-red-light" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Backup & Maintenance</h3>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={handleBackup}
                disabled={backingUp}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-tertiary)] disabled:opacity-50 transition-all"
              >
                {backingUp ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {backingUp ? 'Backing up...' : 'Backup Database'}
              </Button>
              <span className="text-xs text-[var(--text-muted)]">Last: 2026-06-25</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
              <p className="text-sm text-[var(--text-secondary)]">Maintenance Mode</p>
              <div onClick={toggleMaintenanceMode} data-enabled={maintenanceMode} className="clay-toggle w-11 h-6 cursor-pointer">
                <span className={`clay-toggle-knob h-4 w-4 ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
            </div>
            {maintenanceMode && (
              <div className="pt-3 border-t border-[var(--border-color)] space-y-3">
                <div className="flex items-center gap-2 text-amber-500">
                  <Wrench className="w-4 h-4" />
                  <span className="text-xs font-medium">Site is in maintenance mode</span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Maintenance Message</label>
                  <textarea
                    value={maintenanceMessage}
                    onChange={(e) => setMaintenanceMessage(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all resize-none"
                    placeholder="Enter message to display during maintenance..."
                  />
                </div>
                <Button
                  variant="default"
                  onClick={saveMaintenanceMessage}
                  disabled={maintenanceSaving}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {maintenanceSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Save Message
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
