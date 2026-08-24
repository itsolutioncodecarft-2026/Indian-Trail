'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { tours } from '@/data/tours';
import TourCard from '@/components/TourCard';
import { MapPin, Sun, ArrowLeft, Star } from 'lucide-react';

export default function DestinationDetailClient({ destination }) {
  const { t } = useLang();

  const relatedTours = tours.filter((tour) =>
    tour.route.some((city) =>
      city.toLowerCase().includes(destination.name.toLowerCase()) ||
      destination.name.toLowerCase().includes(city.toLowerCase())
    )
  );

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={destination.featuredImage} alt={destination.name} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/50 to-[#2C1810]/10" />
        </div>
        <div className="relative container-luxury w-full">
          <Link href="/destinations" className="inline-flex items-center gap-2 font-sans text-xs tracking-wider mb-6 transition-colors" style={{ color: 'rgba(250,246,236,0.5)' }}>
            <ArrowLeft size={14} /> {t('common.all_destinations')}
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={13} style={{ color: '#B8892A' }} />
            <span className="font-sans text-xs tracking-wider" style={{ color: '#B8892A' }}>{destination.region}</span>
          </div>
          <h1 className="display-title leading-none mb-3" style={{ color: '#FAF6EC' }}>{destination.name}</h1>
          <p className="font-serif text-xl italic font-light" style={{ color: 'rgba(250,246,236,0.6)' }}>{destination.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ backgroundColor: '#FEFCF7' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>About</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#2C1810' }}>Discover {destination.name}</h2>
                <div className="divider-gold mb-7" />
                <p className="font-sans text-lg font-light leading-relaxed" style={{ color: 'rgba(44,24,16,0.7)' }}>{destination.description}</p>
              </div>

              <div>
                <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>{t('common.highlights')}</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#2C1810' }}>Must-See &amp; Do</h2>
                <div className="divider-gold mb-7" />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 border" style={{ backgroundColor: '#fff', borderColor: 'rgba(232,213,176,0.4)' }}>
                      <Star size={13} className="mt-0.5 shrink-0" style={{ color: '#B8892A' }} />
                      <span className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(44,24,16,0.7)' }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedTours.length > 0 && (
                <div>
                  <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>Journeys</p>
                  <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#2C1810' }}>Tours Including {destination.name}</h2>
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
              <div className="sticky top-24 space-y-6">
                <div className="p-6 border" style={{ backgroundColor: '#fff', borderColor: '#E8D5B0' }}>
                  <h3 className="font-sans text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'rgba(44,24,16,0.5)' }}>At a Glance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'rgba(232,213,176,0.4)' }}>
                      <MapPin size={14} style={{ color: '#B8892A' }} className="shrink-0" />
                      <div>
                        <p className="font-sans text-xs uppercase tracking-wider" style={{ color: 'rgba(44,24,16,0.4)' }}>Region</p>
                        <p className="font-sans text-sm" style={{ color: '#2C1810' }}>{destination.region}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-3">
                      <Sun size={14} style={{ color: '#B8892A' }} className="shrink-0" />
                      <div>
                        <p className="font-sans text-xs uppercase tracking-wider" style={{ color: 'rgba(44,24,16,0.4)' }}>Best Time to Visit</p>
                        <p className="font-sans text-sm" style={{ color: '#2C1810' }}>{destination.bestTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border" style={{ backgroundColor: 'rgba(232,213,176,0.2)', borderColor: '#E8D5B0' }}>
                  <h3 className="font-serif text-lg font-light mb-2" style={{ color: '#2C1810' }}>Visit {destination.name}</h3>
                  <p className="font-sans text-sm mb-5 leading-relaxed" style={{ color: 'rgba(44,24,16,0.5)' }}>
                    {destination.name} features in several of Om&apos;s curated journeys. Enquire to include it in your personalised itinerary.
                  </p>
                  <Link href="/contact" className="btn-primary block text-center">{t('common.enquire_now')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
