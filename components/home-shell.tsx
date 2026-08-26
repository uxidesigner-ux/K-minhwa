'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { EntryExperience } from '@/components/entry-experience';

export function HomeShell({ children }: { children: ReactNode }) {
  const [complete, setComplete] = useState(false);
  const onComplete = useCallback(() => setComplete(true), []);
  return <><EntryExperience onComplete={onComplete}/><div className={`home-content ${complete ? 'home-content--ready' : ''}`}>{children}</div></>;
}
