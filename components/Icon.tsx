import type { ReactNode } from 'react';
import type { IconName } from '../types';

const paths: Record<IconName, ReactNode> = {
  arrow:<><path d="M5 19 19 5"/><path d="M7 5h12v12"/></>,
  finance:<><path d="M5 18V9"/><path d="M12 18V5"/><path d="M19 18v-6"/><path d="M4 20h16"/></>,
  controlling:<><circle cx="12" cy="12" r="7"/><path d="m12 9 3 3-3 3"/><path d="M9 12h6"/></>,
  treasury:<><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 10h8"/><path d="M8 14h4"/></>,
  corporate:<><path d="M4 19h16"/><path d="M6 19V8l6-4 6 4v11"/><path d="M9 11h1"/><path d="M14 11h1"/><path d="M9 15h1"/><path d="M14 15h1"/></>,
  plus:<><path d="M12 5v14"/><path d="M5 12h14"/></>,
};

interface IconProps { name?:IconName; size?:number; strokeWidth?:number; className?:string }
export default function Icon({ name='arrow', size=20, strokeWidth=1.7, className='' }: IconProps) {
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
