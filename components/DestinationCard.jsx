'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DestinationCard({ destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block overflow-hidden aspect-[3/4] bg-[#2C1810]"
    >
      <Image
        src={destination.featuredImage}
        alt={destination.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-70"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="eyebrow text-[#B8892A] mb-1">{destination.region}</p>
        <h3 className="font-serif text-xl font-light text-[#FAF6EC] mb-1.5 group-hover:text-[#D4A853] transition-colors duration-300">
          {destination.name}
        </h3>
        <p className="font-sans text-xs text-[#FAF6EC]/50 italic mb-2 line-clamp-1">
          {destination.tagline}
        </p>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="font-sans text-xs tracking-widest uppercase text-[#D4A853]">Explore</span>
          <ArrowRight size={13} className="text-[#D4A853]" />
        </div>
      </div>
    </Link>
  );
}
