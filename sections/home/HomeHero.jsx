'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';
import { festivals } from '@/data/festivals';
import { createPortal } from 'react-dom';

/* ─────────────────────────────────────────────────────────────────
   Option sets — values and URL keys UNCHANGED
───────────────────────────────────────────────────────────────── */
const FESTIVAL_OPTIONS = [
  { value: '', label: 'Any Festival' },
  ...festivals.map((f) => ({ value: f.slug, label: f.name.en })),
];

const DURATION_OPTIONS = [
  { value: '',     label: 'Any Duration' },
  { value: '1-7',  label: '1–7 days'    },
  { value: '8-12', label: '8–12 days'   },
  { value: '13+',  label: '13+ days'    },
];

const INTEREST_OPTIONS = [
  { value: '',            label: 'Any Interest' },
  { value: 'heritage',    label: 'Heritage'     },
  { value: 'wildlife',    label: 'Wildlife'     },
  { value: 'spiritual',   label: 'Spiritual'    },
  { value: 'rural',       label: 'Rural Life'   },
  { value: 'culinary',    label: 'Culinary'     },
  { value: 'photography', label: 'Photography'  },
];

/* ─────────────────────────────────────────────────────────────────
   Haveli Indigo design tokens
   Trigger surface: rgba(251,247,239,0.12) warm-ivory translucent
   Panel:           rgba(20,22,50,0.97)    deep indigo semi-opaque
   Selected:        marigold #E8A317
   Hover:           rgba(255,255,255,0.08)
───────────────────────────────────────────────────────────────── */
const T = {
  /* trigger */
  triggerBg:          'rgba(251, 247, 239, 0.12)',
  triggerBgHover:     'rgba(251, 247, 239, 0.20)',
  triggerBorder:      '1px solid rgba(240, 220, 168, 0.22)',
  triggerFocusShadow: '0 0 0 2px rgba(232,163,23,0.72)',
  triggerShadow:      '0 1px 4px rgba(20,20,43,0.14)',
  labelColor:         'rgba(251, 247, 239, 0.52)',
  valueColor:         'rgba(251, 247, 239, 0.95)',
  placeholderColor:   'rgba(251, 247, 239, 0.52)',
  chevronColor:       'rgba(251, 247, 239, 0.45)',
  divider:            'rgba(240, 220, 168, 0.18)',

  /* panel */
  panelBg:            'rgba(16, 20, 52, 0.97)',
  panelBorder:        '1px solid rgba(240,220,168,0.18)',
  panelRadius:        '12px',
  panelShadow:        '0 16px 48px rgba(14,16,40,0.55), 0 4px 16px rgba(14,16,40,0.30)',

  /* option */
  optionColor:        '#FBF7EF',
  optionHoverBg:      'rgba(255,255,255,0.08)',
  optionActiveBg:     'rgba(255,255,255,0.12)',
  selectedBg:         'rgba(232,163,23,0.18)',
  selectedColor:      '#E8A317',
  checkColor:         '#E8A317',
};

/* ─────────────────────────────────────────────────────────────────
   useDropdownPosition
   Computes {top, left, width, flipUp} for the panel portal.
   Recalculates on open and on window resize/scroll.
───────────────────────────────────────────────────────────────── */
function useDropdownPosition(triggerRef, isOpen) {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, flipUp: false });

  const recalc = useCallback(() => {
    if (!triggerRef.current) return;
    const r   = triggerRef.current.getBoundingClientRect();
    const vp  = window.innerHeight;
    const gap = 6;
    const maxPanelH = 280;
    const spaceBelow = vp - r.bottom;
    const flipUp     = spaceBelow < maxPanelH + gap && r.top > maxPanelH + gap;
    setPos({
      top:    flipUp
        ? r.top + window.scrollY - maxPanelH - gap
        : r.bottom + window.scrollY + gap,
      left:   Math.max(8, r.left + window.scrollX),
      width:  r.width,
      flipUp,
    });
  }, [triggerRef]);

  useEffect(() => {
    if (!isOpen) return;
    recalc();
    window.addEventListener('resize',  recalc, { passive: true });
    window.addEventListener('scroll',  recalc, { passive: true, capture: true });
    return () => {
      window.removeEventListener('resize',  recalc);
      window.removeEventListener('scroll',  recalc, { capture: true });
    };
  }, [isOpen, recalc]);

  return pos;
}

/* ─────────────────────────────────────────────────────────────────
   HeroSelect — fully accessible custom listbox
   Uses WAI-ARIA Listbox pattern (no Headless UI needed since it's
   a self-contained implementation that avoids portal issues).

   Keyboard:
     Trigger: Enter/Space/ArrowDown → open
     Arrow Up/Down → move active option
     Home/End → first/last option
     Enter/Space → select active
     Escape / Tab → close (Tab continues focus)
     Typeahead → match option label start
   Focus: trigger gets aria-activedescendant; option items have IDs.
───────────────────────────────────────────────────────────────── */
let _heroSelectIdCounter = 0;

function HeroSelect({ id, label, options, value, onChange, compact = false }) {
  const [open,       setOpen]       = useState(false);
  const [activeIdx,  setActiveIdx]  = useState(-1);
  const [mounted,    setMounted]    = useState(false);
  const [hovered,    setHovered]    = useState(false);
  const [focused,    setFocused]    = useState(false);

  const triggerRef = useRef(null);
  const listRef    = useRef(null);
  const baseId     = useRef(`hs-${id}-${++_heroSelectIdCounter}`);
  const listId     = `${baseId.current}-list`;
  const optId      = (i) => `${baseId.current}-opt-${i}`;
  const typeaheadBuf = useRef('');
  const typeaheadTimer = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  const selectedLabel = options.find(o => o.value === value)?.label ?? options[0]?.label ?? '';
  const isPlaceholder = value === '' || value === undefined;

  /* Panel portal position */
  const pos = useDropdownPosition(triggerRef, open && mounted);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        triggerRef.current?.contains(e.target) ||
        listRef.current?.contains(e.target)
      ) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open]);

  /* Scroll active option into view */
  useEffect(() => {
    if (!open || activeIdx < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`#${optId(activeIdx)}`);
    el?.scrollIntoView({ block: 'nearest' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, open]);

  /* When opening, set active to selected option (or 0) */
  const openMenu = useCallback(() => {
    const idx = Math.max(0, options.findIndex(o => o.value === value));
    setActiveIdx(idx);
    setOpen(true);
  }, [options, value]);

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    setActiveIdx(-1);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const selectOption = useCallback((opt) => {
    onChange(opt.value);
    closeMenu(true);
  }, [onChange, closeMenu]);

  /* Trigger key handler */
  const onTriggerKeyDown = (e) => {
    switch (e.key) {
      case 'Enter': case ' ': case 'ArrowDown':
        e.preventDefault();
        if (!open) openMenu();
        else {
          const next = Math.min(activeIdx + 1, options.length - 1);
          setActiveIdx(next);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) openMenu();
        else setActiveIdx(i => Math.max(i - 1, 0));
        break;
      case 'Home':
        if (open) { e.preventDefault(); setActiveIdx(0); }
        break;
      case 'End':
        if (open) { e.preventDefault(); setActiveIdx(options.length - 1); }
        break;
      case 'Escape':
        if (open) { e.preventDefault(); closeMenu(true); }
        break;
      case 'Tab':
        if (open) closeMenu(false);
        break;
      default: {
        /* Typeahead */
        if (e.key.length === 1) {
          clearTimeout(typeaheadTimer.current);
          typeaheadBuf.current += e.key.toLowerCase();
          const match = options.findIndex(o =>
            o.label.toLowerCase().startsWith(typeaheadBuf.current)
          );
          if (match >= 0) {
            if (!open) openMenu();
            setActiveIdx(match);
          }
          typeaheadTimer.current = setTimeout(() => {
            typeaheadBuf.current = '';
          }, 500);
        }
      }
    }
  };

  /* Option key handler */
  const onListKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIdx(i => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIdx(i => Math.max(i - 1, 0));
        break;
      case 'Home': e.preventDefault(); setActiveIdx(0); break;
      case 'End':  e.preventDefault(); setActiveIdx(options.length - 1); break;
      case 'Enter': case ' ':
        e.preventDefault();
        if (activeIdx >= 0) selectOption(options[activeIdx]);
        break;
      case 'Escape':
        e.preventDefault(); closeMenu(true); break;
      case 'Tab':
        closeMenu(false); break;
      default: onTriggerKeyDown(e);
    }
  };

  /* Sizes */
  const labelSize  = compact ? '8px'  : '9px';
  const valueSize  = compact ? '11px' : '12px';
  const trigPadV   = compact ? '6px'  : '9px';
  const trigPadH   = compact ? '10px' : '14px';
  const trigPadR   = compact ? '28px' : '32px';

  return (
    <div
      style={{ position: 'relative', flex: '1 1 0', minWidth: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Trigger button ─────────────────────────────────── */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && activeIdx >= 0 ? optId(activeIdx) : undefined}
        aria-label={`${label}: ${selectedLabel}`}
        onClick={() => open ? closeMenu(true) : openMenu()}
        onKeyDown={onTriggerKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width:           '100%',
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'flex-start',
          gap:             compact ? '3px' : '4px',
          padding:         `${trigPadV} ${trigPadR} ${trigPadV} ${trigPadH}`,
          position:        'relative',
          backgroundColor: hovered || focused ? T.triggerBgHover : T.triggerBg,
          border:          T.triggerBorder,
          borderRadius:    compact ? '6px' : '8px',
          boxShadow:       focused ? T.triggerFocusShadow : T.triggerShadow,
          cursor:          'pointer',
          transition:      'background-color 160ms ease, box-shadow 160ms ease',
          outline:         'none',
          overflow:        'hidden',
          textAlign:       'left',
          minHeight:       compact ? '44px' : '52px',
        }}
      >
        {/* Label text */}
        <span style={{
          fontFamily:    'var(--font-body, system-ui)',
          fontSize:      labelSize,
          fontWeight:    600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         T.labelColor,
          lineHeight:    1,
          whiteSpace:    'nowrap',
          pointerEvents: 'none',
          userSelect:    'none',
        }}>
          {label}
        </span>

        {/* Selected value */}
        <span style={{
          fontFamily:    'var(--font-body, system-ui)',
          fontSize:      valueSize,
          fontWeight:    500,
          color:         isPlaceholder ? T.placeholderColor : T.valueColor,
          lineHeight:    1.3,
          overflow:      'hidden',
          textOverflow:  'ellipsis',
          whiteSpace:    'nowrap',
          width:         '100%',
          pointerEvents: 'none',
          userSelect:    'none',
        }}>
          {selectedLabel}
        </span>

        {/* Chevron */}
        <span
          aria-hidden="true"
          style={{
            position:    'absolute',
            right:       compact ? '8px' : '10px',
            top:         '50%',
            transform:   open ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%) rotate(0deg)',
            transition:  'transform 160ms ease',
            color:       T.chevronColor,
            pointerEvents: 'none',
            display:     'flex',
            lineHeight:  0,
          }}
        >
          <ChevronDown size={compact ? 12 : 13} strokeWidth={2} />
        </span>
      </button>

      {/* ── Dropdown panel — rendered in portal to escape overflow ── */}
      {mounted && open && createPortal(
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          style={{
            position:        'fixed',
            top:             pos.flipUp
              ? (pos.top - window.scrollY) + 'px'
              : (pos.top - window.scrollY) + 'px',
            left:            (pos.left - window.scrollX) + 'px',
            width:           Math.max(pos.width, 180) + 'px',
            /* Clamp within viewport right edge */
            maxWidth:        `calc(100vw - ${(pos.left - window.scrollX) + 16}px)`,
            zIndex:          9999,
            backgroundColor: T.panelBg,
            border:          T.panelBorder,
            borderRadius:    T.panelRadius,
            boxShadow:       T.panelShadow,
            backdropFilter:  'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            maxHeight:       '280px',
            overflowY:       'auto',
            overflowX:       'hidden',
            padding:         '6px',
            listStyle:       'none',
            margin:          0,
            /* Open animation */
            animation:       'heroSelectOpen 160ms ease forwards',
            transformOrigin: pos.flipUp ? 'bottom center' : 'top center',
            /* Momentum scroll on iOS */
            WebkitOverflowScrolling: 'touch',
            outline:         'none',
            /* Scrollbar style */
            scrollbarWidth:  'thin',
            scrollbarColor:  'rgba(240,220,168,0.25) transparent',
          }}
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isActive   = i === activeIdx;
            return (
              <li
                key={opt.value}
                id={optId(i)}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => {
                  /* mousedown fires before blur; prevent trigger blur */
                  e.preventDefault();
                  selectOption(opt);
                }}
                onMouseEnter={() => setActiveIdx(i)}
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'space-between',
                  gap:             '8px',
                  padding:         '9px 12px',
                  borderRadius:    '8px',
                  cursor:          'pointer',
                  backgroundColor: isActive
                    ? (isSelected ? T.selectedBg : T.optionActiveBg)
                    : (isSelected ? T.selectedBg : 'transparent'),
                  color:           isSelected ? T.selectedColor : T.optionColor,
                  fontFamily:      'var(--font-body, system-ui)',
                  fontSize:        '13px',
                  fontWeight:      isSelected ? 500 : 400,
                  lineHeight:      1.4,
                  userSelect:      'none',
                  transition:      'background-color 100ms ease, color 100ms ease',
                  /* 44px minimum touch target via min-height */
                  minHeight:       '40px',
                  boxSizing:       'border-box',
                }}
              >
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {opt.label}
                </span>
                {isSelected && (
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    style={{ color: T.checkColor, flexShrink: 0 }}
                  />
                )}
              </li>
            );
          })}
        </ul>,
        document.body
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   VDivider — decorative separator between fields on desktop
───────────────────────────────────────────────────────────────── */
function VDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width:           '1px',
        alignSelf:       'stretch',
        backgroundColor: T.divider,
        flexShrink:      0,
        margin:          '10px 0',
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   HeroSearchBar — query-filter logic UNCHANGED
───────────────────────────────────────────────────────────────── */
function HeroSearchBar() {
  const router = useRouter();
  const [festival, setFestival] = useState('');
  const [duration, setDuration] = useState('');
  const [interest, setInterest] = useState('');

  const handleGo = () => {
    const params = new URLSearchParams();
    if (duration) params.set('duration',  duration);
    if (interest) params.set('interests', interest);
    if (festival) params.set('festival',  festival);
    const qs = params.toString();
    router.push(qs ? `/tours?${qs}` : '/tours');
  };

  const barBase = {
    background:           'rgba(27, 42, 94, 0.48)',
    border:               '1px solid rgba(240, 220, 168, 0.18)',
    borderRadius:         '12px',
    backdropFilter:       'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
  };

  const goBtn = (compact) => ({
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             compact ? '5px' : '7px',
    height:          compact ? '44px' : '52px',
    padding:         compact ? '0 18px' : '0 22px',
    backgroundColor: 'var(--color-secondary)',
    color:           'var(--color-text-on-gold)',
    fontFamily:      'var(--font-body, system-ui)',
    fontSize:        compact ? '9px' : '10px',
    fontWeight:      600,
    letterSpacing:   '0.16em',
    textTransform:   'uppercase',
    border:          'none',
    borderRadius:    compact ? '7px' : '8px',
    cursor:          'pointer',
    whiteSpace:      'nowrap',
    flexShrink:      0,
    transition:      'background-color 180ms ease, transform 180ms ease',
  });

  return (
    <div style={{ width: '100%' }}>

      {/* ── DESKTOP: single row ──────────────────────────── */}
      <div
        className="hidden md:flex"
        style={{
          ...barBase,
          alignItems: 'stretch',
          padding:    '10px 10px 10px 14px',
          gap:        '0',
          minHeight:  '72px',
          /* Must NOT have overflow:hidden — panel portal escapes via body */
        }}
      >
        <HeroSelect
          id="hs-festival"
          label="Festival"
          options={FESTIVAL_OPTIONS}
          value={festival}
          onChange={setFestival}
        />
        <VDivider />
        <HeroSelect
          id="hs-duration"
          label="Duration"
          options={DURATION_OPTIONS}
          value={duration}
          onChange={setDuration}
        />
        <VDivider />
        <HeroSelect
          id="hs-interest"
          label="Interest"
          options={INTEREST_OPTIONS}
          value={interest}
          onChange={setInterest}
        />

        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px', flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleGo}
            style={goBtn(false)}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Search size={13} aria-hidden="true" />
            Find My Journey
          </button>
        </div>
      </div>

      {/* ── MOBILE: Row 1 = 3 fields, Row 2 = centred Go ─── */}
      <div
        className="flex flex-col md:hidden"
        style={{ ...barBase, padding: '10px', gap: '8px' }}
      >
        <div style={{ display: 'flex', gap: '7px', alignItems: 'stretch' }}>
          <HeroSelect
            id="hs-festival-m"
            label="Festival"
            options={FESTIVAL_OPTIONS}
            value={festival}
            onChange={setFestival}
            compact
          />
          <HeroSelect
            id="hs-duration-m"
            label="Duration"
            options={DURATION_OPTIONS}
            value={duration}
            onChange={setDuration}
            compact
          />
          <HeroSelect
            id="hs-interest-m"
            label="Interest"
            options={INTEREST_OPTIONS}
            value={interest}
            onChange={setInterest}
            compact
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={handleGo}
            style={{ ...goBtn(true), width: '100%', maxWidth: '220px' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
          >
            <Search size={12} aria-hidden="true" />
            Find My Journey
          </button>
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HomeHero — unchanged
───────────────────────────────────────────────────────────────── */
export default function HomeHero() {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{
        minHeight:  '100vh',
        paddingTop: 'calc(var(--header-height-desktop) + 24px)',
      }}
    >
      <div className="absolute inset-0">
        {/* ── Mobile hero image (≤767px) ── */}
        {/* priority: mobile LCP; sizes 0px at desktop tells browser not to fetch */}
        <Image
          src="/home/home collag mobile.png"
          alt="Indian Routes & Trails — curated journeys across India"
          fill
          priority
          className="object-cover md:hidden"
          style={{ objectPosition: 'center 55%' }}
          sizes="(max-width: 767px) 100vw, 0px"
        />
        {/* ── Desktop hero image (≥768px) — original, unchanged ── */}
        {/* sizes 0px at mobile tells browser not to fetch on small screens */}
        <Image
          src="/home/home collag.png"
          alt="Amber Fort at dawn, Jaipur — Indian Routes & Trails"
          fill
          priority
          className="object-cover hidden md:block"
          style={{ objectPosition: 'center 80%' }}
          sizes="(min-width: 768px) 100vw, 0px"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--color-primary-dark) 0%, rgba(27,42,94,0.55) 45%, transparent 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(27,42,94,0.65) 0%, transparent 60%)' }} />
      </div>

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
