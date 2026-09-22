'use client';
/**
 * AvailabilityDrawer
 * ─────────────────────────────────────────────────────────────────
 * Slide-in drawer showing admin Google Calendar availability.
 * Desktop: right-edge panel ~400px wide, full height.
 * Mobile: bottom sheet, full width.
 *
 * Accessibility:
 *   role="dialog" aria-modal="true" aria-labelledby
 *   Focus trap (Tab / Shift+Tab cycle within drawer)
 *   Escape closes; backdrop click closes
 *   Focus returns to trigger on close
 *   Body scroll locked while open
 *   Unavailable cells: aria-disabled="true", not keyboard-selectable
 *   Disabled message inline on click
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, ChevronLeft, ChevronRight, Calendar, AlertCircle } from 'lucide-react';

/* ── helpers ─────────────────────────────────────────────────────── */
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS   = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

function toIso(year, month1, day) {
  return `${year}-${String(month1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}
function todayIso() { return new Date().toISOString().slice(0, 10); }

/** Build a 6-row grid of {iso, day, inMonth, isPast, isToday} */
function buildGrid(year, month0) {
  const today    = todayIso();
  const firstDay = new Date(year, month0, 1).getDay(); // 0=Sun
  const daysInM  = new Date(year, month0 + 1, 0).getDate();
  const cells    = [];
  // leading blanks
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInM; d++) {
    const iso = toIso(year, month0 + 1, d);
    cells.push({ iso, day: d, inMonth: true, isPast: iso < today, isToday: iso === today });
  }
  // trailing blanks to fill 6 rows
  while (cells.length < 42) cells.push(null);
  return cells;
}

/* ── focus trap ──────────────────────────────────────────────────── */
const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';
function trapFocus(e, panelRef) {
  const els = Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) ?? []);
  if (!els.length) return;
  const first = els[0];
  const last  = els[els.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
}

/* ── Legend chip ─────────────────────────────────────────────────── */
function LegendChip({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: color, flexShrink: 0 }} />
      <span style={{ fontFamily: 'var(--font-body, system-ui)', fontSize: '10px', color: 'var(--color-text-muted)' }}>
        {label}
      </span>
    </div>
  );
}

/* ── main component ──────────────────────────────────────────────── */
export default function AvailabilityDrawer({ open, onClose, triggerRef }) {
  const router = useRouter();

  // Calendar state
  const today0     = new Date();
  const [viewYear,  setViewYear]  = useState(today0.getFullYear());
  const [viewMonth, setViewMonth] = useState(today0.getMonth()); // 0-based

  // Data state
  const [busyDates,    setBusyDates]    = useState(null);  // null=loading, []=loaded
  const [loadError,    setLoadError]    = useState(false);
  const [loadingMonth, setLoadingMonth] = useState('');

  // Selection
  const [selected,      setSelected]      = useState(null);  // ISO string
  const [disabledMsg,   setDisabledMsg]   = useState(null);  // {iso, msg}

  const panelRef = useRef(null);
  const monthKey = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;

  /* ── body scroll lock ────────────────────────────────────────── */
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  /* ── focus management ────────────────────────────────────────── */
  useEffect(() => {
    if (open) {
      // focus first focusable in panel after transition
      const t = setTimeout(() => {
        const el = panelRef.current?.querySelector(FOCUSABLE);
        el?.focus();
      }, 320);
      return () => clearTimeout(t);
    } else {
      // return focus to trigger
      triggerRef?.current?.focus();
    }
  }, [open, triggerRef]);

  /* ── keyboard trap + Escape ──────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      trapFocus(e, panelRef);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  /* ── load availability data ──────────────────────────────────── */
  const loadMonth = useCallback(async (key) => {
    setLoadingMonth(key);
    setLoadError(false);
    setBusyDates(null);
    try {
      const res  = await fetch(`/api/calendar/availability?month=${key}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setBusyDates(data.busyDates ?? []);
    } catch {
      setLoadError(true);
      setBusyDates(null);
    } finally {
      setLoadingMonth('');
    }
  }, []);

  useEffect(() => {
    if (open) loadMonth(monthKey);
  }, [open, monthKey, loadMonth]);

  /* ── navigation ──────────────────────────────────────────────── */
  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelected(null); setDisabledMsg(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelected(null); setDisabledMsg(null);
  };
  const goToday = () => {
    const d = new Date();
    setViewYear(d.getFullYear()); setViewMonth(d.getMonth());
    setSelected(null); setDisabledMsg(null);
  };

  /* ── cell interaction ────────────────────────────────────────── */
  const isBusy = (iso) => busyDates?.includes(iso) ?? false;

  const handleCellClick = (cell) => {
    if (!cell) return;
    if (cell.isPast) {
      setDisabledMsg({ iso: cell.iso, msg: "Past dates can't be selected" });
      return;
    }
    if (isBusy(cell.iso)) {
      setDisabledMsg({ iso: cell.iso, msg: "This date can't be selected" });
      return;
    }
    setSelected(cell.iso);
    setDisabledMsg(null);
  };

  const handleCellKeyDown = (e, cell) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCellClick(cell); }
  };

  /* ── continue to enquiry ─────────────────────────────────────── */
  const handleContinue = () => {
    if (!selected) return;
    onClose();
    router.push(`/contact?date=${selected}`);
  };

  /* ── calendar grid ───────────────────────────────────────────── */
  const grid = buildGrid(viewYear, viewMonth);
  const busySet = new Set(busyDates ?? []);

  /* ── styles ──────────────────────────────────────────────────── */
  const isPrevDisabled = viewYear === today0.getFullYear() && viewMonth <= today0.getMonth();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position:        'fixed',
          inset:           0,
          zIndex:          59,
          backgroundColor: 'rgba(20,20,43,0.55)',
          backdropFilter:  'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          animation:       'fadeIn 250ms ease forwards',
        }}
      />

      {/* Drawer panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        style={{
          position:        'fixed',
          zIndex:          60,
          backgroundColor: 'var(--color-surface)',
          overflowY:       'auto',
          display:         'flex',
          flexDirection:   'column',
          /* Desktop: right panel */
          top:             0,
          right:           0,
          bottom:          0,
          width:           'min(420px, 100vw)',
          boxShadow:       '-4px 0 32px rgba(20,20,43,0.18)',
          animation:       'slideInRight 300ms cubic-bezier(0.4,0,0.2,1) forwards',
        }}
        /* Mobile override via media query is applied in globals via className */
        className="availability-drawer"
      >
        {/* Header */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '18px 20px 14px',
            borderBottom:   '1px solid var(--color-border)',
            flexShrink:     0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
            <h2
              id="drawer-title"
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize:   '1.1rem',
                fontWeight: 400,
                color:      'var(--color-text)',
                margin:     0,
              }}
            >
              Check Available Dates
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close availability calendar"
            style={{
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              width:           '36px',
              height:          '36px',
              borderRadius:    '50%',
              border:          'none',
              backgroundColor: 'transparent',
              cursor:          'pointer',
              color:           'var(--color-text-muted)',
              transition:      'background-color 180ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Month navigation */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '12px 20px',
            flexShrink:     0,
          }}
        >
          <button
            onClick={prevMonth}
            disabled={isPrevDisabled}
            aria-label="Previous month"
            style={{
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              width:           '32px',
              height:          '32px',
              borderRadius:    '50%',
              border:          'none',
              backgroundColor: 'transparent',
              cursor:          isPrevDisabled ? 'default' : 'pointer',
              color:           isPrevDisabled ? 'var(--color-border-strong)' : 'var(--color-text)',
              transition:      'background-color 180ms ease',
            }}
            onMouseEnter={e => { if (!isPrevDisabled) e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)'; }}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronLeft size={16} />
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-display, Georgia, serif)',
              fontSize:   '1rem',
              fontWeight: 400,
              color:      'var(--color-text)',
              margin:     0,
            }}>
              {MONTHS[viewMonth]} {viewYear}
            </p>
          </div>

          <button
            onClick={nextMonth}
            aria-label="Next month"
            style={{
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              width:           '32px',
              height:          '32px',
              borderRadius:    '50%',
              border:          'none',
              backgroundColor: 'transparent',
              cursor:          'pointer',
              color:           'var(--color-text)',
              transition:      'background-color 180ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Weekday headers */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            padding:             '0 16px',
            marginBottom:        '4px',
            flexShrink:          0,
          }}
        >
          {WEEKDAYS.map((d) => (
            <div key={d} style={{
              textAlign:     'center',
              fontFamily:    'var(--font-body, system-ui)',
              fontSize:      '10px',
              fontWeight:    500,
              letterSpacing: '0.1em',
              color:         'var(--color-text-muted)',
              padding:       '2px 0 6px',
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ padding: '0 16px', flex: 1, minHeight: 0 }}>
          {/* Loading skeleton */}
          {(busyDates === null && !loadError) && (
            <div
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap:                 '4px',
              }}
            >
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height:        '36px',
                    borderRadius:  'var(--radius-control)',
                    backgroundColor: 'var(--color-border)',
                    animation:     'pulse 1.4s ease-in-out infinite',
                    animationDelay: `${(i % 7) * 60}ms`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Error / retry */}
          {loadError && (
            <div style={{ textAlign: 'center', padding: '24px 16px' }}>
              <AlertCircle size={28} style={{ color: 'var(--color-error)', margin: '0 auto 8px' }} />
              <p style={{
                fontFamily: 'var(--font-body, system-ui)',
                fontSize:   '13px',
                color:      'var(--color-text-muted)',
                margin:     '0 0 12px',
              }}>
                Could not load availability. Please try again.
              </p>
              <button
                onClick={() => loadMonth(monthKey)}
                style={{
                  fontFamily:      'var(--font-body, system-ui)',
                  fontSize:        '11px',
                  letterSpacing:   '0.14em',
                  textTransform:   'uppercase',
                  padding:         '8px 18px',
                  backgroundColor: 'var(--color-primary)',
                  color:           '#fff',
                  border:          'none',
                  borderRadius:    'var(--radius-control)',
                  cursor:          'pointer',
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Loaded grid */}
          {busyDates !== null && !loadError && (
            <div
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap:                 '3px',
              }}
            >
              {grid.map((cell, idx) => {
                if (!cell) {
                  return <div key={idx} />;
                }
                const busy      = busySet.has(cell.iso);
                const disabled  = cell.isPast || busy;
                const isSelected = selected === cell.iso;
                const showMsg   = disabledMsg?.iso === cell.iso;

                let bg = 'transparent';
                let fg = 'var(--color-text)';
                let border = '1px solid transparent';
                let cursor = 'pointer';

                if (isSelected) {
                  bg = 'var(--color-primary)'; fg = '#fff';
                  border = '1px solid var(--color-primary)';
                } else if (cell.isToday && !disabled) {
                  border = '1px solid var(--color-primary)';
                  fg = 'var(--color-primary)';
                } else if (disabled) {
                  fg = 'var(--color-border-strong)';
                  cursor = 'default';
                  if (busy) bg = 'rgba(20,34,77,0.06)';
                }

                return (
                  <div key={cell.iso} style={{ position: 'relative' }}>
                    <div
                      role={disabled ? undefined : 'button'}
                      tabIndex={disabled ? -1 : 0}
                      aria-label={
                        cell.isPast ? `${cell.iso} — past date` :
                        busy        ? `${cell.iso} — unavailable` :
                                     `Select ${cell.iso}`
                      }
                      aria-disabled={disabled ? 'true' : undefined}
                      aria-pressed={isSelected ? 'true' : undefined}
                      onClick={() => handleCellClick(cell)}
                      onKeyDown={(e) => !disabled && handleCellKeyDown(e, cell)}
                      style={{
                        display:         'flex',
                        alignItems:      'center',
                        justifyContent:  'center',
                        height:          '36px',
                        borderRadius:    'var(--radius-control)',
                        backgroundColor: bg,
                        color:           fg,
                        border,
                        cursor,
                        fontFamily:      'var(--font-body, system-ui)',
                        fontSize:        '12px',
                        fontWeight:      isSelected || cell.isToday ? 500 : 400,
                        transition:      'background-color 160ms ease, border-color 160ms ease',
                        outline:         'none',
                        textDecoration:  busy && !cell.isPast ? 'line-through' : 'none',
                        opacity:         cell.isPast ? 0.38 : 1,
                        userSelect:      'none',
                      }}
                      onMouseEnter={e => {
                        if (!disabled && !isSelected)
                          e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)';
                      }}
                      onMouseLeave={e => {
                        if (!disabled && !isSelected)
                          e.currentTarget.style.backgroundColor = bg;
                      }}
                    >
                      {cell.day}
                    </div>
                    {/* Inline disabled message */}
                    {showMsg && (
                      <div
                        role="alert"
                        style={{
                          position:        'absolute',
                          bottom:          'calc(100% + 4px)',
                          left:            '50%',
                          transform:       'translateX(-50%)',
                          backgroundColor: 'var(--color-text)',
                          color:           '#fff',
                          fontFamily:      'var(--font-body, system-ui)',
                          fontSize:        '9px',
                          whiteSpace:      'nowrap',
                          padding:         '4px 8px',
                          borderRadius:    '4px',
                          zIndex:          10,
                          pointerEvents:   'none',
                        }}
                      >
                        {disabledMsg.msg}
                        <span style={{
                          position:        'absolute',
                          bottom:          '-4px',
                          left:            '50%',
                          transform:       'translateX(-50%)',
                          borderLeft:      '4px solid transparent',
                          borderRight:     '4px solid transparent',
                          borderTop:       '4px solid var(--color-text)',
                        }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Legend */}
        <div
          style={{
            display:    'flex',
            gap:        '16px',
            flexWrap:   'wrap',
            padding:    '14px 20px 0',
            flexShrink: 0,
          }}
        >
          <LegendChip color="var(--color-primary)" label="Available" />
          <LegendChip color="rgba(20,34,77,0.15)"  label="Unavailable" />
          <LegendChip color="var(--color-border)"   label="Past" />
        </div>

        {/* Today button */}
        <div style={{ padding: '8px 20px 4px', flexShrink: 0 }}>
          <button
            onClick={goToday}
            style={{
              fontFamily:      'var(--font-body, system-ui)',
              fontSize:        '10px',
              letterSpacing:   '0.14em',
              textTransform:   'uppercase',
              color:           'var(--color-primary)',
              backgroundColor: 'transparent',
              border:          'none',
              cursor:          'pointer',
              padding:         '4px 0',
              textDecoration:  'underline',
              textUnderlineOffset: '2px',
            }}
          >
            Today
          </button>
        </div>

        {/* Selected date + CTA */}
        <div
          style={{
            padding:      '12px 20px 20px',
            borderTop:    '1px solid var(--color-border)',
            marginTop:    'auto',
            flexShrink:   0,
          }}
        >
          {selected ? (
            <>
              <p style={{
                fontFamily:   'var(--font-body, system-ui)',
                fontSize:     '11px',
                color:        'var(--color-text-muted)',
                marginBottom: '10px',
              }}>
                Selected:{' '}
                <strong style={{ color: 'var(--color-text)' }}>
                  {new Date(selected + 'T00:00:00').toLocaleDateString('en-GB', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </strong>
              </p>
              <button
                onClick={handleContinue}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Continue to Enquiry →
              </button>
            </>
          ) : (
            <p style={{
              fontFamily:  'var(--font-body, system-ui)',
              fontSize:    '11px',
              color:       'var(--color-text-muted)',
              textAlign:   'center',
              margin:      0,
            }}>
              Select an available date to continue your enquiry
            </p>
          )}
        </div>
      </div>
    </>
  );
}
