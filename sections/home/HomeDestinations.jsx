'use client';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedDestinations } from '@/data/destinations';
import { ArrowRight } from 'lucide-react';

export default function HomeDestinations() {
  const featured = getFeaturedDestinations();

  return (
    <section className="section-padding" style={{ backgroundColor: '#F4F6FA' }}>
      <div className="container-luxury">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-4">India Through Our Eyes</p>
            <h2 className="section-title">
              Cities That<br />
              <span className="italic font-light" style={{ color: '#2B6CB0' }}>Stay With You</span>
            </h2>
          </div>
          <Link href="/destinations" className="group flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase shrink-0" style={{ color: '#4A5568' }}>
            All Destinations
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {featured.map((dest, i) => {
            const isLarge = i === 0;
            return (
              <div key={dest.slug} className={isLarge ? 'col-span-2 row-span-2' : ''}>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="group relative block overflow-hidden"
                  style={{
                    aspectRatio: isLarge ? undefined : '3/4',
                    height: isLarge ? '100%' : undefined,
                    minHeight: isLarge ? '400px' : undefined,
                    backgroundColor: '#1a2332',
                  }}
                >
                  <Image src={dest.featuredImage} alt={dest.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-70"
                    sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/90 via-[#0d1b2a]/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="font-sans text-[8px] tracking-[0.3em] uppercase mb-1.5" style={{ color: '#C8A96E' }}>
                      {dest.region}
                    </p>
                    <h3
                      className="font-serif font-light text-[#FEFCF7] group-hover:text-[#C8A96E] transition-colors"
                      style={{ fontSize: isLarge ? 'clamp(1.3rem,2.5vw,1.8rem)' : '1rem', lineHeight: 1.2 }}
                    >
                      {dest.name}
                    </h3>
                    {isLarge && (
                      <p className="font-sans text-xs italic mt-1.5 line-clamp-1" style={{ color: 'rgba(254,252,247,0.5)' }}>
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
