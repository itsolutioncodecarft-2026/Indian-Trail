'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { resolveDestImage } from '@/lib/destImage';

export default function DestinationCard({ destination }) {
  const src = resolveDestImage(destination.featuredImage, destination.slug);
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block overflow-hidden"
      style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-primary-dark)', borderRadius: 'var(--radius-card)' }}
    >
      <Image
        src={src}
        alt={`${destination.name}, India — Indian Routes & Trails`}
        fill
        className="object-cover opacity-80 group-hover:opacity-70"
        style={{ transition: `transform var(--motion-image-hover)` }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        sizes="25vw"
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.15) 60%, transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <p className="font-sans text-[8px] tracking-[0.3em] uppercase mb-1"
          style={{ color: 'var(--color-secondary)' }}>
          {destination.region}
        </p>
        <h3 className="font-serif text-lg font-light transition-colors"
          style={{ color: 'var(--color-text-invert)', lineHeight: 1.2 }}>
          {destination.name}
        </h3>
        <p className="font-sans text-[10px] italic mt-1 line-clamp-1"
          style={{ color: 'rgba(255,255,255,0.48)' }}>
          {destination.tagline}
        </p>
        <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-secondary)' }}>Explore</span>
          <ArrowRight size={10} style={{ color: 'var(--color-secondary)' }} />
        </div>
      </div>
    </Link>
  );
}
