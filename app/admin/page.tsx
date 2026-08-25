import Link from 'next/link';
import { AdminStudio } from '@/components/admin-studio';

export default function Admin() {
  return <main className="admin"><header className="site-header"><Link href="/" className="wordmark">K—MINHWA</Link><span className="edition">ADMIN / PRIVATE</span></header><AdminStudio /></main>;
}
