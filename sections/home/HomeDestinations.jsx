'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { getFeaturedDestinations } from '@/data/destinations';
import DestinationCard from '@/components/DestinationCard';
import SectionHeading from '@/components/SectionHeading';
import { ArrowRight } from 'lucide-react';

export default function HomeDestinations() {
  const { t } = useLang();
  const featured = getFeaturedDestinations();

  return (
    <section className="section-padding" style={{ backgroundColor: '#F0E6D3' }}>
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow="Destinations"
            title="India's Most Magnificent Cities"
            subtitle="From Mughal monuments to desert dunes, lake palaces to sacred ghats — India's landscapes are endlessly astonishing."
          />
          <Link
            href="/destinations"
            className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-[#2C1810]/60 hover:text-[#B8892A] transition-colors shrink-0"
          >
            {t('common.all_destinations')}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {featured.map((dest, i) => (
            <div key={dest.slug} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
              <div className={i === 0 ? 'h-full' : 'aspect-[3/4]'}>
                <DestinationCard destination={dest} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
