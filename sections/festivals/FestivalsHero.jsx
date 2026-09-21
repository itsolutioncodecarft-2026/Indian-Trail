'use client';
import Image from 'next/image';

export default function FestivalsHero() {
  return (
    <section className="relative h-[62vh] min-h-[420px] flex items-end pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=2000&q=85"
          alt="Holi festival of colours — Indian Routes & Trails"
          fill priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.40) 55%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
      </div>
      <div className="relative container-luxury">
        <p className="eyebrow mb-4" style={{ color: 'var(--color-secondary)' }}>Festival Calendar</p>
        <h1 className="display-title leading-none" style={{ color: 'var(--color-text-invert)' }}>
          India at Its<br />
          <em className="font-light" style={{ color: 'var(--color-secondary)' }}>Most Alive</em>
        </h1>
        <p className="mt-5 font-sans font-light max-w-xl"
          style={{ color: 'rgba(255,255,255,0.62)', fontSize: '1.05rem' }}>
          Time your journey around Diwali, Holi, the Pushkar Camel Fair or Dev Deepawali
          — Om will weave the festival into the very fabric of your itinerary.
        </p>
      </div>
    </section>
  );
}
