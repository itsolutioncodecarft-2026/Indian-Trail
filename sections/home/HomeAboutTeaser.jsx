'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { omStory } from '@/data/siteContent';

export default function HomeAboutTeaser() {
  const { t } = useLang();
  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#2C1810' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1598977054382-ccc0f7d7af6e?w=900&q=80"
                alt="Om — Master Guide, Indian Routes & Trails"
                fill className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 max-w-[220px] hidden lg:block" style={{ backgroundColor: '#B8892A' }}>
              <p className="font-serif text-sm italic text-[#FEFCF7] leading-relaxed">
                &ldquo;He wasn&rsquo;t just translating words; he was translating nuances, philosophies, and shared human emotions.&rdquo;
              </p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="eyebrow text-[#D4A853] mb-5">{t('about.title')}</p>
            <h2 className="section-title text-[#FAF6EC] mb-6">
              The Visionary<br />
              <span className="italic font-light text-[#D4A853]">Behind the Voyage</span>
            </h2>
            <div className="divider-gold mb-8" />
            <div className="space-y-5">
              <p className="font-sans text-lg font-light text-[#FAF6EC]/70 leading-relaxed">{omStory.intro}</p>
              <p className="font-sans text-base font-light text-[#FAF6EC]/50 leading-relaxed">{omStory.story[1]}</p>
              <p className="font-sans text-base font-light text-[#FAF6EC]/50 leading-relaxed">{omStory.story[3]}</p>
            </div>
            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-8 py-3.5 border border-[#FAF6EC]/30 text-[#FAF6EC]/70 hover:bg-[#FAF6EC]/10 hover:border-[#FAF6EC]/60 hover:text-[#FAF6EC] transition-all duration-300"
              >
                {t('common.read_more')} About Om
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
