// Stub for `@prisma/client` — only used when DATABASE_URL is set (production).
// The real types are installed with `npm install prisma @prisma/client`.
declare module '@prisma/client' {
  export class PrismaClient {
    constructor(options?: any);
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    admin: any;
    news: any;
    threatIntel: any;
    event: any;
    course: any;
    comment: any;
    activityLog: any;
    securityToken: any;
    opening: any;
    resource: any;
    testimonial: any;
    galleryItem: any;
    contactSubmission: any;
    appLog: any;
    cgsContent: any;
    siteSettings: any;
  }
}
