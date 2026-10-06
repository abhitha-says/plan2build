import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { faqs } from '@/content/faq';
import type { FaqContent } from '@/content/sections/faq';
import { site } from '@/content/site';
import { revealDelay } from '@/lib/css';
import { resolveHref } from '@/lib/routes';
import { telHref } from '@/lib/text';
import { FaqBrowser } from './FaqBrowser';
import './faq.css';

/** "09 · Questions": a sticky intro beside group tabs and an accordion of questions. */
export function Faq({ content }: { content: FaqContent }) {
  const { eyebrow, heading, subCopy, callLabel, showTabs, allLabel, tagLetter } = content;
  const questions = faqs.filter((item) => item.question.trim());
  const phoneHref = site.phone ? telHref(site.phone) : '';

  return (
    <Section className="faq" revealThreshold={0.12} style={{ background: 'var(--gd-bone)', color: 'var(--gd-ink)' }}>
      <div className="gd-wrap faq-grid">
        <div className="faq-side">
          <Eyebrow text={eyebrow} />
          <Heading text={heading} size="var(--faq-hd)" lineHeight={0.9} delay={80} className="faq-h" />
          {subCopy && (
            <p className="faq-sub gd-rv" style={revealDelay(260)}>
              <SubCopy text={subCopy} phoneHref={phoneHref} />
            </p>
          )}
          {callLabel && phoneHref && (
            <div className="gd-rv" style={revealDelay(360)}>
              <Button href={phoneHref} label={callLabel} kind="ghost" />
            </div>
          )}
        </div>
        <FaqBrowser questions={questions} showTabs={showTabs} allLabel={allLabel} tagLetter={tagLetter} />
      </div>
    </Section>
  );
}

/** The sub copy with `{phone}` and `{email}` turned into links (dropped when the site has none). */
function SubCopy({ text, phoneHref }: { text: string; phoneHref: string }) {
  return text
    .split(/(\{phone\}|\{email\})/)
    .filter(Boolean)
    .map((part, index) => {
      if (part === '{phone}') return site.phone ? <a key={index} href={resolveHref(phoneHref)}>{site.phone}</a> : null;
      if (part === '{email}') return site.email ? <a key={index} href={resolveHref(`mailto:${site.email}`)}>{site.email}</a> : null;
      return <span key={index}>{part}</span>;
    });
}
