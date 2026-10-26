'use client';
/**
 * HomeTestimonials — Guest Stories / Journeys Remembered
 * ─────────────────────────────────────────────────────────────────
 * Placed immediately after HomeDestinations ("Cities That Stay With You").
 *
 * Layout:
 *  - Full-width warm-ivory/sand surface (--color-surface-alt tinted)
 *  - Editorial unboxed columns — NO per-item card background, border, radius or shadow
 *  - Desktop ≥1024px: 3 items visible, each prev/next moves ONE item
 *  - Tablet 768–1023px: 2 items visible, one-item steps
 *  - Mobile <768px: 1 item, finger swipe, no arrows, dots only
 *  - Dots = total - perView + 1 valid positions; single-item model
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { testimonials } from '@/data/testimonials';
import { useSnapCarousel } from '@/hooks/useSnapCarousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   Responsive perView
───────────────────────────────────────────────────────────────── */
function usePerView() {
  const [perView, setPerView] = useState(1); // safe SSR default
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
  return perView;
}

/* ─────────────────────────────────────────────────────────────────
   Stars — only rendered when rating is a real approved number
───────────────────────────────────────────────────────────────── */
function Stars({ rating }) {
  if (!rating || rating < 1 || rating > 5) return null;
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12" height="12" viewBox="0 0 16 16"
          fill={i < rating ? 'var(--color-secondary)' : 'none'}
          stroke={i < rating ? 'var(--color-secondary)' : 'var(--color-border-strong)'}
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M8 1l2.2 4.5 5 .7-3.6 3.5.9 5L8 12.9 3.5 14.7l.9-5L.8 6.2l5-.7z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Single testimonial — unboxed editorial column
   height:100% + flex-column + margin-top:auto on footer keeps
   attribution pinned to bottom of the tallest column.
───────────────────────────────────────────────────────────────── */
function TestimonialItem({ item, showDivider }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      style={{
        display:    'flex',
        height:     '100%',
        /* vertical divider between columns, not at outer edges */
        borderRight: showDivider
          ? '1px solid rgba(27,42,94,0.09)'
          : 'none',
        /* inner padding — 28px desktop, responsive down to 16px mobile */
        paddingLeft:  'clamp(16px, 2vw, 28px)',
        paddingRight: showDivider ? 'clamp(16px, 2vw, 28px)' : 'clamp(16px, 2vw, 28px)',
      }}
    >
      <blockquote
        className="flex flex-col"
        style={{ width: '100%', margin: 0 }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Decorative oversized quote mark — aria-hidden */}
        <span
          aria-hidden="true"
          className="font-serif select-none leading-none"
          style={{
            fontSize:    '3.5rem',
            color:       'var(--color-secondary)',
            opacity:     hov ? 0.75 : 0.3,
            transition:  'opacity 300ms ease',
            marginBottom: '2px',
            lineHeight:  1,
          }}
        >
          &ldquo;
        </span>

        {/* Short marigold accent rule */}
        <div
          style={{
            width:           hov ? '3rem' : '2rem',
            height:          '1.5px',
            backgroundColor: 'var(--color-secondary)',
            opacity:         hov ? 0.7 : 0.4,
            marginBottom:    '20px',
            transition:      'width 300ms ease, opacity 300ms ease',
          }}
        />

        {/* Quote body — grows to fill available height
            Desktop 21-25px, tablet 19-22px, mobile 18-21px */}
        <p
          className="font-serif italic"
          style={{
            fontSize:   'clamp(1.125rem, 1.7vw, 1.5rem)',
            lineHeight: 1.55,
            color:      hov ? 'var(--color-primary)' : 'var(--color-text)',
            transition: 'color 280ms ease',
            flexGrow:   1,
            margin:     0,
          }}
        >
          {item.quote}
        </p>

        {/* Stars — only if real/approved rating */}
        {item.rating && (
          <div style={{ marginTop: '18px' }}>
            <Stars rating={item.rating} />
          </div>
        )}

        {/* Attribution — pinned to bottom via margin-top:auto */}
        <footer style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <cite
            className="not-italic"
            style={{
              display:        'block',
              fontFamily:     'var(--font-body), system-ui, sans-serif',
              fontSize:       '0.7rem',
              fontWeight:     600,
              letterSpacing:  '0.13em',
              textTransform:  'uppercase',
              color:          'var(--color-text)',
            }}
          >
            {item.name}
          </cite>
          <p
            style={{
              margin:       '4px 0 0',
              fontFamily:   'var(--font-body), system-ui, sans-serif',
              fontSize:     '0.7rem',
              letterSpacing:'0.05em',
              color:        'var(--color-text-muted)',
            }}
          >
            {item.location}
            {item.travelDate && (
              <span style={{ opacity: 0.7 }}> · {item.travelDate}</span>
            )}
          </p>
          {/* Journey link or plain text */}
          {item.journey?.slug ? (
            <Link
              href={`/tours/${item.journey.slug}`}
              className="btn-link-secondary inline-flex items-center gap-1 mt-2"
              style={{ fontSize: '0.65rem' }}
            >
              {item.journey.title}
            </Link>
          ) : item.journey?.title ? (
            <p
              style={{
                margin:     '8px 0 0',
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize:   '0.65rem',
                fontStyle:  'italic',
                color:      'var(--color-text-muted)',
              }}
            >
              {item.journey.title}
            </p>
          ) : null}
        </footer>
      </blockquote>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Pagination dots — matching HomeTours CarouselDots style
   Visible dot is inner <span>, button is transparent hit target.
   Active: 22×7px marigold pill. Inactive: 7×7px muted circle.
   Button padding:0, border:none, appearance:none — no global inheritance.
───────────────────────────────────────────────────────────────── */
function PaginationDots({ positions, activeIndex, onDot }) {
  return (
    <div
      role="tablist"
      aria-label="Testimonial position"
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '8px',
        marginTop:      '32px',
      }}
    >
      {Array.from({ length: positions }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? 'true' : undefined}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => onDot(i)}
            style={{
              /* Visible dot dimensions directly on button (matches HomeTours) */
              width:           isActive ? '22px' : '7px',
              height:          '7px',
              borderRadius:    '999px',
              border:          'none',
              padding:         0,
              cursor:          'pointer',
              backgroundColor: isActive
                ? 'var(--color-secondary)'
                : 'var(--color-border-strong)',
              transition: 'width 280ms ease, background-color 280ms ease',
              /* Reset any inherited global button styles */
              appearance:    'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              minWidth:      'unset',
              minHeight:     'unset',
              margin:        0,
              outline:       'none',
            }}
          />
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Overlay arrow button — matches HomeTours ArrowBtn pattern exactly
   Translucent indigo glass, backdrop blur, positioned at track corners.
   Placed outside the overflow-x clip container, inside relative wrapper.
───────────────────────────────────────────────────────────────── */
function TrackArrow({ onClick, disabled, label, side }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        /* Vertically centred on the card track */
        position:       'absolute',
        top:            '50%',
        [side]:         '12px',
        transform:      'translateY(-50%)',
        zIndex:         20,
        /* Desktop ~48px, scales down on tablet */
        width:          'clamp(42px, 3.2vw, 48px)',
        height:         'clamp(42px, 3.2vw, 48px)',
        borderRadius:   '50%',
        border:         `1px solid ${disabled ? 'rgba(20,20,43,0.1)' : 'rgba(20,20,43,0.18)'}`,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         disabled ? 'default' : 'pointer',
        /* Translucent blurred glass look — same Haveli Indigo treatment as Expeditions */
        backgroundColor: disabled
          ? 'rgba(20,20,43,0.12)'
          : hov
            ? 'rgba(27,42,94,0.82)'
            : 'rgba(20,20,43,0.42)',
        backdropFilter:  'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color:          disabled ? 'rgba(20,20,43,0.25)' : '#fff',
        boxShadow:      disabled ? 'none' : '0 2px 12px rgba(20,20,43,0.18)',
        opacity:        disabled ? 0.4 : 1,
        transition:     'background-color 180ms ease, opacity 180ms ease, border-color 180ms ease',
        pointerEvents:  disabled ? 'none' : 'auto',
        /* Reset globals */
        appearance:     'none',
        WebkitAppearance: 'none',
        MozAppearance:  'none',
        padding:        0,
        margin:          0,
        minWidth:        'unset',
        minHeight:       'unset',
        outline:         'none',
      }}
    >
      {side === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main section
───────────────────────────────────────────────────────────────── */
export default function HomeTestimonials() {
  const perView = usePerView();
  const GAP     = 28; // px, matches CSS gap on track

  const {
    trackRef,
    activeIndex,
    positions,
    goTo,
    prev,
    next,
    canPrev,
    canNext,
  } = useSnapCarousel(testimonials.length, perView, GAP);

  const total       = testimonials.length;
  const showArrows  = perView > 1; // tablet + desktop only

  return (
    <section
      aria-label="Traveller testimonials"
      style={{
        /* Warm sand/ivory surface — slightly richer than plain --color-bg */
        background:  'linear-gradient(180deg, var(--color-surface-alt) 0%, #EDE6D9 100%)',
        paddingTop:    'clamp(52px, 7vw, 96px)',
        paddingBottom: 'clamp(52px, 7vw, 96px)',
      }}
    >
      <div className="container-luxury">

        {/* ── Top hairline ───────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            height:          '1px',
            backgroundColor: 'var(--color-border)',
            marginBottom:    'clamp(36px, 4.5vw, 60px)',
          }}
        />

        {/* ── Header row: text only (arrows now overlay track) ── */}
        <div
          style={{
            marginBottom: '40px',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Guest Stories</p>
          <h2 className="section-title">
            Journeys<br />
            <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
              Remembered
            </em>
          </h2>
          <p
            className="body-text"
            style={{ maxWidth: '26rem', marginTop: '14px' }}
          >
            A few words from travellers who experienced India with us.
          </p>
        </div>

        {/* ── Relative wrapper — arrows live here, outside overflow-x ── */}
        <div style={{ position: 'relative' }}>
          {/* Overlay arrows — tablet + desktop only, positioned at track corners */}
          {showArrows && (
            <>
              <TrackArrow onClick={prev} disabled={!canPrev} label="Previous testimonial" side="left" />
              <TrackArrow onClick={next} disabled={!canNext} label="Next testimonial" side="right" />
            </>
          )}

          {/* ── Scroll-snap track ──────────────────────────────── */}
          {/*
              Items are flex children, each exactly:
                width = (trackWidth - GAP*(perView-1)) / perView
              scrollSnapAlign:start keeps left edge of each item
              at track's left edge after snap.
              Horizontal padding creates safe area so arrow overlays
              don't cover first/last testimonial copy.
          */}
          <div
            ref={trackRef}
            className="no-scrollbar"
            style={{
              display:              'flex',
              gap:                  `${GAP}px`,
              overflowX:            'auto',
              scrollSnapType:       'x mandatory',
              scrollPaddingLeft:    '0px',
              WebkitOverflowScrolling: 'touch',
              /* Equal-height columns in one row */
              alignItems:           'stretch',
              /* Safe area padding so arrows don't cover first/last card */
              paddingLeft:          showArrows ? '52px' : '0px',
              paddingRight:         showArrows ? '52px' : '0px',
            }}
          >
            {testimonials.map((item, idx) => {
              const isLastItem  = idx === total - 1;
              const showDivider = perView > 1 && !isLastItem;

              return (
                <div
                  key={item.id}
                  style={{
                    flexShrink:      0,
                    width:           `calc((100% - ${GAP * (perView - 1)}px - ${showArrows ? '104px' : '0px'}) / ${perView})`,
                    scrollSnapAlign: 'start',
                    display:         'flex',
                    flexDirection:   'column',
                  }}
                >
                  <TestimonialItem item={item} showDivider={showDivider} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Pagination dots ────────────────────────────────── */}
        <PaginationDots
          positions={positions}
          activeIndex={activeIndex}
          onDot={goTo}
        />

        {/* ── Bottom hairline ────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            height:        '1px',
            backgroundColor: 'var(--color-border)',
            marginTop:     'clamp(36px, 4.5vw, 60px)',
          }}
        />
      </div>
    </section>
  );
}
