'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import EnquiryForm from '@/components/EnquiryForm';
import { Clock, Sun, MapPin, ArrowLeft, ChevronRight, Star } from 'lucide-react';

export default function TourDetailClient({ tour }) {
  const { t } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={tour.featuredImage} alt={tour.title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.94) 0%, rgba(13,27,42,0.42) 55%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,27,42,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury w-full">
          <Link href="/tours"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-wider uppercase mb-7 transition-colors"
            style={{ color: 'rgba(254,252,247,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(254,252,247,0.88)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(254,252,247,0.5)'}>
            <ArrowLeft size={13} /> All Journeys
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-[10px] tracking-wider uppercase"
              style={{ backgroundColor: 'rgba(43,108,176,0.88)', color: '#fff', borderRadius: '2px' }}>
              <Clock size={11} /> {tour.duration} Days
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-[10px] tracking-wider uppercase"
              style={{ backgroundColor: 'rgba(196,154,60,0.25)', color: '#C8A96E', border: '1px solid rgba(196,154,60,0.4)', borderRadius: '2px' }}>
              <Sun size={11} /> {tour.season}
            </span>
          </div>
          <h1 className="display-title leading-none max-w-3xl mb-4" style={{ color: '#FEFCF7' }}>{tour.title}</h1>
          <p className="font-sans font-light max-w-xl" style={{ color: 'rgba(254,252,247,0.62)', fontSize: '1rem' }}>{tour.subtitle}</p>
        </div>
      </section>

      {/* Route bar */}
      <div style={{ backgroundColor: '#1a2332' }} className="py-3.5">
        <div className="container-luxury flex flex-wrap items-center gap-1.5">
          <MapPin size={12} style={{ color: '#C49A3C' }} />
          {tour.route.map((city, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="font-sans text-xs" style={{ color: 'rgba(254,252,247,0.55)' }}>{city}</span>
              {i < tour.route.length - 1 && <ChevronRight size={11} style={{ color: 'rgba(196,154,60,0.4)' }} />}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ backgroundColor: '#FAFBFD' }}>
        <div className="container-luxury py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left */}
            <div className="lg:col-span-2 space-y-16">

              {/* Overview */}
              <div>
                <p className="eyebrow mb-4">Overview</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#1a2332' }}>About This Journey</h2>
                <div className="divider-gold mb-7" />
                <p className="body-large">{tour.overview}</p>
              </div>

              {/* Highlights */}
              <div>
                <p className="eyebrow mb-4">Highlights</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#1a2332' }}>Journey Highlights</h2>
                <div className="divider-gold mb-7" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4"
                      style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}>
                      <Star size={12} className="mt-0.5 shrink-0" style={{ color: '#C49A3C' }} />
                      <span className="font-sans text-sm font-light leading-relaxed" style={{ color: '#4A5568' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <p className="eyebrow mb-4">Day by Day</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#1a2332' }}>Detailed Itinerary</h2>
                <div className="divider-gold mb-7" />
                <ItineraryTimeline days={tour.days} />
              </div>

              {/* Optional */}
              {tour.optionalExperiences?.length > 0 && (
                <div>
                  <p className="eyebrow mb-4">Add-Ons</p>
                  <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#1a2332' }}>Optional Experiences</h2>
                  <div className="divider-gold mb-7" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.optionalExperiences.map((exp, i) => (
                      <div key={i} className="p-6" style={{ backgroundColor: '#EBF4FF', border: '1px solid #BEE3F8' }}>
                        <span className="font-sans text-[9px] tracking-[0.25em] uppercase block mb-2" style={{ color: '#2B6CB0' }}>Optional</span>
                        <h4 className="font-serif text-lg font-light mb-2" style={{ color: '#1a2332' }}>{exp.title}</h4>
                        <p className="font-sans text-sm font-light leading-relaxed" style={{ color: '#4A5568' }}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Responsible Tourism */}
              <div className="p-7 flex items-start gap-5" style={{ backgroundColor: '#F0FFF4', border: '1px solid #9AE6B4' }}>
                <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: '#276749', borderRadius: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <p className="eyebrow mb-2" style={{ color: '#276749' }}>Responsible Tourism</p>
                  <p className="font-serif text-base italic leading-relaxed" style={{ color: '#276749' }}>
                    &ldquo;Taking into consideration the well-being of animals, we as a responsible tour operator do not encourage the ride nor any activities related with the animals.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">

                {/* Facts */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}>
                  <div className="px-5 pt-5 pb-2">
                    <p className="font-sans text-[10px] tracking-[0.22em] uppercase" style={{ color: '#A0AEC0' }}>Journey at a Glance</p>
                  </div>
                  {[
                    { label: 'Duration', value: `${tour.duration} Days` },
                    { label: 'Best Season', value: tour.season },
                    { label: 'Destinations', value: `${tour.route.length} Cities` },
                    { label: 'Pricing', value: 'Request a Quote' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid #E2E8F0' }}>
                      <span className="font-sans text-xs uppercase tracking-wider" style={{ color: '#A0AEC0' }}>{label}</span>
                      <span className="font-sans text-sm" style={{
                        color: value === 'Request a Quote' ? '#C49A3C' : '#1a2332',
                        fontStyle: value === 'Request a Quote' ? 'italic' : 'normal',
                      }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Gallery */}
                {tour.gallery?.length > 0 && (
                  <div className="grid grid-cols-3 gap-1.5">
                    {tour.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden">
                        <Image src={img} alt={`${tour.title} ${i + 1}`} fill
                          className="object-cover hover:scale-110 transition-transform duration-500" sizes="100px" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Enquiry */}
                <div className="p-6" style={{ backgroundColor: '#EBF4FF', border: '1px solid #BEE3F8' }}>
                  <h3 className="font-serif text-xl font-light mb-1.5" style={{ color: '#1a2332' }}>Plan This Journey</h3>
                  <p className="font-sans text-sm font-light mb-5 leading-relaxed" style={{ color: '#4A5568' }}>
                    Om will personally respond to your enquiry.
                  </p>
                  <EnquiryForm defaultTour={tour.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="section-padding-sm" style={{ backgroundColor: '#0d1b2a' }}>
        <div className="container-narrow text-center">
          <p className="eyebrow mb-4" style={{ color: '#C8A96E' }}>Begin This Journey</p>
          <h2 className="font-serif text-3xl font-light mb-5" style={{ color: '#FEFCF7' }}>
            Ready to Experience {tour.title.split(':')[0]}?
          </h2>
          <p className="font-sans text-sm font-light mb-8 max-w-lg mx-auto" style={{ color: 'rgba(254,252,247,0.5)' }}>
            Share your vision and Om will craft your India experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/contact?tour=${tour.slug}`} className="btn-hero-primary">Plan My Journey</Link>
            <Link href="/tours"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-all duration-300"
              style={{ border: '1.5px solid rgba(254,252,247,0.3)', color: 'rgba(254,252,247,0.65)', borderRadius: '2px' }}>
              All Journeys
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
