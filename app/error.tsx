'use client';

import {usePathname} from 'next/navigation';

interface ErrorBoundaryProps { error?: Error & { digest?: string }; reset: () => void }

export default function GlobalError({reset}: ErrorBoundaryProps){
  const pathname = usePathname() || '';
  const en = pathname.startsWith('/en');
  return <main className="notFound"><div className="notFoundInner"><div className="eyebrow">SAPPHIRE CONSULTING</div><div className="notFoundCode">!</div><h1>{en?'Something went wrong':'Что-то пошло не так'}</h1><p>{en?'Please refresh the page. If the problem continues, contact the company.':'Попробуйте обновить страницу. Если проблема повторится, сообщите в компанию.'}</p><button className="button dark" onClick={() => reset()}>{en?'Try again':'Попробовать снова'} <span>↗</span></button></div></main>;
}
