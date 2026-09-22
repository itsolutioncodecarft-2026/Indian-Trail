'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tours } from '@/data/tours';
import { festivals, festivalJourneyLinks } from '@/data/festivals';
import { Clock, MapPin, Sun, ArrowRight, X } from 'lucide-react';

const DURATION_BANDS = [
  { label: 'All',       value: 'all',  fn: () => true },
  { label: '1–7 days',  value: '1-7',  fn: (d) => d <= 7 },
  { label: '8–12 days', value: '8-12', fn: (d) => d >= 8 && d <= 12 },
  { label: '13+ days',  value: '13+',  fn: (d) => d >= 13 },
];

const INTEREST_OPTIONS = ['heritage', 'wildlife', 'spiritual', 'rural', 'culinary', 'photography'];

// All unique cities from tour routes
const ALL_DESTINATIONS = [...new Set(tours.flatMap((t) => t.route))].sort();

function Pill({ label, active, onClick, onRemove }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase px-3.5 py-1.5 transition-all duration-200"
      style={{
        border: `1.5px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
        backgroundColor: active ? 'var(--color-primary)' : 'transparent',
        color: active ? 'var(--color-text-invert)' : 'var(--color-text-muted)',
        borderRadius: 'var(--radius-control)',
      }}
    >
      {label}
      {active && onRemove && (
        <X size={10} onClick={(e) => { e.stopPropagation(); onRemove(); }} />
      )}
    </button>
  );
}

// Inner component that reads search params
function ToursListInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial state from URL
  const [duration, setDuration]     = useState(searchParams.get('duration') || 'all');
  const [interests, setInterests]   = useState(
    searchParams.get('interests') ? searchParams.get('interests').split(',') : []
  );
  const [festival, setFestival]     = useState(searchParams.get('festival') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');

  // Sync state → URL
  const syncUrl = useCallback((dur, ints, fest, dest) => {
    const params = new URLSearchParams();
    if (dur && dur !== 'all') params.set('duration', dur);
    if (ints.length) params.set('interests', ints.join(','));
    if (fest) params.set('festival', fest);
    if (dest) params.set('destination', dest);
    const q = params.toString();
    router.replace(q ? `?${q}` : '/tours', { scroll: false });
  }, [router]);

  const setDur = (v) => { setDuration(v); syncUrl(v, interests, festival, destination); };
  const toggleInterest = (i) => {
    const next = interests.includes(i) ? interests.filter((x) => x !== i) : [...interests, i];
    setInterests(next);
    syncUrl(duration, next, festival, destination);
  };
  const setFest = (v) => { setFestival(v); syncUrl(duration, interests, v, destination); };
  const setDest = (v) => { setDestination(v); syncUrl(duration, interests, festival, v); };

  const resetAll = () => {
    setDuration('all'); setInterests([]); setFestival(''); setDestination('');
    router.replace('/tours', { scroll: false });
  };

  const hasFilters = duration !== 'all' || interests.length > 0 || festival || destination;

  // Festival slug → journey slugs lookup via festivalJourneyLinks join table
  const getLinkedSlugs = (festSlug) => {
    if (!festSlug) return null;
    return festivalJourneyLinks
      .filter((l) => l.festivalSlug === festSlug)
      .map((l) => l.journeySlug);
  };
  const linkedSlugs = getLinkedSlugs(festival);

  const durBand = DURATION_BANDS.find((b) => b.value === duration) ?? DURATION_BANDS[0];

  const filtered = tours.filter((t) => {
    if (!durBand.fn(t.duration)) return false;
    if (interests.length && !interests.every((i) => t.interests?.includes(i))) return false;
    if (linkedSlugs && !linkedSlugs.includes(t.slug)) return false;
    if (destination && !t.route.some((c) => c === destination)) return false;
    return true;
  });

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-luxury">

        {/* Filter rail */}
        <div
          className="flex flex-wrap gap-x-8 gap-y-5 mb-14 pb-8"
          style={{ borderBottom: '1px solid var(--color-border)' }}
          role="group"
          aria-label="Filter journeys"
        >
          {/* Duration */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase mr-1"
              style={{ color: 'var(--color-text-muted)' }}>Duration</span>
            {DURATION_BANDS.map((b) => (
              <Pill key={b.value} label={b.label} active={duration === b.value}
                onClick={() => setDur(b.value)} />
            ))}
          </div>

          {/* Interests */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase mr-1"
              style={{ color: 'var(--color-text-muted)' }}>Interests</span>
            {INTEREST_OPTIONS.map((interest) => (
              <Pill key={interest} label={interest}
                active={interests.includes(interest)}
                onClick={() => toggleInterest(interest)}
                onRemove={() => toggleInterest(interest)} />
            ))}
          </div>

          {/* Festival */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase mr-1"
              style={{ color: 'var(--color-text-muted)' }}>Festival</span>
            <select
              value={festival}
              onChange={(e) => setFest(e.target.value)}
              className="font-sans text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 transition-all duration-200"
              style={{
                border: `1.5px solid ${festival ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                backgroundColor: festival ? 'rgba(232,163,23,0.08)' : 'transparent',
                color: festival ? 'var(--color-text-on-gold)' : 'var(--color-text-muted)',
                borderRadius: 'var(--radius-control)',
                outline: 'none',
                cursor: 'pointer',
              }}
              aria-label="Filter by festival"
            >
              <option value="">Any Festival</option>
              {festivals.map((f) => (
                <option key={f.slug} value={f.slug}>{f.name.en}</option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase mr-1"
              style={{ color: 'var(--color-text-muted)' }}>Destination</span>
            <select
              value={destination}
              onChange={(e) => setDest(e.target.value)}
              className="font-sans text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 transition-all duration-200"
              style={{
                border: `1.5px solid ${destination ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: destination ? 'rgba(27,42,94,0.08)' : 'transparent',
                color: destination ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderRadius: 'var(--radius-control)',
                outline: 'none',
                cursor: 'pointer',
              }}
              aria-label="Filter by destination"
            >
              <option value="">Any Destination</option>
              {ALL_DESTINATIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Reset */}
          {hasFilters && (
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase transition-colors"
              style={{ color: 'var(--color-accent)' }}
            >
              <X size={11} /> Clear All
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-xl italic mb-3" style={{ color: 'var(--color-text-muted)' }}>
              No journeys match your selection.
            </p>
            <p className="font-sans text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Try adjusting your filters, or enquire for a fully bespoke itinerary.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={resetAll}
                className="font-sans text-xs tracking-[0.2em] uppercase"
                style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                Reset Filters
              </button>
              <Link href="/contact" className="btn-indigo inline-flex">Enquire for Bespoke</Link>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {filtered.map((tour, i) => (
              <TourRow key={tour.id} tour={tour} index={i} reverse={i % 2 !== 0} />
            ))}
          </div>
        )}

        {/* Bespoke CTA */}
        <div
          className="mt-16 p-10 md:p-14 text-center"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-card)',
          }}
        >
          <p className="eyebrow mb-4">Something Different?</p>
          <h3 className="font-serif text-2xl font-light mb-4" style={{ color: 'var(--color-text)' }}>
            Every Journey Can Be Personalised
          </h3>
          <p className="font-sans text-sm font-light mb-7 max-w-lg mx-auto"
            style={{ color: 'var(--color-text-muted)' }}>
            Om personally designs bespoke itineraries for discerning travellers. Tell him your vision and
            he will craft something that goes far beyond these pages.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">Design My Journey</Link>
        </div>
      </div>
    </section>
  );
}

function TourRow({ tour, index, reverse }) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 group"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${reverse ? 'lg:order-2' : ''}`}
        style={{ minHeight: '340px' }}>
        <Image
          src={tour.featuredImage}
          alt={`${tour.title} — Indian Routes & Trails`}
          fill
          className="object-cover"
          style={{ transition: `transform var(--motion-image-hover)` }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          sizes="(max-width:1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.35) 0%, transparent 60%)' }} />
        <div
          className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 font-sans text-[9px] tracking-[0.2em] uppercase"
          style={{ backgroundColor: 'rgba(27,42,94,0.88)', color: '#fff', borderRadius: 'var(--radius-pill)' }}
        >
          <Clock size={9} /> {tour.duration} Days
        </div>
        {tour.interests?.length > 0 && (
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-1.5">
            {tour.interests.map((tag) => (
              <span key={tag}
                className="font-sans text-[8px] tracking-[0.15em] uppercase px-2 py-0.5"
                style={{
                  backgroundColor: 'rgba(27,42,94,0.75)',
                  color: 'rgba(255,255,255,0.75)',
                  borderRadius: 'var(--radius-pill)',
                }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Text */}
      <div
        className={`flex flex-col justify-center p-8 md:p-10 lg:p-14 ${reverse ? 'lg:order-1' : ''}`}
        style={{ backgroundColor: index % 4 < 2 ? 'var(--color-surface)' : 'var(--color-surface-tint)' }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Sun size={11} style={{ color: 'var(--color-secondary-hover)' }} />
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-secondary-hover)' }}>
            {tour.season}
          </span>
        </div>

        <h2 className="font-serif font-light mb-4 leading-snug"
          style={{ color: 'var(--color-text)', fontSize: 'clamp(1.4rem,2.5vw,2rem)' }}>
          {tour.title}
        </h2>

        <div className="flex items-start gap-2 mb-5">
          <MapPin size={12} className="shrink-0 mt-0.5" style={{ color: 'var(--color-text-muted)' }} />
          <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {tour.route.join(' · ')}
          </p>
        </div>

        <p className="font-sans text-sm font-light leading-relaxed mb-7 line-clamp-3"
          style={{ color: 'var(--color-text-muted)' }}>
          {tour.teaser || tour.overview}
        </p>

        <ul className="space-y-2 mb-8">
          {tour.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: 'var(--color-secondary)' }} />
              <span className="font-sans text-xs leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}>
                {h}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={`/tours/${tour.slug}`}
          className="group/cta inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase self-start"
          style={{ color: 'var(--color-primary)' }}
        >
          Explore This Journey
          <ArrowRight size={13}
            className="transition-transform duration-300 group-hover/cta:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
}

export default function ToursList() {
  return (
    <Suspense fallback={
      <div className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-luxury">
          <div style={{ height: '400px' }} />
        </div>
      </div>
    }>
      <ToursListInner />
    </Suspense>
  );
}
