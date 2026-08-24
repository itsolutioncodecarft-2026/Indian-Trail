'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { tours } from '@/data/tours';
import TourCard from '@/components/TourCard';
import SectionHeading from '@/components/SectionHeading';
import { ArrowRight } from 'lucide-react';

export default function HomeTours() {
  const { t } = useLang();
  return (
    <section className="section-padding" style={{ backgroundColor: '#FEFCF7' }}>
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow="Curated Journeys"
            title="Five Extraordinary Expeditions"
            subtitle="Each journey is personally designed by Om — a hand-woven masterpiece balancing ultra-luxury with raw, unfiltered India."
          />
          <Link
            href="/tours"
            className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase transition-colors shrink-0"
            style={{ color: 'rgba(44,24,16,0.6)' }}
          >
            {t('common.all_tours')}
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
