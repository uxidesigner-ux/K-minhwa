import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/google-analytics';
import './globals.css';
export const metadata: Metadata = { title: '雲住 — K-minhwa', description: 'A moving archive of contemporary Korean minhwa by 雲住 金慧震.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}<GoogleAnalytics /></body></html>; }
