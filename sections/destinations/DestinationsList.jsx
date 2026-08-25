'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { destinations } from '@/data/destinations';
import { ArrowRight } from 'lucide-react';

const REGIONS = ['All', 'Rajasthan', 'North India', 'Punjab', 'Madhya Pradesh', 'Maharashtra'];

export default function DestinationsList() {
  const [region, setRegion] = useState('All');
  const filtered = region === 'All' ? destinations : destinations.filter(d => d.region === region);

  return (
    <section className="section-padding" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="container-luxury">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {REGIONS.map(r => (
            <button key={r} onClick={() => setRegion(r)}
              className="font-sans text-[10px] tracking-[0.18em] uppercase px-4 py-2 transition-all duration-200"
              style={{
                border: `1.5px solid ${region === r ? '#2B6CB0' : '#E2E8F0'}`,
                backgroundColor: region === r ? '#2B6CB0' : 'transparent',
                color: region === r ? '#ffffff' : '#718096',
                borderRadius: '2px',
              }}>
              {r}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((dest, i) => {
            const isWide = i % 7 === 0;
            return (
              <div key={dest.slug} className={isWide ? 'col-span-2' : ''}>
                <Link href={`/destinations/${dest.slug}`}
                  className="group relative block overflow-hidden"
                  style={{ aspectRatio: isWide ? '16/7' : '3/4', backgroundColor: '#1a2332' }}>
                  <Image src={dest.featuredImage} alt={dest.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-82 group-hover:opacity-68"
                    sizes="25vw" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.12) 60%, transparent 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="font-sans text-[8px] tracking-[0.3em] uppercase mb-1" style={{ color: '#C8A96E' }}>
                      {dest.region}
                    </p>
                    <h3 className="font-serif font-light text-[#FEFCF7] group-hover:text-[#C8A96E] transition-colors duration-300"
                      style={{ fontSize: isWide ? '1.2rem' : '1rem', lineHeight: 1.2 }}>
                      {dest.name}
                    </h3>
                    {isWide && (
                      <p className="font-sans text-xs italic mt-1 line-clamp-1" style={{ color: 'rgba(254,252,247,0.48)' }}>
                        {dest.tagline}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: '#C8A96E' }}>Explore</span>
                      <ArrowRight size={10} style={{ color: '#C8A96E' }} />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
