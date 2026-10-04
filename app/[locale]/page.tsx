import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '../../components/SiteHeader';
import ContactForm from '../../components/ContactForm';
import SectionTitle from '../../components/SectionTitle';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icon';
import {clients, contact, services, solutions, team} from '../../data';
import type { IconName } from '../../types';

function clientLogoSrc(slug: string): string {
  return slug === 'vtb' ? '/assets/clients/vtb.svg' : `/assets/clients/${slug}.webp`;
}


export function generateStaticParams(){
  return [{locale:'ru'},{locale:'en'}];
}

interface HomeCopy {
  heroLabel:string; heroTitle:string; heroLead:string; primary:string; secondary:string; heroNote:string; facts:string;
  years:string; experts:string; areas:string; stack:string; services:string; servicesLabel:string; servicesText:string; hourlyRate:string;
  solutions:string; solutionsLabel:string; solutionsText:string; project:string; projectLabel:string; projectTitle:string; projectText:string;
  projectButton:string; expertise:string; expertiseLabel:string; expertiseTitle:string; expertiseText:string; expertiseButton:string;
  team:string; teamLabel:string; teamText:string; teamButton:string; clients:string; clientsLabel:string; clientsText:string;
  contactLabel:string; contactTitle:string; contactText:string; legal:string; home:string;
}

interface HomeProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const en = rawLocale === 'en';
  const title = en ? 'Sapphire Consulting — SAP and financial business solutions' : 'Сапфир Консалтинг — SAP и финансовые бизнес-решения';
  const description = en ? 'SAP expertise, financial processes, analytics, development and enterprise support.' : 'Экспертиза в области SAP, финансовых процессов, аналитики, разработки и сопровождения корпоративных решений.';
  return {title, description, alternates:{canonical:`/${en?'en':'ru'}`,languages:{ru:'/ru',en:'/en'}}, openGraph:{title,description,type:'website'}};
}

export default async function Home({ params }: HomeProps) {
  const {locale: rawLocale} = await params;
  if (rawLocale !== 'ru' && rawLocale !== 'en') notFound();
  const locale = rawLocale;
  const en = locale === 'en';

  const copy: HomeCopy = en ? {
    heroLabel:'SAP • FINANCE • AUTOMATION',
    heroTitle:'SAP solutions for complex financial business processes',
    heroLead:'We design, implement and develop financial business solutions around SAP — from discovery and architecture to support and continuous development.',
    primary:'Discuss a project',
    secondary:'Our capabilities',
    heroNote:'Full-cycle SAP expertise for the finance function',
    facts:'Expertise, backed by real experience',
    years:'years of SAP implementation expertise',
    experts:'experts in the core team',
    areas:'core business solution areas',
    stack:'finance, analytics and development',
    services:'What we do for business',
    servicesLabel:'CAPABILITIES',
    servicesText:'A full delivery cycle — from discovery and solution design to implementation, development and support of enterprise SAP solutions.',
    hourlyRate:'Service rate: from RUB 1,500 to 4,000 per hour',
    solutions:'Business solutions',
    solutionsLabel:'BUSINESS SOLUTIONS',
    solutionsText:'Functional expertise connected to the financial processes that matter to the business.',
    project:'Project experience',
    projectLabel:'PROJECT EXPERIENCE',
    projectTitle:'Experience built around complex financial processes',
    projectText:'Our team combines finance expertise, SAP architecture and implementation experience across large corporate environments.',
    projectButton:'View project experience',
    expertise:'SAP expertise',
    expertiseLabel:'SAP EXPERTISE',
    expertiseTitle:'Finance-first SAP expertise',
    expertiseText:'We combine functional knowledge with architecture, development and delivery management across the SAP landscape.',
    expertiseButton:'Explore capabilities',
    team:'Professional team',
    teamLabel:'TEAM',
    teamText:'Consultants and architects with deep implementation experience, focused on business outcomes.',
    teamButton:'Meet the team',
    clients:'Selected clients',
    clientsLabel:'CLIENTS',
    clientsText:'Companies represented in the current corporate portfolio. Project details are disclosed within the agreed scope.',
    contactLabel:'Contact',
    contactTitle:'Have a SAP challenge? Let’s discuss it with an expert.',
    contactText:'Send a short request. We will route it to the right specialist and get back to you.',
    legal:'IT activity types',
    home:'Home',
  } : {
    heroLabel:'SAP • ФИНАНСЫ • АВТОМАТИЗАЦИЯ',
    heroTitle:'SAP-решения для сложных финансовых процессов бизнеса',
    heroLead:'Проектируем, внедряем и развиваем финансовые бизнес-решения на базе SAP — от обследования и архитектуры до сопровождения и развития.',
    primary:'Обсудить проект',
    secondary:'Наши компетенции',
    heroNote:'Комплексная SAP-экспертиза для финансового контура',
    facts:'Экспертиза, за которой стоит опыт',
    years:'лет экспертизы во внедрении SAP',
    experts:'экспертов в основной команде',
    areas:'ключевых направления бизнес-решений',
    stack:'финансы, аналитика и разработка',
    services:'Что мы делаем для бизнеса',
    servicesLabel:'КОМПЕТЕНЦИИ',
    servicesText:'От обследования и проектирования до внедрения, разработки и сопровождения корпоративного SAP-ландшафта.',
    hourlyRate:'Стоимость услуг: от 1 500 до 4 000 ₽ в час',
    solutions:'Бизнес-решения',
    solutionsLabel:'БИЗНЕС-РЕШЕНИЯ',
    solutionsText:'Функциональная экспертиза, связанная с реальными финансовыми процессами бизнеса.',
    project:'Проектный опыт',
    projectLabel:'ПРОЕКТНЫЙ ОПЫТ',
    projectTitle:'Опыт, построенный вокруг сложных финансовых процессов',
    projectText:'Команда объединяет экспертизу в финансах, архитектуре SAP и реализации решений в крупных корпоративных средах.',
    projectButton:'Посмотреть проектный опыт',
    expertise:'SAP-экспертиза',
    expertiseLabel:'SAP-ЭКСПЕРТИЗА',
    expertiseTitle:'SAP-экспертиза с фокусом на финансах',
    expertiseText:'Соединяем функциональную экспертизу с архитектурой, разработкой и управлением поставкой решений SAP.',
    expertiseButton:'Все компетенции',
    team:'Команда экспертов',
    teamLabel:'КОМАНДА',
    teamText:'Консультанты и архитекторы с многолетним опытом внедрения, сфокусированные на результате для бизнеса.',
    teamButton:'Познакомиться с командой',
    clients:'Выбранные клиенты',
    clientsLabel:'КЛИЕНТЫ',
    clientsText:'Компании из текущего корпоративного портфеля. Детали проектов раскрываем в согласованном объёме.',
    contactLabel:'Контакты',
    contactTitle:'Есть задача по SAP? Обсудим её с экспертом.',
    contactText:'Оставьте короткую заявку — мы передадим её подходящему специалисту и свяжемся с вами.',
    legal:'Виды деятельности в области ИТ',
    home:'На главную',
  };

  const structuredData = {
    '@context':'https://schema.org',
    '@type':'Organization',
    name:en?'Sapphire Consulting':'Сапфир консалтинг',
    url:process.env.NEXT_PUBLIC_SITE_URL || 'https://sbs.expert',
    email:contact.email,
    address:{
      '@type':'PostalAddress',
      streetAddress:en?'53-4-451 Onezhskaya St.':'ул. Онежская, 53-4-451',
      postalCode:'125414',
      addressLocality:en?'Moscow':'Москва',
      addressCountry:'RU'
    },
    sameAs:[],
  };

  return <div className="site">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}} />
    <SiteHeader locale={locale}/>

    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="container heroShell">
          <div className="heroImage" aria-hidden="true">
            <Image
              src="/assets/hero-2026.webp"
              alt=""
              fill
              priority
              quality={94}
              sizes="(max-width: 760px) 100vw, 100vw"
              className="heroImageAsset"
            />
          </div>
          <div className="heroShade" aria-hidden="true" />
          <div className="heroContent">
            <div className="eyebrow heroEyebrow">{copy.heroLabel}</div>
            <h1 id="hero-title">{copy.heroTitle}</h1>
            <p className="heroLead">{copy.heroLead}</p>
            <div className="heroCtas">
              <a className="button primary" data-track="cta_click" data-track-location="hero-primary" data-track-locale={locale} href="#contact">{copy.primary}<span className="buttonArrow"><Icon name="arrow" size={16}/></span></a>
              <a className="button ghost" data-track="cta_click" data-track-location="hero-secondary" data-track-locale={locale} href="#services">{copy.secondary}</a>
            </div>
            <div className="heroNote"><span className="pulseDot"/>{copy.heroNote}</div>
          </div>
        </div>
      </section>

      <section className="trustBand" aria-label={copy.facts}>
        <div className="container trustGrid">
          <Reveal className="trustIntro"><span>{en?'At a glance':'Коротко о главном'}</span><strong>{copy.facts}</strong></Reveal>
          <Reveal className="metric" delay={40}><b>15+</b><span>{copy.years}</span></Reveal>
          <Reveal className="metric" delay={80}><b>9</b><span>{copy.experts}</span></Reveal>
          <Reveal className="metric" delay={120}><b>4</b><span>{copy.areas}</span></Reveal>
          <Reveal className="metric" delay={160}><b>SAP + BI</b><span>{copy.stack}</span></Reveal>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <Reveal><SectionTitle label={copy.servicesLabel} title={copy.services} description={copy.servicesText} action={<Link className="sectionAction" data-track="navigate_services" data-track-location="services-section" data-track-locale={locale} href={`/${locale}/services`}>{en?'All services':'Все услуги'} <Icon name="arrow" size={15}/></Link>}/></Reveal>
          <div className="serviceGrid">
            {services.map((service, index) => <Reveal key={service.title} className="serviceItem" delay={index*35}>
              <article className="serviceCard">
                <div className="serviceIcon"><Icon name={(['finance','controlling','treasury','corporate'] as IconName[])[index % 4]} size={21}/></div>
                <div><h3>{en?service.enTitle:service.title}</h3><p>{en?service.enDesc:service.desc}</p></div>
                <span className="cardArrow"><Icon name="arrow" size={15}/></span>
              </article>
            </Reveal>)}
          </div>
          <div className="rateNote"><span>{copy.hourlyRate}</span></div>
        </div>
      </section>

      <section className="solutionSection" id="solutions">
        <div className="container">
          <Reveal><SectionTitle light label={copy.solutionsLabel} title={copy.solutions} description={copy.solutionsText}/></Reveal>
          <div className="solutionGrid">
            {solutions.map((solution, index) => <Reveal key={solution.slug} delay={index*45}>
              <Link className="solutionCard" data-track="solution_open" data-track-location="solutions" data-track-locale={locale} href={`/${locale}/solutions#${solution.slug}`}>
                <span className="solutionIcon"><Icon name={solution.icon} size={21}/></span>
                <h3>{en?solution.enTitle:solution.title}</h3>
                <p>{en?solution.enDesc:solution.desc}</p>
                <div className="stack"><span>{en?'SAP stack':'SAP-стек'}</span><strong>{solution.stack}</strong></div>
                <span className="cardLink">{en?'Explore solution':'Подробнее'} <span className="linkArrow"><Icon name="arrow" size={13}/></span></span>
              </Link>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="section caseSection" id="projects">
        <div className="container">
          <Reveal>
            <div className="caseCard">
              <div className="caseCopy">
                <div className="eyebrow">{copy.projectLabel}</div>
                <h2>{copy.projectTitle}</h2>
                <p>{copy.projectText}</p>
                <Link className="button dark" data-track="project_open" data-track-location="case" data-track-locale={locale} href={`/${locale}/projects`}>{copy.projectButton}<span className="buttonArrow"><Icon name="arrow" size={16}/></span></Link>
              </div>
              <div className="caseVisual">
                <Image
                  src="/assets/project-2026.webp"
                  alt=""
                  fill
                  quality={94}
                  sizes="(max-width: 760px) 100vw, 100vw"
                  loading="lazy"
                  className="caseVisualAsset"
                />
                <div className="caseBadge"><strong>SAP</strong><span>{en?'Finance & BI':'Финансы и BI'}</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section expertiseSection">
        <div className="container twoCol">
          <Reveal>
            <SectionTitle label={copy.expertiseLabel} title={copy.expertiseTitle} description={copy.expertiseText} align="single"/>
            <Link className="textLink" data-track="navigate_services" data-track-location="expertise" data-track-locale={locale} href={`/${locale}/services`}>{copy.expertiseButton}<Icon name="arrow" size={16}/></Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="expertisePanel">
              <div className="sapMark"><span>SAP</span><small>{en?'Enterprise finance & analytics':'Корпоративные финансы и аналитика'}</small></div>
              <div className="expertiseTags">{['S/4HANA','Business Suite','ABAP','Fiori','BI & Analytics','Finance'].map(tag=><span key={tag}>{tag}</span>)}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section teamSection" id="team">
        <div className="container">
          <Reveal><SectionTitle label={copy.teamLabel} title={copy.team} description={copy.teamText}/></Reveal>
          <div className="teamGrid">
            {team.slice(0,4).map((person,index)=><Reveal key={person.slug} delay={index*50}>
              <Link className="personCard" data-track="expert_open" data-track-location="team" data-track-locale={locale} href={`/${locale}/team#${person.slug}`}>
                <div className="personPhoto"><Image src={person.photo} alt={person.name} fill quality={90} sizes="(max-width: 600px) 92vw, (max-width: 900px) 44vw, 25vw" loading="lazy"/><span className="photoWash"/></div>
                <div className="personMeta"><h3>{person.name}</h3><p>{en?person.enRole:person.role}</p><small>{en?person.enArea:person.area}</small></div>
                <span className="personArrow"><Icon name="arrow" size={17}/></span>
              </Link>
            </Reveal>)}
          </div>
          <Link className="button outline" href={`/${locale}/team`}>{copy.teamButton}<span className="buttonArrow"><Icon name="arrow" size={15}/></span></Link>
        </div>
      </section>

      <section className="clientsSection" id="clients">
        <div className="container">
          <Reveal><SectionTitle label={copy.clientsLabel} title={copy.clients} description={copy.clientsText}/></Reveal>
          <div className="logoGrid">
            {clients.map((client,index)=><Reveal key={client.slug} delay={index*15}>
              <div className="clientLogo"><Image src={clientLogoSrc(client.slug)} alt={en ? client.enName : client.name} width={160} height={64} loading="lazy"/></div>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="ctaSection" id="contact">
        <div className="container ctaGrid">
          <Reveal>
            <div className="eyebrow light">{copy.contactLabel}</div>
            <h2>{copy.contactTitle}</h2>
            <p>{copy.contactText}</p>
            <div className="contactDetails"><a href={`mailto:${contact.email}`}>{contact.email}</a><span>{en?contact.enAddress:contact.address}</span></div>
          </Reveal>
          <Reveal delay={100}>
            <div className="formPanel"><ContactForm locale={locale}/></div>
          </Reveal>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="container footerTop">
        <Link href={`/${locale}`} className="footerBrand"><Image src="/assets/logo-light.png" alt={en?'Sapphire Consulting':'Сапфир Консалтинг'} width={165} height={47}/></Link>
        <nav className="footerNav" aria-label={en?'Footer navigation':'Навигация в подвале'}>
          <a href="#services">{en?'Services':'Услуги'}</a><a href="#solutions">{en?'Solutions':'Решения'}</a><a href="#team">{en?'Team':'Команда'}</a><a href="#clients">{en?'Clients':'Клиенты'}</a><a href="#contact">{en?'Contact':'Контакты'}</a>
        </nav>
        <Link className="langFooter" href={en?'/ru':'/en'}>{en?'Русский':'English'}</Link>
      </div>
      <div className="container footerBottom">
        <span>© 2026 {en?'LLC Sapphire Consulting':'ООО «Сапфир консалтинг»'}</span>
        <Link href={`/${locale}/it-activities`}>{copy.legal}</Link>
        <span>{en?'TIN / KPP':'ИНН/КПП'} {contact.inn}/{contact.kpp}</span>
        <span>{en?'PSRN':'ОГРН'} {contact.ogrn}</span>
        <span>{en?'OKVED':'ОКВЭД'} {contact.okved}</span>
      </div>
    </footer>
  </div>;
}
