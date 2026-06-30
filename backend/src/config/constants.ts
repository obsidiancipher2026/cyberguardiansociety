export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const PERMISSIONS = {
  MANAGE_ADMINS: 'manage_admins',
  MANAGE_NEWS: 'manage_news',
  MANAGE_THREATS: 'manage_threats',
  MANAGE_EVENTS: 'manage_events',
  MANAGE_COURSES: 'manage_courses',
  MANAGE_MEMBERS: 'manage_members',
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_COMMENTS: 'manage_comments',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_NEWS,
    PERMISSIONS.MANAGE_THREATS,
    PERMISSIONS.MANAGE_EVENTS,
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.MANAGE_MEMBERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_COMMENTS,
  ],
  [ROLES.MODERATOR]: [
    PERMISSIONS.MANAGE_NEWS,
    PERMISSIONS.MANAGE_COMMENTS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
};

export const SEVERITIES = ['low', 'medium', 'high', 'critical'] as const;

export const THREAT_TYPES = [
  'malware',
  'vulnerability',
  'apt',
  'ransomware',
  'zero-day',
] as const;

export const EVENT_TYPES = [
  'conference',
  'workshop',
  'webinar',
  'ctf',
  'meetup',
  'training',
] as const;

export const COURSE_LEVELS = [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
] as const;

export const TARGET_TYPES = ['news', 'threat', 'event', 'course'] as const;

export const ACTIVITY_STATUSES = ['success', 'failed'] as const;

export const LOGIN_MAX_ATTEMPTS = 5;
export const LOGIN_LOCKOUT_MINUTES = 30;
export const SESSION_EXPIRY_DAYS = 7;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
