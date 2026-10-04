import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '../../../components/SiteHeader';
import ContactForm from '../../../components/ContactForm';
import SectionTitle from '../../../components/SectionTitle';
import Reveal from '../../../components/Reveal';
import Icon from '../../../components/Icon';
import {contact, legalText, services, solutions, clients} from '../../../data';
import type { IconName, Locale } from '../../../types';

const publicSections = ['services', 'solutions', 'projects', 'it-activities', 'privacy'] as const;
type SectionName = typeof publicSections[number];

export function generateStaticParams(){
  return ['ru','en'].flatMap(locale => publicSections.map(section => ({locale,section})));
}

function isPublicSection(value: string): value is SectionName {
  return publicSections.includes(value as SectionName);
}

function logoSrc(slug: string): string {return slug==='vtb'?'/assets/clients/vtb.svg':`/assets/clients/${slug}.webp`;}

interface SectionPageProps { params: Promise<{ locale: string; section: string }> }

export async function generateMetadata({params}: SectionPageProps){
  const {locale: rawLocale, section: rawSection} = await params;
  if (rawLocale !== 'ru' && rawLocale !== 'en') notFound();
  if (!isPublicSection(rawSection)) notFound();
  const section: SectionName = rawSection;
  const en = rawLocale === 'en';
  const titles: Record<SectionName, string> = en ? {services:'Services',solutions:'Business solutions',projects:'Project experience','it-activities':'IT activity types',privacy:'Privacy policy'} : {services:'Наши услуги',solutions:'Бизнес-решения',projects:'Проектный опыт','it-activities':'Виды деятельности в области ИТ',privacy:'Политика конфиденциальности'};
  const title = titles[section] || (en ? 'Sapphire Consulting' : 'Сапфир Консалтинг');
  const description = en ? 'Sapphire Consulting — SAP, financial processes and enterprise automation.' : 'Сапфир Консалтинг — SAP, финансовые процессы и корпоративная автоматизация.';
  return {title,description,alternates:{canonical:`/${en?'en':'ru'}/${section}`,languages:{ru:`/ru/${section}`,en:`/en/${section}`}}};
}

export default async function SectionPage({params}: SectionPageProps){
  const {locale: rawLocale, section: rawSection} = await params;
  if (rawLocale !== 'ru' && rawLocale !== 'en') notFound();
  if (!isPublicSection(rawSection)) notFound();
  const section: SectionName = rawSection;
  const locale: Locale = rawLocale;
  const en = locale === 'en';
  const titles: Record<SectionName, string> = en ? {
    services:'Services', solutions:'Business solutions',  projects:'Project experience', 'it-activities':'IT activity types', privacy:'Privacy policy'
  } : {
    services:'Наши услуги', solutions:'Бизнес-решения', projects:'Проектный опыт', 'it-activities':'Виды деятельности в области ИТ', privacy:'Политика конфиденциальности'
  };
  const title = titles[section] || (en ? 'Sapphire Consulting' : 'Сапфир Консалтинг');

  return <div className="site">
    <SiteHeader locale={locale} section={section}/>
    <main id="main-content" className="innerPage">
      <div className="container innerHero">
        <Reveal><div className="eyebrow">SAPPHIRE CONSULTING</div><h1>{title}</h1><p>{en?'Expertise in SAP, financial processes and enterprise automation.':'Экспертиза в области SAP, финансовых процессов и корпоративной автоматизации.'}</p></Reveal>
      </div>

      {section==='services' && <section className="section"><div className="container serviceList">{services.map((item,index)=><Reveal key={item.title} delay={index*30}><article className="serviceRow"><div className="rowIcon"><Icon name={(['finance','controlling','treasury','corporate'] as IconName[])[index % 4]} size={22}/></div><div><h2>{en?item.enTitle:item.title}</h2><p>{en?item.enDesc:item.desc}</p></div><Icon name="arrow" size={18}/></article></Reveal>)}</div></section>}

      {section==='solutions' && <section className="section"><div className="container solutionDetailGrid">{solutions.map((item,index)=><Reveal key={item.slug} delay={index*45}><article id={item.slug} className="solutionDetail"><div className="solutionDetailIcon"><Icon name={item.icon} size={22}/></div><h2>{en?item.enTitle:item.title}</h2><p>{en?item.enDesc:item.desc}</p><ul>{(en?item.enItems:item.items).map(point=><li key={point}>{point}</li>)}</ul><div className="stackBox"><strong>{en?'SAP stack':'SAP-стек'}</strong><span>{item.stack}</span></div></article></Reveal>)}</div></section>}

      {section==='projects' && <section className="section"><div className="container"><Reveal><div className="projectIntro"><div className="eyebrow">{en?'PROJECT EXPERIENCE':'ПРОЕКТНЫЙ ОПЫТ'}</div><h2>{en?'Experience across complex enterprise finance landscapes.':'Опыт команды — в сложных корпоративных финансовых контурах.'}</h2><p>{en?'We publish only the client and project information the company is authorized to disclose publicly.':'На сайте публикуем только ту информацию о клиентах и проектах, которую компания может раскрывать публично.'}</p></div></Reveal><div className="logoGrid projectLogos">{clients.map((client,index)=><Reveal key={client.slug} delay={index*15}><div className="clientLogo"><Image src={logoSrc(client.slug)} alt={en ? client.enName : client.name} width={160} height={64} loading="lazy"/></div></Reveal>)}</div><Reveal delay={120}><div className="projectNote"><strong>{en?'Project details are shared within the agreed disclosure scope':'Детали проектов — в согласованном объёме'}</strong><span>{en?'Ask the team for experience relevant to your specific challenge.':'Попросите команду показать релевантный опыт под вашу задачу.'}</span><a className="button dark" href="#contact">{en?'Discuss a project':'Обсудить проект'} <span className="buttonArrow"><Icon name="arrow" size={15}/></span></a></div></Reveal></div></section>}

      {section==='it-activities' && <section className="section"><div className="container legalContent"><Reveal><p className="legalLead">{en?legalText.enTitle:legalText.title}</p></Reveal>{[['1.01',en?legalText.enP101:legalText.p101],['2.01',en?legalText.enP201:legalText.p201],['3.01',en?legalText.enP301:legalText.p301]].map(([code,text],index)=><Reveal key={code} delay={index*40}><article className="legalArticle"><div className="legalCode">{code}</div><p>{text}</p></article></Reveal>)}</div></section>}

      {section==='privacy' && <section className="section"><div className="container legalContent privacyContent"><Reveal><p className="legalLead">{en?'This page describes how Sapphire Consulting processes personal data submitted through this website.':'Эта страница описывает порядок обработки персональных данных, которые передаются через сайт «Сапфир консалтинг».'}</p></Reveal><Reveal><article><h2>{en?'Data controller':'Оператор персональных данных'}</h2><p>{en?'Limited Liability Company “Sapphire Consulting”, 125414, Moscow, Onezhskaya St., 53-4-451, email: info@sbs.expert.':'ООО «Сапфир консалтинг», 125414, г. Москва, ул. Онежская, 53-4-451, email: info@sbs.expert.'}</p></article><article><h2>{en?'Data we receive':'Какие данные мы получаем'}</h2><p>{en?'Name, email, phone number, subject and message submitted in the contact form, plus technical information required for secure operation of the website.':'Имя, адрес электронной почты, номер телефона, тема и текст сообщения из контактной формы, а также техническая информация, необходимая для безопасной работы сайта.'}</p></article><article><h2>{en?'Website analytics and performance':'Аналитика и производительность сайта'}</h2><p>{en?'The website uses Vercel Web Analytics and Speed Insights to understand traffic and monitor real-user performance metrics. These tools are used without cookie-based analytics tracking in this configuration; only aggregated technical and usage information is collected.':'Сайт использует Vercel Web Analytics и Speed Insights для понимания посещаемости и контроля производительности по реальным пользователям. В текущей конфигурации эти инструменты не используют cookie-трекинг для аналитики; собирается агрегированная техническая и статистическая информация.'}</p></article><article><h2>{en?'Purpose and retention':'Цели и срок обработки'}</h2><p>{en?'We use the information to respond to enquiries, communicate with prospective clients and maintain website security. Data is retained only for as long as necessary for these purposes or as required by applicable law.':'Данные используются для ответа на обращения, связи с потенциальными клиентами и обеспечения безопасности сайта. Данные хранятся только столько, сколько необходимо для этих целей либо требуется применимым законодательством.'}</p></article><article><h2>{en?'Your rights':'Ваши права'}</h2><p>{en?'You may request access to your data, correction or deletion where applicable, and ask questions about processing by writing to info@sbs.expert.':'Вы вправе запросить доступ к своим данным, их исправление или удаление в предусмотренных случаях, а также задать вопросы по обработке данных по адресу info@sbs.expert.'}</p></article><article className="legalNotice"><strong>{en?'Important':'Важно'}</strong><p>{en?'The final wording of the privacy policy, consent text and retention periods should be reviewed and approved by the company’s legal representative before production launch.':'Финальную редакцию политики, текста согласия и сроков хранения перед публикацией необходимо проверить и утвердить уполномоченному представителю компании.'}</p></article></Reveal></div></section>}

      <section className="ctaSection" id="contact"><div className="container ctaGrid"><Reveal><div className="eyebrow light">{en?'CONTACT':'КОНТАКТЫ'}</div><h2>{en?'Let’s discuss your SAP challenge.':'Обсудим вашу задачу по SAP.'}</h2><p>{en?'A short brief is enough to start the conversation.':'Для начала достаточно коротко описать задачу.'}</p><a className="contactMail" href={`mailto:${contact.email}`}>{contact.email}</a><div className="contactDetails"><span>{en?contact.enAddress:contact.address}</span></div></Reveal><Reveal delay={100}><div className="formPanel"><ContactForm locale={locale}/></div></Reveal></div></section>
    </main>
    <footer className="footer"><div className="container footerBottom"><span>© 2026 {en?'LLC Sapphire Consulting':'ООО «Сапфир консалтинг»'}</span><Link href={`/${locale}`}>{en?'Home':'На главную'}</Link><Link href={`/${locale}/it-activities`}>{en?'IT activity types':'Виды деятельности в области ИТ'}</Link><Link href={en?'/ru/'+section:'/en/'+section} className="footerLangSwitch">{en?'Русский':'English'}</Link><span>{en?'TIN / KPP':'ИНН/КПП'} {contact.inn}/{contact.kpp}</span><span>{en?'PSRN':'ОГРН'} {contact.ogrn}</span></div></footer>
  </div>;
}
