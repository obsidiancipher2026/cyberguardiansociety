import { Shield, MessageCircle, BookOpen, Calendar, Library, Users, Fingerprint, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Real-time Threat Intel',
    description: 'Stay ahead of cyber threats with our real-time intelligence feed, aggregating data from global sources to keep you informed and protected.',
  },
  {
    icon: MessageCircle,
    title: 'Community Forum',
    description: 'Engage with cybersecurity experts and enthusiasts in our vibrant community forum. Share knowledge, ask questions, and collaborate on solutions.',
  },
  {
    icon: BookOpen,
    title: 'Security Courses',
    description: 'Access a curated library of courses ranging from beginner fundamentals to advanced penetration testing and defensive strategies.',
  },
  {
    icon: Calendar,
    title: 'Security Events',
    description: 'Participate in webinars, CTF competitions, workshops, and conferences hosted by leading cybersecurity professionals worldwide.',
  },
  {
    icon: Library,
    title: 'Resource Library',
    description: 'Explore our extensive collection of whitepapers, tools, templates, and research papers covering every aspect of cybersecurity.',
  },
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Connect with verified cybersecurity professionals for mentorship, consulting, and collaboration on critical security projects.',
  },
  {
    icon: Fingerprint,
    title: 'Vulnerability Research',
    description: 'Access our curated database of CVEs, exploit PoCs, and vulnerability analysis contributed by our global research community.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Leverage our distributed network of honeypots and sensors to gain visibility into emerging attack patterns worldwide.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 bg-abyss">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="terminal-eyebrow mb-4 inline-block">CAPABILITIES</span>
          <h2 className="font-display font-bold text-red-threat mb-3" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
            Everything You Need to <span className="text-cyan-core">Stay Secure</span>
          </h2>
          <p className="text-white-muted max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
            Our platform provides comprehensive tools and resources to help you
            navigate the complex world of cybersecurity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group cyber-card scan-hover p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-ghost flex items-center justify-center mb-4 group-hover:bg-cyan-core/15 transition-colors duration-250">
                  <Icon className="w-6 h-6 text-cyan-core" />
                </div>
                <h3 className="font-display font-semibold text-red-threat mb-2" style={{ fontSize: '15px' }}>
                  {feature.title}
                </h3>
                <p className="text-white-muted leading-relaxed" style={{ fontSize: '13px' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
