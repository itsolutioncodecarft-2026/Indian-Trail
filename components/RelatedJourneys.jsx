'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

export default function RelatedJourneys({ currentSlug, tours }) {
  const related = tours
    .filter((t) => t.slug !== currentSlug)
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <section
      className="section-padding-sm"
      style={{ backgroundColor: 'var(--color-surface-alt)', borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container-luxury">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow mb-2">Continue Exploring</p>
            <h2 className="font-serif text-2xl font-light" style={{ color: 'var(--color-text)' }}>
              Other Journeys
            </h2>
          </div>
          <Link
            href="/tours"
            className="group inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase shrink-0"
            style={{ color: 'var(--color-text-muted)' }}
          >
            All Journeys
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="group relative block overflow-hidden"
              style={{
                minHeight: '240px',
                borderRadius: 'var(--radius-card)',
                backgroundColor: 'var(--color-primary-dark)',
              }}
            >
              <Image
                src={tour.featuredImage}
                alt={`${tour.title} — Indian Routes & Trails`}
                fill
                className="object-cover opacity-80 group-hover:opacity-70"
                style={{ transition: `transform var(--motion-image-hover)` }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.2) 55%, transparent 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="flex items-center gap-1 font-sans text-[9px] tracking-[0.18em] uppercase px-2 py-0.5"
                    style={{ backgroundColor: 'rgba(27,42,94,0.85)', color: '#fff', borderRadius: '4px' }}
                  >
                    <Clock size={8} /> {tour.duration} Days
                  </span>
                </div>
                <h3
                  className="font-serif font-light leading-snug mb-1.5"
                  style={{ color: 'var(--color-text-invert)', fontSize: '1rem' }}
                >
                  {tour.title}
                </h3>
                <div className="flex items-center gap-1.5">
                  <MapPin size={9} style={{ color: 'rgba(232,163,23,0.65)' }} />
                  <p className="font-sans text-[10px]" style={{ color: 'rgba(255,255,255,0.48)' }}>
                    {tour.route.slice(0, 3).join(' · ')}{tour.route.length > 3 ? ' ···' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-sans text-[9px] tracking-[0.18em] uppercase"
                    style={{ color: 'var(--color-secondary)' }}>Explore</span>
                  <ArrowRight size={10} style={{ color: 'var(--color-secondary)' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
