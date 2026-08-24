'use client';
import { useState } from 'react';
import Link from 'next/link';
import { tours } from '@/data/tours';
import TourCard from '@/components/TourCard';
import { useLang } from '@/lib/LanguageContext';

const SEASONS = ['All', 'August – April', 'September – February', 'October – March'];
const DURATIONS = ['All', '1-10 days', '11-15 days', '16+ days'];

function inRange(dur, range) {
  if (range === 'All') return true;
  if (range === '1-10 days') return dur <= 10;
  if (range === '11-15 days') return dur >= 11 && dur <= 15;
  if (range === '16+ days') return dur >= 16;
  return true;
}

export default function ToursList() {
  const { t } = useLang();
  const [season, setSeason] = useState('All');
  const [duration, setDuration] = useState('All');

  const filtered = tours.filter(
    (tour) => (season === 'All' || tour.season === season) && inRange(tour.duration, duration)
  );

  const activePill = 'font-sans text-xs tracking-wider px-3 py-1.5 border transition-all duration-200 bg-[#2C1810] text-[#FAF6EC] border-[#2C1810]';
  const inactivePill = 'font-sans text-xs tracking-wider px-3 py-1.5 border transition-all duration-200 border-[#E8D5B0] text-[#2C1810]/60 hover:border-[#2C1810]/40';

  return (
    <section className="section-padding" style={{ backgroundColor: '#FEFCF7' }}>
      <div className="container-luxury">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-xs tracking-widest uppercase text-[#2C1810]/40">Season:</span>
            {SEASONS.map((s) => (
              <button key={s} onClick={() => setSeason(s)} className={season === s ? activePill : inactivePill}>{s}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-xs tracking-widest uppercase text-[#2C1810]/40">Duration:</span>
            {DURATIONS.map((d) => (
              <button key={d} onClick={() => setDuration(d)} className={duration === d ? activePill : inactivePill}>{d}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-xl" style={{ color: 'rgba(44,24,16,0.4)' }}>No journeys match your selection.</p>
            <button
              onClick={() => { setSeason('All'); setDuration('All'); }}
              className="mt-4 font-sans text-xs tracking-[0.2em] uppercase border-b pb-0.5 transition-colors"
              style={{ color: 'rgba(44,24,16,0.6)', borderColor: 'rgba(44,24,16,0.3)' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}

        {/* Customisation note */}
        <div className="mt-16 p-8 text-center border" style={{ backgroundColor: 'rgba(232,213,176,0.3)', borderColor: '#E8D5B0' }}>
          <p className="font-serif text-lg italic mb-2" style={{ color: 'rgba(44,24,16,0.7)' }}>
            &ldquo;Don&rsquo;t see exactly what you&rsquo;re looking for?&rdquo;
          </p>
          <p className="font-sans text-sm mb-5" style={{ color: 'rgba(44,24,16,0.5)' }}>
            Every journey can be fully customised. Om personally designs bespoke itineraries.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">{t('common.plan_journey')}</Link>
        </div>
      </div>
    </section>
  );
}
