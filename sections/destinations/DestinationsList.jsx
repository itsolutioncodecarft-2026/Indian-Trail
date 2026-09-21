'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { destinations } from '@/data/destinations';
import { ArrowRight } from 'lucide-react';

const REGIONS = ['All', 'North India', 'Rajasthan', 'Punjab', 'Central India'];

export default function DestinationsList() {
  const [region, setRegion] = useState('All');

  const filtered = region === 'All'
    ? destinations
    : destinations.filter((d) => d.region === region);

  // Group by region for display
  const grouped = REGIONS.slice(1).reduce((acc, r) => {
    const items = filtered.filter((d) => d.region === r);
    if (items.length) acc[r] = items;
    return acc;
  }, {});

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-luxury">

        {/* Region filter */}
        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter by region">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className="font-sans text-[10px] tracking-[0.18em] uppercase px-4 py-2 transition-all duration-200"
              style={{
                border: `1.5px solid ${region === r ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: region === r ? 'var(--color-primary)' : 'transparent',
                color: region === r ? 'var(--color-text-invert)' : 'var(--color-text-muted)',
                borderRadius: 'var(--radius-control)',
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Grouped grid */}
        {region === 'All' ? (
          Object.entries(grouped).map(([regionName, items]) => (
            <div key={regionName} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-xl font-light" style={{ color: 'var(--color-text)' }}>
                  {regionName}
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
              </div>
              <DestinationGrid destinations={items} />
            </div>
          ))
        ) : (
          <DestinationGrid destinations={filtered} />
        )}
      </div>
    </section>
  );
}

function DestinationGrid({ destinations: items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {items.map((dest, i) => {
        const isWide = i % 7 === 0;
        return (
          <div key={dest.slug} className={isWide ? 'col-span-2' : ''}>
            <Link
              href={`/destinations/${dest.slug}`}
              className="group relative block overflow-hidden"
              style={{
                aspectRatio: isWide ? '16/7' : '3/4',
                backgroundColor: 'var(--color-primary-dark)',
                borderRadius: 'var(--radius-card)',
              }}
            >
              <Image
                src={dest.featuredImage}
                alt={`${dest.name}, India — Indian Routes & Trails`}
                fill
                className="object-cover opacity-82 group-hover:opacity-68"
                style={{ transition: `transform var(--motion-image-hover)` }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                sizes="25vw"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.12) 60%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="font-sans text-[8px] tracking-[0.3em] uppercase mb-1"
                  style={{ color: 'var(--color-secondary)' }}>
                  {dest.region}
                </p>
                <h3
                  className="font-serif font-light transition-colors duration-300"
                  style={{
                    color: 'var(--color-text-invert)',
                    fontSize: isWide ? '1.2rem' : '1rem',
                    lineHeight: 1.2,
                  }}
                >
                  {dest.name}
                </h3>
                {isWide && (
                  <p className="font-sans text-xs italic mt-1 line-clamp-1"
                    style={{ color: 'rgba(255,255,255,0.48)' }}>
                    {dest.tagline}
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase"
                    style={{ color: 'var(--color-secondary)' }}>
                    Explore
                  </span>
                  <ArrowRight size={10} style={{ color: 'var(--color-secondary)' }} />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
