import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/SiteHeader';
import Reveal from '../../../components/Reveal';
import { team } from '../../../data';
import type { Locale } from '../../../types';

interface TeamPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'ru' && locale !== 'en') notFound();
  const en = locale === 'en';
  const title = en ? 'Professional team' : 'Профессиональная команда';
  const description = en
    ? 'Building trustworthy relationships relies on the personal commitment of every member of our team.'
    : 'Основой создания доверительных отношений является личный вклад каждого участника нашей команды.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/team`,
      languages: { ru: '/ru/team', en: '/en/team' },
    },
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== 'ru' && rawLocale !== 'en') notFound();
  const locale: Locale = rawLocale;
  const en = locale === 'en';

  return (
    <div className="site">
      <SiteHeader locale={locale} section="team" />
      <main id="main-content" className="innerPage">
        <div className="container innerHero">
          <Reveal>
            <div className="eyebrow">SAPPHIRE CONSULTING</div>
            <h1>{en ? 'Professional team' : 'Профессиональная команда'}</h1>
            <p>
              {en
                ? 'Building trustworthy relationships relies on the personal commitment of every member of our team.'
                : 'Основой создания доверительных отношений является личный вклад каждого участника нашей команды.'}
            </p>
          </Reveal>
        </div>

        <section className="section" aria-labelledby="team-title">
          <div className="container teamDetailGrid" id="team-title">
            {team.map((person, index) => (
              <Reveal key={person.slug} delay={index * 35}>
                <article id={person.slug} className="teamDetail">
                  <div className="detailPhoto">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      quality={90}
                      sizes="(max-width:700px) 92vw, (max-width:1000px) 48vw, 31vw"
                      loading="lazy"
                    />
                    <span className="photoWash" aria-hidden="true" />
                  </div>
                  <div className="detailBody">
                    <div className="eyebrow">{en ? person.enArea : person.area}</div>
                    <h2>{person.name}</h2>
                    <h3>{en ? person.enRole : person.role}</h3>
                    <p>{en ? person.enDetails : person.details}</p>
                    <div className="years">
                      {person.years} {en ? 'years of SAP experience' : 'лет опыта SAP'}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="ctaSection" id="contact">
          <div className="container ctaGrid">
            <Reveal>
              <div className="eyebrow light">{en ? 'CONTACT' : 'КОНТАКТЫ'}</div>
              <h2>{en ? 'We are here to help.' : 'Напишите нам, мы с удовольствием ответим на ваши вопросы'}</h2>
              <p>
                {en
                  ? 'Contact the team to discuss your SAP, finance or analytics challenge.'
                  : 'Свяжитесь с нами, чтобы обсудить вашу задачу по SAP, финансам или аналитике.'}
              </p>
              <Link className="button primary" href={`/${locale}#contact`}>
                {en ? 'Discuss a project' : 'Обсудить проект'} <span className="buttonArrow" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footerBottom">
          <span>© 2026 {en ? 'LLC Sapphire Consulting' : 'ООО «Сапфир консалтинг»'}</span>
          <Link href={`/${locale}`}>{en ? 'Home' : 'На главную'}</Link>
          <Link href={`/${locale}/team`}>{en ? 'Team' : 'Команда'}</Link>
          <Link href={en ? '/ru/team' : '/en/team'} className="footerLangSwitch">{en ? 'Русский' : 'English'}</Link>
        </div>
      </footer>
    </div>
  );
}
