'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tours } from '@/data/tours';
import { Clock, MapPin, Sun, ArrowRight } from 'lucide-react';

const SEASONS = ['All', 'August – April', 'September – February', 'October – March'];
const DURATIONS = ['All', '1-10 days', '11-15 days', '16+ days'];

function inRange(dur, r) {
  if (r === 'All') return true;
  if (r === '1-10 days') return dur <= 10;
  if (r === '11-15 days') return dur >= 11 && dur <= 15;
  return dur >= 16;
}

function Pill({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className="font-sans text-[10px] tracking-[0.15em] uppercase px-3.5 py-1.5 transition-all duration-200"
      style={{
        border: `1.5px solid ${active ? '#2B6CB0' : '#E2E8F0'}`,
        backgroundColor: active ? '#2B6CB0' : 'transparent',
        color: active ? '#ffffff' : '#718096',
        borderRadius: '2px',
      }}>
      {label}
    </button>
  );
}

export default function ToursList() {
  const [season, setSeason] = useState('All');
  const [duration, setDuration] = useState('All');
  const filtered = tours.filter(t => (season === 'All' || t.season === season) && inRange(t.duration, duration));

  return (
    <section className="section-padding" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="container-luxury">

        {/* Filters */}
        <div className="flex flex-wrap gap-5 mb-14 pb-8" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase mr-1" style={{ color: '#A0AEC0' }}>Season</span>
            {SEASONS.map(s => <Pill key={s} label={s} active={season === s} onClick={() => setSeason(s)} />)}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase mr-1" style={{ color: '#A0AEC0' }}>Duration</span>
            {DURATIONS.map(d => <Pill key={d} label={d} active={duration === d} onClick={() => setDuration(d)} />)}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-xl italic" style={{ color: '#A0AEC0' }}>No journeys match your selection.</p>
            <button onClick={() => { setSeason('All'); setDuration('All'); }}
              className="mt-4 font-sans text-xs tracking-[0.2em] uppercase" style={{ color: '#2B6CB0', textDecoration: 'underline' }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-0">
            {filtered.map((tour, i) => <TourRow key={tour.id} tour={tour} index={i} reverse={i % 2 !== 0} />)}
          </div>
        )}

        {/* Bespoke CTA */}
        <div className="mt-16 p-10 md:p-14 text-center" style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}>
          <p className="eyebrow mb-4">Something Different?</p>
          <h3 className="font-serif text-2xl font-light mb-4" style={{ color: '#1a2332' }}>Every Journey Can Be Personalised</h3>
          <p className="font-sans text-sm font-light mb-7 max-w-lg mx-auto" style={{ color: '#718096' }}>
            Om personally designs bespoke itineraries for discerning travellers.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">Design My Journey</Link>
        </div>
      </div>
    </section>
  );
}

function TourRow({ tour, index, reverse }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 group" style={{ borderBottom: '1px solid #E2E8F0' }}>
      {/* Image */}
      <div className={`relative overflow-hidden ${reverse ? 'lg:order-2' : ''}`} style={{ minHeight: '340px' }}>
        <Image src={tour.featuredImage} alt={tour.title} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:1024px) 100vw, 50vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.35) 0%, transparent 60%)' }} />
        <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 font-sans text-[9px] tracking-[0.2em] uppercase"
          style={{ backgroundColor: 'rgba(43,108,176,0.88)', color: '#fff', borderRadius: '2px' }}>
          <Clock size={9} /> {tour.duration} Days
        </div>
      </div>

      {/* Text */}
      <div
        className={`flex flex-col justify-center p-8 md:p-10 lg:p-14 ${reverse ? 'lg:order-1' : ''}`}
        style={{ backgroundColor: index % 4 < 2 ? '#ffffff' : '#FAFBFD' }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Sun size={11} style={{ color: '#C49A3C' }} />
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase" style={{ color: '#C49A3C' }}>{tour.season}</span>
        </div>

        <h2 className="font-serif font-light mb-4 leading-snug" style={{ color: '#1a2332', fontSize: 'clamp(1.4rem,2.5vw,2rem)' }}>
          {tour.title}
        </h2>

        <div className="flex items-start gap-2 mb-5">
          <MapPin size={12} className="shrink-0 mt-0.5" style={{ color: '#A0AEC0' }} />
          <p className="font-sans text-xs leading-relaxed" style={{ color: '#718096' }}>{tour.route.join(' · ')}</p>
        </div>

        <p className="font-sans text-sm font-light leading-relaxed mb-7 line-clamp-3" style={{ color: '#4A5568' }}>
          {tour.overview}
        </p>

        <ul className="space-y-2 mb-8">
          {tour.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#C49A3C' }} />
              <span className="font-sans text-xs leading-relaxed" style={{ color: '#718096' }}>{h}</span>
            </li>
          ))}
        </ul>

        <Link href={`/tours/${tour.slug}`}
          className="group/cta inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase self-start"
          style={{ color: '#2B6CB0' }}>
          Explore This Journey
          <ArrowRight size={13} className="transition-transform duration-300 group-hover/cta:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
}
