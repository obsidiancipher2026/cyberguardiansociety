'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Shield, LogOut, ShieldAlert, Briefcase, BookOpen,
  Star, Camera, MessageSquare, Key, FileText, Menu, X, Wrench,
} from 'lucide-react';
import { useAdminStore, ADMIN_LOGIN_URL } from '@/store/adminStore';
import toast from 'react-hot-toast';
import { Button } from '@/components/animate-ui/components/buttons/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/animate-ui/primitives/animate/tooltip';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard',            icon: <LayoutDashboard className="w-[18px] h-[18px]" />, path: '/admin/dashboard' },
  { label: 'Career Openings',      icon: <Briefcase className="w-[18px] h-[18px]" />,       path: '/admin/dashboard/career' },
  { label: 'Resources',            icon: <BookOpen className="w-[18px] h-[18px]" />,        path: '/admin/dashboard/resources' },
  { label: 'Testimonials',         icon: <Star className="w-[18px] h-[18px]" />,            path: '/admin/dashboard/testimonials' },
  { label: 'Gallery',              icon: <Camera className="w-[18px] h-[18px]" />,          path: '/admin/dashboard/gallery' },
  { label: 'Contact Submissions',  icon: <MessageSquare className="w-[18px] h-[18px]" />,   path: '/admin/dashboard/contact' },
  { label: 'Logs',                 icon: <FileText className="w-[18px] h-[18px]" />,        path: '/admin/dashboard/logs' },
  { label: 'Security',             icon: <Shield className="w-[18px] h-[18px]" />,          path: '/admin/dashboard/security' },
  { label: 'Maintenance',          icon: <Wrench className="w-[18px] h-[18px]" />,          path: '/admin/dashboard/maintenance' },
  { label: 'Credentials',          icon: <Key className="w-[18px] h-[18px]" />,             path: '/admin/dashboard/credentials' },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAdminStore((s) => s.logout);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push(ADMIN_LOGIN_URL);
  };

  const isActive = (path: string) =>
    path === '/admin/dashboard'
      ? pathname === '/admin/dashboard'
      : pathname.startsWith(path);

  return (
    <TooltipProvider delayDuration={300}>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 p-2 rounded-[6px] lg:hidden"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
      >
        <Menu className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn" onClick={() => setIsOpen(false)} />
      )}

      <aside style={{
          position: 'fixed', top: 0, left: 0, zIndex: 50, height: '100%', width: 260,
          display: 'flex', flexDirection: 'column',
          background: 'var(--bg-surface)', borderRight: '1px solid var(--border-default)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }} className="lg:!translate-x-0"
      >
        <div style={{ height: 72, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, var(--red-glow) 0%, var(--blue-glow) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShieldAlert className="w-[18px] h-[18px] text-white" />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>CyberGuardians</p>
              <p style={{ fontSize: 11, color: 'var(--text-ghost)', lineHeight: 1.2 }}>Admin Panel</p>
            </div>
          </Link>
          <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="lg:hidden ml-auto" style={{ padding: 4, color: 'var(--text-secondary)' }}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="sidebar-separator" />

        <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 12px' }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      width: '100%',
                      height: 48,
                      padding: '0 12px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: active ? 500 : 400,
                      textDecoration: 'none',
                      position: 'relative',
                      transition: 'all 0.15s ease',
                      ...(active
                        ? {
                            background: 'var(--red-muted)',
                            borderLeft: '3px solid var(--red-glow)',
                            boxShadow: 'inset 0 0 20px rgba(255,23,68,0.08)',
                          }
                        : { background: 'transparent' }),
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'var(--bg-hover)';
                        const icon = e.currentTarget.querySelector('.nav-icon') as HTMLElement;
                        const label = e.currentTarget.querySelector('.nav-label') as HTMLElement;
                        if (icon) icon.style.color = 'var(--blue-text)';
                        if (label) label.style.color = 'var(--blue-text)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent';
                        const icon = e.currentTarget.querySelector('.nav-icon') as HTMLElement;
                        const label = e.currentTarget.querySelector('.nav-label') as HTMLElement;
                        if (icon) icon.style.color = '';
                        if (label) label.style.color = '';
                      }
                    }}
                  >
                    <span className="nav-icon" style={{
                      color: active ? 'var(--red-glow)' : 'var(--text-ghost)',
                      display: 'flex',
                      transition: 'color 0.15s ease',
                    }}>
                      {item.icon}
                    </span>
                    <span className="nav-label" style={{
                      color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'color 0.15s ease',
                    }}>
                      {item.label}
                    </span>
                    {active && (
                      <span style={{
                        marginLeft: 'auto',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--blue-glow)',
                        boxShadow: '0 0 6px var(--blue-glow)',
                      }} />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        <div style={{ borderTop: '1px solid var(--border-default)', padding: '12px 16px', marginTop: 16 }}>
          {showConfirm ? (
            <div style={{ padding: 12, background: 'var(--red-muted)', borderRadius: 6, border: '1px solid var(--border-red-strong)' }}>
              <p style={{ fontSize: 12, color: 'var(--red-text)', textAlign: 'center', marginBottom: 8 }}>Confirm logout?</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button onClick={() => setShowConfirm(false)} variant="ghost"
                  style={{ flex: 1, padding: '6px 12px', fontSize: 12, background: 'var(--bg-hover)', borderRadius: 6, border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Cancel
                </Button>
                <Button onClick={handleLogout} variant="destructive"
                  style={{ flex: 1, padding: '6px 12px', fontSize: 12, background: 'var(--red-glow)', borderRadius: 6, border: 'none', color: 'white', cursor: 'pointer' }}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => setShowConfirm(true)} variant="destructive"
                  style={{
                    width: '100%', height: 44, display: 'flex', alignItems: 'center', gap: 10,
                    padding: '0 12px', borderRadius: 6, background: 'transparent',
                    border: '1px solid var(--border-red)', color: 'var(--red-text)',
                    fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--red-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-red-strong)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--border-red)';
                  }}
                >
                  <LogOut className="w-[18px] h-[18px]" style={{ color: 'var(--red-glow)' }} />
                  <span>Sign Out</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8}>
                Sign Out
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
