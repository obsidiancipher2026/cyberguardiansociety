import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export function escapeLikeSearch(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_');
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\0/g, '');
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

export function calculatePagination(
  page: number = 1,
  limit: number = 10
): { skip: number; limit: number; page: number } {
  const safePage = Math.max(1, Math.floor(page));
  const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 100);
  return {
    skip: (safePage - 1) * safeLimit,
    limit: safeLimit,
    page: safePage,
  };
}

export function buildApiResponse<T>(
  data: T,
  message?: string
): { success: true; data: T; message?: string } {
  return { success: true, data, ...(message && { message }) };
}

export function buildErrorResponse(error: string): { success: false; error: string } {
  return { success: false, error };
}

export function buildPaginatedResponse<T>(
  data: T,
  total: number,
  page: number,
  limit: number
): {
  success: true;
  data: T;
  total: number;
  page: number;
  pages: number;
} {
  return {
    success: true,
    data,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

export function parseJsonField<T = Record<string, unknown>>(
  value: string | undefined | null,
  fallback: T
): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getModelWhere(search: string, fields: string[]): Record<string, unknown> {
  const { Op } = require('sequelize');
  const escaped = escapeLikeSearch(search);
  if (fields.length === 1) {
    return { [fields[0]]: { [Op.like]: `%${escaped}%` } };
  }
  return {
    [Op.or]: fields.map((f) => ({ [f]: { [Op.like]: `%${escaped}%` } })),
  };
}
