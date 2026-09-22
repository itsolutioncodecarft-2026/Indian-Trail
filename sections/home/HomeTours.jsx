'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tours } from '@/data/tours';
import { useCarousel } from '@/hooks/useCarousel';
import { Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/* ── responsive perView ──────────────────────────────────────────── */
function usePerView() {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const upd = () => setPerView(window.innerWidth < 768 ? 1 : 3);
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
  return perView;
}

/* ── shared dots — exported for HomeWhyUs reuse ──────────────────── */
export function CarouselDots({ total, active, onDotClick, className = '' }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="tablist"
      aria-label="Slide position"
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={active === i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onDotClick(i)}
          style={{
            width:           active === i ? '22px' : '7px',
            height:          '7px',
            borderRadius:    '999px',
            border:          'none',
            padding:         0,
            cursor:          'pointer',
            backgroundColor: active === i
              ? 'var(--color-secondary)'
              : 'var(--color-border-strong)',
            transition: 'width 280ms ease, background-color 280ms ease',
          }}
        />
      ))}
    </div>
  );
}

/* ── tour card ───────────────────────────────────────────────────── */
function TourCard({ tour }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={`/tours/${tour.slug}`}
      aria-label={tour.title}
      style={{
        display:         'block',
        position:        'relative',
        borderRadius:    'var(--radius-card)',
        minHeight:       '380px',
        backgroundColor: 'var(--color-primary-dark)',
        /* restrained scale — no box-shadow glow on this button per requirement */
        transform:       hov ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow:       hov
          ? '0 6px 24px rgba(20,20,43,0.2)'
          : '0 2px 8px rgba(20,20,43,0.07)',
        transition:      'transform 300ms ease, box-shadow 300ms ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* image — inside own overflow:hidden so zoom doesn't clip card corners */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
        <Image
          src={tour.featuredImage}
          alt={`${tour.title} — Indian Routes & Trails`}
          fill
          className="object-cover"
          style={{
            transform:  hov ? 'scale(1.04)' : 'scale(1)',
            opacity:    hov ? 0.80 : 0.88,
            transition: 'transform 600ms cubic-bezier(0.4,0,0.2,1), opacity 300ms ease',
          }}
          sizes="(max-width:767px) 100vw, 33vw"
        />
      </div>

      {/* gradient overlay */}
      <div
        style={{
          position:      'absolute',
          inset:         0,
          borderRadius:  'var(--radius-card)',
          background:    'linear-gradient(to top, rgba(20,34,77,0.94) 0%, rgba(20,34,77,0.28) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* text content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
            padding: '3px 8px', backgroundColor: 'rgba(27,42,94,0.88)', color: '#fff',
            borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px',
          }}>
            <Clock size={9} /> {tour.duration} Days
          </span>
          <span style={{
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-secondary)',
          }}>
            {tour.season}
          </span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: '1.1rem', fontWeight: 300,
          color: 'var(--color-text-invert)', lineHeight: 1.2, margin: '0 0 8px',
        }}>
          {tour.title}
        </h3>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '10px' }}>
          <MapPin size={10} style={{ color: 'rgba(232,163,23,0.7)', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '10px', color: 'rgba(255,255,255,0.52)', margin: 0 }}>
            {tour.route.slice(0, 4).join(' · ')}{tour.route.length > 4 ? ' ···' : ''}
          </p>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          opacity: hov ? 1 : 0,
          transform: hov ? 'translateY(0)' : 'translateY(5px)',
          transition: 'opacity 250ms ease, transform 250ms ease',
        }}>
          <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-secondary)' }}>
            Explore
          </span>
          <ArrowRight size={11} style={{ color: 'var(--color-secondary)' }} />
        </div>
      </div>
    </Link>
  );
}

/* ── overlay arrow button — sits on track corners ────────────────── */
function ArrowBtn({ onClick, disabled, label, side }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        /* vertically centred on the card track */
        position:       'absolute',
        top:            '50%',
        [side]:         '12px',
        transform:      'translateY(-50%)',
        zIndex:         20,
        width:          '40px',
        height:         '40px',
        borderRadius:   '50%',
        border:         `1px solid ${disabled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.25)'}`,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         disabled ? 'default' : 'pointer',
        /* translucent blurred glass look */
        backgroundColor: disabled
          ? 'rgba(20,20,43,0.25)'
          : hov
            ? 'rgba(27,42,94,0.82)'
            : 'rgba(20,20,43,0.52)',
        backdropFilter:  'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color:          disabled ? 'rgba(255,255,255,0.25)' : '#fff',
        boxShadow:      disabled ? 'none' : '0 2px 12px rgba(0,0,0,0.25)',
        opacity:        disabled ? 0.4 : 1,
        transition:     'background-color 180ms ease, opacity 180ms ease, border-color 180ms ease',
        pointerEvents:  disabled ? 'none' : 'auto',
      }}
    >
      {side === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );
}

/* ── main ────────────────────────────────────────────────────────── */
export default function HomeTours() {
  const featured = tours.filter((t) => t.isFeatured);
  const perView  = usePerView();
  const isMobile = perView === 1;
  const GAP      = 16; // px gap between cards

  const { index, maxIndex, prev, next, goTo, canPrev, canNext, touchHandlers } =
    useCarousel(featured.length, perView);

  const dotCount = maxIndex + 1;

  /*
   * translateX formula (correct):
   * card width = (trackWidth - GAP*(perView-1)) / perView
   * one step   = cardWidth + GAP = trackWidth/perView + GAP/perView
   * in CSS:    = (100%/perView) + (GAP/perView px)
   *
   * translateX = -index * (100%/perView + GAP/perView px)
   */
  const pct    = 100 / perView;
  const gapPx  = GAP / perView;
  const translateX = `calc(${index} * (-${pct.toFixed(6)}% - ${gapPx.toFixed(6)}px))`;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-tint)' }}>
      <div className="container-luxury">

        {/* heading row — aligns with the full track width */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <p className="eyebrow mb-3">Signature Journeys</p>
            <h2 className="section-title">
              Seven Extraordinary<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                Expeditions
              </em>
            </h2>
          </div>
          {/* "View All Journeys" — marigold gold on hover */}
          <Link
            href="/tours"
            className="btn-link-secondary group flex items-center gap-2 shrink-0"
          >
            View All Journeys
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/*
          Track wrapper:
          - NO side padding — track is genuinely full container width.
          - Arrows are absolutely positioned overlays on the track's top corners.
          - position:relative so absolute children are scoped here.
        */}
        <div style={{ position: 'relative' }}>
          {/* Overlay arrows — on top of the track, inside its corners */}
          {!isMobile && (
            <>
              <ArrowBtn onClick={prev} disabled={!canPrev} label="Previous journeys" side="left" />
              <ArrowBtn onClick={next} disabled={!canNext} label="Next journeys"     side="right" />
            </>
          )}

          {/* Clip container */}
          <div
            style={{ overflow: 'hidden', borderRadius: 'var(--radius-card)' }}
            {...touchHandlers}
          >
            <div
              style={{
                display:    'flex',
                gap:        `${GAP}px`,
                transform:  `translateX(${translateX})`,
                transition: 'transform 420ms cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
              }}
            >
              {featured.map((tour) => (
                <div
                  key={tour.id}
                  style={{
                    flexShrink: 0,
                    width: `calc((100% - ${GAP * (perView - 1)}px) / ${perView})`,
                  }}
                >
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* dots */}
        <CarouselDots
          total={dotCount}
          active={index}
          onDotClick={goTo}
          className="mt-6"
        />

        {/* footer CTA */}
        <div className="mt-10 text-center">
          <p className="font-serif text-lg italic mb-5" style={{ color: 'var(--color-text-muted)' }}>
            &ldquo;Each journey is personally designed — a hand-woven masterpiece by Om.&rdquo;
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            Design My Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
