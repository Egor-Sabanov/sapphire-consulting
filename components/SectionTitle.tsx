import type { ReactNode } from 'react';

interface SectionTitleProps { label:string; title:string; description?:string; light?:boolean; align?:'split'|'single'; action?:ReactNode }

export default function SectionTitle({ label, title, description, light=false, align='split', action=null }: SectionTitleProps) {
  return <div className={`sectionTitle ${light ? 'light' : ''} ${align === 'single' ? 'single' : ''}`}>
    <div className="sectionHeading"><div className="eyebrow">{label}</div><h2>{title}</h2></div>
    {(description || action) && <div className="sectionTitleAside">{description && <p>{description}</p>}{action}</div>}
  </div>;
}
