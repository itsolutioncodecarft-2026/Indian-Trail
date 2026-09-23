'use client';
/**
 * FormDatePicker
 * ─────────────────────────────────────────────────────────────────
 * Inline calendar for the enquiry form.
 * Fetches booked dates from /api/booked-dates on mount.
 * Marks unavailable dates greyed-out and non-selectable.
 * Selected date is stored as "YYYY-MM-DD" string via onChange prop.
 */

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getEventsForDate } from '@/lib/calendarUtils';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS   = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

function todayIso() { return new Date().toISOString().slice(0, 10); }

function toIso(year, month1, day) {
  return `${year}-${String(month1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

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

export default function FormDatePicker({ value, onChange, labelStyle }) {
  const today0 = new Date();
  const [viewYear,  setViewYear]  = useState(today0.getFullYear());
  const [viewMonth, setViewMonth] = useState(today0.getMonth());
  const [calEvents, setCalEvents] = useState([]);   // [] = loaded (possibly empty)
  const [loading,   setLoading]   = useState(true);
  const [calError,  setCalError]  = useState(false);

  // Fetch booked dates once on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res  = await fetch('/api/booked-dates');
        const data = await res.json().catch(() => ({}));
        if (!cancelled) {
          setCalEvents(data.events || []);
          setCalError(false);
        }
      } catch {
        if (!cancelled) setCalError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const isBusy = useCallback((iso) => {
    if (!calEvents.length) return false;
    return getEventsForDate(calEvents, iso).length > 0;
  }, [calEvents]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const grid = buildGrid(viewYear, viewMonth);
  const today = todayIso();
  const isPrevDisabled =
    viewYear === today0.getFullYear() && viewMonth <= today0.getMonth();

  const handleSelect = (cell) => {
    if (!cell || cell.isPast || isBusy(cell.iso)) return;
    onChange(cell.iso);
  };

  /* ── styles ── */
  const cellBase = {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    height:         '32px',
    width:          '100%',
    borderRadius:   'var(--radius-control)',
    fontFamily:     'var(--font-body, system-ui)',
    fontSize:       '12px',
    border:         '1px solid transparent',
    transition:     'background-color 150ms ease, border-color 150ms ease',
    userSelect:     'none',
  };

  return (
    <div>
      {labelStyle !== false && (
        <label style={labelStyle}>
          Travel Date
        </label>
      )}

      <div style={{
        border:        '1px solid var(--color-border)',
        borderRadius:  'var(--radius-card)',
        backgroundColor: 'var(--color-surface-alt)',
        overflow:      'hidden',
      }}>

        {/* Month nav */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '8px 10px 6px',
          borderBottom:   '1px solid var(--color-border)',
        }}>
          <button
            type="button"
            onClick={prevMonth}
            disabled={isPrevDisabled}
            aria-label="Previous month"
            style={{
              background:  'none',
              border:      'none',
              cursor:      isPrevDisabled ? 'default' : 'pointer',
              color:       isPrevDisabled ? 'var(--color-border-strong)' : 'var(--color-text)',
              padding:     '2px',
              display:     'flex',
              borderRadius: '4px',
            }}
          >
            <ChevronLeft size={14} />
          </button>

          <span style={{
            fontFamily:  'var(--font-display, Georgia, serif)',
            fontSize:    '13px',
            fontWeight:  400,
            color:       'var(--color-text)',
          }}>
            {MONTHS[viewMonth]} {viewYear}
          </span>

          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
            style={{
              background:   'none',
              border:       'none',
              cursor:       'pointer',
              color:        'var(--color-text)',
              padding:      '2px',
              display:      'flex',
              borderRadius: '4px',
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Weekday headers */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          padding:             '6px 8px 2px',
          gap:                 '2px',
        }}>
          {WEEKDAYS.map(d => (
            <div key={d} style={{
              textAlign:     'center',
              fontSize:      '9px',
              fontWeight:    500,
              letterSpacing: '0.1em',
              color:         'var(--color-text-muted)',
              fontFamily:    'var(--font-body, system-ui)',
              padding:       '0 0 3px',
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          padding:             '0 8px 8px',
          gap:                 '2px',
        }}>
          {loading
            ? Array.from({ length: 35 }).map((_, i) => (
                <div key={i} style={{
                  height:          '32px',
                  borderRadius:    'var(--radius-control)',
                  backgroundColor: 'var(--color-border)',
                  animation:       'pulse 1.4s ease-in-out infinite',
                  animationDelay:  `${(i % 7) * 50}ms`,
                }} />
              ))
            : grid.map((cell, idx) => {
                if (!cell) return <div key={idx} />;

                const busy     = isBusy(cell.iso);
                const disabled = cell.isPast || busy;
                const selected = value === cell.iso;

                let bg     = 'transparent';
                let fg     = disabled ? 'var(--color-border-strong)' : 'var(--color-text)';
                let border = '1px solid transparent';
                let cursor = disabled ? 'not-allowed' : 'pointer';
                let textDec = 'none';

                if (selected) {
                  bg = 'var(--color-primary)'; fg = '#fff';
                  border = '1px solid var(--color-primary)';
                  cursor = 'default';
                } else if (cell.isToday && !disabled) {
                  border = '1px solid var(--color-primary)';
                  fg     = 'var(--color-primary)';
                } else if (busy) {
                  bg      = 'rgba(192,69,59,0.08)';
                  fg      = 'var(--color-text-muted)';
                  textDec = 'line-through';
                }

                return (
                  <div
                    key={cell.iso}
                    role={disabled ? undefined : 'button'}
                    tabIndex={disabled ? -1 : 0}
                    aria-label={
                      cell.isPast ? `${cell.iso} — past` :
                      busy        ? `${cell.iso} — unavailable` :
                      selected    ? `${cell.iso} — selected` :
                                   `Select ${cell.iso}`
                    }
                    aria-disabled={disabled ? 'true' : undefined}
                    aria-pressed={selected ? 'true' : undefined}
                    onClick={() => handleSelect(cell)}
                    onKeyDown={e => {
                      if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault(); handleSelect(cell);
                      }
                    }}
                    title={
                      cell.isPast ? "Past date" :
                      busy        ? "This date is unavailable" :
                      undefined
                    }
                    style={{
                      ...cellBase,
                      backgroundColor: bg,
                      color:           fg,
                      border,
                      cursor,
                      opacity:         cell.isPast ? 0.35 : 1,
                      textDecoration:  textDec,
                      fontWeight:      selected || cell.isToday ? 500 : 400,
                      outline:         'none',
                    }}
                    onMouseEnter={e => {
                      if (!disabled && !selected) {
                        e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                        e.currentTarget.style.borderColor     = 'var(--color-border)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!disabled && !selected) {
                        e.currentTarget.style.backgroundColor = bg;
                        e.currentTarget.style.borderColor     = 'transparent';
                      }
                    }}
                  >
                    {cell.day}
                  </div>
                );
              })
          }
        </div>

        {/* Legend + selected value */}
        <div style={{
          display:       'flex',
          alignItems:    'center',
          justifyContent: 'space-between',
          flexWrap:      'wrap',
          gap:           '6px',
          padding:       '6px 10px 8px',
          borderTop:     '1px solid var(--color-border)',
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Legend */}
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px',
              fontFamily: 'var(--font-body, system-ui)', fontSize: '9px',
              color: 'var(--color-text-muted)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px',
                backgroundColor: 'var(--color-primary)', display: 'inline-block' }} />
              Available
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px',
              fontFamily: 'var(--font-body, system-ui)', fontSize: '9px',
              color: 'var(--color-text-muted)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px',
                backgroundColor: 'rgba(192,69,59,0.15)', display: 'inline-block' }} />
              Unavailable
            </span>
          </div>

          {/* Selected date display */}
          {value && (
            <span style={{
              fontFamily: 'var(--font-body, system-ui)',
              fontSize:   '11px',
              color:      'var(--color-primary)',
              fontWeight: 500,
            }}>
              ✓ {new Date(value + 'T00:00:00').toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
              <button
                type="button"
                onClick={() => onChange('')}
                style={{
                  marginLeft:      '6px',
                  background:      'none',
                  border:          'none',
                  cursor:          'pointer',
                  color:           'var(--color-text-muted)',
                  fontSize:        '10px',
                  padding:         '0',
                  verticalAlign:   'middle',
                }}
                aria-label="Clear selected date"
              >
                ✕
              </button>
            </span>
          )}

          {/* Error state */}
          {calError && (
            <span style={{
              fontFamily: 'var(--font-body, system-ui)',
              fontSize:   '10px',
              color:      'var(--color-text-muted)',
              fontStyle:  'italic',
            }}>
              Availability loading failed
            </span>
          )}
        </div>
      </div>

      {/* Hidden input for form value */}
      <input
        type="hidden"
        name="date"
        value={value || ''}
      />
    </div>
  );
}
