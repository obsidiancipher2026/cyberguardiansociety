export const siteInfo = {
  name: 'CyberGuardiansSociety',
  shortName: 'CGS',
  tagline: 'Securing Tomorrow, Today',
  description:
    'A community of cybersecurity enthusiasts, professionals, and learners dedicated to making the digital world safer through collaboration, education, and threat sharing.',
  email: 'cyberguardianssociety@gmail.com',
  location: 'Global (Virtual Community)',
  founded: '2024',
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'What We Do', href: '/what-cgs-do' },
  { label: 'Career', href: '/career' },
  { label: 'Resources', href: '/resources' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const;

export const socialLinks = {
  twitter: 'https://twitter.com/cgs_cyber',
  linkedin: 'https://www.linkedin.com/company/127073910',
  youtube: 'https://youtube.com/@cyberguardianssociety',
  discord: 'https://discord.gg/cyberguardians',
  email: 'mailto:cyberguardianssociety@gmail.com',
  instagram: 'https://www.instagram.com/cyberguardianssociety2026?igsh=ejU0cTFxaGo1cXlr',
  whatsapp: 'https://chat.whatsapp.com/DUvTs6TiEEj2CwTfG7eG9n',
};

export const threatSeverityColors = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'default',
} as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || '/api';
