'use client';
import Image from 'next/image';
import { responsibleTourism } from '@/data/siteContent';

export default function HomeResponsible() {
  return (
    /*
      Unified white section — outer background, image column and text column
      are all part of one white surface. No tinted panels, no visible seam.
    */
    <section
      style={{
        backgroundColor: 'var(--color-surface)',
        paddingTop:      'clamp(48px, 6vw, 96px)',
        paddingBottom:   'clamp(48px, 6vw, 96px)',
      }}
    >
      <div className="container-luxury">
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: '40px', alignItems: 'center' }}
        >

          {/* ── Image column ── */}
          <div
            className="order-2 lg:order-1"
            style={{
              position:     'relative',
              /* Desktop: controlled proportional height via aspect-ratio + max-height */
              aspectRatio:  '4/3',
              maxHeight:    'clamp(280px, 38vw, 480px)',
              /* Mobile: compact */
              borderRadius: 'var(--radius-card)',
              overflow:     'hidden',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=85"
              alt="Responsible wildlife tourism — Indian Routes & Trails"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              style={{ objectPosition: 'center 40%' }}
            />
            {/* Soft indigo tint — same as other image cards */}
            <div
              style={{
                position:        'absolute',
                inset:           0,
                backgroundColor: 'rgba(27,42,94,0.10)',
                pointerEvents:   'none',
              }}
            />
            {/*
              Right-edge white fade on desktop — blends image into the white
              text column without hiding the subject (fade starts at 70%).
              On mobile (stacked layout) this is invisible / irrelevant.
            */}
            <div
              className="hidden lg:block"
              style={{
                position:      'absolute',
                inset:         0,
                background:    'linear-gradient(to right, transparent 60%, rgba(255,255,255,0.55) 80%, rgba(255,255,255,0.95) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* ── Text column ── */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">

            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex items-center justify-center"
                style={{
                  width:           '22px',
                  height:          '22px',
                  borderRadius:    '50%',
                  backgroundColor: 'rgba(27,42,94,0.08)',
                  flexShrink:      0,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="var(--color-primary)" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <p className="eyebrow" style={{ color: 'var(--color-primary)' }}>
                Responsible Tourism
              </p>
            </div>

            <h2 className="section-title mb-4">
              Travel with<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                Conscience
              </em>
            </h2>

            <div className="divider-gold mb-6" />

            <blockquote
              className="pl-4 mb-5"
              style={{ borderLeft: '3px solid var(--color-secondary)', margin: 0 }}
            >
              <p className="font-serif text-base italic leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}>
                &ldquo;{responsibleTourism.statement}&rdquo;
              </p>
            </blockquote>

            <p className="body-text">{responsibleTourism.note}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
