import { Router } from 'express';
import * as newsController from '../controllers/news.controller';
import * as threatsController from '../controllers/threats.controller';
import * as eventsController from '../controllers/events.controller';
import * as coursesController from '../controllers/courses.controller';
import * as commentsController from '../controllers/comments.controller';
import * as openingsController from '../controllers/openings.controller';
import * as resourcesController from '../controllers/resources.controller';
import * as testimonialsController from '../controllers/testimonials.controller';
import * as galleryController from '../controllers/gallery.controller';
import * as contactController from '../controllers/contact.controller';
import * as cgsContentController from '../controllers/cgsContent.controller';
import * as siteSettingsController from '../controllers/siteSettings.controller';
import { validate } from '../middleware/validation';
import { commentSchema, contactSubmissionSchema } from '../utils/validators';
import { commentLimiter, contactLimiter } from '../middleware/rateLimiter';
import { validateIdParam, validatePaginationQuery } from '../middleware/validateParams';

const router = Router();

router.get('/news', validatePaginationQuery, newsController.getAll);
router.get('/news/:id', validateIdParam, newsController.getById);

router.get('/threats', validatePaginationQuery, threatsController.getAll);
router.get('/threats/:id', validateIdParam, threatsController.getById);

router.get('/events', validatePaginationQuery, eventsController.getAll);
router.get('/events/:id', validateIdParam, eventsController.getById);

router.get('/courses', validatePaginationQuery, coursesController.getAll);
router.get('/courses/:id', validateIdParam, coursesController.getById);

router.get('/openings', validatePaginationQuery, openingsController.getAll);
router.get('/openings/:id', validateIdParam, openingsController.getById);

router.get('/resources', validatePaginationQuery, resourcesController.getAll);
router.get('/resources/:id', validateIdParam, resourcesController.getById);

router.get('/testimonials', validatePaginationQuery, testimonialsController.getAll);
router.get('/testimonials/:id', validateIdParam, testimonialsController.getById);

router.get('/gallery', validatePaginationQuery, galleryController.getAll);
router.get('/gallery/:id', validateIdParam, galleryController.getById);

router.post('/contact', contactLimiter, validate(contactSubmissionSchema), contactController.create);

router.post('/comments', commentLimiter, validate(commentSchema), commentsController.createComment);

router.get('/cgs-content', cgsContentController.getAll);

router.get('/site-settings/maintenance', siteSettingsController.getMaintenanceStatus);

export default router;
