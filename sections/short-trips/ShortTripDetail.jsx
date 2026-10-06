'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { siteConfig, responsibleTourism } from '@/data/siteContent';
import {
  ArrowLeft, MapPin, Clock, MessageCircle, Check, X,
  AlertCircle, ChevronRight,
} from 'lucide-react';

/* ── Variant toggle ──────────────────────────────────────────────── */
function VariantToggle({ trip, activeId, onChange }) {
  if (trip.variants.length <= 1) return null;
  return (
    <div role="group" aria-label="Select variant"
      style={{ display: 'inline-flex', borderRadius: 'var(--radius-control)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
      {trip.variants.map((v) => {
        const isActive = v.id === activeId;
        return (
          <button
            key={v.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(v.id)}
            style={{
              fontFamily: 'var(--font-body, system-ui)',
              fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '6px 13px', border: 'none', cursor: 'pointer',
              backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface-alt)',
              color: isActive ? '#fff' : 'var(--color-text-muted)',
              transition: 'background-color 160ms ease, color 160ms ease',
              outline: 'none', minHeight: '34px',
            }}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Section heading ─────────────────────────────────────────────── */
function SectionHead({ eyebrow, heading }) {
  return (
    <>
      <p className="eyebrow mb-2" style={{ fontSize: 'clamp(8px, 1.8vw, 10px)' }}>{eyebrow}</p>
      <h2
        className="font-serif font-light"
        style={{
          fontSize: 'clamp(1.15rem, 3.5vw, 1.5rem)',
          color: 'var(--color-text)',
          marginBottom: '12px',
          lineHeight: 1.25,
        }}
      >
        {heading}
      </h2>
      <div className="divider-gold" style={{ marginBottom: 'clamp(16px, 3vw, 28px)' }} />
    </>
  );
}

/* ── Detail page ─────────────────────────────────────────────────── */
export default function ShortTripDetail({ trip, initialVariant }) {
  const router = useRouter();
  const defaultId = initialVariant && trip.variants.find((x) => x.id === initialVariant)
    ? initialVariant
    : (trip.defaultVariant ?? trip.variants[0].id);
  const [activeId, setActiveId] = useState(defaultId);

  const v = trip.variants.find((x) => x.id === activeId) ?? trip.variants[0];

  const handleVariantChange = (vid) => {
    setActiveId(vid);
    if (trip.variants.length > 1) {
      router.replace(`/short-trips/${trip.slug}?variant=${vid}`, { scroll: false });
    }
  };

  const typeBadge = v.type === 'overnight' ? 'Overnight' : 'Day Trip';

  const waText = encodeURIComponent(
    `Hi Om, I'm interested in the short trip: ${trip.title}${trip.variants.length > 1 ? ` — ${v.label}` : ''}. Could you please share more details? Page: https://www.indianroutesandtrails.com/short-trips/${trip.slug}${trip.variants.length > 1 ? `?variant=${activeId}` : ''}`
  );

  return (<>
    {/* ── HERO ──────────────────────────────────────────────── */}
    <section
      className="relative flex items-end overflow-hidden"
      style={{
        minHeight: 'clamp(340px, 60vh, 780px)',
        paddingTop: 'var(--header-height-desktop)',
      }}
    >
      <div className="absolute inset-0">
        <Image
          src={trip.image}
          alt={`${trip.title} — Indian Routes & Trails`}
          fill priority
          className="object-cover"
          style={{ objectPosition: 'center 55%' }}
          sizes="100vw"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.95) 0%, rgba(20,34,77,0.42) 55%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
      </div>

      <div className="relative container-luxury w-full" style={{ paddingBottom: 'clamp(20px, 4vw, 56px)' }}>
        <Link
          href="/short-trips"
          className="inline-flex items-center gap-2 font-sans tracking-wider uppercase transition-colors"
          style={{ fontSize: 'clamp(9px, 1.8vw, 11px)', color: 'rgba(255,255,255,0.5)', marginBottom: 'clamp(14px, 3vw, 28px)', display: 'inline-flex' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          <ArrowLeft size={11} aria-hidden="true" /> All Short Trips
        </Link>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'clamp(10px, 2vw, 16px)' }}>
          {[
            { bg: 'rgba(232,163,23,0.2)', color: 'var(--color-secondary)', border: '1px solid rgba(232,163,23,0.4)', label: typeBadge },
            { bg: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', label: `From ${v.origin}` },
            { bg: 'rgba(27,42,94,0.75)', color: '#fff', label: v.duration },
          ].map(({ bg, color, border, label }) => (
            <span key={label} style={{
              fontFamily: 'var(--font-body, system-ui)',
              fontSize: 'clamp(8px, 1.6vw, 10px)', fontWeight: 500, letterSpacing: '0.13em', textTransform: 'uppercase',
              padding: 'clamp(3px, 0.5vw, 4px) clamp(8px, 1.5vw, 12px)', borderRadius: '999px',
              backgroundColor: bg, color, border: border ?? 'none',
            }}>
              {label}
            </span>
          ))}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: 'clamp(1.6rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.1,
          color: 'var(--color-text-invert)', marginBottom: 'clamp(8px, 1.5vw, 12px)', maxWidth: '42rem',
        }}>
          {trip.title}
        </h1>

        {trip.variants.length > 1 && (
          <div style={{ marginBottom: '10px' }}>
            <VariantToggle trip={trip} activeId={activeId} onChange={handleVariantChange} />
          </div>
        )}

        <p style={{
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: 'clamp(0.82rem, 2vw, 1rem)', fontWeight: 300, lineHeight: 1.65,
          color: 'rgba(255,255,255,0.65)', maxWidth: '36rem',
        }}>
          {trip.summary}
        </p>

        {/* Travel time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: 'clamp(8px, 1.5vw, 14px)' }}>
          <Clock size={12} style={{ color: 'rgba(232,163,23,0.8)' }} aria-hidden="true" />
          <span style={{
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: 'clamp(10px, 1.8vw, 11px)', color: 'rgba(255,255,255,0.6)',
          }}>
            {v.travelTime}
          </span>
        </div>
      </div>
    </section>

    {/* ── ROUTE STRIP ───────────────────────────────────────── */}
    <div style={{ backgroundColor: 'var(--color-primary-dark)', padding: 'clamp(8px, 1.5vw, 12px) 0' }}>
      <div className="container-luxury" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '5px' }}>
        <MapPin size={11} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} aria-hidden="true" />
        {[v.origin, trip.title, v.origin].map((label, i) => (
          <span key={i} style={{ display: 'contents' }}>
            {i > 0 && <ChevronRight size={10} style={{ color: 'rgba(232,163,23,0.4)' }} aria-hidden="true" />}
            <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: 'clamp(10px, 1.8vw, 12px)', color: 'rgba(255,255,255,0.6)' }}>
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>

    {/* ── MAIN CONTENT ──────────────────────────────────────── */}
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      <div
        className="container-luxury"
        style={{ paddingTop: 'clamp(28px, 5vw, 80px)', paddingBottom: 'clamp(28px, 5vw, 80px)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">

          {/* ── Left column ──────────────────────────────────── */}
          <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 5vw, 56px)' }}>

            {/* Overview */}
            <div>
              <SectionHead eyebrow="Overview" heading="About This Trip" />
              <p style={{
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: 'clamp(0.82rem, 2vw, 1rem)', lineHeight: 1.8,
                color: 'var(--color-text-muted)',
              }}>
                {v.overview}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <SectionHead eyebrow="Highlights" heading="What to Expect" />
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(6px, 1.2vw, 10px)' }}>
                {v.highlights.map((h, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 'clamp(8px, 1.5vw, 12px)',
                    padding: 'clamp(10px, 1.8vw, 16px)',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-control)',
                  }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', flexShrink: 0, marginTop: '5px' }} aria-hidden="true" />
                    <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <SectionHead eyebrow="Day by Day" heading="How the Day Unfolds" />
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '9px', top: '8px', bottom: '8px', width: '2px',
                  backgroundColor: 'var(--color-border)',
                }} aria-hidden="true" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {v.timeline.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 'clamp(12px, 2.5vw, 20px)', paddingBottom: 'clamp(16px, 3vw, 28px)' }}>
                      {/* Dot */}
                      <div style={{ flexShrink: 0, width: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: '10px', height: '10px', borderRadius: '50%',
                          backgroundColor: 'var(--color-primary)',
                          border: '2px solid var(--color-bg)',
                          boxShadow: '0 0 0 2px var(--color-primary)',
                          zIndex: 1, flexShrink: 0, marginTop: '4px',
                        }} aria-hidden="true" />
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <span style={{
                          display: 'block',
                          fontFamily: 'var(--font-body, system-ui)',
                          fontSize: '8px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                          color: 'var(--color-secondary-hover)', marginBottom: '3px',
                        }}>
                          {item.sequence}
                        </span>
                        <h4 style={{
                          fontFamily: 'var(--font-display, Georgia, serif)',
                          fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', fontWeight: 400, lineHeight: 1.3,
                          color: 'var(--color-text)', margin: '0 0 5px',
                        }}>
                          {item.heading}
                        </h4>
                        <p style={{
                          fontFamily: 'var(--font-body, system-ui)',
                          fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', lineHeight: 1.7,
                          color: 'var(--color-text-muted)', margin: 0,
                        }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div>
              <SectionHead eyebrow="What's Included" heading="Inclusions & Exclusions" />
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(16px, 3vw, 24px)' }}>
                {/* Inclusions */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-body, system-ui)',
                    fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--color-success)', marginBottom: '10px',
                  }}>
                    Included
                  </h3>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {v.inclusions.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <Check size={12} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                        <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Exclusions */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-body, system-ui)',
                    fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--color-text-muted)', marginBottom: '10px',
                  }}>
                    Not Included
                  </h3>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {v.exclusions.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <X size={12} style={{ color: 'var(--color-border-strong)', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                        <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Planning Notes */}
            {v.planningNotes?.length > 0 && (
              <div>
                <SectionHead eyebrow="Before You Go" heading="Planning Notes" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {v.planningNotes.map((note, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      padding: 'clamp(9px, 1.8vw, 12px) clamp(12px, 2vw, 16px)',
                      backgroundColor: 'rgba(192,69,59,0.05)', border: '1px solid rgba(192,69,59,0.15)',
                      borderRadius: 'var(--radius-control)',
                    }}>
                      <AlertCircle size={13} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', lineHeight: 1.65, color: 'var(--color-text)' }}>
                        {note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Responsible Tourism — trip-specific */}
            {v.responsibleTourism && (
              <div
                style={{
                  display: 'flex', alignItems: 'flex-start',
                  gap: 'clamp(12px, 2.5vw, 20px)',
                  padding: 'clamp(14px, 2.5vw, 28px)',
                  backgroundColor: 'rgba(23,97,79,0.06)', border: '1px solid rgba(23,97,79,0.25)',
                  borderRadius: 'var(--radius-card)',
                }}
              >
                <div style={{ width: '28px', height: '28px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-success)', borderRadius: 'var(--radius-control)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <p className="eyebrow mb-1" style={{ color: 'var(--color-success)', fontSize: '8px' }}>Responsible Tourism</p>
                  <p style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-success)' }}>
                    {v.responsibleTourism}
                  </p>
                </div>
              </div>
            )}

            {/* Global responsible tourism statement */}
            <div
              style={{
                display: 'flex', alignItems: 'flex-start',
                gap: 'clamp(12px, 2.5vw, 20px)',
                padding: 'clamp(14px, 2.5vw, 28px)',
                backgroundColor: 'rgba(23,97,79,0.04)', border: '1px solid rgba(23,97,79,0.18)',
                borderRadius: 'var(--radius-card)',
              }}
            >
              <div style={{ width: '28px', height: '28px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-success)', borderRadius: 'var(--radius-control)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <p className="eyebrow mb-1" style={{ color: 'var(--color-success)', fontSize: '8px' }}>Our Commitment</p>
                <p style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(0.82rem, 1.8vw, 1rem)', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--color-success)' }}>
                  &ldquo;{responsibleTourism.statement}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ──────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {/* At a Glance */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-card)',
                overflow: 'hidden',
              }}>
                <div style={{ padding: 'clamp(12px, 2vw, 16px) clamp(14px, 2.5vw, 20px) 6px' }}>
                  <p style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                    Trip at a Glance
                  </p>
                </div>
                {[
                  { label: 'Type',     value: typeBadge },
                  { label: 'Origin',   value: v.origin },
                  { label: 'Duration', value: v.duration },
                  { label: 'Travel',   value: v.travelTime.split(',')[0] },
                  { label: 'Pricing',  value: 'Request a Quote' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'clamp(9px, 1.6vw, 12px) clamp(14px, 2.5vw, 20px)', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: 'clamp(9px, 1.6vw, 11px)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
                      {label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body, system-ui)', fontSize: 'clamp(10px, 1.8vw, 12px)', textAlign: 'right', maxWidth: '60%',
                      color: value === 'Request a Quote' ? 'var(--color-secondary-hover)' : 'var(--color-text)',
                      fontStyle: value === 'Request a Quote' ? 'italic' : 'normal',
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Variant toggle in sidebar */}
              {trip.variants.length > 1 && (
                <div style={{ padding: 'clamp(12px, 2vw, 16px)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)' }}>
                  <p style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                    Variant
                  </p>
                  <VariantToggle trip={trip} activeId={activeId} onChange={handleVariantChange} />
                </div>
              )}

              {/* Enquiry CTA */}
              <div style={{ padding: 'clamp(14px, 2.5vw, 20px)', backgroundColor: 'rgba(27,42,94,0.06)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)' }}>
                <h3 style={{ fontFamily: 'var(--font-display, Georgia, serif)', fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)', fontWeight: 400, marginBottom: '5px', color: 'var(--color-text)' }}>
                  Plan This Trip
                </h3>
                <p style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: 'clamp(0.75rem, 1.6vw, 0.82rem)', lineHeight: 1.6, color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                  Om will personally respond and arrange the details.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link
                    href={`/contact?shortTrip=${trip.slug}${trip.variants.length > 1 ? `&variant=${activeId}` : ''}`}
                    className="btn-primary"
                    style={{ justifyContent: 'center', textAlign: 'center' }}
                  >
                    Enquire Now
                  </Link>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      fontFamily: 'var(--font-body, system-ui)',
                      fontSize: 'clamp(9px, 1.8vw, 11px)', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
                      padding: '9px 14px', borderRadius: 'var(--radius-control)',
                      backgroundColor: 'var(--color-whatsapp)', color: '#fff', textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={12} aria-hidden="true" /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Back to all trips */}
              <Link
                href="/short-trips"
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontFamily: 'var(--font-body, system-ui)',
                  fontSize: 'clamp(9px, 1.6vw, 10px)', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--color-text-muted)', textDecoration: 'none',
                  padding: '8px 0',
                }}
              >
                <ArrowLeft size={10} aria-hidden="true" /> All Short Trips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ── BOTTOM CTA ────────────────────────────────────────── */}
    <section
      style={{
        backgroundColor: 'var(--color-primary-dark)',
        padding: 'clamp(28px, 5vw, 64px) 0',
      }}
    >
      <div className="container-narrow text-center">
        <p className="eyebrow mb-3" style={{ color: 'var(--color-secondary)', fontSize: 'clamp(8px, 1.6vw, 10px)' }}>Begin This Trip</p>
        <h2
          className="font-serif font-light"
          style={{ fontSize: 'clamp(1.4rem, 4vw, 1.875rem)', color: 'var(--color-text-invert)', marginBottom: 'clamp(8px, 1.5vw, 16px)' }}
        >
          Ready to Go?
        </h2>
        <p style={{
          fontFamily: 'var(--font-body, system-ui)',
          fontSize: 'clamp(0.78rem, 1.8vw, 0.875rem)', fontWeight: 300,
          marginBottom: 'clamp(18px, 3.5vw, 32px)', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto',
          color: 'var(--color-text-invert-muted)', lineHeight: 1.7,
        }}>
          Share your preferred date and Om will arrange everything.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <Link
            href={`/contact?shortTrip=${trip.slug}${trip.variants.length > 1 ? `&variant=${activeId}` : ''}`}
            className="btn-hero-primary"
          >
            Enquire Now
          </Link>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: 'var(--font-body, system-ui)',
              fontSize: 'clamp(9px, 1.8vw, 11px)', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: 'clamp(10px, 2vw, 13px) clamp(16px, 3vw, 22px)', borderRadius: 'var(--radius-control)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
            }}
          >
            <MessageCircle size={13} aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  </>);
}
