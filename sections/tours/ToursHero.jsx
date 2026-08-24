'use client';
import Image from 'next/image';

export default function ToursHero() {
  return (
    <section className="relative h-[60vh] min-h-[420px] flex items-end pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&q=80"
          alt="Curated India Journeys"
          fill priority className="object-cover" sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/40 to-[#2C1810]/10" />
      </div>
      <div className="relative container-luxury">
        <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>Curated Journeys</p>
        <h1 className="display-title leading-none" style={{ color: '#FAF6EC' }}>
          Five Extraordinary<br />
          <span className="italic font-light" style={{ color: '#D4A853' }}>Expeditions</span>
        </h1>
        <p className="mt-5 font-sans text-lg font-light max-w-xl" style={{ color: 'rgba(250,246,236,0.6)' }}>
          Each journey personally designed by Om — a hand-woven masterpiece balancing ultra-luxury with raw, unfiltered India.
        </p>
      </div>
    </section>
  );
}
