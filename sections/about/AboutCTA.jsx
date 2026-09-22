'use client';
import Link from 'next/link';

/*
  Button hover rules:
  - "Explore Journeys" (btn-primary / marigold): existing scale + colour hover kept
  - "Enquire Now" (btn-outline): scale-only on hover — no background colour change.
    We override btn-outline's fill-on-hover by using an inline-style wrapper approach:
    render a custom button that only scales, no fill.
*/

export default function AboutCTA() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-narrow text-center">
        <p className="eyebrow mb-5">Begin Your Journey</p>
        <h2 className="section-title mb-6">
          Ready to Experience<br />
          <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>India With Om?</em>
        </h2>
        <p className="body-large mb-10 max-w-xl mx-auto">
          Browse seven curated journeys or reach out directly to begin designing your personalised expedition.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Explore Journeys — btn-primary with existing scale hover */}
          <Link href="/tours" className="btn-primary">
            Explore Journeys
          </Link>

          {/* Enquire Now — scale-only hover, no background fill */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.18em] uppercase px-8 py-3.5"
            style={{
              border:       '1.5px solid var(--color-primary)',
              color:        'var(--color-primary)',
              borderRadius: 'var(--radius-control)',
              background:   'transparent',
              transition:   'transform 250ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';   }}
          >
            Enquire Now
          </Link>

        </div>
      </div>
    </section>
  );
}
