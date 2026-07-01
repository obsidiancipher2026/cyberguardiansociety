export type Tier = 'leadership' | 'core' | 'general';

export interface TeamMember {
  name: string;
  tier: Tier;
  roleBadge: string;
  title: string;
  specialty: string;
  bio: string;
  skills: string[];
  socials: Record<string, string>;
}

export const team: TeamMember[] = [
  {
    name: 'Shayan Ahmed',
    tier: 'leadership',
    roleBadge: 'Founder & Director',
    title: 'Founder & Director',
    specialty: 'Cybersecurity Strategy · Leadership',
    bio: 'Provides strategic vision, leads organizational growth, oversees operations, and drives the long-term mission of Cyber Guardians Society.',
    skills: ['Leadership', 'Cybersecurity Strategy', 'Community Building', 'Project Management'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/shayanahmedmughal/',
      github: 'https://github.com/OperationZero-GHH',
      instagram: 'https://www.instagram.com/shayanahmed806/',
    },
  },
  {
    name: 'Muhammad Saad',
    tier: 'core',
    roleBadge: 'Deputy Lead',
    title: 'Deputy Lead Coordinator',
    specialty: 'Operations · Strategic Planning',
    bio: 'Supports organizational leadership by coordinating teams, managing day-to-day operations, and ensuring successful execution of projects and community objectives.',
    skills: ['Operations Management', 'Team Coordination', 'Strategic Planning'],
    socials: {},
  },
  {
    name: 'Muhammad Taha',
    tier: 'core',
    roleBadge: 'Technical Lead',
    title: 'Technical Department Lead',
    specialty: 'Penetration Testing · CTF Design',
    bio: 'Leads cybersecurity initiatives, develops CTF challenges, conducts security assessments, and ensures technical infrastructure reliability.',
    skills: ['Web Development', 'Network Security', 'CTF Design', 'Penetration Testing'],
    socials: {},
  },
  {
    name: 'Esha Javed',
    tier: 'general',
    roleBadge: 'Graphics Lead',
    title: 'Graphics Design Department Lead',
    specialty: 'Brand Identity · UI/UX Design',
    bio: 'Creates impactful visual content, maintains brand consistency, and develops professional designs for events, campaigns, and community identity.',
    skills: ['Graphic Design', 'Brand Identity', 'UI/UX Design', 'Visual Storytelling'],
    socials: {},
  },
  {
    name: 'Jannat Fatima',
    tier: 'general',
    roleBadge: 'Media Lead',
    title: 'Media & Communications Lead',
    specialty: 'Content Writing · Digital Marketing',
    bio: 'Manages official communications, social media platforms, public announcements, and digital engagement for the community.',
    skills: ['Content Writing', 'Social Media Management', 'Public Relations', 'Digital Marketing'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/jannat-rajput-2367a038b',
    },
  },
  {
    name: 'Muhammad Asad',
    tier: 'general',
    roleBadge: 'Events Lead',
    title: 'Event Management Lead',
    specialty: 'Event Planning · Public Speaking',
    bio: 'Plans, organizes, and executes community events, workshops, competitions, and initiatives ensuring smooth coordination.',
    skills: ['Event Planning', 'Video Editing', 'Public Speaking', 'Team Leadership'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/asad-malik-9624883b6',
      github: 'https://github.com/azumalik1122-ctrl',
      instagram: 'https://www.instagram.com/asadziaa__',
    },
  },
  {
    name: 'Bisma Soomro',
    tier: 'general',
    roleBadge: 'Community Lead',
    title: 'Community & Outreach Lead',
    specialty: 'Community Management · Networking',
    bio: 'Builds relationships with members and partners, fosters engagement, and leads outreach and networking initiatives.',
    skills: ['Community Management', 'Outreach', 'Networking', 'Event Coordination'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/bisma-soomro-4637773b6',
    },
  },
  {
    name: 'Wania Fatima',
    tier: 'general',
    roleBadge: 'Content Lead',
    title: 'Content & Documentation Lead',
    specialty: 'Technical Writing · Documentation',
    bio: 'Develops and manages high-quality written content and technical documentation ensuring clear communication across all resources.',
    skills: ['Technical Writing', 'Documentation', 'Content Strategy', 'Editing'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/wania-fatima/',
    },
  },
];
