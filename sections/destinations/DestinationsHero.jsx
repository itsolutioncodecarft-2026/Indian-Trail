'use client';
import Image from 'next/image';

export default function DestinationsHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1800&q=80"
          alt="India Destinations"
          fill priority className="object-cover" sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/40 to-[#2C1810]/10" />
      </div>
      <div className="relative container-luxury">
        <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>Explore India</p>
        <h1 className="display-title leading-none" style={{ color: '#FAF6EC' }}>
          India&apos;s Most<br />
          <span className="italic font-light" style={{ color: '#D4A853' }}>Magnificent Cities</span>
        </h1>
        <p className="mt-5 font-sans text-lg font-light max-w-xl" style={{ color: 'rgba(250,246,236,0.6)' }}>
          From Mughal monuments to desert dunes, lake palaces to sacred ghats — 20+ destinations woven into Om&apos;s curated journeys.
        </p>
      </div>
    </section>
  );
}
