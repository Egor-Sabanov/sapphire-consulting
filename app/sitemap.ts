export default function sitemap(){
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://sbs.expert';
  const paths = ['', 'services','solutions','team','projects','it-activities','privacy'];
  return ['ru','en'].flatMap(locale => paths.map(path => ({
    url:`${base}/${locale}${path?`/${path}`:''}`,
  })));
}
