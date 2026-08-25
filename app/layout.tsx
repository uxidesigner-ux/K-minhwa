import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/google-analytics';
import './globals.css';
export const metadata: Metadata = { title: 'K-minhwa — Korean Minhwa Artist', description: 'A moving archive of contemporary Korean minhwa by K.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}<GoogleAnalytics /></body></html>; }
