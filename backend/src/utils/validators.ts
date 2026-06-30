import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required',
  }),
});

export const newsSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).required(),
  excerpt: Joi.string().max(500).allow('', null),
  author: Joi.string().max(100).allow('', null),
  image: Joi.string().uri().allow('', null),
  category: Joi.string().max(100).allow('', null),
  tags: Joi.array().items(Joi.string().max(50)).default([]),
  severity: Joi.string().valid('low', 'medium', 'high', 'critical').default('low'),
  featured: Joi.boolean().default(false),
  published: Joi.boolean().default(false),
});

export const newsUpdateSchema = newsSchema.fork(
  Object.keys(newsSchema.describe().keys),
  (field) => field.optional()
);

export const threatSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('', null),
  type: Joi.string()
    .valid('malware', 'vulnerability', 'apt', 'ransomware', 'zero-day')
    .required(),
  severity: Joi.string().valid('low', 'medium', 'high', 'critical').required(),
  cvssScore: Joi.number().min(0).max(10).allow(null),
  cveId: Joi.string().pattern(/^CVE-\d{4}-\d{4,}$/i).allow('', null),
  affectedSystems: Joi.array().items(Joi.string()).default([]),
  indicators: Joi.array().items(Joi.string()).default([]),
  mitigation: Joi.string().allow('', null),
  references: Joi.array().items(Joi.string().uri()).default([]),
  discoveredDate: Joi.date().allow(null),
  disclosedDate: Joi.date().allow(null),
  sources: Joi.array().items(Joi.string()).default([]),
});

export const threatUpdateSchema = threatSchema.fork(
  Object.keys(threatSchema.describe().keys),
  (field) => field.optional()
);

export const eventSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('', null),
  image: Joi.string().uri().allow('', null),
  eventDate: Joi.date().required(),
  endDate: Joi.date().allow(null).min(Joi.ref('eventDate')),
  location: Joi.string().max(200).allow('', null),
  eventType: Joi.string()
    .valid('conference', 'workshop', 'webinar', 'ctf', 'meetup', 'training')
    .required(),
  maxAttendees: Joi.number().integer().min(0).allow(null),
  speakers: Joi.array().items(Joi.string().max(100)).default([]),
  tags: Joi.array().items(Joi.string().max(50)).default([]),
  agendaItems: Joi.array()
    .items(
      Joi.object({
        time: Joi.string().required(),
        title: Joi.string().required(),
        speaker: Joi.string().allow(''),
      })
    )
    .default([]),
  registrationLink: Joi.string().uri().allow('', null),
  featured: Joi.boolean().default(false),
});

export const eventUpdateSchema = eventSchema.fork(
  Object.keys(eventSchema.describe().keys),
  (field) => field.optional()
);

export const courseSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('', null),
  image: Joi.string().uri().allow('', null),
  instructor: Joi.string().max(100).required(),
  level: Joi.string()
    .valid('beginner', 'intermediate', 'advanced', 'expert')
    .required(),
  duration: Joi.number().integer().min(1).required(),
  category: Joi.string().max(100).allow('', null),
  modules: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        lessons: Joi.array()
          .items(
            Joi.object({
              title: Joi.string().required(),
              duration: Joi.number().integer().min(1).required(),
              description: Joi.string().allow(''),
            })
          )
          .default([]),
      })
    )
    .default([]),
  prerequisites: Joi.array().items(Joi.string()).default([]),
  price: Joi.number().min(0).default(0),
  tags: Joi.array().items(Joi.string().max(50)).default([]),
  published: Joi.boolean().default(false),
});

export const courseUpdateSchema = courseSchema.fork(
  Object.keys(courseSchema.describe().keys),
  (field) => field.optional()
);

export const commentSchema = Joi.object({
  targetId: Joi.string().required(),
  targetType: Joi.string().valid('news', 'threat', 'event', 'course').required(),
  authorName: Joi.string().max(100).allow('', null),
  authorEmail: Joi.string().email().allow('', null),
  content: Joi.string().min(1).max(2000).required(),
});

export const commentApproveSchema = Joi.object({
  approved: Joi.boolean().required(),
});

export const updateSettingsSchema = Joi.object({
  fullName: Joi.string().max(100).optional(),
  twoFactorSecret: Joi.string().allow(null).optional(),
  ipWhitelist: Joi.array().items(Joi.string().ip()).optional(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': 'Refresh token is required',
  }),
});

export const openingSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('', null),
  type: Joi.string().max(100).default('Volunteer'),
  tags: Joi.array().items(Joi.string().max(50)).default([]),
  status: Joi.string().valid('open', 'closed').default('open'),
});

export const openingUpdateSchema = openingSchema.fork(
  Object.keys(openingSchema.describe().keys),
  (field) => field.optional()
);

export const resourceSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('', null),
  category: Joi.string().max(100).allow('', null).default(''),
  link: Joi.string().uri().allow('', null).default(''),
  fileUrl: Joi.string().uri().allow('', null).default(''),
  level: Joi.string().valid('beginner', 'intermediate', 'advanced').default('beginner'),
  published: Joi.boolean().default(false),
});

export const resourceUpdateSchema = resourceSchema.fork(
  Object.keys(resourceSchema.describe().keys),
  (field) => field.optional()
);

export const testimonialSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  role: Joi.string().max(100).allow('', null).default(''),
  text: Joi.string().min(5).max(2000).required(),
  rating: Joi.number().integer().min(1).max(5).default(5),
  type: Joi.string().valid('student', 'volunteer').default('student'),
  published: Joi.boolean().default(true),
});

export const testimonialUpdateSchema = testimonialSchema.fork(
  Object.keys(testimonialSchema.describe().keys),
  (field) => field.optional()
);

export const galleryItemSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('', null),
  category: Joi.string().max(100).allow('', null).default(''),
  imageUrl: Joi.string().uri().allow('', null).default(''),
  published: Joi.boolean().default(true),
});

export const galleryItemUpdateSchema = galleryItemSchema.fork(
  Object.keys(galleryItemSchema.describe().keys),
  (field) => field.optional()
);

export const contactSubmissionSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().max(200).allow('', null).default(''),
  message: Joi.string().min(10).max(5000).required(),
});

export const credentialsUpdateSchema = Joi.object({
  email: Joi.string().email().optional(),
  fullName: Joi.string().max(100).optional(),
  currentPassword: Joi.string().min(8).optional(),
  newPassword: Joi.string().min(8).optional(),
});

export const cgsContentSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().allow('', null).default(''),
  type: Joi.string().valid('core-area', 'program', 'skill', 'team-role').required(),
  icon: Joi.string().max(100).allow('', null).default(''),
  order: Joi.number().integer().min(0).optional(),
  published: Joi.boolean().default(true),
});

export const cgsContentUpdateSchema = cgsContentSchema.fork(
  Object.keys(cgsContentSchema.describe().keys),
  (field) => field.optional()
);

export const siteSettingsSchema = Joi.object({
  settings: Joi.object().pattern(
    Joi.string(),
    Joi.alternatives().try(Joi.string(), Joi.boolean(), Joi.number())
  ).required(),
});

export const settingUpdateSchema = Joi.object({
  value: Joi.alternatives().try(Joi.string(), Joi.boolean(), Joi.number()).required(),
});
