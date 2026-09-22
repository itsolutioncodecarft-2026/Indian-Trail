'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

/* ── dummy option sets ─────────────────────────────────────────── */
const FESTIVAL_OPTIONS = [
  'Any Festival',
  'Diwali — Festival of Lights',
  'Holi — Festival of Colours',
  'Pushkar Camel Fair',
  'Dev Deepawali — Varanasi',
  'Makar Sankranti Kite Festival',
];

const DURATION_OPTIONS = [
  'Any Duration',
  '1–7 days',
  '8–12 days',
  '13+ days',
];

const INTEREST_OPTIONS = [
  'Any Interest',
  'Heritage & History',
  'Wildlife Safaris',
  'Spiritual Journeys',
  'Rural & Village Life',
  'Photography',
];

/* ── single select field ───────────────────────────────────────── */
function SelectField({ label, options, value, onChange }) {
  return (
    <div style={{ position: 'relative', flex: '1 1 180px', minWidth: 0 }}>
      <label style={{
        display:        'block',
        fontFamily:     'var(--font-body, system-ui)',
        fontSize:       '9px',
        fontWeight:     500,
        letterSpacing:  '0.18em',
        textTransform:  'uppercase',
        color:          'var(--color-text-muted)',
        marginBottom:   '5px',
        paddingLeft:    '2px',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width:          '100%',
            appearance:     'none',
            WebkitAppearance: 'none',
            fontFamily:     'var(--font-body, system-ui)',
            fontSize:       '13px',
            color:          'var(--color-text)',
            backgroundColor: 'transparent',
            border:         'none',
            outline:        'none',
            cursor:         'pointer',
            paddingRight:   '22px',
            paddingLeft:    '2px',
            paddingTop:     '2px',
            paddingBottom:  '2px',
            lineHeight:     1.4,
          }}
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown
          size={13}
          style={{
            position:       'absolute',
            right:          0,
            top:            '50%',
            transform:      'translateY(-50%)',
            color:          'var(--color-text-muted)',
            pointerEvents:  'none',
          }}
        />
      </div>
    </div>
  );
}

/* ── vertical divider ──────────────────────────────────────────── */
function Divider() {
  return (
    <div style={{
      width:           '1px',
      alignSelf:       'stretch',
      backgroundColor: 'var(--color-border)',
      flexShrink:      0,
      margin:          '0 4px',
    }} />
  );
}

/* ── main ──────────────────────────────────────────────────────── */
export default function HomeSearchBar() {
  const router = useRouter();
  const [festival, setFestival]   = useState(FESTIVAL_OPTIONS[0]);
  const [duration, setDuration]   = useState(DURATION_OPTIONS[0]);
  const [interest, setInterest]   = useState(INTEREST_OPTIONS[0]);

  const handleFind = () => {
    /* Dummy behaviour: redirect to the enquiry/contact page.
       Real filter logic will be wired in a later update. */
    router.push('/contact');
  };

  return (
    /*
      Full-width dark indigo band — own layout block, normal document flow.
      Nothing overlaps; all neighbouring sections shift down naturally.
    */
    <section style={{ backgroundColor: 'var(--color-primary)', width: '100%' }}>
      <div className="container-luxury" style={{ paddingTop: '32px', paddingBottom: '36px' }}>

        {/* Supporting headline */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{
            fontFamily:    'var(--font-display, Georgia, serif)',
            fontSize:      'clamp(1.1rem, 2vw, 1.5rem)',
            fontWeight:    300,
            color:         'var(--color-text-invert)',
            margin:        0,
            lineHeight:    1.35,
            letterSpacing: '-0.01em',
          }}>
            Journeys through the India that stays with you
          </p>
          <p style={{
            fontFamily:   'var(--font-body, system-ui)',
            fontSize:     '12px',
            color:        'var(--color-text-invert-muted)',
            marginTop:    '4px',
            letterSpacing: '0.04em',
          }}>
            Tell us what you're looking for and we'll find the perfect journey.
          </p>
        </div>

        {/*
          Filter bar — white pill on the dark band.
          On mobile: stacks fields vertically.
          On desktop: single horizontal row with dividers.
        */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius:    '12px',
          boxShadow:       '0 4px 24px rgba(0,0,0,0.18)',
          overflow:        'hidden',
        }}>

          {/* Desktop layout — flex row */}
          <div
            className="hidden md:flex"
            style={{ alignItems: 'stretch', minHeight: '72px' }}
          >
            {/* Festival */}
            <div style={{ flex: '1 1 0', padding: '14px 20px', display: 'flex', alignItems: 'center' }}>
              <SelectField
                label="Festival"
                options={FESTIVAL_OPTIONS}
                value={festival}
                onChange={setFestival}
              />
            </div>

            <Divider />

            {/* Duration */}
            <div style={{ flex: '1 1 0', padding: '14px 20px', display: 'flex', alignItems: 'center' }}>
              <SelectField
                label="Duration"
                options={DURATION_OPTIONS}
                value={duration}
                onChange={setDuration}
              />
            </div>

            <Divider />

            {/* Interest */}
            <div style={{ flex: '1 1 0', padding: '14px 20px', display: 'flex', alignItems: 'center' }}>
              <SelectField
                label="Interest"
                options={INTEREST_OPTIONS}
                value={interest}
                onChange={setInterest}
              />
            </div>

            {/* Gold CTA button */}
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <button
                onClick={handleFind}
                style={{
                  display:         'inline-flex',
                  alignItems:      'center',
                  gap:             '8px',
                  padding:         '0 24px',
                  height:          '52px',
                  backgroundColor: 'var(--color-secondary)',
                  color:           'var(--color-text-on-gold)',
                  fontFamily:      'var(--font-body, system-ui)',
                  fontSize:        '11px',
                  fontWeight:      500,
                  letterSpacing:   '0.16em',
                  textTransform:   'uppercase',
                  border:          'none',
                  borderRadius:    '8px',
                  cursor:          'pointer',
                  whiteSpace:      'nowrap',
                  transition:      'background-color 200ms ease, transform 200ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Search size={14} />
                Find My Journey
              </button>
            </div>
          </div>

          {/* Mobile layout — stacked fields */}
          <div className="flex flex-col md:hidden" style={{ padding: '16px' }}>
            <div style={{ marginBottom: '14px' }}>
              <SelectField
                label="Festival"
                options={FESTIVAL_OPTIONS}
                value={festival}
                onChange={setFestival}
              />
            </div>
            <div style={{
              height:          '1px',
              backgroundColor: 'var(--color-border)',
              margin:          '0 0 14px',
            }} />
            <div style={{ marginBottom: '14px' }}>
              <SelectField
                label="Duration"
                options={DURATION_OPTIONS}
                value={duration}
                onChange={setDuration}
              />
            </div>
            <div style={{
              height:          '1px',
              backgroundColor: 'var(--color-border)',
              margin:          '0 0 14px',
            }} />
            <div style={{ marginBottom: '16px' }}>
              <SelectField
                label="Interest"
                options={INTEREST_OPTIONS}
                value={interest}
                onChange={setInterest}
              />
            </div>

            <button
              onClick={handleFind}
              style={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                gap:             '8px',
                width:           '100%',
                padding:         '14px',
                backgroundColor: 'var(--color-secondary)',
                color:           'var(--color-text-on-gold)',
                fontFamily:      'var(--font-body, system-ui)',
                fontSize:        '11px',
                fontWeight:      500,
                letterSpacing:   '0.16em',
                textTransform:   'uppercase',
                border:          'none',
                borderRadius:    '8px',
                cursor:          'pointer',
                transition:      'background-color 200ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
            >
              <Search size={14} />
              Find My Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
