'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DestinationCard({ destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block overflow-hidden"
      style={{ aspectRatio: '3/4', backgroundColor: '#1a2332' }}
    >
      <Image src={destination.featuredImage} alt={destination.name} fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-82 group-hover:opacity-70"
        sizes="25vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/90 via-[#0d1b2a]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <p className="font-sans text-[8px] tracking-[0.3em] uppercase mb-1" style={{ color: '#C8A96E' }}>
          {destination.region}
        </p>
        <h3 className="font-serif text-lg font-light text-[#FEFCF7] group-hover:text-[#C8A96E] transition-colors" style={{ lineHeight: 1.2 }}>
          {destination.name}
        </h3>
        <p className="font-sans text-[10px] italic mt-1 line-clamp-1" style={{ color: 'rgba(254,252,247,0.48)' }}>
          {destination.tagline}
        </p>
        <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: '#C8A96E' }}>Explore</span>
          <ArrowRight size={10} style={{ color: '#C8A96E' }} />
        </div>
      </div>
    </Link>
  );
}
