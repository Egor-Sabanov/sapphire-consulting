'use client';

import { useEffect } from 'react';
import { Analytics, track } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function SiteTelemetry() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tracked = target.closest<HTMLElement>('[data-track]');
      if (!tracked) return;

      const name = tracked.dataset.track;
      if (!name) return;

      const location = tracked.dataset.trackLocation;
      const locale = tracked.dataset.trackLocale;
      void track(name, {
        ...(location ? { location } : {}),
        ...(locale ? { locale } : {}),
      });
    };

    document.addEventListener('click', onClick, { passive: true });
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
