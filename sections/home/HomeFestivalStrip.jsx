'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getUpcomingFestivals, daysUntil } from '@/data/festivals';
import { useLang } from '@/lib/LanguageContext';
import { useCarousel } from '@/hooks/useCarousel';
import { ArrowRight } from 'lucide-react';

function formatDateShort(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr + 'T12:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

/* ── dots ───────────────────────────────────────────────────────── */
function Dots({ total, active, onDotClick }) {
  return (
    <div
      className="flex items-center justify-center gap-2 mt-5"
      role="tablist"
      aria-label="Festival card position"
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={active === i}
          aria-label={`Go to festival ${i + 1}`}
          onClick={() => onDotClick(i)}
          style={{
            width: active === i ? '22px' : '7px',
            height: '7px',
            borderRadius: '999px',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            transition: 'width 300ms ease, background-color 300ms ease',
            backgroundColor: active === i
              ? 'var(--color-secondary)'
              : 'var(--color-border-strong)',
          }}
        />
      ))}
    </div>
  );
}

/* ── single festival card ───────────────────────────────────────── */
function FestivalCard({ festival, nextDate, isNearest, countdown, lang }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/festivals/${festival.slug}`}
      className="relative block overflow-hidden"
      style={{
        borderRadius: 'var(--radius-card)',
        minHeight: '260px',
        display: 'block',
        /* nearest card: marigold ring */
        outline: isNearest ? '2px solid var(--color-secondary)' : 'none',
        outlineOffset: '-2px',
        /* hover: lift + gold glow */
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-gold)' : '0 2px 8px rgba(20,20,43,0.08)',
        transition: 'transform 360ms cubic-bezier(0.4,0,0.2,1), box-shadow 360ms cubic-bezier(0.4,0,0.2,1)',
        backgroundColor: 'var(--color-primary-dark)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* background image */}
      <div className="absolute inset-0">
        <Image
          src={festival.cardImage}
          alt={`${festival.name.en} — Indian Routes & Trails`}
          fill
          className="object-cover"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform var(--motion-image-hover)',
            opacity: hovered ? 0.6 : 0.72,
          }}
          sizes="(max-width:767px) 100vw, 25vw"
        />
      </div>

      {/* gradient overlay — lightens slightly on hover */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(20,34,77,0.88) 0%, rgba(20,34,77,0.42) 55%, rgba(20,34,77,0.1) 100%)'
            : 'linear-gradient(to top, rgba(20,34,77,0.93) 0%, rgba(20,34,77,0.55) 55%, rgba(20,34,77,0.18) 100%)',
          transition: 'background 360ms ease',
        }}
      />

      {/* gold accent top border on hover */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '3px',
          backgroundColor: 'var(--color-secondary)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />

      {/* countdown badge */}
      {isNearest && countdown !== null && (
        <div
          className="absolute top-4 right-4 font-sans text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 animate-countdown-pulse"
          style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-text-on-gold)',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          {countdown === 0 ? 'Today' : `${countdown} days`}
        </div>
      )}

      {/* text content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="font-sans text-[9px] tracking-[0.24em] uppercase mb-1.5"
          style={{ color: 'var(--color-secondary)' }}
        >
          {festival.regions.slice(0, 2).join(' · ')}
        </p>
        <h3
          className="font-serif font-light leading-snug mb-1.5"
          style={{ color: 'var(--color-text-invert)', fontSize: '1.1rem' }}
        >
          {festival.name[lang]}
        </h3>
        <p className="font-sans text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {nextDate.start === nextDate.end
            ? formatDateShort(nextDate.start)
            : `${formatDateShort(nextDate.start)} – ${formatDateShort(nextDate.end)}`}
        </p>
        <div
          className="flex items-center gap-1.5 mt-3"
          style={{
            color: 'var(--color-secondary)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(5px)',
            transition: 'opacity 280ms ease, transform 280ms ease',
          }}
        >
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase">Explore</span>
          <ArrowRight size={10} />
        </div>
      </div>
    </Link>
  );
}

/* ── main ───────────────────────────────────────────────────────── */
export default function HomeFestivalStrip() {
  const { lang } = useLang();
  const today = new Date();
  const upcoming = getUpcomingFestivals(today, 4);
  const isMobile = useIsMobile();

  const { index, goTo, touchHandlers } = useCarousel(upcoming.length, 1);

  if (!upcoming.length) return null;

  const nearestSlug = upcoming[0]?.festival.slug;

  return (
    /* warm ivory surface — fits Haveli Indigo, distinct from dark navy */
    <section
      className="section-padding-sm"
      style={{
        backgroundColor: 'var(--color-surface-alt)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container-luxury">

        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow mb-2">Festival Calendar</p>
            <h2 className="font-serif text-2xl font-light" style={{ color: 'var(--color-text)' }}>
              This Season in India
            </h2>
          </div>
          <Link
            href="/festivals"
            className="btn-link-secondary group inline-flex items-center gap-2 shrink-0"
          >
            Full Calendar
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* desktop: 4-column grid */}
        {!isMobile && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {upcoming.map(({ festival, nextDate }) => (
              <FestivalCard
                key={festival.slug}
                festival={festival}
                nextDate={nextDate}
                isNearest={festival.slug === nearestSlug}
                countdown={daysUntil(festival, today)}
                lang={lang}
              />
            ))}
          </div>
        )}

        {/* mobile: 1-up swipe slider */}
        {isMobile && (
          <>
            <div
              className="overflow-hidden"
              style={{ borderRadius: 'var(--radius-card)' }}
              {...touchHandlers}
            >
              <div
                className="flex"
                style={{
                  gap: '12px',
                  transform: `translateX(calc(-${index * 100}% - ${index * 12}px))`,
                  transition: 'transform 420ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform',
                }}
              >
                {upcoming.map(({ festival, nextDate }) => (
                  <div key={festival.slug} style={{ flexShrink: 0, width: '100%' }}>
                    <FestivalCard
                      festival={festival}
                      nextDate={nextDate}
                      isNearest={festival.slug === nearestSlug}
                      countdown={daysUntil(festival, today)}
                      lang={lang}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Dots total={upcoming.length} active={index} onDotClick={goTo} />
          </>
        )}
      </div>
    </section>
  );
}
