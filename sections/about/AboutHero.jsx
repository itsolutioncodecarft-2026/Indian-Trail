'use client';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';

export default function AboutHero() {
  const { t } = useLang();
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1598977054382-ccc0f7d7af6e?w=1800&q=80"
          alt="Om — Indian Routes & Trails"
          fill priority className="object-cover object-top" sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/40 to-[#2C1810]/10" />
      </div>
      <div className="relative container-luxury">
        <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>{t('about.subtitle')}</p>
        <h1 className="display-title leading-none" style={{ color: '#FAF6EC' }}>
          The Visionary<br />
          <span className="italic font-light" style={{ color: '#D4A853' }}>Behind the Voyage</span>
        </h1>
      </div>
    </section>
  );
}
