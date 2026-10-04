
'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

interface RevealProps { children:ReactNode; className?:string; delay?:number }

export default function Reveal({ children, className='', delay=0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.classList.add('reveal-init');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { node.classList.add('is-visible'); return; }
    const reveal = () => node.classList.add('is-visible');
    if (!('IntersectionObserver' in window)) { reveal(); return; }
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; requestAnimationFrame(reveal); observer.disconnect(); }, { threshold:0.05, rootMargin:'0px 0px -8% 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}
