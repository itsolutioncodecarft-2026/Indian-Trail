'use client';
import Link from 'next/link';
import Image from 'next/image';
import { tours } from '@/data/tours';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

export default function HomeTours() {
  // Show all 7 journeys — first 5 in editorial grid, last 2 as strips
  const featured = tours.filter((t) => t.isFeatured);
  const gridTours = featured.slice(0, 5);
  const stripTours = featured.slice(5);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-tint)' }}>
      <div className="container-luxury">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-4">Signature Journeys</p>
            <h2 className="section-title">
              Seven Extraordinary<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                Expeditions
              </em>
            </h2>
          </div>
          <Link
            href="/tours"
            className="group flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase shrink-0"
            style={{ color: 'var(--color-text-muted)' }}>
            View All Journeys
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Large featured — first */}
          {gridTours[0] && (
            <div className="md:row-span-2">
              <TourCard tour={gridTours[0]} large />
            </div>
          )}
          {/* Medium cards */}
          {gridTours.slice(1, 3).map((t) => <TourCard key={t.id} tour={t} />)}
          {/* Strip cards */}
          {gridTours.slice(3, 5).map((t) => <TourStrip key={t.id} tour={t} />)}
        </div>

        {/* Remaining journeys (6 & 7) as strips */}
        {stripTours.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {stripTours.map((t) => <TourStrip key={t.id} tour={t} />)}
          </div>
        )}

        <div className="mt-14 text-center">
          <p className="font-serif text-lg italic mb-5" style={{ color: 'var(--color-text-muted)' }}>
            &ldquo;Each journey is personally designed — a hand-woven masterpiece by Om.&rdquo;
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            Design My Journey
          </Link>
        </div>
      </div>
    </section>
  );
}

function TourCard({ tour, large = false }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group relative block overflow-hidden"
      style={{
        minHeight: large ? '500px' : '230px',
        height: large ? '100%' : undefined,
        backgroundColor: 'var(--color-primary-dark)',
        borderRadius: 'var(--radius-card)',
      }}
    >
      <Image
        src={tour.featuredImage}
        alt={`${tour.title} — Indian Routes & Trails`}
        fill
        className="object-cover opacity-85 group-hover:opacity-75"
        style={{ transition: `transform var(--motion-image-hover)` }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        sizes={large ? '(max-width:768px) 100vw, 50vw' : '(max-width:768px) 100vw, 25vw'}
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.25) 55%, transparent 100%)' }} />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-sans text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 flex items-center gap-1.5"
            style={{ backgroundColor: 'rgba(27,42,94,0.85)', color: '#fff', borderRadius: '4px' }}>
            <Clock size={9} /> {tour.duration} Days
          </span>
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-secondary)' }}>
            {tour.season}
          </span>
        </div>
        <h3
          className="font-serif font-light transition-colors duration-300 mb-2"
          style={{
            color: 'var(--color-text-invert)',
            fontSize: large ? 'clamp(1.25rem,2.5vw,1.75rem)' : '1.1rem',
            lineHeight: 1.2,
          }}
        >
          {tour.title}
        </h3>
        <div className="flex items-start gap-1.5 mb-3">
          <MapPin size={10} className="shrink-0 mt-0.5"
            style={{ color: 'rgba(232,163,23,0.65)' }} />
          <p className="font-sans text-[10px]"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            {tour.route.slice(0, 4).join(' · ')}{tour.route.length > 4 ? ' ···' : ''}
          </p>
        </div>
        {large && (
          <p className="font-sans text-xs leading-relaxed mb-4 line-clamp-2"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            {tour.teaser || tour.overview.slice(0, 130)}…
          </p>
        )}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-secondary)' }}>
            Explore
          </span>
          <ArrowRight size={11} style={{ color: 'var(--color-secondary)' }} />
        </div>
      </div>
    </Link>
  );
}

function TourStrip({ tour }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group relative flex overflow-hidden"
      style={{ height: '140px', backgroundColor: 'var(--color-primary-dark)', borderRadius: 'var(--radius-card)' }}
    >
      <Image
        src={tour.featuredImage}
        alt={`${tour.title} — Indian Routes & Trails`}
        fill
        className="object-cover opacity-75 group-hover:opacity-65"
        style={{ transition: `transform var(--motion-image-hover)` }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        sizes="(max-width:768px) 100vw, 50vw"
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.90) 0%, rgba(20,34,77,0.50) 60%, transparent 100%)' }} />
      <div className="relative flex items-end p-5 gap-5 w-full">
        <div className="flex-1 min-w-0">
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase mb-1"
            style={{ color: 'var(--color-secondary)' }}>
            {tour.duration} Days · {tour.season}
          </p>
          <h3 className="font-serif text-base font-light transition-colors duration-300 truncate"
            style={{ color: 'var(--color-text-invert)' }}>
            {tour.title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight size={14} style={{ color: 'var(--color-secondary)' }} />
        </div>
      </div>
    </Link>
  );
}
