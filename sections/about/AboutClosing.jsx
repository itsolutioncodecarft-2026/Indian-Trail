'use client';
import Link from 'next/link';

export default function AboutClosing() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-primary)',
        paddingTop:    'clamp(48px, 7vw, 96px)',
        paddingBottom: 'clamp(48px, 7vw, 96px)',
      }}
    >
      <div className="container-narrow text-center">

        <p className="eyebrow mb-4" style={{ color: 'var(--color-secondary)' }}>
          A Personal Welcome
        </p>

        <h2
          className="font-serif font-light leading-tight mb-6"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--color-text-invert)',
          }}
        >
          ¡Bienvenido a la India!
        </h2>

        <div className="divider-gold mx-auto mb-8" style={{ maxWidth: '60px' }} />

        <p
          className="font-sans font-light leading-relaxed mb-10 mx-auto"
          style={{
            fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
            color: 'rgba(255,255,255,0.72)',
            maxWidth: '640px',
          }}
        >
          Whether you are visiting India for the first time or returning to explore it more deeply,
          I would be honoured to accompany you on a journey that is safe, authentic, enriching and
          truly unforgettable. I look forward to welcoming you and sharing the incredible stories,
          traditions and timeless beauty of my country.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tours" className="btn-hero-primary">
            Explore Journeys
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.18em] uppercase px-8 py-3.5"
            style={{
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.85)',
              borderRadius: 'var(--radius-control)',
              background: 'transparent',
              transition: 'background-color 250ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            Enquire Now
          </Link>
        </div>

      </div>
    </section>
  );
}
