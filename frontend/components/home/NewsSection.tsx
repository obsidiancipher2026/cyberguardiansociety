import { ArrowRight, AlertCircle, TrendingUp, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const newsItems = [
  {
    icon: AlertCircle,
    title: 'Zero-Day Alert',
    description: 'Critical vulnerabilities discovered in widely-used enterprise software.',
    color: 'text-[var(--accent-red)]',
  },
  {
    icon: TrendingUp,
    title: 'Market Trends',
    description: 'Cybersecurity spending projected to reach $300B by 2027.',
    color: 'text-[var(--accent-blue)]',
  },
  {
    icon: Lock,
    title: 'Best Practices',
    description: 'New NIST framework updates published for critical infrastructure.',
    color: 'text-white',
  },
];

export default function NewsSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-white">Latest </span>
              <span className="text-gradient-red">Cyber News</span>
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl">
              Stay informed with the latest cybersecurity news, threat reports, and industry insights.
            </p>
          </div>
          <Link href="/blog" className="mt-3 md:mt-0">
            <Button variant="outline" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
              View All News
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-surface-primary border border-[var(--border-color)] rounded-xl p-5 hover:border-[var(--accent-blue)]/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
