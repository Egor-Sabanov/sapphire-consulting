'use client';

import { useEffect } from 'react';
import type { Locale } from '../types';

export default function LocaleSync({ locale }: { locale: Locale }) {
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  return null;
}
