'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Sun, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function TourCard({ tour }) {
  const { t } = useLang();

  return (
    <article className="group flex flex-col h-full bg-white border border-[#E8D5B0]/40 hover:shadow-2xl transition-all duration-500">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={tour.featuredImage}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 bg-[#2C1810]/80 text-[#FAF6EC] px-3 py-1.5 flex items-center gap-1.5">
          <Clock size={12} />
          <span className="font-sans text-xs tracking-wider">
            {tour.duration} {t('common.days')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Season */}
        <div className="flex items-center gap-1.5 mb-3">
          <Sun size={12} className="text-[#B8892A]" />
          <span className="font-sans text-xs tracking-wider text-[#B8892A]">{tour.season}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-light text-[#2C1810] leading-snug mb-3">
          {tour.title}
        </h3>

        {/* Route */}
        <div className="flex items-start gap-2 mb-4">
          <MapPin size={13} className="text-[#2C1810]/40 mt-0.5 shrink-0" />
          <p className="font-sans text-xs text-[#2C1810]/50 leading-relaxed">
            {tour.route.join(' → ')}
          </p>
        </div>

        {/* Highlights */}
        <ul className="flex flex-col gap-1.5 mb-6 flex-1">
          {tour.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#B8892A] mt-2 shrink-0" />
              <span className="font-sans text-xs text-[#2C1810]/60 leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={`/tours/${tour.slug}`}
          className="group/cta flex items-center justify-between mt-auto pt-4 border-t border-[#E8D5B0]/50"
        >
          <span className="font-sans text-xs tracking-[0.15em] uppercase text-[#2C1810]/70 group-hover/cta:text-[#2C1810] transition-colors">
            {t('common.view_itinerary')}
          </span>
          <ArrowRight
            size={16}
            className="text-[#B8892A] transition-transform duration-300 group-hover/cta:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
