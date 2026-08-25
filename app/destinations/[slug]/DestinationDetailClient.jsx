'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { tours } from '@/data/tours';
import TourCard from '@/components/TourCard';
import { MapPin, Sun, ArrowLeft, Star } from 'lucide-react';

export default function DestinationDetailClient({ destination }) {
  const { t } = useLang();
  const relatedTours = tours.filter(tour =>
    tour.route.some(city =>
      city.toLowerCase().includes(destination.name.toLowerCase()) ||
      destination.name.toLowerCase().includes(city.toLowerCase())
    )
  );

  return (
    <>
      {/* Hero */}
      <section className="relative h-[68vh] min-h-[460px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={destination.featuredImage} alt={destination.name} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.94) 0%, rgba(13,27,42,0.42) 55%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,27,42,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury w-full">
          <Link href="/destinations"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-wider uppercase mb-7 transition-colors"
            style={{ color: 'rgba(254,252,247,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(254,252,247,0.88)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(254,252,247,0.5)'}>
            <ArrowLeft size={13} /> All Destinations
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={12} style={{ color: '#C8A96E' }} />
            <span className="font-sans text-xs tracking-wider" style={{ color: '#C8A96E' }}>{destination.region}</span>
          </div>
          <h1 className="display-title leading-none mb-3" style={{ color: '#FEFCF7' }}>{destination.name}</h1>
          <p className="font-serif text-xl italic font-light" style={{ color: 'rgba(254,252,247,0.62)' }}>{destination.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ backgroundColor: '#FAFBFD' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main */}
            <div className="lg:col-span-2 space-y-14">
              <div>
                <p className="eyebrow mb-4">About</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#1a2332' }}>Discover {destination.name}</h2>
                <div className="divider-gold mb-7" />
                <p className="body-large">{destination.description}</p>
              </div>

              <div>
                <p className="eyebrow mb-4">Highlights</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#1a2332' }}>Must-See &amp; Do</h2>
                <div className="divider-gold mb-7" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4"
                      style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}>
                      <Star size={12} className="mt-0.5 shrink-0" style={{ color: '#C49A3C' }} />
                      <span className="font-sans text-sm font-light leading-relaxed" style={{ color: '#4A5568' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {relatedTours.length > 0 && (
                <div>
                  <p className="eyebrow mb-4">Journeys</p>
                  <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#1a2332' }}>Tours Including {destination.name}</h2>
                  <div className="divider-gold mb-7" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {relatedTours.slice(0, 4).map(tour => <TourCard key={tour.id} tour={tour} />)}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}>
                  <div className="px-5 pt-5 pb-2">
                    <p className="font-sans text-[10px] tracking-[0.22em] uppercase" style={{ color: '#A0AEC0' }}>At a Glance</p>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderTop: '1px solid #E2E8F0' }}>
                    <MapPin size={13} className="shrink-0" style={{ color: '#C49A3C' }} />
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-wider mb-0.5" style={{ color: '#A0AEC0' }}>Region</p>
                      <p className="font-sans text-sm" style={{ color: '#1a2332' }}>{destination.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderTop: '1px solid #E2E8F0' }}>
                    <Sun size={13} className="shrink-0" style={{ color: '#C49A3C' }} />
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-wider mb-0.5" style={{ color: '#A0AEC0' }}>Best Time</p>
                      <p className="font-sans text-sm" style={{ color: '#1a2332' }}>{destination.bestTime}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6" style={{ backgroundColor: '#EBF4FF', border: '1px solid #BEE3F8' }}>
                  <h3 className="font-serif text-lg font-light mb-2" style={{ color: '#1a2332' }}>Visit {destination.name}</h3>
                  <p className="font-sans text-sm font-light mb-5 leading-relaxed" style={{ color: '#4A5568' }}>
                    Featured in several of Om&rsquo;s curated journeys. Enquire to include it in your itinerary.
                  </p>
                  <Link href="/contact" className="btn-blue block text-center">{t('common.enquire_now')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
