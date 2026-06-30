import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as adminController from '../controllers/admin.controller';
import * as newsController from '../controllers/news.controller';
import * as eventsController from '../controllers/events.controller';
import * as threatsController from '../controllers/threats.controller';
import * as coursesController from '../controllers/courses.controller';
import * as openingsController from '../controllers/openings.controller';
import * as resourcesController from '../controllers/resources.controller';
import * as testimonialsController from '../controllers/testimonials.controller';
import * as galleryController from '../controllers/gallery.controller';
import * as contactController from '../controllers/contact.controller';
import * as appLogsController from '../controllers/appLogs.controller';
import * as credentialsController from '../controllers/credentials.controller';
import * as cgsContentController from '../controllers/cgsContent.controller';
import * as siteSettingsController from '../controllers/siteSettings.controller';
import { validate } from '../middleware/validation';
import { validateIdParam, validatePaginationQuery } from '../middleware/validateParams';
import { adminWriteLimiter } from '../middleware/rateLimiter';
import {
  newsSchema,
  newsUpdateSchema,
  threatSchema,
  threatUpdateSchema,
  eventSchema,
  eventUpdateSchema,
  courseSchema,
  courseUpdateSchema,
  commentApproveSchema,
  openingSchema,
  openingUpdateSchema,
  resourceSchema,
  resourceUpdateSchema,
  testimonialSchema,
  testimonialUpdateSchema,
  galleryItemSchema,
  galleryItemUpdateSchema,
  credentialsUpdateSchema,
  cgsContentSchema,
  cgsContentUpdateSchema,
  settingUpdateSchema,
} from '../utils/validators';

const router = Router();

router.use(authenticate);

router.get('/dashboard', adminController.getDashboard);

router.get('/news', authorize('manage_news'), validatePaginationQuery, adminController.getNews);
router.post('/news', authorize('manage_news'), adminWriteLimiter, validate(newsSchema), newsController.create);
router.put('/news/:id', authorize('manage_news'), adminWriteLimiter, validateIdParam, validate(newsUpdateSchema), newsController.update);
router.delete('/news/:id', authorize('manage_news'), adminWriteLimiter, validateIdParam, newsController.deleteNews);

router.get('/threats', authorize('manage_threats'), validatePaginationQuery, adminController.getThreats);
router.post('/threats', authorize('manage_threats'), adminWriteLimiter, validate(threatSchema), threatsController.create);
router.put('/threats/:id', authorize('manage_threats'), adminWriteLimiter, validateIdParam, validate(threatUpdateSchema), threatsController.update);
router.delete('/threats/:id', authorize('manage_threats'), adminWriteLimiter, validateIdParam, threatsController.deleteThreat);

router.get('/events', authorize('manage_events'), validatePaginationQuery, adminController.getEvents);
router.post('/events', authorize('manage_events'), adminWriteLimiter, validate(eventSchema), eventsController.create);
router.put('/events/:id', authorize('manage_events'), adminWriteLimiter, validateIdParam, validate(eventUpdateSchema), eventsController.update);
router.delete('/events/:id', authorize('manage_events'), adminWriteLimiter, validateIdParam, eventsController.deleteEvent);

router.get('/courses', authorize('manage_courses'), validatePaginationQuery, adminController.getCourses);
router.post('/courses', authorize('manage_courses'), adminWriteLimiter, validate(courseSchema), coursesController.create);
router.put('/courses/:id', authorize('manage_courses'), adminWriteLimiter, validateIdParam, validate(courseUpdateSchema), coursesController.update);
router.delete('/courses/:id', authorize('manage_courses'), adminWriteLimiter, validateIdParam, coursesController.deleteCourse);

router.get('/openings', validatePaginationQuery, openingsController.getAllAdmin);
router.post('/openings', adminWriteLimiter, validate(openingSchema), openingsController.create);
router.put('/openings/:id', adminWriteLimiter, validateIdParam, validate(openingUpdateSchema), openingsController.update);
router.delete('/openings/:id', adminWriteLimiter, validateIdParam, openingsController.deleteOpening);

router.get('/resources', validatePaginationQuery, resourcesController.getAllAdmin);
router.post('/resources', adminWriteLimiter, validate(resourceSchema), resourcesController.create);
router.put('/resources/:id', adminWriteLimiter, validateIdParam, validate(resourceUpdateSchema), resourcesController.update);
router.delete('/resources/:id', adminWriteLimiter, validateIdParam, resourcesController.deleteResource);

router.get('/testimonials', validatePaginationQuery, testimonialsController.getAllAdmin);
router.post('/testimonials', adminWriteLimiter, validate(testimonialSchema), testimonialsController.create);
router.put('/testimonials/:id', adminWriteLimiter, validateIdParam, validate(testimonialUpdateSchema), testimonialsController.update);
router.delete('/testimonials/:id', adminWriteLimiter, validateIdParam, testimonialsController.deleteTestimonial);

router.get('/gallery', validatePaginationQuery, galleryController.getAllAdmin);
router.post('/gallery', adminWriteLimiter, validate(galleryItemSchema), galleryController.create);
router.put('/gallery/:id', adminWriteLimiter, validateIdParam, validate(galleryItemUpdateSchema), galleryController.update);
router.delete('/gallery/:id', adminWriteLimiter, validateIdParam, galleryController.deleteGalleryItem);

router.get('/contact-submissions', validatePaginationQuery, contactController.getAll);
router.get('/contact-submissions/:id', validateIdParam, contactController.getById);
router.put('/contact-submissions/:id/status', adminWriteLimiter, validateIdParam, contactController.updateStatus);
router.delete('/contact-submissions/:id', adminWriteLimiter, validateIdParam, contactController.deleteSubmission);

router.get('/logs', validatePaginationQuery, appLogsController.getAll);
router.delete('/logs', adminWriteLimiter, appLogsController.deleteAll);

router.get('/credentials', credentialsController.getCredentials);
router.put('/credentials', adminWriteLimiter, validate(credentialsUpdateSchema), credentialsController.updateCredentials);

router.get('/cgs-content', cgsContentController.getAllAdmin);
router.get('/cgs-content/:id', validateIdParam, cgsContentController.getById);
router.post('/cgs-content', adminWriteLimiter, validate(cgsContentSchema), cgsContentController.create);
router.put('/cgs-content/:id', adminWriteLimiter, validateIdParam, validate(cgsContentUpdateSchema), cgsContentController.update);
router.delete('/cgs-content/:id', adminWriteLimiter, validateIdParam, cgsContentController.deleteSection);
router.put('/cgs-content-reorder', adminWriteLimiter, cgsContentController.reorder);

router.get('/settings', siteSettingsController.getSettings);
router.put('/settings/:key', adminWriteLimiter, validate(settingUpdateSchema), siteSettingsController.updateSetting);
router.put('/settings-bulk', adminWriteLimiter, siteSettingsController.updateSettings);

export default router;
