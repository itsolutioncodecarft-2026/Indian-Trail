'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=2400&q=90"
          alt="Amber Fort at dawn, Jaipur — Indian Routes & Trails"
          fill priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--color-primary-dark) 0%, rgba(27,42,94,0.55) 45%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(27,42,94,0.65) 0%, transparent 60%)' }} />
      </div>

      {/* Content */}
      <div className="relative w-full pb-24 md:pb-32">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <h1
              className="font-serif font-light leading-none mb-6"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.8rem)',
                letterSpacing: '-0.02em',
                color: 'var(--color-text-invert)',
              }}
            >
              Discover India,<br />
              <em style={{ color: 'var(--color-secondary)', fontStyle: 'italic' }}>
                Beyond the Ordinary.
              </em>
            </h1>

            <p
              className="font-sans font-light mb-10 max-w-lg leading-relaxed"
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              Private journeys shaped around culture, connection and the timeless spirit of India —
              crafted personally by Om for discerning travellers from around the world.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/tours" className="btn-hero-primary">
                Explore Our Journeys
              </Link>
              <Link href="/contact" className="btn-hero-ghost">
                Plan My Journey
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-3 opacity-40">
        <span
          className="font-sans text-[8px] tracking-[0.4em] uppercase"
          style={{ writingMode: 'vertical-rl', color: 'var(--color-text-invert)' }}
        >
          Scroll
        </span>
        <ArrowDown size={12} style={{ color: 'var(--color-text-invert)' }} className="animate-bounce" />
      </div>
    </section>
  );
}
