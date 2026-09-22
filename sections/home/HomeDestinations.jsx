'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedDestinations } from '@/data/destinations';
import { resolveDestImage } from '@/lib/destImage';
import { useCarousel } from '@/hooks/useCarousel';
import { ArrowRight } from 'lucide-react';

/* ── mobile detection ───────────────────────────────────────────── */
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
      aria-label="Destination card position"
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={active === i}
          aria-label={`Go to destination ${i + 1}`}
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

/* ── single destination card ────────────────────────────────────── */
function DestCard({ dest, sizes = '25vw', tall = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className="group relative block overflow-hidden"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--color-primary-dark)',
        borderRadius: 'var(--radius-card)',
        display: 'block',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-card-hover)' : '0 2px 8px rgba(20,20,43,0.07)',
        transition: 'transform 360ms cubic-bezier(0.4,0,0.2,1), box-shadow 360ms cubic-bezier(0.4,0,0.2,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={resolveDestImage(dest.featuredImage, dest.slug)}
        alt={`${dest.name}, India — Indian Routes & Trails`}
        fill
        className="object-cover"
        style={{
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          opacity: hovered ? 0.72 : 0.82,
          transition: 'transform var(--motion-image-hover), opacity 360ms ease',
        }}
        sizes={sizes}
      />
      {/* gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.18) 55%, transparent 100%)',
        }}
      />
      {/* gold top accent on hover */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '2px',
          backgroundColor: 'var(--color-secondary)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 280ms ease',
        }}
      />
      {/* text */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className="font-sans text-[8px] tracking-[0.3em] uppercase mb-1"
          style={{ color: 'var(--color-secondary)' }}
        >
          {dest.region}
        </p>
        <h3
          className="font-serif font-light"
          style={{
            color: 'var(--color-text-invert)',
            fontSize: tall ? 'clamp(1.2rem,2vw,1.6rem)' : '1rem',
            lineHeight: 1.2,
          }}
        >
          {dest.name}
        </h3>
        {tall && (
          <p
            className="font-sans text-xs italic mt-1 line-clamp-1"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {dest.tagline}
          </p>
        )}
        <div
          className="flex items-center gap-1.5 mt-2"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(5px)',
            transition: 'opacity 260ms ease, transform 260ms ease',
          }}
        >
          <span
            className="font-sans text-[9px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-secondary)' }}
          >
            Explore
          </span>
          <ArrowRight size={9} style={{ color: 'var(--color-secondary)' }} />
        </div>
      </div>
    </Link>
  );
}

/* ── bento mosaic — desktop ─────────────────────────────────────── */
/*
  Featured destinations (6):
    0 Delhi      → tall portrait, left column, 2 rows
    1 Agra       → landscape tile, top-right, 2 cols
    2 Jaipur     → portrait, mid
    3 Varanasi   → portrait, mid
    4 Jodhpur    → landscape, bottom, 2 cols
    5 Udaipur    → portrait, right
*/
function DesktopMosaic({ items }) {
  // We build a fixed CSS grid: 4 columns, auto rows
  const GAP = 12;

  // Each item config: [gridColumn, gridRow, height, tall, sizes]
  const layout = [
    { col: '1 / 2', row: '1 / 3', h: '520px', tall: true,  sizes: '25vw'  }, // Delhi   — tall portrait
    { col: '2 / 4', row: '1 / 2', h: '250px', tall: false, sizes: '50vw'  }, // Agra    — landscape
    { col: '4 / 5', row: '1 / 3', h: '520px', tall: true,  sizes: '25vw'  }, // Varanasi— tall portrait
    { col: '2 / 3', row: '2 / 3', h: '260px', tall: false, sizes: '25vw'  }, // Jaipur  — square
    { col: '3 / 4', row: '2 / 3', h: '260px', tall: false, sizes: '25vw'  }, // Jodhpur — square
    { col: '1 / 5', row: '3 / 4', h: '240px', tall: true,  sizes: '100vw' }, // Udaipur — FULL WIDTH row 3
  ];

  // Limit to 6 items
  const show = items.slice(0, 6);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: `${GAP}px`,
      }}
    >
      {show.map((dest, i) => {
        const cfg = layout[i] || layout[layout.length - 1];
        return (
          <div
            key={dest.slug}
            style={{
              gridColumn: cfg.col,
              gridRow: cfg.row,
              height: cfg.h,
            }}
          >
            <DestCard dest={dest} sizes={cfg.sizes} tall={cfg.tall} />
          </div>
        );
      })}
    </div>
  );
}

/* ── main ───────────────────────────────────────────────────────── */
export default function HomeDestinations() {
  const featured = getFeaturedDestinations();
  const isMobile = useIsMobile();
  const { index, goTo, touchHandlers } = useCarousel(featured.length, 1);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-luxury">

        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <p className="eyebrow mb-3">India Through Our Eyes</p>
            <h2 className="section-title">
              Cities That<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                Stay With You
              </em>
            </h2>
          </div>
          <Link
            href="/destinations"
            className="btn-link-secondary group flex items-center gap-2 shrink-0"
          >
            All Destinations
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* desktop bento */}
        {!isMobile && <DesktopMosaic items={featured} />}

        {/* mobile 1-up slider */}
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
                {featured.map((dest) => (
                  <div
                    key={dest.slug}
                    style={{ flexShrink: 0, width: '100%', height: '320px' }}
                  >
                    <DestCard dest={dest} sizes="100vw" tall />
                  </div>
                ))}
              </div>
            </div>
            <Dots total={featured.length} active={index} onDotClick={goTo} />
          </>
        )}
      </div>
    </section>
  );
}
