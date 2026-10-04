'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound(){
  const pathname = usePathname() || '';
  const en = pathname.startsWith('/en');
  return <main className="notFound"><div className="notFoundInner"><div className="eyebrow">SAPPHIRE CONSULTING</div><div className="notFoundCode">404</div><h1>{en?'Page not found':'Страница не найдена'}</h1><p>{en?'Check the address or return to the homepage.':'Проверьте адрес или вернитесь на главную страницу.'}</p><Link className="button dark" href={`/${en?'en':'ru'}`}>{en?'Back home':'На главную'} <span>→</span></Link></div></main>;
}
