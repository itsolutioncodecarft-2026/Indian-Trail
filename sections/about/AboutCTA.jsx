'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

export default function AboutCTA() {
  const { t } = useLang();
  return (
    <section className="section-padding" style={{ backgroundColor: '#F0E6D3' }}>
      <div className="container-narrow text-center">
        <p className="eyebrow mb-5" style={{ color: '#B8892A' }}>Ready to Journey?</p>
        <h2 className="section-title mb-6" style={{ color: '#2C1810' }}>
          Begin Your Curated<br />Indian Adventure
        </h2>
        <p className="font-sans text-lg font-light mb-10 max-w-xl mx-auto" style={{ color: 'rgba(44,24,16,0.6)' }}>
          Browse Om&rsquo;s five curated journeys, or reach out directly to begin designing your personalised expedition across India.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tours" className="btn-primary">{t('hero.cta_primary')}</Link>
          <Link href="/contact" className="btn-outline">{t('common.enquire_now')}</Link>
        </div>
      </div>
    </section>
  );
}
