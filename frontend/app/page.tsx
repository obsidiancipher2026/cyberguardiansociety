import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import CTFSection from '@/components/home/CTFSection';
import ResourcesSection from '@/components/home/ResourcesSection';
import VolunteerSection from '@/components/home/VolunteerSection';
import CollaborationSection from '@/components/home/CollaborationSection';
import SponsorsSection from '@/components/home/SponsorsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CTFSection />
      <ResourcesSection />
      <VolunteerSection />
      <CollaborationSection />
      <SponsorsSection />
    </>
  );
}
