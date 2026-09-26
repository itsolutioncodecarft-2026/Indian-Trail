'use client';
/**
 * FloatingActionGroup
 * ───────────────────────────────────────────────────────────────
 * Two fixed UI elements, rendered once globally via layout.js.
 *
 * 1. AVAILABILITY EDGE TAB
 *    Desktop (≥768px):
 *      • Outer wrapper: position:fixed; top:50%; translateY(-50%)
 *        This layer is NEVER touched by animation — pure centering.
 *      • Inner .avail-tab-nudge span: CSS @keyframes avail-nudge
 *        translates only on X-axis (12px inward/outward).
 *        Duration 3.5s, ease-in-out, infinite alternate — restrained.
 *      • Tab surface: Haveli Indigo #1B2A5E at 91% opacity,
 *        backdrop-filter blur(10px), left-rounded corners (12px 0 0 12px),
 *        1px marigold-tinted border, layered indigo+gold shadow/glow.
 *      • CalendarDays icon (24px, warm ivory) + "Check Availability" label.
 *      • Hover/focus: animation paused, tab snaps in, icon scale(1.06),
 *        glow strengthens. NO rotation, bounce or flash.
 *      • prefers-reduced-motion: animation fully disabled.
 *    Mobile (<768px):
 *      • Compact 48×48px rounded-square button, bottom-right,
 *        above WhatsApp. Same icon, accessible label, no idle animation.
 *
 * 2. WHATSAPP BUTTON — scroll-triggered (>400px), bottom-right.
 *
 * Z-index stack:
 *   WhatsApp:  50
 *   Edge tab:  55  (above page, below open drawer)
 *   Backdrop:  59  (AvailabilityDrawer)
 *   Drawer:    60  (AvailabilityDrawer)
 */

import { useState, useEffect, useRef } from 'react';
import { CalendarDays, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteContent';
import AvailabilityDrawer from './AvailabilityDrawer';

/* ── Shadow/glow tokens ──────────────────────────────────────────
   Rest:    close shadow + faint marigold outer glow
   Hover:   close shadow + stronger marigold glow
   All low-alpha — premium, not neon.
──────────────────────────────────────────────────────────────── */
const SHADOW_REST  = [
  '-4px 0 20px rgba(20, 20, 43, 0.28)',
  '0 0 18px rgba(232, 163, 23, 0.14)',
].join(', ');

const SHADOW_HOVER = [
  '-4px 0 24px rgba(20, 20, 43, 0.34)',
  '0 0 24px rgba(232, 163, 23, 0.26)',
  '0 0 6px  rgba(232, 163, 23, 0.18)',
].join(', ');

const SHADOW_MOBILE = '0 4px 16px rgba(27, 42, 94, 0.32), 0 0 12px rgba(232,163,23,0.12)';

/* ── Tab surface colour ──────────────────────────────────────────
   Haveli Indigo #1B2A5E at 91% opacity → rgba(27,42,94,0.91)
   Hover: slightly lighter shade #2E4491 → rgba(46,68,145,0.94)
──────────────────────────────────────────────────────────────── */
const BG_REST  = 'rgba(27, 42, 94, 0.91)';
const BG_HOVER = 'rgba(46, 68, 145, 0.94)';

export default function FloatingActionGroup() {
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [waVisible,   setWaVisible]   = useState(false);
  const [interacting, setInteracting] = useState(false);
  const tabBtnRef = useRef(null);

  /* WhatsApp: appear after 400 px scroll */
  useEffect(() => {
    const onScroll = () => setWaVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDrawer  = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1a. DESKTOP EDGE TAB  (hidden on mobile via CSS class)
          ════════════════════════════════════════════════════════ */}
      <div
        className="avail-tab-desktop-wrapper"
        style={{
          position:      'fixed',
          top:           '50%',
          right:         0,
          zIndex:        55,
          /* ── ONLY vertical centering here ──
             Animation must NOT touch this transform.
             The inner span owns the X-axis movement. */
          transform:     'translateY(-50%)',
          /* Hide when drawer is open — drawer's X button takes over */
          opacity:       drawerOpen ? 0 : 1,
          pointerEvents: drawerOpen ? 'none' : 'auto',
          transition:    'opacity 220ms ease',
        }}
      >
        {/*
          Inner animated layer — owns translateX nudge only.
          CSS class avail-tab-nudge applies @keyframes avail-nudge.
          avail-tab-nudge--paused stops it on hover/focus.
          When interacting, inline style snaps it to translateX(0).
        */}
        <span
          className={`avail-tab-nudge${interacting ? ' avail-tab-nudge--paused' : ''}`}
          style={{
            display:    'block',
            /* Snap fully visible on hover — overrides keyframe mid-cycle */
            transform:  interacting ? 'translateX(0px)' : undefined,
            transition: interacting ? 'transform 200ms ease-out' : undefined,
          }}
        >
          <button
            ref={tabBtnRef}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
            aria-controls="availability-drawer"
            aria-label="Check availability"
            onClick={openDrawer}
            onMouseEnter={() => setInteracting(true)}
            onMouseLeave={() => setInteracting(false)}
            onFocus={() => setInteracting(true)}
            onBlur={() => setInteracting(false)}
            style={{
              /* Reset button defaults */
              appearance:  'none',
              padding:     0,
              border:      'none',
              background:  'none',
              cursor:      'pointer',
              /* Flex row: icon cell + label panel */
              display:     'flex',
              alignItems:  'stretch',
              /* Focus ring handled via :focus-visible in globals */
              outline:     'none',
              borderRadius: '12px 0 0 12px',
            }}
          >
            {/* ── Icon cell — always visible ─────────────────── */}
            <span
              aria-hidden="true"
              style={{
                display:          'flex',
                alignItems:       'center',
                justifyContent:   'center',
                width:            '54px',
                height:           '56px',
                flexShrink:       0,
                backgroundColor:  interacting ? BG_HOVER : BG_REST,
                backdropFilter:   'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius:     '12px 0 0 12px',
                /* Marigold-tinted 1px border, right side open */
                border:           '1px solid rgba(240, 220, 168, 0.22)',
                borderRight:      'none',
                boxShadow:        interacting ? SHADOW_HOVER : SHADOW_REST,
                transition:       'background-color 200ms ease, box-shadow 220ms ease',
              }}
            >
              <CalendarDays
                size={24}
                strokeWidth={1.7}
                aria-hidden="true"
                style={{
                  color:      '#FBF7EF',          /* warm ivory — high contrast on indigo */
                  display:    'block',
                  flexShrink: 0,
                  transform:  interacting ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 200ms ease',
                }}
              />
            </span>

            {/* ── Label panel — slides in on hover/focus ─────── */}
            <span
              aria-hidden="true"
              style={{
                display:         'flex',
                alignItems:      'center',
                height:          '56px',
                overflow:        'hidden',
                whiteSpace:      'nowrap',
                /* Reveal via max-width transition */
                maxWidth:        interacting ? '148px' : '0px',
                paddingLeft:     interacting ? '10px'  : '0px',
                paddingRight:    interacting ? '16px'  : '0px',
                backgroundColor: interacting ? BG_HOVER : BG_REST,
                backdropFilter:  'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                /* Right border of the label panel — completes the tab */
                borderTop:       '1px solid rgba(240, 220, 168, 0.22)',
                borderBottom:    '1px solid rgba(240, 220, 168, 0.22)',
                borderLeft:      'none',
                borderRight:     'none',
                boxShadow:       interacting ? SHADOW_HOVER : 'none',
                transition: [
                  'max-width 220ms ease',
                  'padding-left 220ms ease',
                  'padding-right 220ms ease',
                  'background-color 200ms ease',
                  'box-shadow 220ms ease',
                ].join(', '),
                pointerEvents: 'none',
              }}
            >
              <span style={{
                fontFamily:    'var(--font-body, system-ui)',
                fontSize:      '10px',
                fontWeight:    600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         '#FBF7EF',
                whiteSpace:    'nowrap',
                lineHeight:    1,
              }}>
                Check Availability
              </span>
            </span>
          </button>
        </span>
      </div>

      {/* ════════════════════════════════════════════════════════
          1b. MOBILE BUTTON  (hidden on desktop via CSS class)
          ════════════════════════════════════════════════════════ */}
      <div
        className="avail-tab-mobile-wrapper"
        style={{
          position:      'fixed',
          right:         '20px',
          zIndex:        55,
          bottom:        `calc(${waVisible ? '76px' : '24px'} + env(safe-area-inset-bottom, 0px))`,
          opacity:       drawerOpen ? 0 : 1,
          pointerEvents: drawerOpen ? 'none' : 'auto',
          transition:    'bottom 300ms ease, opacity 200ms ease',
        }}
      >
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
          aria-controls="availability-drawer"
          aria-label="Check availability"
          title="Check availability"
          onClick={openDrawer}
          style={{
            display:          'flex',
            alignItems:       'center',
            justifyContent:   'center',
            width:            '48px',
            height:           '48px',
            borderRadius:     '12px',
            border:           '1px solid rgba(240,220,168,0.20)',
            backgroundColor:  BG_REST,
            backdropFilter:   'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow:        SHADOW_MOBILE,
            cursor:           'pointer',
            transition:       'background-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = BG_HOVER;
            e.currentTarget.style.transform = 'scale(1.07)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = BG_REST;
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <CalendarDays
            size={22}
            strokeWidth={1.7}
            aria-hidden="true"
            style={{ color: '#FBF7EF', display: 'block' }}
          />
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════
          2. WHATSAPP — scroll-triggered
          ════════════════════════════════════════════════════════ */}
      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Om on WhatsApp"
        style={{
          position:        'fixed',
          right:           '20px',
          bottom:          'calc(24px + env(safe-area-inset-bottom, 0px))',
          zIndex:          50,
          display:         'flex',
          alignItems:      'center',
          gap:             '8px',
          padding:         '12px 16px',
          borderRadius:    'var(--radius-pill)',
          backgroundColor: 'var(--color-whatsapp)',
          color:           '#fff',
          textDecoration:  'none',
          boxShadow:       '0 4px 16px rgba(37,193,104,0.40)',
          opacity:         waVisible ? 1 : 0,
          pointerEvents:   waVisible ? 'auto' : 'none',
          transform:       waVisible ? 'translateY(0)' : 'translateY(12px)',
          transition:      'opacity 300ms ease, transform 300ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = waVisible ? 'translateY(0)' : 'translateY(12px)'; }}
      >
        <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
        <span
          className="hidden sm:inline"
          style={{
            fontFamily:    'var(--font-body, system-ui)',
            fontSize:      '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight:    500,
          }}
        >
          WhatsApp
        </span>
      </a>

      {/* ════════════════════════════════════════════════════════
          Availability Drawer — single global instance
          ════════════════════════════════════════════════════════ */}
      <AvailabilityDrawer
        id="availability-drawer"
        open={drawerOpen}
        onClose={closeDrawer}
        triggerRef={tabBtnRef}
      />
    </>
  );
}
