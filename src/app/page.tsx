import { bid } from '@/content/sections/bid';
import { board } from '@/content/sections/board';
import { budget } from '@/content/sections/budget';
import { built } from '@/content/sections/built';
import { crew } from '@/content/sections/crew';
import { faq } from '@/content/sections/faq';
import { hero } from '@/content/sections/hero';
import { owners } from '@/content/sections/owners';
import { safety } from '@/content/sections/safety';
import { schedule } from '@/content/sections/schedule';
import { trades } from '@/content/sections/trades';
import { pageMetadata } from '@/lib/seo';
import { Bid } from '@/sections/home/Bid/Bid';
import { Board } from '@/sections/home/Board/Board';
import { Built } from '@/sections/home/Built/Built';
import { Crew } from '@/sections/home/Crew/Crew';
import { Hero } from '@/sections/home/Hero/Hero';
import { Owners } from '@/sections/home/Owners/Owners';
import { Safety } from '@/sections/home/Safety/Safety';
import { Budget } from '@/sections/shared/Budget/Budget';
import { Faq } from '@/sections/shared/Faq/Faq';
import { Schedule } from '@/sections/shared/Schedule/Schedule';
import { Trades } from '@/sections/shared/Trades/Trades';

export const metadata = pageMetadata({
  title: 'Plan2Build — Build With Clarity, Not Guesswork',
  description:
    "Plan2Build is India's home construction platform: plan your home, understand the real cost, compare contractors on the same scope, and keep every construction decision verified in one place.",
  path: '/',
});

export default function HomePage() {
  return (
    <main>
      <Hero content={hero} />
      <Board content={board} />
      <Trades content={trades} />
      <Built content={built} />
      <Schedule content={schedule} />
      <Safety content={safety} />
      <Crew content={crew} />
      <Owners content={owners} />
      <Budget content={budget} />
      <Faq content={faq} />
      <Bid content={bid} />
    </main>
  );
}
