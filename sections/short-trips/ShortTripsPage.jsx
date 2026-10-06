'use client';
import {
  useState, useEffect, useRef, useCallback, Suspense,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { shortTrips } from '@/data/shortTrips';
import { siteConfig } from '@/data/siteContent';
import {
  MapPin, Clock, Sun, ArrowRight, MessageCircle, ChevronRight,
  Bird, Camera, Landmark, ShoppingBag, Leaf,
} from 'lucide-react';

/* ── Filters ────────────────────────────────────────────────────── */
const FILTERS = [
  { id: 'all',       label: 'All' },
  { id: 'delhi',     label: 'From Delhi' },
  { id: 'jaipur',    label: 'From Jaipur' },
  { id: 'day-trip',  label: 'Day Trip' },
  { id: 'overnight', label: 'Overnight' },
  { id: 'heritage',  label: 'Heritage' },
  { id: 'wildlife',  label: 'Wildlife' },
  { id: 'culture',   label: 'Culture' },
];

function matchesFilter(trip, filter, activeVariants) {
  if (filter === 'all') return true;
  const vid = activeVariants[trip.slug] ?? trip.defaultVariant ?? trip.variants[0].id;
  const v   = trip.variants.find((x) => x.id === vid) ?? trip.variants[0];
  if (filter === 'delhi')     return v.origin.toLowerCase().includes('delhi');
  if (filter === 'jaipur')    return v.origin.toLowerCase().includes('jaipur');
  if (filter === 'day-trip')  return v.type === 'day-trip';
  if (filter === 'overnight') return v.type === 'overnight';
  return v.interests.includes(filter);
}

/* ── Interest icon ───────────────────────────────────────────────── */
function InterestIcon({ interest }) {
  const map = {
    wildlife: <Leaf size={11} />, nature: <Leaf size={11} />,
    photography: <Camera size={11} />, heritage: <Landmark size={11} />,
    culture: <ShoppingBag size={11} />, artisan: <ShoppingBag size={11} />,
    shopping: <ShoppingBag size={11} />, spiritual: <Sun size={11} />,
    rural: <Bird size={11} />, architecture: <Landmark size={11} />,
  };
  return map[interest] ?? <ArrowRight size={11} />;
}

/* ── Variant toggle ──────────────────────────────────────────────── */
function VariantToggle({ trip, activeId, onChange }) {
  if (trip.variants.length <= 1) return null;
  return (
    <div role="group" aria-label={`Variant for ${trip.title}`}
      style={{
        display: 'inline-flex',
        borderRadius: 'var(--radius-control)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
      {trip.variants.map((v) => {
        const isActive = v.id === activeId;
        return (
          <button key={v.id} type="button" aria-pressed={isActive}
            onClick={() => onChange(v.id)}
            style={{
              fontFamily: 'var(--font-body, system-ui)',
              fontSize: '9px', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '5px 10px', border: 'none',
              minHeight: '30px', cursor: 'pointer',
              backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface-alt)',
              color: isActive ? '#fff' : 'var(--color-text-muted)',
              transition: 'background-color 160ms, color 160ms',
              outline: 'none',
            }}>
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Trip card ──────────────────────────────────────────────────────
   BADGE STYLES restored to original compact translucent design:
   - type: small pill, rgba(27,42,94,0.78) dark indigo, white text
   - origin: plain text "Jaipur"/"Delhi" (no "From" prefix in badge)
   - duration: bottom-right, rgba(20,20,43,0.72), white
   - Padding: 3px vertical / 8px horizontal, 9px font, 999px radius
   This matches the pre-restyle design visible in original screenshots.
────────────────────────────────────────────────────────────────── */
function TripCard({ trip, activeVariantId, onVariantChange }) {
  const [hovered, setHovered] = useState(false);
  const v = trip.variants.find((x) => x.id === activeVariantId) ?? trip.variants[0];

  const enquireHref = `/contact?shortTrip=${encodeURIComponent(trip.slug)}&variant=${encodeURIComponent(activeVariantId)}`;
  const detailHref  = trip.variants.length > 1
    ? `/short-trips/${trip.slug}?variant=${activeVariantId}`
    : `/short-trips/${trip.slug}`;

  const typeBadge   = v.type === 'overnight' ? 'Overnight' : 'Day Trip';
  const originLabel = v.origin; // "Delhi" or "Jaipur" — no prefix per original design

  return (
    <article
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', height: '100%',
        boxShadow: hovered ? 'var(--shadow-overlay)' : '0 2px 8px rgba(20,20,43,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 250ms ease, transform 250ms ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image 4:3 */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', flexShrink: 0 }}>
        <Image src={trip.image}
          alt={`${trip.title} — Indian Routes & Trails`}
          fill className="object-cover"
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 600ms ease' }}
          sizes="(max-width:767px) 100vw, (max-width:1023px) 50vw, 33vw" />
        {/* Scrim */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,34,77,0.5) 0%, transparent 50%)', pointerEvents: 'none' }} />

        {/* TOP-LEFT: type + origin — ORIGINAL compact translucent style */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          display: 'flex', gap: '6px', flexWrap: 'wrap',
          maxWidth: 'calc(100% - 24px)',
        }}>
          <span style={{
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '3px 8px', borderRadius: '999px',
            backgroundColor: 'rgba(27,42,94,0.78)',
            color: 'rgba(255,255,255,0.9)',
          }}>
            {typeBadge}
          </span>
          <span style={{
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '3px 8px', borderRadius: '999px',
            backgroundColor: 'rgba(27,42,94,0.78)',
            color: 'rgba(255,255,255,0.9)',
          }}>
            {originLabel}
          </span>
        </div>

        {/* BOTTOM-RIGHT: duration */}
        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <span style={{
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '3px 8px', borderRadius: '999px',
            backgroundColor: 'rgba(20,20,43,0.72)', color: '#fff',
          }}>
            {v.duration}
          </span>
        </div>
      </div>

      {/* Card body — flex column so action row anchors to bottom */}
      <div style={{
        padding: '18px 18px 14px',
        display: 'flex', flexDirection: 'column', flex: 1, gap: '10px',
      }}>
        {/* Variant toggle — reserves same space even for non-variant cards */}
        <div style={{ minHeight: trip.variants.length > 1 ? 'auto' : '0' }}>
          {trip.variants.length > 1 && (
            <VariantToggle trip={trip} activeId={activeVariantId} onChange={onVariantChange} />
          )}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: '1.15rem', fontWeight: 400, lineHeight: 1.2,
          color: 'var(--color-text)', margin: 0,
        }}>
          {trip.title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: '0.82rem', lineHeight: 1.65,
          color: 'var(--color-text-muted)', margin: 0,
        }}>
          {trip.summary}
        </p>

        {/* Practical info */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: 'var(--font-body, system-ui)', fontSize: '10px', color: 'var(--color-text-muted)' }}>
            <Clock size={11} aria-hidden="true" /> {v.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: 'var(--font-body, system-ui)', fontSize: '10px', color: 'var(--color-text-muted)' }}>
            <MapPin size={11} aria-hidden="true" /> {v.origin}
          </span>
          {v.interests.slice(0, 3).map((interest) => (
            <span key={interest} style={{
              display: 'flex', alignItems: 'center', gap: '3px',
              fontFamily: 'var(--font-body, system-ui)', fontSize: '9px',
              textTransform: 'capitalize', color: 'var(--color-text-muted)',
            }}>
              <span aria-hidden="true"><InterestIcon interest={interest} /></span>{interest}
            </span>
          ))}
        </div>

        {/* Highlights — 3 max (listing only) */}
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {v.highlights.slice(0, 3).map((h, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                backgroundColor: 'var(--color-secondary)',
                flexShrink: 0, marginTop: '5px',
              }} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '11px', lineHeight: 1.5, color: 'var(--color-text-muted)' }}>
                {h}
              </span>
            </li>
          ))}
        </ul>

        {/* Actions — push to bottom */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginTop: 'auto', paddingTop: '12px',
          borderTop: '1px solid var(--color-border)',
          flexWrap: 'wrap',
        }}>
          <Link href={detailHref} style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--color-text-muted)', textDecoration: 'none',
            minHeight: '44px',
          }}>
            View Details <ArrowRight size={12} aria-hidden="true" />
          </Link>

          {/* Enquire → /contact — indigo button, NO WhatsApp icon */}
          <Link href={enquireHref}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-body, system-ui)',
              fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '8px 16px',
              backgroundColor: 'var(--color-primary)', color: '#fff',
              borderRadius: 'var(--radius-control)',
              textDecoration: 'none',
              marginLeft: 'auto',
              minHeight: '44px',
              transition: 'background-color 180ms ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ── Experience items ────────────────────────────────────────────── */
// Images mapped to verified local files in /public/ordinary/ (confirmed to exist).
// Heritage Walk Mumbai uses /destination/delhi.jpg as fallback (no /ordinary/mumbai file).
const EXPERIENCES = [
  { title: 'Heritage Walk in Mumbai — Kala Ghoda', summary: 'A guided colonial heritage walk through Mumbai\'s most atmospheric district — Victorian Gothic, Indo-Saracenic and Art Deco architecture around the original Kala Ghoda cultural quarter.', image: '/ordinary/kala_ghoda.jpg' },
  { title: 'Hands-on Cooking Experience', summary: 'Learn to cook an authentic Indian meal with a local host — spices, techniques and recipes you can recreate at home.', image: '/ordinary/cooking.jpg' },
  { title: 'Hand Block Printing Experience', summary: 'Work directly with traditional Rajasthani block-printing artisans — choose your block, mix your colour and create your own printed fabric to take home.', image: '/ordinary/block_printing.jpg' },
  { title: 'Blue Pottery Classes', summary: 'Jaipur\'s distinctive turquoise and white ceramic tradition: a studio session with a Blue Pottery master craftsperson.', image: '/ordinary/blue_pottery.jpg' },
  { title: 'Rural Heritage Train Journey in Deogarh', summary: 'A slow metre-gauge train ride through the Aravalli Hills — one of Rajasthan\'s most evocative and least-visited experiences.', image: '/ordinary/train_journey.jpg' },
  { title: 'Kerala Backwater Boat Experience', summary: 'A houseboat cruise through the coconut-fringed canals of Kumarakom and Alleppey — a gentle, unhurried introduction to Kerala\'s backwater world.', image: '/ordinary/kerala_boat.jpg' },
  { title: 'Yoga Retreats and Classes — Rishikesh and Haridwar', summary: 'Practise yoga at the source — Rishikesh\'s riverbank ashrams and the ghats of Haridwar offer an immersive introduction to the living tradition.', image: '/ordinary/yoga_class.jpg' },
  { title: 'Tuk-Tuk and Rickshaw Ride in New Delhi', summary: 'Navigate the lanes of Old Delhi by cycle-rickshaw and auto-rickshaw — the most direct way to experience the rhythm of the city at street level.', image: '/ordinary/rikshaw_ride.jpg' },
  { title: 'Boat Ride on Lake Pichola, Udaipur', summary: 'A sunset cruise on Udaipur\'s most iconic lake, passing the Lake Palace and Jag Mandir island palaces as the Aravalli Hills glow in the fading light.', image: '/ordinary/boat_ride_udaipur.jpg' },
  { title: 'Jaipur Sunset & Nightlife Experience', summary: 'Nahargarh Fort at dusk, the illuminated Pink City from the ramparts, rooftop restaurants in the old city and the vibrant night market of Johari Bazaar.', image: '/ordinary/jaipur_sunset.jpg' },
];

/* ── Robust mobile slider hook ──────────────────────────────────────
   Uses actual card offsets via getBoundingClientRect so gaps/padding
   don't break index calculation.
────────────────────────────────────────────────────────────────── */
function useMobileSlider(count) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const rafRef   = useRef(null);

  const updateIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;
    const trackRect   = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let closest = 0, minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const r    = child.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - trackCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  }, [count]);

  // Debounce via RAF
  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateIndex);
  }, [updateIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  // ResizeObserver — recompute on layout change
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => updateIndex());
    ro.observe(track);
    return () => ro.disconnect();
  }, [updateIndex]);

  // Reset when count changes (filter change)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = 0;
    setActiveIndex(0);
  }, [count]);

  const goTo = useCallback((idx) => {
    const track = trackRef.current;
    if (!track || count === 0) return;
    const child = track.children[idx];
    if (!child) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    child.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
    setActiveIndex(idx);
  }, [count]);

  return { trackRef, activeIndex, goTo };
}

/* ── Slider dots ────────────────────────────────────────────────────
   One dot per item. Active dot slightly wider (22px) in marigold.
   Each button has 44px hit area via transparent padding.
────────────────────────────────────────────────────────────────── */
function SliderDots({ count, activeIndex, onDotClick, labelPrefix }) {
  if (count <= 1) return null;
  return (
    <div role="tablist" aria-label={`${labelPrefix} slides`}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '14px' }}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            role="tab"
            type="button"
            aria-current={isActive ? 'true' : undefined}
            aria-label={`Go to ${labelPrefix} ${i + 1}`}
            onClick={() => onDotClick(i)}
            style={{
              /* Visual dot */
              width:           isActive ? '22px' : '7px',
              height:          '7px',
              borderRadius:    '999px',
              backgroundColor: isActive ? 'var(--color-secondary)' : 'var(--color-border-strong)',
              border:          'none',
              cursor:          'pointer',
              outline:         'none',
              padding:         0,
              /* 44px hit area via box-shadow + overflow visible */
              position:        'relative',
              transition:      'width 260ms ease, background-color 220ms ease',
            }}
            /* Invisible hit-area extension */
            onFocus={(e) => { e.currentTarget.style.outline = '2px solid var(--color-secondary)'; e.currentTarget.style.outlineOffset = '3px'; }}
            onBlur={(e)  => { e.currentTarget.style.outline = 'none'; }}
          >
            {/* Transparent padding for 44px touch target */}
            <span style={{
              position: 'absolute',
              inset: '-18px -10px',
              display: 'block',
            }} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

/* ── Mobile Short Trip slider ────────────────────────────────────── */
function MobileTripSlider({ filtered, activeVariants, onVariantChange }) {
  const { trackRef, activeIndex, goTo } = useMobileSlider(filtered.length);

  return (
    <div>
      <div
        ref={trackRef}
        style={{
          display:                 'flex',
          overflowX:               'auto',
          scrollSnapType:          'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth:          'none',
          msOverflowStyle:         'none',
          /* Symmetric scroll padding so first/last card centres */
          paddingLeft:             '16px',
          paddingRight:            '16px',
          scrollPaddingLeft:       '16px',
          scrollPaddingRight:      '16px',
          gap:                     '16px',
          touchAction:             'pan-y pinch-zoom',
        }}
        className="hide-scrollbar"
      >
        {filtered.map((trip) => (
          <div key={trip.slug} style={{
            flex:           '0 0 calc(100% - 32px)',
            scrollSnapAlign: 'center',
            minWidth:        0,
          }}>
            <TripCard
              trip={trip}
              activeVariantId={activeVariants[trip.slug] ?? trip.variants[0].id}
              onVariantChange={(vid) => onVariantChange(trip.slug, vid)}
            />
          </div>
        ))}
      </div>
      <SliderDots
        count={filtered.length}
        activeIndex={activeIndex}
        onDotClick={goTo}
        labelPrefix="Short Trip"
      />
    </div>
  );
}

/* ── Mobile Experience slider ────────────────────────────────────── */
function MobileExperienceSlider() {
  const { trackRef, activeIndex, goTo } = useMobileSlider(EXPERIENCES.length);

  return (
    <div>
      <div
        ref={trackRef}
        style={{
          display:                 'flex',
          overflowX:               'auto',
          scrollSnapType:          'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth:          'none',
          msOverflowStyle:         'none',
          paddingLeft:             '16px',
          paddingRight:            '16px',
          scrollPaddingLeft:       '16px',
          scrollPaddingRight:      '16px',
          gap:                     '16px',
          touchAction:             'pan-y pinch-zoom',
        }}
        className="hide-scrollbar"
      >
        {EXPERIENCES.map((exp, i) => (
          <div key={i} style={{ flex: '0 0 calc(100% - 32px)', scrollSnapAlign: 'center', minWidth: 0 }}>
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border:          '1px solid var(--color-border)',
              borderRadius:    'var(--radius-card)',
              overflow:        'hidden',
              height:          '100%',
              display:         'flex',
              flexDirection:   'column',
            }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
                <Image src={exp.image} alt={exp.title} fill className="object-cover"
                  sizes="100vw" style={{ opacity: 0.85 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
              </div>
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '6px' }}>
                <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 400, lineHeight: 1.3, color: 'var(--color-text)', margin: 0 }}>
                  {exp.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--color-text-muted)', margin: 0, flex: 1 }}>
                  {exp.summary}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                  <Link href={`/contact?interest=experience&experience=${encodeURIComponent(exp.title)}`}
                    style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Enquire <ArrowRight size={10} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SliderDots
        count={EXPERIENCES.length}
        activeIndex={activeIndex}
        onDotClick={goTo}
        labelPrefix="Experience"
      />
    </div>
  );
}

/* ── Desktop experience card ─────────────────────────────────────── */
function ExperienceCard({ exp }) {
  return (
    <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
        <Image src={exp.image} alt={exp.title} fill className="object-cover"
          sizes="(max-width:767px) 100vw, 33vw" style={{ opacity: 0.85 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '6px' }}>
        <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: '1rem', fontWeight: 400, lineHeight: 1.3, color: 'var(--color-text)', margin: 0 }}>
          {exp.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--color-text-muted)', margin: 0, flex: 1 }}>
          {exp.summary}
        </p>
        <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
          <Link href={`/contact?interest=experience&experience=${encodeURIComponent(exp.title)}`}
            style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Enquire <ArrowRight size={10} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Inner (needs useSearchParams) ──────────────────────────────── */
function ShortTripsInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] = useState(searchParams.get('filter') ?? 'all');
  const [activeVariants, setActiveVariants] = useState(() => {
    const init = {};
    shortTrips.forEach((t) => { init[t.slug] = t.defaultVariant ?? t.variants[0].id; });
    return init;
  });

  useEffect(() => {
    const q = activeFilter === 'all' ? '' : `?filter=${activeFilter}`;
    router.replace(`/short-trips${q}`, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  useEffect(() => {
    const f = searchParams.get('filter');
    if (f && f !== activeFilter) setActiveFilter(f);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = shortTrips.filter((t) => matchesFilter(t, activeFilter, activeVariants));

  const handleVariantChange = (slug, variantId) => {
    setActiveVariants((prev) => ({ ...prev, [slug]: variantId }));
  };

  return (
    <>
      {/* HERO */}
      <section className="relative flex items-end overflow-hidden"
        style={{ minHeight: 'clamp(480px, 65vh, 700px)', paddingTop: 'var(--header-height-desktop)' }}>
        <div className="absolute inset-0">
          <Image src="/destination/agra.jpg" alt="Taj Mahal — Short Trips & Day Excursions"
            fill priority className="object-cover" style={{ objectPosition: 'center 60%' }} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-primary-dark) 0%, rgba(27,42,94,0.55) 45%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(27,42,94,0.65) 0%, transparent 60%)' }} />
        </div>
        <div className="relative w-full container-luxury" style={{ paddingBottom: 'clamp(32px, 5vw, 56px)' }}>
          <p className="eyebrow mb-3" style={{ color: 'var(--color-secondary)' }}>Short Trips &amp; Day Excursions</p>
          <h1 className="font-serif font-light leading-none mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', color: 'var(--color-text-invert)', maxWidth: '44rem' }}>
            Short Trips &amp; Day Excursions
          </h1>
          <p className="font-sans font-light mb-7 max-w-xl"
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.7 }}>
            Remarkable places, thoughtfully arranged for a single day or an unhurried night away.
          </p>
          <Link href="/contact?interest=short-trip" className="btn-hero-primary">Plan My Trip</Link>
        </div>
      </section>

      {/* STICKY FILTER BAR */}
      <div style={{
        position: 'sticky', top: '64px', zIndex: 40,
        backgroundColor: 'rgba(251,247,239,0.96)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="container-luxury">
          <div role="group" aria-label="Filter short trips"
            style={{ display: 'flex', gap: '8px', padding: '12px 0', overflowX: 'auto', flexWrap: 'wrap' }}
            className="hide-scrollbar">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button key={f.id} type="button" aria-pressed={isActive}
                  onClick={() => setActiveFilter(f.id)}
                  style={{
                    fontFamily: 'var(--font-body, system-ui)',
                    fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '7px 14px',
                    border: `1.5px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-control)',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--color-text-muted)',
                    cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                    transition: 'all 160ms ease', outline: 'none',
                  }}
                  onFocus={(e)  => { e.currentTarget.style.boxShadow = '0 0 0 2px rgba(232,163,23,0.6)'; }}
                  onBlur={(e)   => { e.currentTarget.style.boxShadow = 'none'; }}>
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SHORT TRIPS SECTION */}
      <section style={{
        backgroundColor: 'var(--color-bg)',
        paddingTop:      'clamp(40px, 5vw, 72px)',
        paddingBottom:   'clamp(48px, 6vw, 88px)',
      }}>
        <div className="container-luxury">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p className="font-serif text-xl italic mb-4" style={{ color: 'var(--color-text-muted)' }}>
                No short trips match this filter.
              </p>
              <button onClick={() => setActiveFilter('all')}
                style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-primary)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                Show all
              </button>
            </div>
          ) : (
            <>
              {/* Desktop / tablet grid — hidden on mobile */}
              <div className="hidden md:grid"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
                {filtered.map((trip) => (
                  <TripCard key={trip.slug} trip={trip}
                    activeVariantId={activeVariants[trip.slug] ?? trip.variants[0].id}
                    onVariantChange={(vid) => handleVariantChange(trip.slug, vid)} />
                ))}
              </div>

              {/* Mobile slider — hidden on tablet+ */}
              <div className="md:hidden">
                <MobileTripSlider
                  filtered={filtered}
                  activeVariants={activeVariants}
                  onVariantChange={handleVariantChange}
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* EXPERIENCE THE ORDINARY */}
      <section style={{
        backgroundColor: 'var(--color-surface-tint)',
        borderTop:       '1px solid var(--color-border)',
        paddingTop:      'clamp(56px, 7vw, 96px)',
        paddingBottom:   'clamp(56px, 7vw, 96px)',
      }}>
        <div className="container-luxury">
          <div style={{ marginBottom: '40px' }}>
            <p className="eyebrow mb-3" style={{ color: 'var(--color-secondary-hover)' }}>Curated by Om</p>
            <h2 className="font-serif font-light" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--color-text)', margin: '0 0 10px' }}>
              Experience the Ordinary
            </h2>
            <p className="font-sans font-light max-w-2xl" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
              The small encounters that linger longest — a cookfire, a printing block, a paddled canal, a sunrise ghat.
            </p>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '20px' }}>
            {EXPERIENCES.map((exp, i) => <ExperienceCard key={i} exp={exp} />)}
          </div>

          {/* Mobile slider */}
          <div className="md:hidden">
            <MobileExperienceSlider />
          </div>
        </div>
      </section>

      {/* COMBINE WITH A JOURNEY */}
      <section className="section-padding-sm" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
        <div className="container-luxury">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ maxWidth: '36rem' }}>
              <p className="eyebrow mb-2" style={{ color: 'var(--color-secondary)' }}>Extend Your Stay</p>
              <h2 className="font-serif font-light mb-3"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--color-text-invert)', lineHeight: 1.2 }}>
                Add a short trip to any of our journeys.
              </h2>
              <p className="font-sans font-light" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                Every multi-day journey can be enriched with a day excursion before or after. Om will design the connection seamlessly.
              </p>
            </div>
            <Link href="/tours"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
                padding: '14px 28px', border: '1.5px solid rgba(255,255,255,0.35)',
                borderRadius: 'var(--radius-control)', color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'background-color 200ms ease, border-color 200ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}>
              View All Journeys <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding-sm" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-narrow text-center">
          <p className="eyebrow mb-4">Ready to Begin?</p>
          <h2 className="font-serif font-light mb-4"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', color: 'var(--color-text)' }}>
            Plan a Short Trip Around Your Journey
          </h2>
          <p className="font-sans font-light mb-8 max-w-lg mx-auto"
            style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Tell Om what interests you and he will arrange it as an extension of your visit or as a standalone day away.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <Link href="/contact?interest=short-trip" className="btn-primary">Enquire Now</Link>
            <a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent('Hi Om, I\'m interested in a short trip or day excursion. Could you share what\'s possible?')}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
                padding: '13px 22px', borderRadius: 'var(--radius-control)',
                backgroundColor: 'var(--color-whatsapp)', color: '#fff', textDecoration: 'none',
              }}>
              <MessageCircle size={14} aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ShortTripsPage() {
  return (
    <Suspense fallback={<div className="section-padding" style={{ backgroundColor: 'var(--color-bg)', minHeight: '60vh' }} />}>
      <ShortTripsInner />
    </Suspense>
  );
}
