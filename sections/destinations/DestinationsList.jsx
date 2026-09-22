'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { destinations } from '@/data/destinations';
import { resolveDestImage } from '@/lib/destImage';
import { useCarousel } from '@/hooks/useCarousel';
import { ArrowRight } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────
   GAP-CONSISTENT MOSAIC
   ─────────────────────────────────────────────────────────────────
   Root cause of uneven gaps: mixing col-span-2 wide tiles with
   col-span-1 tall tiles in a 4-col grid causes CSS grid
   auto-placement to insert empty cells ("holes") to resolve the
   height mismatch — those empty cells render as oversized gutters.

   Solution:
   • One consistent gap value (10px) everywhere.
   • All cards in a row share the SAME row height — no row-spanning.
   • Width variation only: some cards span 2 cols (wide), others 1.
   • We manually chunk items into rows of 4 column-units so spans
     always sum to exactly 4, leaving zero empty cells.

   Row pattern (repeating every 2 rows = 6 items):
     Row 1: [wide=2][std=1][std=1]   → 4 units, 3 cards
     Row 2: [std=1][wide=2][std=1]   → 4 units, 3 cards
     (alternates so wide column shifts left/right)

   Every row has a fixed height → all gaps identical.
   Row heights: 180px desktop, 160px tablet, mobile = slider.
   ────────────────────────────────────────────────────────────────── */

const DESKTOP_ROW_H = 180; // px
const TABLET_ROW_H  = 160; // px

/*
  layoutRow(items, rowIndex) → array of {dest, colSpan}
  Fills exactly 4 col-units per row from `items`, consuming 3 items.
  Pattern alternates:
    even rows: wide(2), std(1), std(1)
    odd  rows: std(1), wide(2), std(1)
*/
function buildRows(items) {
  const rows = [];
  let i = 0;
  let rowIdx = 0;
  while (i < items.length) {
    const even = rowIdx % 2 === 0;
    // consume 3 items for this row
    const a = items[i];
    const b = items[i + 1];
    const c = items[i + 2];
    if (!a) break;
    if (even) {
      // wide, std, std — but only if we have enough items
      rows.push([
        { dest: a, colSpan: b && c ? 2 : 4 },
        ...(b ? [{ dest: b, colSpan: 1 }] : []),
        ...(c ? [{ dest: c, colSpan: 1 }] : []),
      ]);
    } else {
      // std, wide, std
      rows.push([
        { dest: a, colSpan: 1 },
        ...(b ? [{ dest: b, colSpan: c ? 2 : 3 }] : []),
        ...(c ? [{ dest: c, colSpan: 1 }] : []),
      ]);
    }
    i += 3;
    rowIdx++;
  }
  return rows;
}

/* ── mobile/tablet detection ──────────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState('desktop');
  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop');
    };
    upd();
    window.addEventListener('resize', upd, { passive: true });
    return () => window.removeEventListener('resize', upd);
  }, []);
  return bp;
}

/* ── slider dots ──────────────────────────────────────────────── */
function Dots({ total, active, onDotClick }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4" role="tablist">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={active === i}
          aria-label={`Go to destination ${i + 1}`}
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

/* ── destination card ─────────────────────────────────────────── */
function DestCard({ dest, rowHeight, tall, sizes, hovered, onHover, onLeave }) {
  const src = resolveDestImage(dest.featuredImage, dest.slug);
  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className="relative block overflow-hidden"
      style={{
        width:           '100%',
        height:          `${rowHeight}px`,
        borderRadius:    'var(--radius-card)',
        backgroundColor: 'var(--color-primary-dark)',
        transform:       hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow:       hovered
          ? '0 6px 20px rgba(20,20,43,0.20)'
          : '0 1px 4px rgba(20,20,43,0.07)',
        transition: 'transform 300ms ease, box-shadow 300ms ease',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Image
        src={src}
        alt={`${dest.name}, India — Indian Routes & Trails`}
        fill
        className="object-cover"
        sizes={sizes}
        style={{
          transform:  hovered ? 'scale(1.05)' : 'scale(1)',
          opacity:    hovered ? 0.72 : 0.84,
          transition: 'transform var(--motion-image-hover), opacity 300ms ease',
        }}
      />
      {/* Scrim */}
      <div className="absolute inset-0"
        style={{
          background:    'linear-gradient(to top, rgba(20,34,77,0.90) 0%, rgba(20,34,77,0.12) 55%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Gold top accent on hover */}
      <div className="absolute top-0 left-0 right-0"
        style={{
          height:          '2px',
          backgroundColor: 'var(--color-secondary)',
          opacity:         hovered ? 1 : 0,
          transition:      'opacity 240ms ease',
          pointerEvents:   'none',
        }}
      />
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p style={{
          fontFamily:    'var(--font-body, system-ui)',
          fontSize:      '7px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color:         'var(--color-secondary)',
          margin:        '0 0 2px',
        }}>
          {dest.region}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontWeight: 300,
          color:      'var(--color-text-invert)',
          fontSize:   '0.875rem',
          lineHeight: 1.2,
          margin:     0,
        }}>
          {dest.name}
        </h3>
        {tall && (
          <p style={{
            fontFamily:   'var(--font-body, system-ui)',
            fontSize:     '10px',
            fontStyle:    'italic',
            color:        'rgba(255,255,255,0.42)',
            marginTop:    '2px',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
          }}>
            {dest.tagline}
          </p>
        )}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '4px',
          marginTop:  '5px',
          opacity:    hovered ? 1 : 0,
          transform:  hovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 220ms ease, transform 220ms ease',
        }}>
          <span style={{
            fontFamily:    'var(--font-body, system-ui)',
            fontSize:      '7px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'var(--color-secondary)',
          }}>Explore</span>
          <ArrowRight size={8} style={{ color: 'var(--color-secondary)' }} />
        </div>
      </div>
    </Link>
  );
}

/* ── desktop / tablet mosaic ──────────────────────────────────── */
function Mosaic({ items, rowHeight, cols = 4 }) {
  const [hov, setHov] = useState(null);
  const rows = buildRows(items);
  const GAP = 10; // px — same everywhere

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
      {rows.map((row, rIdx) => (
        <div
          key={rIdx}
          style={{
            display:             'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap:                 `${GAP}px`,
            /* Lock every row to the same height — no auto-sizing, no holes */
            gridAutoRows:        `${rowHeight}px`,
          }}
        >
          {row.map(({ dest, colSpan }) => (
            <div
              key={dest.slug}
              style={{
                gridColumn: `span ${colSpan}`,
                /* height must match the grid row exactly */
                height:     `${rowHeight}px`,
              }}
            >
              <DestCard
                dest={dest}
                rowHeight={rowHeight}
                tall={colSpan === 1}
                sizes={colSpan > 1 ? '50vw' : '25vw'}
                hovered={hov === dest.slug}
                onHover={() => setHov(dest.slug)}
                onLeave={() => setHov(null)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── mobile slider ────────────────────────────────────────────── */
function MobileSlider({ items }) {
  const { index, goTo, touchHandlers } = useCarousel(items.length, 1);
  const [hov, setHov] = useState(null);

  return (
    <>
      <div className="overflow-hidden" style={{ borderRadius: 'var(--radius-card)' }} {...touchHandlers}>
        <div className="flex" style={{
          gap:        '8px',
          transform:  `translateX(calc(-${index * 100}% - ${index * 8}px))`,
          transition: 'transform 400ms cubic-bezier(0.4,0,0.2,1)',
          willChange: 'transform',
        }}>
          {items.map((dest) => (
            <div key={dest.slug} style={{ flexShrink: 0, width: '100%' }}>
              <DestCard
                dest={dest}
                rowHeight={260}
                tall
                sizes="100vw"
                hovered={hov === dest.slug}
                onHover={() => setHov(dest.slug)}
                onLeave={() => setHov(null)}
              />
            </div>
          ))}
        </div>
      </div>
      <Dots total={items.length} active={index} onDotClick={goTo} />
    </>
  );
}

/* ── region group ─────────────────────────────────────────────── */
function RegionGroup({ name, items, bp }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <h2 className="font-serif text-base font-light shrink-0"
          style={{ color: 'var(--color-text)' }}>
          {name}
        </h2>
        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
      </div>
      {bp === 'mobile'  && <MobileSlider items={items} />}
      {bp === 'tablet'  && <Mosaic items={items} rowHeight={TABLET_ROW_H} cols={4} />}
      {bp === 'desktop' && <Mosaic items={items} rowHeight={DESKTOP_ROW_H} cols={4} />}
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────────── */
const REGIONS = ['All', 'North India', 'Rajasthan', 'Punjab', 'Central India'];

export default function DestinationsList() {
  const [region, setRegion] = useState('All');
  const bp = useBreakpoint();

  const filtered = region === 'All'
    ? destinations
    : destinations.filter((d) => d.region === region);

  const grouped = REGIONS.slice(1).reduce((acc, r) => {
    const items = filtered.filter((d) => d.region === r);
    if (items.length) acc[r] = items;
    return acc;
  }, {});

  return (
    <section style={{
      backgroundColor: 'var(--color-bg)',
      paddingTop:      'clamp(32px,4vw,56px)',
      paddingBottom:   'clamp(32px,4vw,56px)',
    }}>
      <div className="container-luxury">

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by region">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className="font-sans text-[10px] tracking-[0.18em] uppercase px-4 py-2 transition-all duration-200"
              style={{
                border:          `1.5px solid ${region === r ? 'var(--color-primary)' : 'var(--color-border)'}`,
                backgroundColor: region === r ? 'var(--color-primary)' : 'transparent',
                color:           region === r ? 'var(--color-text-invert)' : 'var(--color-text-muted)',
                borderRadius:    'var(--radius-control)',
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Flat view when a specific region is selected */}
        {region !== 'All' && (
          <>
            {bp === 'mobile'  && <MobileSlider items={filtered} />}
            {bp === 'tablet'  && <Mosaic items={filtered} rowHeight={TABLET_ROW_H} cols={4} />}
            {bp === 'desktop' && <Mosaic items={filtered} rowHeight={DESKTOP_ROW_H} cols={4} />}
          </>
        )}

        {/* Grouped by region */}
        {region === 'All' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {Object.entries(grouped).map(([regionName, items]) => (
              <RegionGroup key={regionName} name={regionName} items={items} bp={bp} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
