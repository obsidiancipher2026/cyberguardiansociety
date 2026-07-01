import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import StatsSection from '@/components/home/StatsSection';
import EventsSection from '@/components/home/EventsSection';
import CTFSection from '@/components/home/CTFSection';
import ResourcesSection from '@/components/home/ResourcesSection';
import VolunteerSection from '@/components/home/VolunteerSection';
import SponsorsSection from '@/components/home/SponsorsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <EventsSection />
      <CTFSection />
      <ResourcesSection />
      <VolunteerSection />
      <SponsorsSection />
      <TestimonialsSection />
    </>
  );
}
