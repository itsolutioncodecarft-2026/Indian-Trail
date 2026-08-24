'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import EnquiryForm from '@/components/EnquiryForm';
import { Clock, Sun, MapPin, ArrowLeft, ChevronRight, Leaf, Star } from 'lucide-react';

export default function TourDetailClient({ tour }) {
  const { t } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[540px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={tour.featuredImage} alt={tour.title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/40 to-[#2C1810]/5" />
        </div>
        <div className="relative container-luxury w-full">
          <Link href="/tours" className="inline-flex items-center gap-2 font-sans text-xs tracking-wider mb-6 transition-colors" style={{ color: 'rgba(250,246,236,0.5)' }}>
            <ArrowLeft size={14} /> {t('common.all_tours')}
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs tracking-wide" style={{ backgroundColor: 'rgba(44,24,16,0.6)', color: 'rgba(250,246,236,0.8)' }}>
              <Clock size={12} style={{ color: '#B8892A' }} /> {tour.duration} {t('common.days')}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs tracking-wide" style={{ backgroundColor: 'rgba(44,24,16,0.6)', color: 'rgba(250,246,236,0.8)' }}>
              <Sun size={12} style={{ color: '#B8892A' }} /> {tour.season}
            </span>
          </div>
          <h1 className="display-title leading-none max-w-3xl mb-4" style={{ color: '#FAF6EC' }}>{tour.title}</h1>
          <p className="font-sans text-base font-light max-w-xl" style={{ color: 'rgba(250,246,236,0.6)' }}>{tour.subtitle}</p>
        </div>
      </section>

      {/* Route banner */}
      <div style={{ backgroundColor: '#2C1810' }} className="py-4">
        <div className="container-luxury">
          <div className="flex flex-wrap items-center gap-1.5">
            <MapPin size={13} style={{ color: '#B8892A' }} />
            {tour.route.map((city, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="font-sans text-xs" style={{ color: 'rgba(250,246,236,0.6)' }}>{city}</span>
                {i < tour.route.length - 1 && <ChevronRight size={12} style={{ color: 'rgba(184,137,42,0.4)' }} />}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ backgroundColor: '#FEFCF7' }}>
        <div className="container-luxury py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-14">

              {/* Overview */}
              <div>
                <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>Overview</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#2C1810' }}>About This Journey</h2>
                <div className="divider-gold mb-7" />
                <p className="font-sans text-lg font-light leading-relaxed" style={{ color: 'rgba(44,24,16,0.7)' }}>{tour.overview}</p>
              </div>

              {/* Highlights */}
              <div>
                <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>{t('common.highlights')}</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#2C1810' }}>Journey Highlights</h2>
                <div className="divider-gold mb-7" />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 border" style={{ backgroundColor: '#fff', borderColor: 'rgba(232,213,176,0.4)' }}>
                      <Star size={13} className="mt-0.5 shrink-0" style={{ color: '#B8892A' }} />
                      <span className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(44,24,16,0.7)' }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              <div>
                <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>Day by Day</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#2C1810' }}>Detailed Itinerary</h2>
                <div className="divider-gold mb-7" />
                <ItineraryTimeline days={tour.days} />
              </div>

              {/* Optional Experiences */}
              {tour.optionalExperiences?.length > 0 && (
                <div>
                  <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>Add-Ons</p>
                  <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#2C1810' }}>Optional Experiences</h2>
                  <div className="divider-gold mb-7" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.optionalExperiences.map((exp, i) => (
                      <div key={i} className="p-6 border" style={{ backgroundColor: 'rgba(232,213,176,0.2)', borderColor: '#E8D5B0' }}>
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: '#B8892A' }}>Optional</span>
                        <h4 className="font-serif text-lg font-light mb-2" style={{ color: '#2C1810' }}>{exp.title}</h4>
                        <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(44,24,16,0.6)' }}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Responsible Tourism */}
              <div className="p-8" style={{ backgroundColor: '#2C1810' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Leaf size={16} style={{ color: '#B8892A' }} />
                  <p className="eyebrow" style={{ color: '#B8892A' }}>Responsible Tourism</p>
                </div>
                <p className="font-serif text-base italic leading-relaxed" style={{ color: 'rgba(250,246,236,0.8)' }}>
                  &ldquo;Taking into consideration the well-being of animals, we as a responsible tour operator do not encourage the ride nor any activities related with the animals.&rdquo;
                </p>
              </div>
            </div>

            {/* RIGHT — Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick facts */}
                <div className="p-6 border" style={{ backgroundColor: '#fff', borderColor: '#E8D5B0' }}>
                  <h3 className="font-sans text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'rgba(44,24,16,0.5)' }}>
                    Journey at a Glance
                  </h3>
                  {[
                    { label: 'Duration', value: `${tour.duration} Days` },
                    { label: 'Best Season', value: tour.season },
                    { label: 'Destinations', value: `${tour.route.length} Cities` },
                    { label: 'Pricing', value: 'Request a Quote' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-4 py-3 border-b last:border-0" style={{ borderColor: 'rgba(232,213,176,0.4)' }}>
                      <span className="font-sans text-xs uppercase tracking-wider" style={{ color: 'rgba(44,24,16,0.4)' }}>{label}</span>
                      <span className="font-sans text-sm text-right" style={{ color: value === 'Request a Quote' ? '#B8892A' : '#2C1810', fontStyle: value === 'Request a Quote' ? 'italic' : 'normal' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Gallery */}
                {tour.gallery?.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {tour.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden">
                        <Image src={img} alt={`${tour.title} ${i + 1}`} fill className="object-cover hover:scale-110 transition-transform duration-500" sizes="120px" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Enquiry form */}
                <div className="p-6 border" style={{ backgroundColor: 'rgba(232,213,176,0.2)', borderColor: '#E8D5B0' }}>
                  <h3 className="font-serif text-xl font-light mb-2" style={{ color: '#2C1810' }}>Plan This Journey</h3>
                  <p className="font-sans text-sm mb-5 leading-relaxed" style={{ color: 'rgba(44,24,16,0.5)' }}>
                    Interested? Om will personally respond to your enquiry.
                  </p>
                  <EnquiryForm defaultTour={tour.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="section-padding-sm" style={{ backgroundColor: '#2C1810' }}>
        <div className="container-narrow text-center">
          <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>Begin This Journey</p>
          <h2 className="font-serif text-3xl font-light mb-5" style={{ color: '#FAF6EC' }}>
            Ready to Experience {tour.title.split(':')[0]}?
          </h2>
          <p className="font-sans text-base font-light mb-8 max-w-lg mx-auto" style={{ color: 'rgba(250,246,236,0.5)' }}>
            Share your travel vision and Om will personally craft your India experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/contact?tour=${tour.slug}`} className="btn-gold">{t('common.plan_journey')}</Link>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-8 py-3.5 border transition-all duration-300"
              style={{ borderColor: 'rgba(250,246,236,0.3)', color: 'rgba(250,246,236,0.7)' }}
            >
              {t('common.all_tours')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
