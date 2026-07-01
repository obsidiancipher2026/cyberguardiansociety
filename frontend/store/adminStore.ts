'use client';

import { create } from 'zustand';
import api from '@/utils/api';

interface Admin {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
}

interface AdminState {
  isAuthenticated: boolean;
  admin: Admin | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAdminStore = create<AdminState>()((set) => ({
  isAuthenticated: false,
  admin: null,

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      if (data.success) {
        set({
          isAuthenticated: true,
          admin: data.data.admin,
        });
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch (error: any) {
      const msg = error?.message;
      if (typeof msg === 'string' && msg) {
        return { success: false, error: msg };
      }
      if (msg && typeof msg === 'object') {
        return { success: false, error: JSON.stringify(msg) };
      }
      return { success: false, error: 'Login failed. Please try again.' };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
    }
    set({
      isAuthenticated: false,
      admin: null,
    });
  },

  checkAuth: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      if (response.data.success) {
        set({ isAuthenticated: true });
        return true;
      }
      set({ isAuthenticated: false, admin: null });
      return false;
    } catch {
      set({ isAuthenticated: false, admin: null });
      return false;
    }
  },
}));

export const ADMIN_LOGIN_URL = '/admin/login';
