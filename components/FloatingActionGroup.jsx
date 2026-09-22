'use client';
/**
 * FloatingActionGroup
 * ───────────────────────────────────────────────────────────────
 * Fixed vertical stack at bottom-right:
 *   [Calendar button]  ← above
 *   [WhatsApp button]  ← below
 *
 * Both appear after 400px of scroll (same threshold as original WhatsApp).
 * z-index: 50 — above most content, below modals/drawers (z-60).
 * Bottom offset: 24px + env(safe-area-inset-bottom) for mobile notches.
 * Gap between buttons: 10px.
 * Calendar button: 48×48px touch target, tooltip on hover/focus.
 */

import { useState, useEffect, useRef } from 'react';
import { CalendarDays, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteContent';
import AvailabilityDrawer from './AvailabilityDrawer';

export default function FloatingActionGroup() {
  const [visible,     setVisible]     = useState(false);
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const calBtnRef = useRef(null);

  /* Show group after 400px scroll */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const groupStyle = {
    position:      'fixed',
    /* right + bottom — respects mobile safe areas */
    right:         '24px',
    bottom:        'calc(24px + env(safe-area-inset-bottom, 0px))',
    zIndex:        50,
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'flex-end',
    gap:           '10px',
    /* animate as a unit */
    opacity:       visible ? 1 : 0,
    transform:     visible ? 'translateY(0)' : 'translateY(14px)',
    pointerEvents: visible ? 'auto' : 'none',
    transition:    'opacity 300ms ease, transform 300ms ease',
  };

  const calBtnStyle = {
    position:        'relative',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    width:           '48px',
    height:          '48px',
    borderRadius:    '50%',
    border:          'none',
    cursor:          'pointer',
    backgroundColor: 'var(--color-primary)',
    color:           '#fff',
    boxShadow:       '0 4px 16px rgba(27,42,94,0.35)',
    transition:      'background-color 200ms ease, transform 200ms ease',
  };

  const waBtnStyle = {
    display:         'flex',
    alignItems:      'center',
    gap:             '8px',
    padding:         '12px 16px',
    borderRadius:    'var(--radius-pill)',
    backgroundColor: 'var(--color-whatsapp)',
    color:           '#fff',
    textDecoration:  'none',
    boxShadow:       '0 4px 16px rgba(37,193,104,0.4)',
    transition:      'background-color 200ms ease, transform 200ms ease',
  };

  return (
    <>
      <div style={groupStyle} aria-hidden={!visible}>

        {/* Calendar button */}
        <div style={{ position: 'relative' }}>
          {/* Tooltip */}
          {tooltipVisible && (
            <div
              role="tooltip"
              id="cal-tooltip"
              style={{
                position:        'absolute',
                right:           'calc(100% + 10px)',
                top:             '50%',
                transform:       'translateY(-50%)',
                backgroundColor: 'var(--color-text)',
                color:           '#fff',
                fontFamily:      'var(--font-body, system-ui)',
                fontSize:        '11px',
                whiteSpace:      'nowrap',
                padding:         '5px 10px',
                borderRadius:    '6px',
                pointerEvents:   'none',
                zIndex:          51,
              }}
            >
              Check available dates
              {/* Arrow pointing right */}
              <span style={{
                position:    'absolute',
                left:        '100%',
                top:         '50%',
                transform:   'translateY(-50%)',
                borderTop:   '5px solid transparent',
                borderBottom:'5px solid transparent',
                borderLeft:  '5px solid var(--color-text)',
              }} />
            </div>
          )}

          <button
            ref={calBtnRef}
            aria-label="Check available dates"
            aria-describedby="cal-tooltip"
            onClick={() => setDrawerOpen(true)}
            style={calBtnStyle}
            onMouseEnter={e => {
              setTooltipVisible(true);
              e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              setTooltipVisible(false);
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onFocus={() => setTooltipVisible(true)}
            onBlur={() => setTooltipVisible(false)}
          >
            <CalendarDays size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Om on WhatsApp"
          style={waBtnStyle}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <MessageCircle size={18} strokeWidth={2} />
          <span
            className="hidden sm:inline"
            style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}
          >
            WhatsApp
          </span>
        </a>
      </div>

      {/* Availability drawer */}
      <AvailabilityDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        triggerRef={calBtnRef}
      />
    </>
  );
}
