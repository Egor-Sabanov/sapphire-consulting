import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import LocaleSync from '../../components/LocaleSync';
import RouteTransition from '../../components/RouteTransition';
import type { Locale } from '../../types';

interface Props { children: ReactNode; params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === 'en';
  const title = en
    ? 'Sapphire Consulting — SAP and financial business solutions'
    : 'Сапфир Консалтинг — SAP и финансовые бизнес-решения';
  const description = en
    ? 'SAP expertise, financial processes, analytics, development and enterprise support.'
    : 'Экспертиза в области SAP, финансовых процессов, аналитики, разработки и сопровождения корпоративных решений.';
  return {
    title,
    description,
    alternates: {
      canonical: `/${en ? 'en' : 'ru'}`,
      languages: { ru: '/ru', en: '/en', 'x-default': '/ru' },
    },
    openGraph: {
      type: 'website',
      siteName: en ? 'Sapphire Consulting' : 'Сапфир Консалтинг',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sbs.expert'}/${en ? 'en' : 'ru'}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: en ? 'Sapphire Consulting' : 'Сапфир Консалтинг' }],
      locale: en ? 'en_US' : 'ru_RU',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const normalized: Locale = locale === 'en' ? 'en' : 'ru';
  return <div data-locale={normalized}><LocaleSync locale={normalized} /><RouteTransition>{children}</RouteTransition></div>;
}
