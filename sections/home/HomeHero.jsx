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
          alt="Amber Fort, Jaipur — Indian Routes & Trails"
          fill priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#0d1b2a]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a]/65 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative w-full pb-24 md:pb-32">
        <div className="container-luxury">
          <div className="max-w-2xl">
            {/* NO eyebrow here — logo already shows "A Signature of Excellence" */}

            {/* Hero headline */}
            <h1
              className="font-serif font-light leading-none mb-6"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.8rem)',
                letterSpacing: '-0.02em',
                color: '#FEFCF7',
              }}
            >
              Discover India,<br />
              <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>Beyond the Ordinary.</em>
            </h1>

            {/* Supporting copy */}
            <p
              className="font-sans font-light mb-10 max-w-lg leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: 'rgba(254,252,247,0.65)' }}
            >
              Private journeys shaped around culture, connection and the timeless spirit of India —
              crafted personally by Om for discerning travellers from around the world.
            </p>

            {/* CTAs */}
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
          style={{ writingMode: 'vertical-rl', color: '#FEFCF7' }}
        >
          Scroll
        </span>
        <ArrowDown size={12} style={{ color: '#FEFCF7' }} className="animate-bounce" />
      </div>
    </section>
  );
}
