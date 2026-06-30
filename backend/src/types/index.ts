import { Optional } from 'sequelize';

export interface IAdminAttributes {
  id: number;
  email: string;
  username: string;
  passwordHash: string;
  fullName: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string;
  twoFactorSecret: string | null;
  lastLogin: Date | null;
  loginAttempts: number;
  lockedUntil: Date | null;
  ipWhitelist: string;
  sessions: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdminCreationAttributes extends Optional<IAdminAttributes, 'id' | 'permissions' | 'twoFactorSecret' | 'lastLogin' | 'loginAttempts' | 'lockedUntil' | 'ipWhitelist' | 'sessions' | 'createdAt' | 'updatedAt'> {}

export interface ISession {
  token: string;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export interface INewsAttributes {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  image: string;
  category: string;
  tags: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  views: number;
  commentsCount: number;
  featured: boolean;
  published: boolean;
  publishedAt: Date | null;
  createdBy: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INewsCreationAttributes extends Optional<INewsAttributes, 'id' | 'slug' | 'excerpt' | 'author' | 'image' | 'category' | 'tags' | 'severity' | 'views' | 'commentsCount' | 'featured' | 'published' | 'publishedAt' | 'createdBy' | 'createdAt' | 'updatedAt'> {}

export interface IThreatIntelAttributes {
  id: number;
  title: string;
  description: string;
  type: 'malware' | 'vulnerability' | 'apt' | 'ransomware' | 'zero-day';
  severity: 'low' | 'medium' | 'high' | 'critical';
  cvssScore: number | null;
  cveId: string;
  affectedSystems: string;
  indicators: string;
  mitigation: string;
  references: string;
  discoveredDate: Date | null;
  disclosedDate: Date | null;
  sources: string;
  commentsCount: number;
  views: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IThreatIntelCreationAttributes extends Optional<IThreatIntelAttributes, 'id' | 'cvssScore' | 'cveId' | 'affectedSystems' | 'indicators' | 'mitigation' | 'references' | 'discoveredDate' | 'disclosedDate' | 'sources' | 'commentsCount' | 'views' | 'createdAt' | 'updatedAt'> {}

export interface IEventAttributes {
  id: number;
  title: string;
  description: string;
  image: string;
  eventDate: Date | null;
  endDate: Date | null;
  location: string;
  eventType: 'conference' | 'workshop' | 'webinar' | 'ctf' | 'meetup' | 'training';
  maxAttendees: number | null;
  registeredCount: number;
  speakers: string;
  tags: string;
  agendaItems: string;
  registrationLink: string;
  commentsCount: number;
  views: number;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEventCreationAttributes extends Optional<IEventAttributes, 'id' | 'description' | 'image' | 'endDate' | 'location' | 'maxAttendees' | 'registeredCount' | 'speakers' | 'tags' | 'agendaItems' | 'registrationLink' | 'commentsCount' | 'views' | 'featured' | 'createdAt' | 'updatedAt'> {}

export interface IAgendaItem {
  time: string;
  title: string;
  speaker: string;
}

export interface ICourseAttributes {
  id: number;
  title: string;
  description: string;
  image: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number;
  category: string;
  modules: string;
  prerequisites: string;
  price: number;
  enrolledCount: number;
  rating: number;
  tags: string;
  commentsCount: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourseCreationAttributes extends Optional<ICourseAttributes, 'id' | 'description' | 'image' | 'category' | 'modules' | 'prerequisites' | 'price' | 'enrolledCount' | 'rating' | 'tags' | 'commentsCount' | 'published' | 'createdAt' | 'updatedAt'> {}

export interface IModule {
  title: string;
  lessons: ILesson[];
}

export interface ILesson {
  title: string;
  duration: number;
  description: string;
}

export interface ICommentAttributes {
  id: number;
  targetId: number;
  targetType: 'news' | 'threat' | 'event' | 'course';
  authorName: string;
  authorEmail: string;
  content: string;
  approved: boolean;
  flagged: boolean;
  replies: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommentCreationAttributes extends Optional<ICommentAttributes, 'id' | 'authorName' | 'authorEmail' | 'approved' | 'flagged' | 'replies' | 'createdAt' | 'updatedAt'> {}

export interface ICommentReply {
  authorName: string;
  content: string;
  createdAt: Date;
}

export interface IActivityLogAttributes {
  id: number;
  adminId: number | null;
  action: string;
  resourceType: string;
  resourceId: string;
  changes: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed';
  errorMessage: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IActivityLogCreationAttributes extends Optional<IActivityLogAttributes, 'id' | 'adminId' | 'resourceType' | 'resourceId' | 'changes' | 'ipAddress' | 'userAgent' | 'errorMessage' | 'createdAt' | 'updatedAt'> {}

export interface ISecurityTokenAttributes {
  id: number;
  adminId: number;
  sessionId: string;
  otp: string;
  otpExpiresAt: Date;
  ipAddress: string;
  userAgent: string;
  verified: boolean;
  verifiedAt: Date | null;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISecurityTokenCreationAttributes extends Optional<ISecurityTokenAttributes, 'id' | 'ipAddress' | 'userAgent' | 'verified' | 'verifiedAt' | 'createdAt' | 'updatedAt'> {}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T> {
  total: number;
  page: number;
  pages: number;
}
