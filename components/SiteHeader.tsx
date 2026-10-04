
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { nav } from '../data';
import type { Locale } from '../types';

interface SiteHeaderProps { locale: Locale; section?: string | null }

export default function SiteHeader({ locale, section = null }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const en = locale === 'en';
  const other: Locale = en ? 'ru' : 'en';
  const languageHref = section ? `/${other}/${section}` : `/${other}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <>
    <a className="skipLink" href="#main-content">{en ? 'Skip to content' : 'Перейти к содержимому'}</a>
    <header className={`siteHeader ${scrolled ? 'scrolled' : ''}`}>
      <div className="container headerInner">
        <Link href={`/${locale}`} className="brand" aria-label={en ? 'Sapphire Consulting' : 'Сапфир Консалтинг'}>
          <span className="brandPlate"><Image src="/assets/logo.png" alt={en ? 'Sapphire Consulting' : 'Сапфир Консалтинг'} width={174} height={49} priority /></span>
        </Link>
        <nav className="desktopNav" aria-label={en ? 'Primary navigation' : 'Основная навигация'}>
          {nav.map((item) => <Link key={item.href} href={`/${locale}${item.href}`} transitionTypes={['route']}>{en ? item.en : item.ru}</Link>)}
        </nav>
        <div className="headerActions">
          <Link className="lang" href={languageHref} transitionTypes={['route']} aria-label={en ? 'Switch to Russian' : 'Переключить на английский'}>{en ? 'RU' : 'EN'}</Link>
          <a className="headerCta" data-track="cta_click" data-track-location="header" data-track-locale={locale} href={`/${locale}#contact`}>{en ? 'Discuss project' : 'Обсудить проект'} <span aria-hidden="true">↗</span></a>
        </div>
        <details className="mobileNav">
          <summary aria-label={en ? 'Open menu' : 'Открыть меню'}>☰</summary>
          <div className="mobileNavPanel">
            {nav.map((item) => <Link key={item.href} href={`/${locale}${item.href}`} transitionTypes={['route']}>{en ? item.en : item.ru}</Link>)}
            <Link href={languageHref} transitionTypes={['route']}>{en ? 'Русский' : 'English'}</Link>
            <a className="headerCta mobileCta" data-track="cta_click" data-track-location="mobile-header" data-track-locale={locale} href={`/${locale}#contact`}>{en ? 'Discuss project' : 'Обсудить проект'} <span aria-hidden="true">↗</span></a>
          </div>
        </details>
      </div>
    </header>
  </>;
}
