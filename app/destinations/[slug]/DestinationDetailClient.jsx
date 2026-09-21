'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { tours } from '@/data/tours';
import { festivals, getFestivalBySlug } from '@/data/festivals';
import TourCard from '@/components/TourCard';
import { MapPin, Sun, ArrowLeft, Star, Calendar } from 'lucide-react';

function formatDate(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr + 'T12:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DestinationDetailClient({ destination }) {
  const { t, lang } = useLang();
  const today = new Date();

  const relatedTours = tours.filter((tour) =>
    tour.route.some((city) =>
      city.toLowerCase().includes(destination.name.toLowerCase()) ||
      destination.name.toLowerCase().includes(city.toLowerCase())
    )
  );

  // Find festivals in this destination's region
  const localFestivals = festivals.filter((f) =>
    f.regions.some((r) =>
      r.toLowerCase().includes(destination.name.toLowerCase()) ||
      destination.name.toLowerCase().includes(r.toLowerCase()) ||
      r === 'Pan-India'
    )
  );

  return (
    <>
      {/* Hero */}
      <section className="relative h-[68vh] min-h-[460px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={destination.featuredImage}
            alt={`${destination.name}, India — Indian Routes & Trails`}
            fill priority className="object-cover" sizes="100vw"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.94) 0%, rgba(20,34,77,0.42) 55%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury w-full">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-wider uppercase mb-7 transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
            <ArrowLeft size={13} /> All Destinations
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={12} style={{ color: 'var(--color-secondary)' }} />
            <span className="font-sans text-xs tracking-wider"
              style={{ color: 'var(--color-secondary)' }}>
              {destination.region}
            </span>
          </div>
          <h1 className="display-title leading-none mb-3"
            style={{ color: 'var(--color-text-invert)' }}>
            {destination.name}
          </h1>
          <p className="font-serif text-xl italic font-light"
            style={{ color: 'rgba(255,255,255,0.62)' }}>
            {destination.tagline}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main */}
            <div className="lg:col-span-2 space-y-14">

              {/* About */}
              <div>
                <p className="eyebrow mb-4">About</p>
                <h2 className="font-serif text-2xl font-light mb-5"
                  style={{ color: 'var(--color-text)' }}>
                  Discover {destination.name}
                </h2>
                <div className="divider-gold mb-7" />
                <p className="body-large">{destination.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <p className="eyebrow mb-4">Highlights</p>
                <h2 className="font-serif text-2xl font-light mb-5"
                  style={{ color: 'var(--color-text)' }}>
                  Must-See &amp; Do
                </h2>
                <div className="divider-gold mb-7" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-control)',
                      }}>
                      <Star size={12} className="mt-0.5 shrink-0"
                        style={{ color: 'var(--color-secondary)' }} />
                      <span className="font-sans text-sm font-light leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Festivals here */}
              {localFestivals.length > 0 && (
                <div>
                  <p className="eyebrow mb-4">Festivals</p>
                  <h2 className="font-serif text-2xl font-light mb-5"
                    style={{ color: 'var(--color-text)' }}>
                    Festivals in {destination.name}
                  </h2>
                  <div className="divider-gold mb-7" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {localFestivals.map((festival) => {
                      const upcomingDate = festival.dates.find(
                        (d) => new Date(d.start + 'T12:00:00Z') >= today
                      );
                      return (
                        <Link
                          key={festival.slug}
                          href={`/festivals/${festival.slug}`}
                          className="group flex items-start gap-3 p-4 transition-all"
                          style={{
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-card)',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'var(--color-border-gold)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-overlay)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <Calendar size={16} className="shrink-0 mt-0.5"
                            style={{ color: 'var(--color-secondary)' }} />
                          <div>
                            <p className="font-serif text-base font-light mb-0.5"
                              style={{ color: 'var(--color-text)' }}>
                              {festival.name[lang]}
                            </p>
                            {upcomingDate && (
                              <p className="font-sans text-xs"
                                style={{ color: 'var(--color-text-muted)' }}>
                                Next: {formatDate(upcomingDate.start)}
                              </p>
                            )}
                            {!upcomingDate && (
                              <p className="font-sans text-xs italic"
                                style={{ color: 'var(--color-text-muted)' }}>
                                Dates to be confirmed
                              </p>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related tours */}
              {relatedTours.length > 0 && (
                <div>
                  <p className="eyebrow mb-4">Journeys</p>
                  <h2 className="font-serif text-2xl font-light mb-5"
                    style={{ color: 'var(--color-text)' }}>
                    Tours Including {destination.name}
                  </h2>
                  <div className="divider-gold mb-7" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {relatedTours.slice(0, 4).map((tour) => (
                      <TourCard key={tour.id} tour={tour} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* At a Glance */}
                <div style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                }}>
                  <div className="px-5 pt-5 pb-2">
                    <p className="font-sans text-[10px] tracking-[0.22em] uppercase"
                      style={{ color: 'var(--color-text-muted)' }}>
                      At a Glance
                    </p>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3.5"
                    style={{ borderTop: '1px solid var(--color-border)' }}>
                    <MapPin size={13} className="shrink-0"
                      style={{ color: 'var(--color-secondary)' }} />
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-wider mb-0.5"
                        style={{ color: 'var(--color-text-muted)' }}>
                        Region
                      </p>
                      <p className="font-sans text-sm" style={{ color: 'var(--color-text)' }}>
                        {destination.region}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3.5"
                    style={{ borderTop: '1px solid var(--color-border)' }}>
                    <Sun size={13} className="shrink-0"
                      style={{ color: 'var(--color-secondary)' }} />
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-wider mb-0.5"
                        style={{ color: 'var(--color-text-muted)' }}>
                        Best Time to Visit
                      </p>
                      <p className="font-sans text-sm" style={{ color: 'var(--color-text)' }}>
                        {destination.bestTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enquiry CTA */}
                <div className="p-6"
                  style={{
                    backgroundColor: 'rgba(27,42,94,0.06)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-card)',
                  }}>
                  <h3 className="font-serif text-lg font-light mb-2"
                    style={{ color: 'var(--color-text)' }}>
                    Visit {destination.name}
                  </h3>
                  <p className="font-sans text-sm font-light mb-5 leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}>
                    Featured in several of Om&rsquo;s curated journeys. Enquire to include it in your itinerary.
                  </p>
                  <Link href="/contact" className="btn-indigo block text-center">
                    {t('common.enquire_now')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
