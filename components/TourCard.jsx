'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function TourCard({ tour }) {
  return (
    <article className="group flex flex-col h-full transition-all duration-400"
      style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,35,50,0.09)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '210px' }}>
        <Image src={tour.featuredImage} alt={tour.title} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/45 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 font-sans text-[9px] tracking-[0.2em] uppercase"
          style={{ backgroundColor: 'rgba(43,108,176,0.88)', color: '#fff', borderRadius: '2px' }}>
          <Clock size={9} /> {tour.duration} Days
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="font-sans text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: '#C49A3C' }}>
          {tour.season}
        </p>
        <h3 className="font-serif text-lg font-light leading-snug mb-3" style={{ color: '#1a2332' }}>
          {tour.title}
        </h3>
        <div className="flex items-start gap-1.5 mb-4">
          <MapPin size={11} className="shrink-0 mt-0.5" style={{ color: '#A0AEC0' }} />
          <p className="font-sans text-[11px] leading-relaxed" style={{ color: '#718096' }}>
            {tour.route.join(' · ')}
          </p>
        </div>
        <ul className="space-y-1.5 mb-5 flex-1">
          {tour.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#C49A3C' }} />
              <span className="font-sans text-[11px] leading-relaxed" style={{ color: '#718096' }}>{h}</span>
            </li>
          ))}
        </ul>
        <Link href={`/tours/${tour.slug}`}
          className="group/cta flex items-center justify-between pt-4 mt-auto"
          style={{ borderTop: '1px solid #E2E8F0' }}>
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase transition-colors" style={{ color: '#4A5568' }}>
            Explore Journey
          </span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-1" style={{ color: '#2B6CB0' }} />
        </Link>
      </div>
    </article>
  );
}
