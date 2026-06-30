'use client';

import { useState, useEffect, useCallback } from 'react';
import { Wrench, Loader2, AlertTriangle, CheckCircle, Globe } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import toast from 'react-hot-toast';
import api from '@/utils/api';

export default function MaintenancePage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('We are currently performing scheduled maintenance. Please check back soon.');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingMessage, setSavingMessage] = useState(false);

  const fetchSettings = useCallback(async () => {
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
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const toggleMaintenance = async () => {
    const newState = !maintenanceMode;
    setSaving(true);
    try {
      await api.put('/admin/settings/maintenanceMode', { value: String(newState) });
      setMaintenanceMode(newState);
      toast.success(newState ? 'Maintenance mode enabled - site is now offline' : 'Maintenance mode disabled - site is now online');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const saveMessage = async () => {
    setSavingMessage(true);
    try {
      await api.put('/admin/settings/maintenanceMessage', { value: maintenanceMessage });
      toast.success('Maintenance message saved');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save');
    } finally {
      setSavingMessage(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--blue-glow)' }} />
        <span style={{ marginLeft: 12, fontSize: 13, color: 'var(--text-secondary)' }}>Loading settings...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="page-title">
        <Wrench style={{ color: 'var(--blue-glow)' }} />
        <h1>Maintenance Mode</h1>
      </div>

      {/* Status Card */}
      <div style={{
        background: maintenanceMode ? 'linear-gradient(135deg, rgba(255,183,77,0.1) 0%, rgba(255,87,34,0.1) 100%)' : 'var(--bg-surface)',
        border: `1px solid ${maintenanceMode ? 'rgba(255,183,77,0.3)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {maintenanceMode ? (
              <AlertTriangle className="w-6 h-6" style={{ color: '#FFB74D' }} />
            ) : (
              <CheckCircle className="w-6 h-6" style={{ color: '#4CAF50' }} />
            )}
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
                Website Status
              </h2>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                {maintenanceMode ? 'Site is in maintenance mode - public visitors cannot access' : 'Site is live and accessible to all visitors'}
              </p>
            </div>
          </div>

          <Button
            onClick={toggleMaintenance}
            disabled={saving}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
              borderRadius: 'var(--radius-sm)', border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              background: maintenanceMode
                ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
                : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              color: 'white', fontSize: 13, fontWeight: 600,
              transition: 'all 0.15s ease',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
            {maintenanceMode ? 'Bring Site Online' : 'Put Site in Maintenance'}
          </Button>
        </div>

        {maintenanceMode && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(255,183,77,0.1)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,183,77,0.2)',
          }}>
            <p style={{ fontSize: 12, color: '#FFB74D', fontWeight: 500 }}>
              ⚠ The website is currently offline. Only admin panel is accessible.
            </p>
          </div>
        )}
      </div>

      {/* Maintenance Message */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
          Maintenance Message
        </h3>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
          This message will be displayed to visitors when the site is in maintenance mode.
        </p>

        <textarea
          value={maintenanceMessage}
          onChange={(e) => setMaintenanceMessage(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)',
            fontSize: 13,
            resize: 'vertical',
            marginBottom: 16,
          }}
          placeholder="Enter the message to display during maintenance..."
        />

        <Button
          onClick={saveMessage}
          disabled={savingMessage}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px',
            borderRadius: 'var(--radius-sm)', border: 'none', cursor: savingMessage ? 'not-allowed' : 'pointer',
            background: 'linear-gradient(135deg, var(--blue-glow) 0%, #0077AA 100%)',
            color: 'white', fontSize: 13, fontWeight: 600,
            transition: 'all 0.15s ease',
            opacity: savingMessage ? 0.7 : 1,
          }}
        >
          {savingMessage ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Save Message
        </Button>
      </div>

      {/* Preview */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        marginTop: 24,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
          Preview
        </h3>
        <div style={{
          background: '#020408',
          borderRadius: 'var(--radius-md)',
          padding: 32,
          textAlign: 'center',
          border: '1px solid var(--border-default)',
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(239,68,68,0.2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            border: '1px solid rgba(168,85,247,0.3)',
          }}>
            <Wrench className="w-8 h-8" style={{ color: 'var(--blue-glow)' }} />
          </div>
          <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
            Scheduled Maintenance
          </h4>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
            {maintenanceMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
