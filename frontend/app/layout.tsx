import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'CyberGuardiansSociety',
  description:
    'A community of cybersecurity enthusiasts, professionals, and learners dedicated to making the digital world safer through collaboration, education, and threat sharing.',
  keywords: [
    'cybersecurity',
    'community',
    'threat intelligence',
    'cyber defense',
    'security training',
    'CTF',
    'cyber community',
  ],
  authors: [{ name: 'CyberGuardiansSociety' }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'CyberGuardiansSociety',
    description: 'Securing Tomorrow, Today - A cybersecurity community',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--surface)',
              color: 'var(--white-primary)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-ui)',
            },
            success: {
              iconTheme: {
                primary: '#3B82F6',
                secondary: '#020408',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF2D55',
                secondary: '#020408',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
