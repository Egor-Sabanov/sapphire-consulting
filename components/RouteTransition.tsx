'use client';

import { ViewTransition } from 'react';
import type { ReactNode } from 'react';

interface RouteTransitionProps {
  children: ReactNode;
}

/**
 * Uses React 19.3's stable ViewTransition primitive as a progressive enhancement.
 * If the browser does not support View Transitions, content still renders normally.
 */
export default function RouteTransition({ children }: RouteTransitionProps) {
  return <ViewTransition>{children}</ViewTransition>;
}
