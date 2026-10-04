import type { Client, ContactDetails, IconName, LegalText, NavItem, Service, Solution, TeamMember } from './types';

export const team: TeamMember[] = [
  {
    slug: 'ivan-zhilin',
    name: 'Иван Жилин',
    role: 'Руководитель направления',
    enRole: 'Practice Lead',
    area: 'Учет и налоги',
    enArea: 'Accounting & Tax',
    photo: '/assets/team/ivan-zhilin.webp',
    years: '15+',
    summary: 'Эксперт по учету, отчетности, управлению финансами и архитектуре финансовых решений.',
    enSummary: 'Expert in accounting, reporting, financial management and financial solution architecture.',
    details: '15+ лет опыта внедрения SAP; роли руководителя проектов, архитектора и эксперта. Функционал: FI, TRM, FI-AA, FI-VAT.',
    enDetails: '15+ years of SAP implementation experience in project leadership, architecture and expert roles. Focus: FI, TRM, FI-AA and FI-VAT.',
  },
  {
    slug: 'vladimir-maksimenko',
    name: 'Владимир Максименко',
    role: 'Эксперт', enRole: 'Expert',
    area: 'Учет и налоги', enArea: 'Accounting & Tax',
    photo: '/assets/team/vladimir-maksimenko.webp', years: '15+',
    summary: 'Эксперт в области учета, отчетности, НДС и архитектуры финансовых конфигураций.',
    enSummary: 'Expert in accounting, reporting, VAT and financial configuration architecture.',
    details: '15+ лет опыта внедрения SAP. Роли руководителя группы, архитектора и консультанта. FI-GL, FI-SL, FI-VAT, FI-AR/AP.',
    enDetails: '15+ years of SAP implementation experience as team lead, architect and consultant. FI-GL, FI-SL, FI-VAT and FI-AR/AP.',
  },
  {
    slug: 'oleg-surma', name: 'Олег Сурма', role: 'Эксперт', enRole: 'Expert',
    area: 'Учет и налоги', enArea: 'Accounting & Tax', photo: '/assets/team/oleg-surma.webp', years: '8+',
    summary: 'Эксперт по учету и отчетности, НДС и казначейству.',
    enSummary: 'Expert in accounting, reporting, VAT and treasury processes.',
    details: '8+ лет опыта внедрения SAP, включая работу в международном консалтинге. FI-GL, FI-AR/AP, FI-VAT, TRM.',
    enDetails: '8+ years of SAP implementation experience, including international consulting. FI-GL, FI-AR/AP, FI-VAT and TRM.',
  },
  {
    slug: 'semen-rufov', name: 'Семен Руфов', role: 'Эксперт', enRole: 'Expert',
    area: 'Учет и налоги', enArea: 'Accounting & Tax', photo: '/assets/team/semen-rufov.webp', years: '14+',
    summary: 'Эксперт по учету, основным средствам и налоговому учету.',
    enSummary: 'Expert in accounting, fixed assets and tax accounting.',
    details: '14+ лет опыта внедрения SAP. FI-AA, FI-GL, FI-AP/FI-AR, FI Local solutions.',
    enDetails: '14+ years of SAP implementation experience. FI-AA, FI-GL, FI-AP/FI-AR and local FI solutions.',
  },
  {
    slug: 'ivan-smolyaninov', name: 'Иван Смолянинов', role: 'Эксперт', enRole: 'Expert',
    area: 'Учет и налоги', enArea: 'Accounting & Tax', photo: '/assets/team/ivan-smolyaninov.webp', years: '14+',
    summary: 'Эксперт по финансовым процессам, имуществу и архитектуре решений.',
    enSummary: 'Expert in finance processes, asset management and solution architecture.',
    details: '14+ лет опыта внедрения SAP, глубокая экспертиза финансовых процессов в ритейле. FI, FI-AA, FI-TAX, RE-FX, ICR, ACR.',
    enDetails: '14+ years of SAP implementation experience with strong retail finance expertise. FI, FI-AA, FI-TAX, RE-FX, ICR and ACR.',
  },
  {
    slug: 'anatoly-kraishkin', name: 'Анатолий Краишкин', role: 'Руководитель направления', enRole: 'Practice Lead',
    area: 'Казначейство и договоры', enArea: 'Treasury & Contracts', photo: '/assets/team/anatoly-kraishkin.webp', years: '15+',
    summary: 'Руководитель направления и эксперт по казначейству и финансам.',
    enSummary: 'Practice lead and expert in treasury and finance.',
    details: '15+ лет опыта внедрения SAP, включая Deloitte и IBS. CLM, TRM, FI-BL, FI-AP, BCM, FM, FI-GL, DMS.',
    enDetails: '15+ years of SAP implementation experience, including Deloitte and IBS. CLM, TRM, FI-BL, FI-AP, BCM, FM, FI-GL and DMS.',
  },
  {
    slug: 'ilona-karasova', name: 'Илона Карасова', role: 'Эксперт', enRole: 'Expert',
    area: 'Казначейство и договоры', enArea: 'Treasury & Contracts', photo: '/assets/team/ilona-karasova.webp', years: '15+',
    summary: 'Эксперт по управлению денежными средствами, казначейству и финансовому учету.',
    enSummary: 'Expert in cash management, treasury and financial accounting.',
    details: '15+ лет опыта внедрения SAP, включая 7 лет в международной консалтинговой компании. CLM, TRM, FI-BL, BCM, FM, FI-GL, FI-AP/AR.',
    enDetails: '15+ years of SAP implementation experience, including 7 years in international consulting. CLM, TRM, FI-BL, BCM, FM, FI-GL and FI-AP/AR.',
  },
  {
    slug: 'valentin-konev', name: 'Валентин Конев', role: 'Руководитель направления', enRole: 'Practice Lead',
    area: 'Контроллинг и имущество', enArea: 'Controlling & Real Estate', photo: '/assets/team/valentin-konev.webp', years: '16+',
    summary: 'Эксперт по контроллингу, архитектуре SAP ERP и межмодульной интеграции.',
    enSummary: 'Expert in controlling, SAP ERP architecture and cross-module integration.',
    details: '16+ лет опыта внедрения SAP. CO-OM, CO-PC, CO-PA, PS/IM, управление командой и архитектурой решений.',
    enDetails: '16+ years of SAP implementation experience. CO-OM, CO-PC, CO-PA and PS/IM, with team leadership and solution architecture.',
  },
  {
    slug: 'alexey-lapshin', name: 'Алексей Лапшин', role: 'Эксперт', enRole: 'Expert',
    area: 'Контроллинг и имущество', enArea: 'Controlling & Real Estate', photo: '/assets/team/alexey-lapshin.webp', years: '14+',
    summary: 'Эксперт по контроллингу и архитектуре SAP ERP.',
    enSummary: 'Expert in controlling and SAP ERP architecture.',
    details: '14+ лет опыта внедрения SAP. CO-OM, CO-PC, CO-PA, PS/IM; роли руководителя направления и эксперта.',
    enDetails: '14+ years of SAP implementation experience. CO-OM, CO-PC, CO-PA and PS/IM; practice lead and expert roles.',
  },
];

export const clients: Client[] = [
  {slug:'blumaq', name:'Blumaq', enName:'Blumaq'},
  {slug:'cherkizovo', name:'Черкизово', enName:'Cherkizovo'},
  {slug:'enka', name:'ENKA', enName:'ENKA'},
  {slug:'ilim', name:'ИЛИМ', enName:'ILIM'},
  {slug:'lukoil', name:'ЛУКОЙЛ', enName:'LUKOIL'},
  {slug:'magnit', name:'Магнит', enName:'Magnit'},
  {slug:'mobis', name:'MOBIS', enName:'MOBIS'},
  {slug:'m-video', name:'М.Видео', enName:'M.Video'},
  {slug:'nornickel', name:'Норникель', enName:'Nornickel'},
  {slug:'segezha', name:'Сегежа', enName:'Segezha Group'},
  {slug:'sibur', name:'СИБУР', enName:'SIBUR'},
  {slug:'sns', name:'СНС', enName:'SNS'},
  {slug:'suek', name:'СУЭК', enName:'SUEK'},
  {slug:'vtb', name:'ВТБ', enName:'VTB'},
];

export const services: Service[] = [
  {title:'Внедрение SAP полного цикла', enTitle:'Full-cycle SAP implementation', desc:'От обследования и проектирования до внедрения и сопровождения.', enDesc:'From discovery and solution design through implementation and long-term support.'},
  {title:'Анализ и тиражирование SAP', enTitle:'Fit-gap analysis & rollouts', desc:'Оценка текущего решения и масштабирование проверенных подходов.', enDesc:'Assessment of the current solution and rollout of proven approaches across the landscape.'},
  {title:'Внедрение запросов на изменения', enTitle:'Change request implementation', desc:'Управляемые изменения бизнес-процессов и системных решений.', enDesc:'Controlled changes to business processes and system solutions with clear delivery ownership.'},
  {title:'Аудит проекта и контроль качества', enTitle:'Project audit & quality assurance', desc:'Независимая оценка качества решений, рисков и хода проекта.', enDesc:'Independent assessment of solution quality, project risks and delivery progress.'},
  {title:'Поддержка системы и пользователей', enTitle:'System & user support', desc:'Стабильная эксплуатация, сопровождение и развитие SAP-ландшафта.', enDesc:'Stable operation, user support and continuous development of the SAP landscape.'},
  {title:'Разработка ABAP / Fiori', enTitle:'ABAP / Fiori development', desc:'Прикладная разработка и пользовательские интерфейсы вокруг SAP.', enDesc:'Application development and user interfaces around SAP.'},
  {title:'Визуализация и аналитика', enTitle:'Data visualization & analytics', desc:'Понятное представление управленческих данных из SAP и других источников.', enDesc:'Clear visualization of management data from SAP and other sources.'},
  {title:'Прочие услуги', enTitle:'Other services', desc:'Экспертные и консультационные задачи под конкретную потребность бизнеса.', enDesc:'Expert and consulting services tailored to a specific business need.'},
];

export const solutions: Solution[] = [
  {
    slug:'accounting-tax', icon:'finance' as IconName, title:'Учет и налоги', enTitle:'Accounting & Tax',
    desc:'Финансовый учет, отчетность и налоговые процессы в SAP.', enDesc:'Financial accounting, reporting and tax processes in SAP.',
    items:['Учет и отчетность, в т.ч. МСФО','Налоговый учет','Учет активов','Монитор закрытия периода','Выверка внутригрупповых оборотов','Центральные финансы','Налоговый мониторинг'],
    enItems:['General accounting, including IFRS','Tax accounting','Fixed assets accounting','Financial closing monitoring','Intercompany reconciliation','Central Finance','Tax monitoring'],
    stack:'FI-GL, FI-VAT, FI-TAX, FI-AR/AP, FI-AA, Central Finance, FCC, ACR, ICMR'
  },
  {
    slug:'controlling-real-estate', icon:'controlling' as IconName, title:'Контроллинг и имущество', enTitle:'Controlling & Real Estate',
    desc:'Управление прибыльностью, проектами, инвестициями и имуществом.', enDesc:'Profitability, project, investment and asset management.',
    items:['Контроллинг','Управление прибыльностью компании','Управление проектами и инвестициями','Управление имуществом и договорами аренды','Планирование и прогнозирование себестоимости'],
    enItems:['Controlling','Profitability management','Project and investment management','Real estate and lease management','Cost planning and forecasting'],
    stack:'CO-OM, CO-PC, CO-PA, FS-PER (PaPM), PS/IM, RE-FX, EC-ECA'
  },
  {
    slug:'treasury-contracts', icon:'treasury' as IconName, title:'Казначейство и договоры', enTitle:'Treasury & Contracts',
    desc:'Платежи, ликвидность, финансовые инструменты и договорный контур.', enDesc:'Payments, liquidity, financial instruments and contract management.',
    items:['Управление платежами','Управление ликвидностью','Управление финансовыми инструментами','Бюджетный контроль','Валютный контроль'],
    enItems:['Payment management','Liquidity management','Financial instruments management','Budget control','Foreign exchange control'],
    stack:'CLM, TRM, FI-BL, FI-AP, BCM, FM, DMS'
  },
  {
    slug:'corporate-finance', icon:'corporate' as IconName, title:'Корпоративные финансы', enTitle:'Corporate Finance',
    desc:'Консолидация, бюджетирование, планирование, аналитика и отчетность.', enDesc:'Consolidation, budgeting, planning, analytics and reporting.',
    items:['Консолидация','Бюджетирование','Бизнес-планирование','Визуализация и аналитика','Подготовка и публикация отчетности'],
    enItems:['Consolidation','Budgeting','Business planning','Visualization and analytics','Reporting preparation and publication'],
    stack:'BPC, FC, BCS, BW, BI, BObj, Lumira, Disclosure Management, Group Reporting'
  },
];

export const legalText: LegalText = {
  title:'Виды осуществляемой деятельности в области ИТ согласно приказу Минцифры № 449 от 11.05.2023',
  enTitle:'Types of IT activities under Order No. 449 of the Ministry of Digital Development dated 11 May 2023',
  p101:`Проектирование, и (или) обследование, и (или) разработка, и (или) адаптация, и (или) модификация (в том числе локализация, кастомизация, доработка), и (или) обратное проектирование (реверсивный инжиниринг), и (или) модернизация, и (или) обновление, и (или) установка, и (или) интеграция, и (или) настройка, и (или) конфигурирование, и (или) внедрение, и (или) сопровождение, и (или) тестирование, и (или) испытания, и (или) техническая поддержка, и (или) эксплуатация, включая администрирование, а также оказание услуг (в том числе консультационных, услуг по обучению, экспертных услуг и иных) в указанных видах деятельности (далее — проектирование и (или) иная деятельность, а также оказание услуг), в отношении программ для электронных вычислительных машин (далее — программы для ЭВМ), и (или) баз данных (в том числе их обновлений и исправлений), и (или) визуальных пользовательских интерфейсов`,
  p201:`Реализация программ для ЭВМ, баз данных (включая их обновления и изменения), средств защиты информации, в том числе путем отчуждения прав, предоставления прав (лицензирования), предоставления удаленного доступа посредством информационно-телекоммуникационных сетей, включая информационно-телекоммуникационную сеть «Интернет», предоставление удаленных вычислительных мощностей, эмулирующих физическое оборудование, копирования, оптовой и розничной продажи экземпляров программ для ЭВМ, баз данных, издание сборников программ для ЭВМ и баз данных, предоставления экземпляров программ для ЭВМ, баз данных в лизинг, аренду (прокат)`,
  p301:`Деятельность по созданию баз данных и информационных ресурсов (включая разработку концепций, структуры, состава баз данных), формированию и ведению баз данных (включая сбор данных из одного или более источников, а также ввод, верификацию и актуализацию данных), администрированию баз данных (включая обеспечение возможности доступа к базе данных в режиме непосредственного или телекоммуникационного доступа), поиску данных, их отбору и сортировке по запросам, предоставлению отобранных данных пользователям`,
  enP101:`Designing, surveying, developing, adapting, modifying (including localization, customization and enhancement), reverse engineering, modernization, updating, installation, integration, configuration, implementation, maintenance, testing, technical support and operation, including administration, as well as consulting, training, expert and other services related to computer programs, databases (including updates and fixes) and visual user interfaces.`,
  enP201:`Distribution and commercialization of computer programs and databases (including updates and changes) and information security tools, including by assignment or licensing of rights, provision of remote access through telecommunications networks including the Internet, provision of remote computing capacity, copying, wholesale and retail sale of software and database copies, publication of software and database collections, and provision of software and databases under lease or rental arrangements.`,
  enP301:`Activities related to the creation of databases and information resources, including development of database concepts, structure and content; formation and maintenance of databases, including collection, input, verification and updating of data; database administration; data search, selection and sorting; and provision of selected data to users.`
};

export const nav: NavItem[] = [
  {href:'#services',ru:'Услуги',en:'Services'},
  {href:'#solutions',ru:'Решения',en:'Solutions'},
  {href:'#team',ru:'Команда',en:'Team'},
  {href:'#clients',ru:'Клиенты',en:'Clients'},
  {href:'#contact',ru:'Контакты',en:'Contact'},
];

export const contact: ContactDetails = {
  email:'info@sbs.expert',
  address:'125414, г. Москва, ул. Онежская, 53-4-451',
  enAddress:'125414, Moscow, 53-4-451 Onezhskaya St.',
  inn:'7743305291',
  kpp:'774301001',
  ogrn:'1197746396341',
  okved:'62.02, 62.01, 62.09',
};
