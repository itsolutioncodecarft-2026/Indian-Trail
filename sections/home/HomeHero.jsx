'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { festivals } from '@/data/festivals';

/* ─────────────────────────────────────────────────────────────────
   Option sets wired to real data
───────────────────────────────────────────────────────────────── */

// Real festival options from data — slug as value, name as label
const FESTIVAL_OPTIONS = [
  { value: '', label: 'Any Festival' },
  ...festivals.map((f) => ({ value: f.slug, label: f.name.en })),
];

const DURATION_OPTIONS = [
  { value: '',     label: 'Any Duration' },
  { value: '1-7',  label: '1–7 days'  },
  { value: '8-12', label: '8–12 days' },
  { value: '13+',  label: '13+ days'  },
];

const INTEREST_OPTIONS = [
  { value: '',            label: 'Any Interest'   },
  { value: 'heritage',    label: 'Heritage'       },
  { value: 'wildlife',    label: 'Wildlife'       },
  { value: 'spiritual',   label: 'Spiritual'      },
  { value: 'rural',       label: 'Rural Life'     },
  { value: 'culinary',    label: 'Culinary'       },
  { value: 'photography', label: 'Photography'    },
];

/* ─────────────────────────────────────────────────────────────────
   Shared select field
───────────────────────────────────────────────────────────────── */
function SelectField({ label, options, value, onChange, compact = false }) {
  return (
    <div style={{ position: 'relative', flex: '1 1 0', minWidth: 0 }}>
      <p style={{
        fontFamily:    'var(--font-body, system-ui)',
        fontSize:      compact ? '7px' : '8px',
        fontWeight:    500,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color:         'rgba(255,255,255,0.5)',
        margin:        '0 0 2px 0',
      }}>
        {label}
      </p>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width:            '100%',
            appearance:       'none',
            WebkitAppearance: 'none',
            fontFamily:       'var(--font-body, system-ui)',
            fontSize:         compact ? '10px' : '12px',
            fontWeight:       400,
            color:            'rgba(255,255,255,0.90)',
            backgroundColor:  'transparent',
            border:           'none',
            outline:          'none',
            cursor:           'pointer',
            paddingRight:     compact ? '14px' : '18px',
            lineHeight:       1.3,
          }}
        >
          {options.map(o => (
            <option
              key={o.value}
              value={o.value}
              style={{ color: '#14142B', backgroundColor: '#fff' }}
            >
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={compact ? 9 : 11}
          style={{
            position:      'absolute',
            right:         0,
            top:           '50%',
            transform:     'translateY(-50%)',
            color:         'rgba(255,255,255,0.5)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

function VDivider({ compact = false }) {
  return (
    <div style={{
      width:           '1px',
      alignSelf:       'stretch',
      backgroundColor: 'rgba(255,255,255,0.18)',
      flexShrink:      0,
      margin:          compact ? '6px 1px' : '8px 2px',
    }} />
  );
}

/* ─────────────────────────────────────────────────────────────────
   Search bar — wired redirect to /tours with real query params
───────────────────────────────────────────────────────────────── */
function HeroSearchBar() {
  const router = useRouter();
  const [festival,  setFestival]  = useState('');
  const [duration,  setDuration]  = useState('');
  const [interest,  setInterest]  = useState('');

  /* Build /tours URL with only non-empty params */
  const handleGo = () => {
    const params = new URLSearchParams();
    if (duration)  params.set('duration',  duration);
    if (interest)  params.set('interests', interest);
    if (festival)  params.set('festival',  festival);
    const qs = params.toString();
    router.push(qs ? `/tours?${qs}` : '/tours');
  };

  const barStyle = {
    background:           'rgba(255,255,255,0.10)',
    border:               '1px solid rgba(255,255,255,0.18)',
    borderRadius:         '10px',
    backdropFilter:       'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  };

  const goldBtn = (compact) => ({
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             compact ? '4px' : '7px',
    padding:         compact ? '0 14px' : '0 20px',
    height:          compact ? '36px' : '42px',
    backgroundColor: 'var(--color-secondary)',
    color:           'var(--color-text-on-gold)',
    fontFamily:      'var(--font-body, system-ui)',
    fontSize:        compact ? '9px' : '10px',
    fontWeight:      500,
    letterSpacing:   '0.14em',
    textTransform:   'uppercase',
    border:          'none',
    borderRadius:    compact ? '6px' : '7px',
    cursor:          'pointer',
    whiteSpace:      'nowrap',
    transition:      'background-color 180ms ease, transform 180ms ease',
    flexShrink:      0,
  });

  return (
    <div style={{ width: '100%' }}>

      {/* ── Desktop bar — single row ── */}
      <div
        className="hidden md:flex"
        style={{ ...barStyle, alignItems: 'center', minHeight: '56px', overflow: 'hidden' }}
      >
        <div style={{ flex: '1 1 0', padding: '10px 18px', display: 'flex', alignItems: 'center' }}>
          <SelectField label="Festival" options={FESTIVAL_OPTIONS} value={festival} onChange={setFestival} />
        </div>
        <VDivider />
        <div style={{ flex: '1 1 0', padding: '10px 18px', display: 'flex', alignItems: 'center' }}>
          <SelectField label="Duration" options={DURATION_OPTIONS} value={duration} onChange={setDuration} />
        </div>
        <VDivider />
        <div style={{ flex: '1 1 0', padding: '10px 18px', display: 'flex', alignItems: 'center' }}>
          <SelectField label="Interest" options={INTEREST_OPTIONS} value={interest} onChange={setInterest} />
        </div>
        <div style={{ padding: '7px', flexShrink: 0 }}>
          <button
            onClick={handleGo}
            style={goldBtn(false)}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-secondary)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Search size={12} />
            Find My Journey
          </button>
        </div>
      </div>

      {/*
        ── Mobile bar — Row 1: 3 fields, Row 2: centered GO button ──
      */}
      <div className="flex flex-col md:hidden" style={{ ...barStyle, padding: '10px 12px', gap: '8px' }}>
        {/* Row 1: three fields */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <div style={{ flex: '1 1 0', display: 'flex', alignItems: 'center', paddingRight: '8px', minWidth: 0 }}>
            <SelectField label="Festival" options={FESTIVAL_OPTIONS} value={festival} onChange={setFestival} compact />
          </div>
          <VDivider compact />
          <div style={{ flex: '1 1 0', display: 'flex', alignItems: 'center', padding: '0 8px', minWidth: 0 }}>
            <SelectField label="Duration" options={DURATION_OPTIONS} value={duration} onChange={setDuration} compact />
          </div>
          <VDivider compact />
          <div style={{ flex: '1 1 0', display: 'flex', alignItems: 'center', paddingLeft: '8px', minWidth: 0 }}>
            <SelectField label="Interest" options={INTEREST_OPTIONS} value={interest} onChange={setInterest} compact />
          </div>
        </div>

        {/* Row 2: centered GO button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleGo}
            style={{ ...goldBtn(true), width: '100%', maxWidth: '200px' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
          >
            <Search size={11} />
            Go — Find My Journey
          </button>
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Hero
───────────────────────────────────────────────────────────────── */
export default function HomeHero() {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{
        minHeight:  '100vh',
        /*
          Extra top breathing room = header height + 24px additional clearance.
          The header is ~64px; 88px total gives comfortable visual separation
          between the nav bar and the top of the background image.
        */
        paddingTop: 'calc(var(--header-height-desktop) + 24px)',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=2400&q=90"
          alt="Amber Fort at dawn, Jaipur — Indian Routes & Trails"
          fill priority
          className="object-cover"
          style={{ objectPosition: 'center 10%' }}
          sizes="100vw"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--color-primary-dark) 0%, rgba(27,42,94,0.55) 45%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(27,42,94,0.65) 0%, transparent 60%)' }} />
      </div>

      {/* Content — anchored to bottom */}
      <div className="relative w-full" style={{ paddingBottom: 'clamp(28px, 5vw, 56px)' }}>
        <div className="container-luxury">

          <div className="max-w-2xl mb-6">
            <h1
              className="font-serif font-light leading-none mb-5"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.8rem)', letterSpacing: '-0.02em', color: 'var(--color-text-invert)' }}
            >
              Discover India,<br />
              <em style={{ color: 'var(--color-secondary)', fontStyle: 'italic' }}>
                Beyond the Ordinary.
              </em>
            </h1>

            <p
              className="font-sans font-light mb-7 max-w-lg leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.65)' }}
            >
              Private journeys shaped around culture, connection and the timeless spirit of India —
              crafted personally by Om for discerning travellers from around the world.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/tours" className="btn-hero-primary">
                Explore Our Journeys
              </Link>
              <Link href="/contact" className="btn-hero-ghost">
                Plan My Journey
              </Link>
            </div>
          </div>

          <HeroSearchBar />

        </div>
      </div>
    </section>
  );
}
