'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import { ArrowDown } from 'lucide-react';

export default function HomeHero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1548013146-72479768bada?w=2000&q=85"
          alt="Taj Mahal at dawn — Indian Routes & Trails"
          fill priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/85 via-[#2C1810]/30 to-[#2C1810]/10" />
      </div>

      <div className="relative container-luxury w-full">
        <div className="max-w-3xl">
          <p className="eyebrow text-[#D4A853] mb-5 animate-fade-in">
            {t('hero.tagline')}
          </p>
          <h1 className="display-title text-[#FAF6EC] mb-3 leading-none">
            Indian
            <br />
            <span className="italic font-light text-[#D4A853]">Routes</span>
            <br />
            &amp; Trails
          </h1>
          <p className="font-serif text-xl font-light text-[#FAF6EC]/70 italic mt-4 mb-8">
            {t('hero.subline')}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/tours" className="btn-gold">{t('hero.cta_primary')}</Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-[#FAF6EC]/80 border-b border-[#FAF6EC]/40 pb-0.5 hover:border-[#FAF6EC] transition-colors"
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 flex flex-col items-center gap-2 opacity-40">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#FAF6EC]" style={{ writingMode: 'vertical-rl' }}>
            Scroll
          </span>
          <ArrowDown size={14} className="text-[#FAF6EC] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
