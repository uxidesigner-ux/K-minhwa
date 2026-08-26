import { AdminStudio } from '@/components/admin-studio';
import { SiteHeader } from '@/components/site-header';

export default function Admin() {
  return <main className="admin"><SiteHeader edition="ADMIN / PRIVATE" navigation={false}/><AdminStudio /></main>;
}
