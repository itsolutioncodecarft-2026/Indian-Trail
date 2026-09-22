'use client';
import Image from 'next/image';

export default function DestinationsHero() {
  return (
    <section
      style={{
        position:   'relative',
        minHeight:  'clamp(400px, 62vh, 680px)',
        display:    'flex',
        alignItems: 'flex-end',
        overflow:   'hidden',
        paddingTop: 'var(--header-height-desktop)',
      }}
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=2000&q=85"
          alt="Mehrangarh Fort, Jodhpur — Indian Routes & Trails destinations"
          fill priority className="object-cover object-center" sizes="100vw"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.38) 55%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
      </div>
      <div className="relative container-luxury pb-16">
        <p className="eyebrow mb-4" style={{ color: 'var(--color-secondary)' }}>Explore India</p>
        <h1 className="display-title leading-none" style={{ color: 'var(--color-text-invert)' }}>
          Cities That<br />
          <em className="font-light" style={{ color: 'var(--color-secondary)' }}>Stay With You</em>
        </h1>
        <p className="mt-5 font-sans font-light max-w-xl"
          style={{ color: 'rgba(255,255,255,0.62)', fontSize: '1.05rem' }}>
          From Mughal monuments and desert dunes to sacred ghats and lake palaces — India distilled to its
          most magnificent destinations.
        </p>
      </div>
    </section>
  );
}
