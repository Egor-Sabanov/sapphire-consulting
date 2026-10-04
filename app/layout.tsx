import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import SiteTelemetry from '../components/SiteTelemetry';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sbs.expert'),
  title: { default: 'Сапфир Консалтинг — SAP и финансовые бизнес-решения', template: '%s' },
  description: 'Экспертиза в области SAP, финансовых процессов, аналитики, разработки и сопровождения корпоративных решений.',
  applicationName: 'Сапфир Консалтинг',
  category: 'business',
  creator: 'Сапфир Консалтинг',
  publisher: 'Сапфир Консалтинг',
  robots: { index: true, follow: true },
  alternates: { languages: { ru: '/ru', en: '/en', 'x-default': '/ru' } },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Сапфир Консалтинг',
    title: 'Сапфир Консалтинг — SAP и финансовые бизнес-решения',
    description: 'SAP, финансовые процессы, аналитика, развитие и сопровождение корпоративных решений.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Сапфир Консалтинг' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Сапфир Консалтинг — SAP и финансовые бизнес-решения',
    description: 'SAP, финансовые процессы, аналитика, развитие и сопровождение корпоративных решений.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, colorScheme: 'light', themeColor: '#f4f7f9' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        {children}
        <SiteTelemetry />
      </body>
    </html>
  );
}
