import { budget } from '@/content/sections/budget';
import { faq } from '@/content/sections/faq';
import { pageHero } from '@/content/sections/pageHero';
import { schedule } from '@/content/sections/schedule';
import { trades } from '@/content/sections/trades';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/sections/services/PageHero/PageHero';
import { Budget } from '@/sections/shared/Budget/Budget';
import { Faq } from '@/sections/shared/Faq/Faq';
import { Schedule } from '@/sections/shared/Schedule/Schedule';
import { Trades } from '@/sections/shared/Trades/Trades';

export const metadata = pageMetadata({
  title: 'Construction, renovation, roofing, design-build and fit-out — Girder, contractor & builder',
  description:
    'One general contractor for construction, renovation, roofing, design-build and fit-out, with a fixed price and a schedule you see every Friday.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <main>
      <PageHero content={pageHero} />
      <Trades content={trades} />
      <Schedule content={schedule} />
      <Budget content={budget} />
      <Faq content={faq} />
    </main>
  );
}
