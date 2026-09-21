'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { festivals, getNextOccurrence, daysUntil, getJourneysForFestival } from '@/data/festivals';
import { tours } from '@/data/tours';
import { useLang } from '@/lib/LanguageContext';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';

const MONTHS = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr + 'T12:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getMonthIndex(isoStr) {
  if (!isoStr) return -1;
  return new Date(isoStr + 'T12:00:00Z').getMonth(); // 0-based
}

export default function FestivalsList() {
  const { lang } = useLang();
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const years = [...new Set(
    festivals.flatMap((f) => f.dates.map((d) => String(d.year)))
  )].sort();

  const filtered = festivals.filter((f) => {
    if (selectedYear === 'all' && selectedMonth === 'All') return true;
    return f.dates.some((d) => {
      const yearOk = selectedYear === 'all' || String(d.year) === selectedYear;
      const monthOk = selectedMonth === 'All' ||
        MONTHS.indexOf(selectedMonth) - 1 === getMonthIndex(d.start);
      return yearOk && monthOk;
    });
  });

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-luxury">

        {/* Controls */}
        <div className="flex flex-wrap gap-6 mb-14 pb-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
          {/* Year selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase mr-1"
              style={{ color: 'var(--color-text-muted)' }}>Year</span>
            {['all', ...years].map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className="font-sans text-[10px] tracking-[0.15em] uppercase px-3.5 py-1.5 transition-all duration-200"
                style={{
                  border: `1.5px solid ${selectedYear === y ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: selectedYear === y ? 'var(--color-primary)' : 'transparent',
                  color: selectedYear === y ? '#fff' : 'var(--color-text-muted)',
                  borderRadius: 'var(--radius-control)',
                }}>
                {y === 'all' ? 'All Years' : y}
              </button>
            ))}
          </div>

          {/* Month rail */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase mr-1"
              style={{ color: 'var(--color-text-muted)' }}>Month</span>
            {MONTHS.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className="font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 transition-all duration-200"
                style={{
                  border: `1.5px solid ${selectedMonth === m ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: selectedMonth === m ? 'var(--color-primary)' : 'transparent',
                  color: selectedMonth === m ? '#fff' : 'var(--color-text-muted)',
                  borderRadius: 'var(--radius-control)',
                }}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Festival timeline */}
        <div className="space-y-16">
          {filtered.map((festival) => {
            const next = getNextOccurrence(festival, today);
            const countdown = daysUntil(festival, today);
            const linkedJourneys = getJourneysForFestival(festival.slug)
              .map((link) => ({ ...link, tour: tours.find((t) => t.slug === link.journeySlug) }))
              .filter((x) => x.tour);

            return (
              <article key={festival.slug}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Festival card */}
                  <div className="lg:col-span-2">
                    <Link
                      href={`/festivals/${festival.slug}`}
                      className="group relative block overflow-hidden mb-6"
                      style={{ height: '320px', borderRadius: 'var(--radius-card)' }}
                    >
                      <Image
                        src={festival.heroImage}
                        alt={`${festival.name.en} — Indian Routes & Trails`}
                        fill className="object-cover opacity-90 group-hover:opacity-80"
                        style={{ transition: `transform var(--motion-image-hover)` }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        sizes="(max-width:1024px) 100vw, 66vw"
                      />
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.90) 0%, rgba(20,34,77,0.2) 55%, transparent 100%)' }} />

                      {/* Countdown badge — only for nearest festival */}
                      {countdown !== null && countdown <= 90 && (
                        <div className="absolute top-5 right-5 px-3 py-1.5 font-sans text-[10px] tracking-wider uppercase"
                          style={{
                            backgroundColor: 'var(--color-secondary)',
                            color: 'var(--color-text-on-gold)',
                            borderRadius: 'var(--radius-pill)',
                          }}>
                          {countdown === 0 ? 'Today!' : `${countdown} days away`}
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="eyebrow mb-2" style={{ color: 'var(--color-secondary)' }}>
                          {festival.regions.join(' · ')}
                        </p>
                        <h2 className="font-serif text-2xl font-light mb-1"
                          style={{ color: 'var(--color-text-invert)' }}>
                          {festival.name[lang]}
                        </h2>
                        <p className="font-serif text-sm italic"
                          style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {festival.tagline[lang]}
                        </p>
                      </div>
                    </Link>

                    {/* Description */}
                    <p className="body-text mb-6">{festival.description[lang]}</p>

                    <Link
                      href={`/festivals/${festival.slug}`}
                      className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase"
                      style={{ color: 'var(--color-primary)' }}>
                      Full Festival Guide
                      <ArrowRight size={13} />
                    </Link>
                  </div>

                  {/* Dates + matched journeys sidebar */}
                  <div className="lg:col-span-1 space-y-5">
                    {/* Dates */}
                    <div style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-card)',
                      overflow: 'hidden',
                    }}>
                      <div className="px-5 pt-5 pb-3">
                        <p className="font-sans text-[10px] tracking-[0.22em] uppercase"
                          style={{ color: 'var(--color-text-muted)' }}>
                          Upcoming Dates
                        </p>
                      </div>
                      {festival.dates.length === 0 ? (
                        <div className="px-5 pb-5">
                          <p className="font-sans text-xs italic"
                            style={{ color: 'var(--color-text-muted)' }}>
                            Dates to be confirmed — enquire with Om for the latest information.
                          </p>
                        </div>
                      ) : (
                        festival.dates
                          .filter((d) => selectedYear === 'all' || String(d.year) === selectedYear)
                          .map((d, i) => {
                            const isPast = new Date(d.end + 'T23:59:59Z') < today;
                            return (
                              <div key={i} className="px-5 py-3.5"
                                style={{
                                  borderTop: '1px solid var(--color-border)',
                                  opacity: isPast ? 0.5 : 1,
                                }}>
                                <div className="flex items-start gap-2.5">
                                  <Calendar size={13} className="shrink-0 mt-0.5"
                                    style={{ color: 'var(--color-secondary)' }} />
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
                                    {d.note && (
                                      <p className="font-sans text-xs italic mt-1"
                                        style={{ color: 'var(--color-text-muted)' }}>
                                        {d.note}
                                      </p>
                                    )}
                                    {isPast && (
                                      <p className="font-sans text-[9px] uppercase tracking-wider mt-1"
                                        style={{ color: 'var(--color-error)' }}>
                                        Passed
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                      )}
                    </div>

                    {/* Matching journeys */}
                    {linkedJourneys.length > 0 && (
                      <div style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-card)',
                        overflow: 'hidden',
                      }}>
                        <div className="px-5 pt-5 pb-3">
                          <p className="font-sans text-[10px] tracking-[0.22em] uppercase"
                            style={{ color: 'var(--color-text-muted)' }}>
                            Matching Journeys
                          </p>
                        </div>
                        {linkedJourneys.slice(0, 3).map(({ tour, hook, matchStrength }) => (
                          <Link
                            key={tour.slug}
                            href={`/tours/${tour.slug}`}
                            className="group flex items-start gap-3 px-5 py-4 transition-colors"
                            style={{
                              borderTop: '1px solid var(--color-border)',
                              backgroundColor: 'transparent',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-tint)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <div className="shrink-0 mt-0.5">
                              <span className="font-sans text-[8px] px-1.5 py-0.5 uppercase tracking-wider"
                                style={{
                                  backgroundColor: matchStrength === 'perfect'
                                    ? 'rgba(232,163,23,0.15)'
                                    : 'rgba(27,42,94,0.1)',
                                  color: matchStrength === 'perfect'
                                    ? 'var(--color-secondary-hover)'
                                    : 'var(--color-primary)',
                                  borderRadius: '4px',
                                }}>
                                {matchStrength}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-sans text-xs font-medium leading-snug mb-1"
                                style={{ color: 'var(--color-text)' }}>
                                {tour.title}
                              </p>
                              <p className="font-sans text-[11px] leading-relaxed"
                                style={{ color: 'var(--color-text-muted)' }}>
                                {hook[lang]}
                              </p>
                              <div className="flex items-center gap-1 mt-1.5">
                                <Clock size={10} style={{ color: 'var(--color-text-muted)' }} />
                                <span className="font-sans text-[10px]"
                                  style={{ color: 'var(--color-text-muted)' }}>
                                  {tour.duration} days
                                </span>
                              </div>
                            </div>
                            <ArrowRight size={12} className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: 'var(--color-primary)' }} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-xl italic" style={{ color: 'var(--color-text-muted)' }}>
              No festivals match your selection.
            </p>
            <button
              onClick={() => { setSelectedYear('all'); setSelectedMonth('All'); }}
              className="mt-4 font-sans text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
              Reset Filters
            </button>
          </div>
        )}

        {/* Enquiry CTA */}
        <div className="mt-20 p-10 md:p-14 text-center"
          style={{
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--radius-card)',
          }}>
          <p className="eyebrow mb-4" style={{ color: 'var(--color-text-invert-muted)' }}>
            Time Your Journey
          </p>
          <h3 className="font-serif text-2xl font-light mb-4"
            style={{ color: 'var(--color-text-invert)' }}>
            Want to Experience India at Festival Time?
          </h3>
          <p className="font-sans text-sm font-light mb-7 max-w-lg mx-auto"
            style={{ color: 'var(--color-text-invert-muted)' }}>
            Om will build your dates around the festival — so you arrive exactly when India is at its most alive.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            Plan Around a Festival
          </Link>
        </div>
      </div>
    </section>
  );
}
