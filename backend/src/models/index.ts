import Admin from './Admin';
import News from './News';
import ThreatIntel from './ThreatIntel';
import Event from './Event';
import Course from './Course';
import Comment from './Comment';
import ActivityLog from './ActivityLog';
import SecurityToken from './SecurityToken';
import Opening from './Opening';
import Resource from './Resource';
import Testimonial from './Testimonial';
import GalleryItem from './GalleryItem';
import ContactSubmission from './ContactSubmission';
import AppLog from './AppLog';
import CgsContent from './CgsContent';
import SiteSettings from './SiteSettings';

News.belongsTo(Admin, { as: 'publisher', foreignKey: 'createdBy' });
Admin.hasMany(News, { as: 'newsArticles', foreignKey: 'createdBy' });

ActivityLog.belongsTo(Admin, { as: 'actor', foreignKey: 'adminId' });
Admin.hasMany(ActivityLog, { as: 'activityLogs', foreignKey: 'adminId' });

SecurityToken.belongsTo(Admin, { as: 'adminUser', foreignKey: 'adminId' });
Admin.hasMany(SecurityToken, { as: 'securityTokens', foreignKey: 'adminId' });

export {
  Admin,
  News,
  ThreatIntel,
  Event,
  Course,
  Comment,
  ActivityLog,
  SecurityToken,
  Opening,
  Resource,
  Testimonial,
  GalleryItem,
  ContactSubmission,
  AppLog,
  CgsContent,
  SiteSettings,
};
