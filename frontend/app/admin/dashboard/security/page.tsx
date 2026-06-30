'use client';

import { useState } from 'react';
import { Shield, Lock, Key, Activity, Eye, FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';

interface SecuritySettings {
  wafEnabled: boolean; tarpitEnabled: boolean; rateLimitingEnabled: boolean;
  csrfProtectionEnabled: boolean; bruteForceProtectionEnabled: boolean;
  credentialStuffingProtectionEnabled: boolean; inputSanitizationEnabled: boolean;
  sqlInjectionProtectionEnabled: boolean; xssProtectionEnabled: boolean;
  fileUploadProtectionEnabled: boolean; sslEnforcementEnabled: boolean;
  ipWhitelistEnabled: boolean; twoFactorRequired: boolean; sessionRotationEnabled: boolean;
}

const defaultSettings: SecuritySettings = {
  wafEnabled: true, tarpitEnabled: true, rateLimitingEnabled: true,
  csrfProtectionEnabled: true, bruteForceProtectionEnabled: true,
  credentialStuffingProtectionEnabled: true, inputSanitizationEnabled: true,
  sqlInjectionProtectionEnabled: true, xssProtectionEnabled: true,
  fileUploadProtectionEnabled: true, sslEnforcementEnabled: true,
  ipWhitelistEnabled: false, twoFactorRequired: true, sessionRotationEnabled: true,
};

export default function SecurityPage() {
  const [settings, setSettings] = useState<SecuritySettings>(defaultSettings);

  const toggleSetting = (key: keyof SecuritySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const securitySections = [
    { title: 'Web Application Firewall', description: 'Protects against SQL injection, XSS, path traversal, and other attack patterns', key: 'wafEnabled' as const, icon: Shield, color: 'var(--blue-glow)' },
    { title: 'HTTP Tarpit', description: 'Slows down responses for suspicious IPs to waste attacker resources', key: 'tarpitEnabled' as const, icon: Lock, color: 'var(--blue-glow)' },
    { title: 'Rate Limiting', description: 'Limits request frequency to prevent DoS and brute-force attacks', key: 'rateLimitingEnabled' as const, icon: Activity, color: 'var(--amber-glow)' },
    { title: 'CSRF Protection', description: 'Prevents cross-site request forgery attacks on state-changing operations', key: 'csrfProtectionEnabled' as const, icon: Shield, color: 'var(--blue-glow)' },
    { title: 'Brute-Force Protection', description: 'Account lockout after repeated failed login attempts', key: 'bruteForceProtectionEnabled' as const, icon: Lock, color: 'var(--amber-glow)' },
    { title: 'Credential Stuffing Detection', description: 'Detects and blocks automated login attempts using stolen credentials', key: 'credentialStuffingProtectionEnabled' as const, icon: AlertTriangle, color: 'var(--red-glow)' },
    { title: 'Input Sanitization', description: 'Strips HTML tags and normalizes unicode in all user input', key: 'inputSanitizationEnabled' as const, icon: FileText, color: 'var(--blue-glow)' },
    { title: 'SQL Injection Protection', description: 'Parameterized queries and LIKE wildcard escaping prevent SQL injection', key: 'sqlInjectionProtectionEnabled' as const, icon: Shield, color: 'var(--blue-glow)' },
    { title: 'XSS Protection', description: 'HTML encoding and Content Security Policy prevent cross-site scripting', key: 'xssProtectionEnabled' as const, icon: Eye, color: 'var(--red-glow)' },
    { title: 'File Upload Protection', description: 'Magic byte validation, file type checking, and size limits', key: 'fileUploadProtectionEnabled' as const, icon: FileText, color: 'var(--blue-glow)' },
    { title: 'SSL/TLS Enforcement', description: 'HTTPS-only cookies and HSTS headers prevent MITM attacks', key: 'sslEnforcementEnabled' as const, icon: Lock, color: 'var(--green-glow)' },
    { title: 'IP Whitelist', description: 'Restrict admin access to pre-approved IP addresses', key: 'ipWhitelistEnabled' as const, icon: Shield, color: 'var(--text-ghost)' },
    { title: 'Two-Factor Authentication', description: 'Require OTP verification for all admin logins', key: 'twoFactorRequired' as const, icon: Key, color: 'var(--green-glow)' },
    { title: 'Session Rotation', description: 'Issue new tokens on every refresh for enhanced security', key: 'sessionRotationEnabled' as const, icon: Activity, color: 'var(--green-glow)' },
  ];

  return (
    <div>
      <div className="page-title">
        <Shield style={{ color: 'var(--red-glow)' }} />
        <h1>Security</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {securitySections.map((section) => {
          const Icon = section.icon;
          const isEnabled = settings[section.key];
          return (
            <div key={section.key} style={{
              background: 'var(--bg-surface)',
              border: `1px solid ${isEnabled ? 'rgba(0,230,118,0.2)' : 'var(--border-default)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: 22,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              transition: 'all 0.15s ease',
              ...(isEnabled ? { background: 'rgba(0,230,118,0.02)' } : {}),
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                background: `${section.color}15`,
              }}>
                <Icon className="w-5 h-5" style={{ color: section.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{section.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{section.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => toggleSetting(section.key)}
                    role="switch"
                    aria-checked={isEnabled}
                    data-enabled={isEnabled}
                    className="cyber-toggle"
                    style={{ marginLeft: 16, flexShrink: 0 }}
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  {isEnabled ? (
                    <span className="badge-enabled">Enabled</span>
                  ) : (
                    <span className="badge-disabled">Disabled</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
