'use client';
/**
 * AvailabilityDrawer
 * ─────────────────────────────────────────────────────────────────
 * Slide-in drawer showing Google Calendar availability.
 * Uses shared useCalendarEvents hook — same data as EnquiryForm.
 *
 * Features:
 *   - Real Indian holiday names from Google Calendar (Diwali/Deepavali, Holi…)
 *   - Multiple festivals on same date: first label + "+N more" chip
 *   - Selected-date details panel shows ALL festival names in full
 *   - Festival dates remain selectable (blocksAvailability:false)
 *   - Booking-blocked dates shown as unavailable (strikethrough)
 *   - Festival + booking on same date: name visible, date disabled
 *   - Continue to Enquiry → /contact?date=YYYY-MM-DD
 *
 * Accessibility: role="dialog", focus trap, Escape closes, body lock.
 */

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, ChevronLeft, ChevronRight, Calendar, AlertCircle, CalendarDays } from 'lucide-react';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { getFestivalsForDate, isDateBlocked } from '@/lib/calendarUtils';

/* ── constants ───────────────────────────────────────────────────── */
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS   = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

function toIso(year, month1, day) {
  return `${year}-${String(month1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}
function todayIso() { return new Date().toISOString().slice(0, 10); }

function buildGrid(year, month0) {
  const today   = todayIso();
  const first   = new Date(year, month0, 1).getDay();
  const daysInM = new Date(year, month0 + 1, 0).getDate();
  const cells   = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInM; d++) {
    const iso = toIso(year, month0 + 1, d);
    cells.push({ iso, day: d, isPast: iso < today, isToday: iso === today });
  }
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
  if (e.key !== 'Tab') return;
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
}

/* ── Legend chip ─────────────────────────────────────────────────── */
function LegendChip({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span style={{
        width: '10px', height: '10px', borderRadius: '2px',
        backgroundColor: color, flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'var(--font-body, system-ui)', fontSize: '10px',
        color: 'var(--color-text-muted)',
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Festival pills (cell) ───────────────────────────────────────── */
function FestivalMicro({ festivals, selected }) {
  if (!festivals.length) return null;
  const first = festivals[0].title;
  return (
    <span
      title={festivals.map(f => f.title).join(' · ')}
      style={{
        fontSize: '7px', fontWeight: 500, lineHeight: 1.1,
        letterSpacing: '0.03em',
        color: selected ? 'rgba(255,255,255,0.85)' : 'var(--color-secondary-hover)',
        maxWidth: '100%', overflow: 'hidden',
        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        display: 'block', textDecoration: 'none',
      }}
    >
      {first.length > 7 ? first.slice(0, 6) + '…' : first}
      {festivals.length > 1 && ` +${festivals.length - 1}`}
    </span>
  );
}

/* ── main component ──────────────────────────────────────────────── */
export default function AvailabilityDrawer({ open, onClose, triggerRef, id }) {
  const router = useRouter();
  const today0 = new Date();

  const [viewYear,  setViewYear]  = useState(today0.getFullYear());
  const [viewMonth, setViewMonth] = useState(today0.getMonth());
  const [selected,    setSelected]    = useState(null);
  const [disabledMsg, setDisabledMsg] = useState(null);

  const panelRef = useRef(null);

  // Shared calendar events hook — fires when drawer opens
  const { events, loading, error, notConfigured, retry } = useCalendarEvents(open);

  /* ── body scroll lock ────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  /* ── focus management ────────────────────────────────────────── */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        panelRef.current?.querySelector(FOCUSABLE)?.focus();
      }, 320);
      return () => clearTimeout(t);
    } else {
      triggerRef?.current?.focus();
    }
  }, [open, triggerRef]);

  /* ── keyboard: Escape + focus trap ──────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      trapFocus(e, panelRef);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

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

  /* ── cell helpers ────────────────────────────────────────────── */
  const isBusy     = (iso) => isDateBlocked(events, iso);
  const getHols    = (iso) => getFestivalsForDate(events, iso);

  const handleCellClick = (cell) => {
    if (!cell) return;
    if (cell.isPast) {
      setDisabledMsg({ iso: cell.iso, msg: "Past dates can't be selected" });
      return;
    }
    if (isBusy(cell.iso)) {
      setDisabledMsg({ iso: cell.iso, msg: 'This date is unavailable' });
      return;
    }
    setSelected(cell.iso);
    setDisabledMsg(null);
  };

  const handleKeyDown = (e, cell) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCellClick(cell); }
  };

  /* ── continue to enquiry ─────────────────────────────────────── */
  const handleContinue = () => {
    if (!selected) return;
    onClose();
    router.push(`/contact?date=${encodeURIComponent(selected)}`);
  };

  /* ── derived ─────────────────────────────────────────────────── */
  const grid              = buildGrid(viewYear, viewMonth);
  const isPrevDisabled    = viewYear === today0.getFullYear() && viewMonth <= today0.getMonth();
  const selectedFestivals = selected ? getHols(selected) : [];

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 59,
          backgroundColor: 'rgba(20,20,43,0.55)',
          backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
          animation: 'fadeIn 250ms ease forwards',
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby="avail-drawer-title"
        className="availability-drawer"
        style={{
          position: 'fixed', zIndex: 60,
          top: 0, right: 0, bottom: 0,
          width: 'min(420px, 100vw)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: '-4px 0 32px rgba(20,20,43,0.18)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
          animation: 'slideInRight 300ms cubic-bezier(0.4,0,0.2,1) forwards',
        }}
      >
        {/* ── Header ────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px 14px',
          borderBottom: '1px solid var(--color-border)', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
            <h2
              id="avail-drawer-title"
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: '1.1rem', fontWeight: 400,
                color: 'var(--color-text)', margin: 0,
              }}
            >
              Check Available Dates
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close availability calendar"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '50%',
              border: 'none', backgroundColor: 'transparent',
              cursor: 'pointer', color: 'var(--color-text-muted)',
              transition: 'background-color 180ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Month nav ─────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px', flexShrink: 0,
        }}>
          <button
            onClick={prevMonth}
            disabled={isPrevDisabled}
            aria-label="Previous month"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '50%',
              border: 'none', backgroundColor: 'transparent',
              cursor: isPrevDisabled ? 'default' : 'pointer',
              color: isPrevDisabled ? 'var(--color-border-strong)' : 'var(--color-text)',
              transition: 'background-color 180ms ease',
            }}
            onMouseEnter={e => { if (!isPrevDisabled) e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)'; }}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronLeft size={16} />
          </button>

          <p style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: '1rem', fontWeight: 400,
            color: 'var(--color-text)', margin: 0,
          }}>
            {MONTHS[viewMonth]} {viewYear}
          </p>

          <button
            onClick={nextMonth}
            aria-label="Next month"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '50%',
              border: 'none', backgroundColor: 'transparent',
              cursor: 'pointer', color: 'var(--color-text)',
              transition: 'background-color 180ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* ── Weekday headers ───────────────────────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          padding: '0 16px', marginBottom: '4px', flexShrink: 0,
        }}>
          {WEEKDAYS.map(d => (
            <div key={d} style={{
              textAlign: 'center',
              fontFamily: 'var(--font-body, system-ui)',
              fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.1em', color: 'var(--color-text-muted)',
              padding: '2px 0 6px',
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* ── Calendar grid ─────────────────────────────────────── */}
        <div style={{ padding: '0 16px', flex: 1, minHeight: 0 }}>

          {/* Loading skeleton */}
          {loading && !error && !notConfigured && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} style={{
                  height: '36px', borderRadius: 'var(--radius-control)',
                  backgroundColor: 'var(--color-border)',
                  animation: 'pulse 1.4s ease-in-out infinite',
                  animationDelay: `${(i % 7) * 60}ms`,
                }} />
              ))}
            </div>
          )}

          {/* Not configured */}
          {notConfigured && (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <CalendarDays size={32} style={{ color: 'var(--color-border-strong)', margin: '0 auto 10px' }} />
              <p style={{
                fontFamily: 'var(--font-body, system-ui)', fontSize: '13px',
                color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5,
              }}>
                Availability is temporarily unavailable.
              </p>
            </div>
          )}

          {/* Error + retry */}
          {error && !notConfigured && (
            <div style={{ textAlign: 'center', padding: '24px 16px' }}>
              <AlertCircle size={28} style={{ color: 'var(--color-error)', margin: '0 auto 8px' }} />
              <p style={{
                fontFamily: 'var(--font-body, system-ui)', fontSize: '13px',
                color: 'var(--color-text-muted)', margin: '0 0 12px',
              }}>
                Availability is temporarily unavailable.
              </p>
              <button
                onClick={retry}
                aria-label="Retry loading availability"
                style={{
                  fontFamily: 'var(--font-body, system-ui)',
                  fontSize: '11px', letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '8px 18px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#fff', border: 'none',
                  borderRadius: 'var(--radius-control)', cursor: 'pointer',
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Loaded grid */}
          {!loading && !error && !notConfigured && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
              {grid.map((cell, idx) => {
                if (!cell) return <div key={idx} />;

                const busy       = isBusy(cell.iso);
                const hols       = getHols(cell.iso);
                const hasHol     = hols.length > 0;
                const disabled   = cell.isPast || busy;
                const isSelected = selected === cell.iso;
                const showMsg    = disabledMsg?.iso === cell.iso;

                let bg     = 'transparent';
                let fg     = 'var(--color-text)';
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
                } else if (hasHol) {
                  bg = 'rgba(232,163,23,0.10)';
                }

                return (
                  <div key={cell.iso} style={{ position: 'relative' }}>
                    <div
                      role={disabled ? undefined : 'button'}
                      tabIndex={disabled ? -1 : 0}
                      aria-label={
                        cell.isPast ? `${cell.iso} — past date` :
                        busy        ? `${cell.iso} — unavailable` :
                        hasHol      ? `${cell.iso} — ${hols.map(f => f.title).join(', ')}` :
                                      `Select ${cell.iso}`
                      }
                      aria-disabled={disabled ? 'true' : undefined}
                      aria-pressed={isSelected ? 'true' : undefined}
                      onClick={() => handleCellClick(cell)}
                      onKeyDown={e => !disabled && handleKeyDown(e, cell)}
                      style={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        minHeight: hasHol ? '44px' : '36px',
                        padding: '2px 1px',
                        borderRadius: 'var(--radius-control)',
                        backgroundColor: bg, color: fg, border, cursor,
                        fontFamily: 'var(--font-body, system-ui)',
                        fontSize: '12px',
                        fontWeight: isSelected || cell.isToday ? 500 : 400,
                        transition: 'background-color 160ms ease, border-color 160ms ease',
                        outline: 'none',
                        textDecoration: busy && !cell.isPast ? 'line-through' : 'none',
                        opacity: cell.isPast ? 0.38 : 1,
                        userSelect: 'none', gap: '2px',
                      }}
                      onMouseEnter={e => {
                        if (!disabled && !isSelected)
                          e.currentTarget.style.backgroundColor =
                            hasHol ? 'rgba(232,163,23,0.18)' : 'var(--color-surface-alt)';
                      }}
                      onMouseLeave={e => {
                        if (!disabled && !isSelected)
                          e.currentTarget.style.backgroundColor = bg;
                      }}
                    >
                      <span>{cell.day}</span>
                      {hasHol && <FestivalMicro festivals={hols} selected={isSelected} />}
                    </div>

                    {/* Inline disabled tooltip */}
                    {showMsg && (
                      <div
                        role="alert"
                        style={{
                          position: 'absolute',
                          bottom: 'calc(100% + 4px)', left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'var(--color-text)', color: '#fff',
                          fontFamily: 'var(--font-body, system-ui)',
                          fontSize: '9px', whiteSpace: 'nowrap',
                          padding: '4px 8px', borderRadius: '4px',
                          zIndex: 10, pointerEvents: 'none',
                        }}
                      >
                        {disabledMsg.msg}
                        <span style={{
                          position: 'absolute', bottom: '-4px', left: '50%',
                          transform: 'translateX(-50%)',
                          borderLeft: '4px solid transparent',
                          borderRight: '4px solid transparent',
                          borderTop: '4px solid var(--color-text)',
                        }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Legend ────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', gap: '14px', flexWrap: 'wrap',
          padding: '14px 20px 0', flexShrink: 0,
        }}>
          <LegendChip color="var(--color-primary)"    label="Available" />
          <LegendChip color="rgba(232,163,23,0.35)"   label="Festival / Holiday" />
          <LegendChip color="rgba(20,34,77,0.15)"     label="Unavailable" />
          <LegendChip color="rgba(0,0,0,0.15)"        label="Past" />
        </div>

        {/* ── Today link ────────────────────────────────────────── */}
        <div style={{ padding: '8px 20px 4px', flexShrink: 0 }}>
          <button
            onClick={goToday}
            style={{
              fontFamily: 'var(--font-body, system-ui)',
              fontSize: '10px', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--color-primary)',
              backgroundColor: 'transparent', border: 'none',
              cursor: 'pointer', padding: '4px 0',
              textDecoration: 'underline', textUnderlineOffset: '2px',
            }}
          >
            Today
          </button>
        </div>

        {/* ── Selected date + festival details + CTA ────────────── */}
        <div style={{
          padding: '12px 20px 20px',
          borderTop: '1px solid var(--color-border)',
          marginTop: 'auto', flexShrink: 0,
        }}>
          {selected ? (
            <>
              <p style={{
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '11px', color: 'var(--color-text-muted)',
                marginBottom: selectedFestivals.length ? '6px' : '10px',
              }}>
                Selected:{' '}
                <strong style={{ color: 'var(--color-text)' }}>
                  {new Date(selected + 'T00:00:00').toLocaleDateString('en-GB', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </strong>
              </p>

              {/* All festival names in full */}
              {selectedFestivals.length > 0 && (
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '6px',
                  marginBottom: '10px',
                }}>
                  {selectedFestivals.map(f => (
                    <span key={f.id} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '3px 9px',
                      backgroundColor: 'rgba(232,163,23,0.12)',
                      border: '1px solid rgba(232,163,23,0.30)',
                      borderRadius: '999px',
                      fontFamily: 'var(--font-body, system-ui)',
                      fontSize: '10px', fontWeight: 500,
                      color: 'var(--color-secondary-hover)',
                    }}>
                      🎉 {f.title}
                    </span>
                  ))}
                </div>
              )}

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
              fontFamily: 'var(--font-body, system-ui)',
              fontSize: '11px', color: 'var(--color-text-muted)',
              textAlign: 'center', margin: 0,
            }}>
              Select an available date to continue your enquiry
            </p>
          )}
        </div>
      </div>
    </>
  );
}
