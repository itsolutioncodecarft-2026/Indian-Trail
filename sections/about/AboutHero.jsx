'use client';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section
      style={{
        position:   'relative',
        minHeight:  'clamp(420px, 62vh, 680px)',
        display:    'flex',
        alignItems: 'flex-end',
        overflow:   'hidden',
        paddingTop: 'var(--header-height-desktop)',
      }}
    >
      <div className="absolute inset-0">
        <Image src="/aagra bg image/agra.jpg"
          alt="India heritage — Indian Routes & Trails" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.40) 55%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
      </div>
      <div className="relative container-luxury pb-16">
        <p className="eyebrow mb-4" style={{ color: 'var(--color-secondary)' }}>Our Story</p>
        <h1 className="display-title leading-none" style={{ color: 'var(--color-text-invert)' }}>
          The Man Behind<br />
          <em className="font-light" style={{ color: 'var(--color-secondary)' }}>Every Journey</em>
        </h1>
        <p className="mt-5 font-sans font-light max-w-xl"
          style={{ color: 'rgba(255,255,255,0.62)', fontSize: '1.05rem' }}>
          A guide, a storyteller, a cultural bridge — and the heart of Indian Routes &amp; Trails.
        </p>
      </div>
    </section>
  );
}
