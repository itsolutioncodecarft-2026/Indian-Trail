'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function TourCard({ tour }) {
  return (
    <article
      className="group flex flex-col h-full transition-all duration-400"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-overlay)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '210px', borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}>
        <Image
          src={tour.featuredImage}
          alt={`${tour.title} — Indian Routes & Trails`}
          fill
          className="object-cover"
          style={{ transition: `transform var(--motion-image-hover)` }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.45) 0%, transparent 60%)' }} />
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 font-sans text-[9px] tracking-[0.2em] uppercase"
          style={{
            backgroundColor: 'rgba(27,42,94,0.88)',
            color: '#fff',
            borderRadius: 'var(--radius-pill)',
          }}>
          <Clock size={9} /> {tour.duration} Days
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="font-sans text-[9px] tracking-[0.25em] uppercase mb-2"
          style={{ color: 'var(--color-secondary-hover)' }}>
          {tour.season}
        </p>
        <h3 className="font-serif text-lg font-light leading-snug mb-3"
          style={{ color: 'var(--color-text)' }}>
          {tour.title}
        </h3>
        <div className="flex items-start gap-1.5 mb-4">
          <MapPin size={11} className="shrink-0 mt-0.5"
            style={{ color: 'var(--color-text-muted)' }} />
          <p className="font-sans text-[11px] leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}>
            {tour.route.join(' · ')}
          </p>
        </div>
        <ul className="space-y-1.5 mb-5 flex-1">
          {tour.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: 'var(--color-secondary)' }} />
              <span className="font-sans text-[11px] leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}>
                {h}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href={`/tours/${tour.slug}`}
          className="group/cta flex items-center justify-between pt-4 mt-auto"
          style={{ borderTop: '1px solid var(--color-border)' }}>
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase transition-colors"
            style={{ color: 'var(--color-text-muted)' }}>
            Explore Journey
          </span>
          <ArrowRight size={14}
            className="transition-transform duration-300 group-hover/cta:translate-x-1"
            style={{ color: 'var(--color-primary)' }} />
        </Link>
      </div>
    </article>
  );
}
