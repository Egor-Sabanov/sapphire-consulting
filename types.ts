export type Locale = 'ru' | 'en';
export type IconName = 'arrow' | 'finance' | 'controlling' | 'treasury' | 'corporate' | 'plus';
export interface TeamMember { slug:string; name:string; role:string; enRole:string; area:string; enArea:string; photo:string; years:string; summary:string; enSummary:string; details:string; enDetails:string; }
export interface Client { slug:string; name:string; enName:string; }
export interface Service { title:string; enTitle:string; desc:string; enDesc:string; }
export interface Solution { slug:string; icon:IconName; title:string; enTitle:string; desc:string; enDesc:string; items:string[]; enItems:string[]; stack:string; }
export interface NavItem { href:string; ru:string; en:string; }
export interface ContactDetails { email:string; address:string; enAddress:string; inn:string; kpp:string; ogrn:string; okved:string; }
export interface LegalText { title:string; enTitle:string; p101:string; p201:string; p301:string; enP101:string; enP201:string; enP301:string; }
