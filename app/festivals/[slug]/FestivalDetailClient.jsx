'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { tours } from '@/data/tours';
import {
  getJourneysForFestival,
  daysUntil,
  getNextOccurrence,
} from '@/data/festivals';
import TourCard from '@/components/TourCard';
import EnquiryForm from '@/components/EnquiryForm';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';

function formatDate(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr + 'T12:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function FestivalDetailClient({ festival }) {
  const { lang } = useLang();
  const today = new Date();
  const next = getNextOccurrence(festival, today);
  const countdown = daysUntil(festival, today);

  const linkedJourneys = getJourneysForFestival(festival.slug)
    .map((link) => ({ ...link, tour: tours.find((t) => t.slug === link.journeySlug) }))
    .filter((x) => x.tour);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position:   'relative',
          minHeight:  'clamp(460px, 68vh, 720px)',
          display:    'flex',
          alignItems: 'flex-end',
          overflow:   'hidden',
          paddingTop: 'var(--header-height-desktop)',
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={festival.heroImage}
            alt={`${festival.name.en} — Indian Routes & Trails`}
            fill priority className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.94) 0%, rgba(20,34,77,0.42) 55%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury w-full pb-16">
          <Link
            href="/festivals"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-wider uppercase mb-7 transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
            <ArrowLeft size={13} /> Festival Calendar
          </Link>

          {countdown !== null && countdown <= 90 && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 font-sans text-[10px] tracking-wider uppercase animate-countdown-pulse"
              style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-text-on-gold)',
                borderRadius: 'var(--radius-pill)',
              }}>
              <Clock size={11} />
              {countdown === 0 ? 'Happening today!' : `${countdown} days away`}
            </div>
          )}

          <div className="flex items-center gap-2 mb-3">
            <MapPin size={12} style={{ color: 'var(--color-secondary)' }} />
            <span className="font-sans text-xs tracking-wider"
              style={{ color: 'var(--color-secondary)' }}>
              {festival.regions.join(' · ')}
            </span>
          </div>
          <h1 className="display-title leading-none mb-3"
            style={{ color: 'var(--color-text-invert)' }}>
            {festival.name[lang]}
          </h1>
          <p className="font-serif text-xl italic font-light"
            style={{ color: 'rgba(255,255,255,0.62)' }}>
            {festival.tagline[lang]}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main */}
            <div className="lg:col-span-2 space-y-14">

              {/* Description */}
              <div>
                <p className="eyebrow mb-4">About This Festival</p>
                <h2 className="font-serif text-2xl font-light mb-5"
                  style={{ color: 'var(--color-text)' }}>
                  {festival.name[lang]}
                </h2>
                <div className="divider-gold mb-7" />
                <p className="body-large">{festival.description[lang]}</p>
              </div>

              {/* Regions */}
              <div>
                <p className="eyebrow mb-4">Where to Celebrate</p>
                <h2 className="font-serif text-2xl font-light mb-5"
                  style={{ color: 'var(--color-text)' }}>
                  Best Locations
                </h2>
                <div className="divider-gold mb-7" />
                <div className="flex flex-wrap gap-3">
                  {festival.regions.map((region) => (
                    <div key={region}
                      className="flex items-center gap-2 px-4 py-2.5"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-pill)',
                      }}>
                      <MapPin size={12} style={{ color: 'var(--color-primary)' }} />
                      <span className="font-sans text-sm" style={{ color: 'var(--color-text)' }}>
                        {region}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matching journeys */}
              {linkedJourneys.length > 0 && (
                <div>
                  <p className="eyebrow mb-4">Plan Your Visit</p>
                  <h2 className="font-serif text-2xl font-light mb-5"
                    style={{ color: 'var(--color-text)' }}>
                    Journeys That Include This Festival
                  </h2>
                  <div className="divider-gold mb-7" />
                  <div className="space-y-4 mb-8">
                    {linkedJourneys.map(({ tour, hook, matchStrength }) => (
                      <div key={tour.slug}
                        className="p-5"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-card)',
                        }}>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <span className="font-sans text-[9px] px-2 py-0.5 uppercase tracking-wider"
                            style={{
                              backgroundColor: matchStrength === 'perfect'
                                ? 'rgba(232,163,23,0.15)'
                                : 'rgba(27,42,94,0.1)',
                              color: matchStrength === 'perfect'
                                ? 'var(--color-secondary-hover)'
                                : 'var(--color-primary)',
                              borderRadius: '4px',
                            }}>
                            {matchStrength} match
                          </span>
                          <span className="font-sans text-[10px] flex items-center gap-1"
                            style={{ color: 'var(--color-text-muted)' }}>
                            <Clock size={10} /> {tour.duration} days
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-light mb-1"
                          style={{ color: 'var(--color-text)' }}>
                          {tour.title}
                        </h3>
                        <p className="font-sans text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                          {hook[lang]}
                        </p>
                        <Link href={`/tours/${tour.slug}`}
                          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase"
                          style={{ color: 'var(--color-accent)' }}>
                          View Journey <ArrowLeft size={12} className="rotate-180" />
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {linkedJourneys.slice(0, 2).map(({ tour }) => (
                      <TourCard key={tour.slug} tour={tour} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">

                {/* Next occurrence */}
                {next && (
                  <div style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                    overflow: 'hidden',
                  }}>
                    <div className="px-5 pt-5 pb-3">
                      <p className="font-sans text-[10px] tracking-[0.22em] uppercase"
                        style={{ color: 'var(--color-text-muted)' }}>
                        Next Occurrence
                      </p>
                    </div>
                    <div className="px-5 pb-5"
                      style={{ borderTop: '1px solid var(--color-border)' }}>
                      <div className="flex items-start gap-3 pt-3">
                        <Calendar size={16} style={{ color: 'var(--color-secondary)' }} className="shrink-0 mt-0.5" />
                        <div>
                          <p className="font-sans font-medium text-sm mb-0.5"
                            style={{ color: 'var(--color-text)' }}>
                            {next.year}
                          </p>
                          <p className="font-sans text-sm"
                            style={{ color: 'var(--color-text-muted)' }}>
                            {next.start === next.end
                              ? formatDate(next.start)
                              : `${formatDate(next.start)} – ${formatDate(next.end)}`}
                          </p>
                          {next.note && (
                            <p className="font-sans text-xs italic mt-1.5"
                              style={{ color: 'var(--color-text-muted)' }}>
                              {next.note}
                            </p>
                          )}
                          {countdown !== null && (
                            <p className="font-sans text-xs mt-2 font-medium"
                              style={{ color: 'var(--color-secondary-hover)' }}>
                              {countdown === 0 ? 'Today!' : `${countdown} days away`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {festival.dates.slice(1).map((d, i) => (
                      <div key={i} className="px-5 py-3"
                        style={{ borderTop: '1px solid var(--color-border)' }}>
                        <div className="flex items-start gap-3">
                          <Calendar size={13} style={{ color: 'var(--color-text-muted)' }} className="shrink-0 mt-0.5" />
                          <div>
                            <p className="font-sans text-[10px] uppercase tracking-wider mb-0.5"
                              style={{ color: 'var(--color-text-muted)' }}>
                              {d.year}
                            </p>
                            <p className="font-sans text-sm" style={{ color: 'var(--color-text)' }}>
                              {d.start === d.end
                                ? formatDate(d.start)
                                : `${formatDate(d.start)} – ${formatDate(d.end)}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!next && (
                  <div className="p-5"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-card)',
                    }}>
                    <p className="font-sans text-sm italic"
                      style={{ color: 'var(--color-text-muted)' }}>
                      Upcoming dates to be confirmed. Enquire with Om for the latest information.
                    </p>
                  </div>
                )}

                {/* Enquiry form — pre-filled with festival */}
                <div className="p-6"
                  style={{
                    backgroundColor: 'rgba(27,42,94,0.06)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                  }}>
                  <h3 className="font-serif text-xl font-light mb-1.5"
                    style={{ color: 'var(--color-text)' }}>
                    Plan Around This Festival
                  </h3>
                  <p className="font-sans text-sm font-light mb-5 leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}>
                    Om will design your itinerary to arrive at the perfect moment.
                  </p>
                  <EnquiryForm defaultMessage={`I'm interested in experiencing ${festival.name.en} as part of my India journey.`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
