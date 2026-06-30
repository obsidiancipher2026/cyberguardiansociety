'use client';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const activityData = [
  { name: 'Mon', visitors: 240, members: 18, threats: 12 },
  { name: 'Tue', visitors: 320, members: 25, threats: 8 },
  { name: 'Wed', visitors: 280, members: 30, threats: 15 },
  { name: 'Thu', visitors: 450, members: 22, threats: 10 },
  { name: 'Fri', visitors: 380, members: 35, threats: 20 },
  { name: 'Sat', visitors: 200, members: 12, threats: 5 },
  { name: 'Sun', visitors: 180, members: 8, threats: 3 },
];

export const contentDistributionData = [
  { name: 'News', value: 45, color: '#3B82F6' },
  { name: 'Events', value: 20, color: '#10B981' },
  { name: 'Threats', value: 55, color: '#EF4444' },
  { name: 'Courses', value: 30, color: '#F59E0B' },
];

export const memberGrowthData = [
  { month: 'Jan', total: 120, new: 15 },
  { month: 'Feb', total: 145, new: 25 },
  { month: 'Mar', total: 180, new: 35 },
  { month: 'Apr', total: 220, new: 40 },
  { month: 'May', total: 280, new: 60 },
  { month: 'Jun', total: 350, new: 70 },
  { month: 'Jul', total: 420, new: 70 },
  { month: 'Aug', total: 500, new: 80 },
  { month: 'Sep', total: 580, new: 80 },
  { month: 'Oct', total: 650, new: 70 },
  { month: 'Nov', total: 720, new: 70 },
  { month: 'Dec', total: 800, new: 80 },
];

export const threatCategoriesData = [
  { name: 'Malware', count: 120 },
  { name: 'Phishing', count: 200 },
  { name: 'Ransomware', count: 85 },
  { name: 'DDoS', count: 65 },
  { name: 'Zero-Day', count: 40 },
];

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div
      className={`neuo p-5 ${className}`}
    >
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ActivityLineChart() {
  return (
    <ChartCard title="Weekly Activity Overview">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={activityData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-color)"
            strokeOpacity={0.5}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--border-color)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--border-color)' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="members"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ fill: '#10B981', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="threats"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ fill: '#EF4444', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ContentPieChart() {
  return (
    <ChartCard title="Content Distribution">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={contentDistributionData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
          >
            {contentDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function MemberGrowthChart() {
  return (
    <ChartCard title="Member Growth (Yearly)">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={memberGrowthData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-color)"
            strokeOpacity={0.5}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--border-color)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--border-color)' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="new"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ThreatBarChart() {
  return (
    <ChartCard title="Threat Categories">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={threatCategoriesData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-color)"
            strokeOpacity={0.5}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--border-color)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--border-color)' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {threatCategoriesData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index % 2 === 0 ? '#EF4444' : '#F87171'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
