'use client';
import Image from 'next/image';

export default function ExperiencesHero() {
  return (
    <section
      style={{
        position:   'relative',
        minHeight:  'clamp(380px, 58vh, 640px)',
        display:    'flex',
        alignItems: 'flex-end',
        overflow:   'hidden',
        paddingTop: 'var(--header-height-desktop)',
      }}
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=2000&q=85"
          alt="Ganga Aarti ceremony, Varanasi — unique experiences with Indian Routes & Trails"
          fill priority className="object-cover object-center" sizes="100vw"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.40) 55%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
      </div>
      <div className="relative container-luxury pb-16">
        <p className="eyebrow mb-4" style={{ color: 'var(--color-secondary)' }}>Experiences</p>
        <h1 className="display-title leading-none" style={{ color: 'var(--color-text-invert)' }}>
          Beyond the<br />
          <em className="font-light" style={{ color: 'var(--color-secondary)' }}>Ordinary</em>
        </h1>
        <p className="mt-5 font-sans font-light max-w-xl"
          style={{ color: 'rgba(255,255,255,0.62)', fontSize: '1.05rem' }}>
          Cultural ceremonies, wildlife safaris, village immersions — the moments that define a journey with Om.
        </p>
      </div>
    </section>
  );
}
