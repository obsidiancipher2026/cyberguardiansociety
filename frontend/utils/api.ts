import axios from 'axios';
import { API_BASE_URL } from './constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: true,
});

function toErrorMessage(raw: unknown): string {
  if (typeof raw === 'string') return raw;
  if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    const msg = obj.error || obj.message;
    if (typeof msg === 'string') return msg;
    if (msg && typeof msg === 'object') return JSON.stringify(msg);
    return JSON.stringify(raw);
  }
  return String(raw || 'An unexpected error occurred');
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data } = error.response;
      return Promise.reject(new Error(toErrorMessage(data)));
    }
    if (error.request) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    return Promise.reject(new Error(toErrorMessage(error.message)));
  }
);

export default api;
