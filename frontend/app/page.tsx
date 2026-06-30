import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import TrainingSection from '@/components/home/TrainingSection';
import JoinSection from '@/components/home/JoinSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TrainingSection />
      <StatsSection />
      <JoinSection />
      <CTASection />
    </>
  );
}
