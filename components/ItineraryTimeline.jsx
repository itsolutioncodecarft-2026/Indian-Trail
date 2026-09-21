'use client';
import { useState } from 'react';
import { ChevronDown, MapPin, Train, Plane, Car, Footprints, Info } from 'lucide-react';

function TransportIcon({ transport }) {
  const tr = (transport || '').toLowerCase();
  if (tr.includes('flight') || tr.includes('fly'))  return <Plane    size={12} style={{ color: 'var(--color-primary)' }} />;
  if (tr.includes('train'))                          return <Train    size={12} style={{ color: 'var(--color-primary)' }} />;
  if (tr.includes('walk') || tr.includes('boat'))   return <Footprints size={12} style={{ color: 'var(--color-primary)' }} />;
  return <Car size={12} style={{ color: 'var(--color-primary)' }} />;
}

export default function ItineraryTimeline({ days }) {
  const [openDay, setOpenDay] = useState(0); // Day 1 open by default

  return (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
      {days.map((day, index) => {
        const isOpen = openDay === index;
        return (
          <div
            key={index}
            style={{ borderBottom: index < days.length - 1 ? '1px solid var(--color-border)' : 'none' }}
          >
            {/* Header */}
            <button
              onClick={() => setOpenDay(isOpen ? -1 : index)}
              className="w-full flex items-center gap-4 py-4 px-5 text-left transition-colors"
              style={{ backgroundColor: isOpen ? 'var(--color-surface-alt)' : 'var(--color-surface)' }}
              onMouseEnter={e => { if (!isOpen) e.currentTarget.style.backgroundColor = 'var(--color-surface-tint)'; }}
              onMouseLeave={e => { if (!isOpen) e.currentTarget.style.backgroundColor = 'var(--color-surface)'; }}
              aria-expanded={isOpen}
            >
              {/* Day badge */}
              <div
                className="flex-shrink-0 w-11 h-11 flex flex-col items-center justify-center"
                style={{
                  backgroundColor: isOpen ? 'var(--color-primary)' : 'rgba(27,42,94,0.08)',
                  borderRadius: 'var(--radius-control)',
                  transition: 'background-color var(--motion-fast)',
                }}
              >
                <span
                  className="font-sans text-[8px] tracking-wider uppercase"
                  style={{ color: isOpen ? 'var(--color-text-invert-muted)' : 'var(--color-primary)' }}
                >
                  Day
                </span>
                <span
                  className="font-serif text-base font-light leading-none"
                  style={{ color: isOpen ? 'var(--color-text-invert)' : 'var(--color-primary)' }}
                >
                  {day.day}
                </span>
              </div>

              {/* Location & title */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <MapPin size={10} style={{ color: 'var(--color-secondary-hover)' }} className="shrink-0" />
                  <span className="font-sans text-[10px] tracking-wider"
                    style={{ color: 'var(--color-secondary-hover)' }}>
                    {day.location}
                  </span>
                  {day.isOptional && (
                    <span
                      className="ml-2 font-sans text-[9px] tracking-wider uppercase px-2 py-0.5"
                      style={{
                        backgroundColor: 'rgba(27,42,94,0.08)',
                        color: 'var(--color-primary)',
                        borderRadius: 'var(--radius-pill)',
                      }}
                    >
                      Optional
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-base font-light truncate pr-4"
                  style={{ color: 'var(--color-text)' }}>
                  {day.title}
                </h4>
              </div>

              <ChevronDown
                size={16}
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'transform 0.3s ease',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  flexShrink: 0,
                }}
              />
            </button>

            {/* Expandable content */}
            <div
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '800px' : '0',
                opacity: isOpen ? 1 : 0,
                transition: 'max-height 0.45s ease, opacity 0.35s ease',
                backgroundColor: 'var(--color-surface-tint)',
              }}
            >
              <div className="px-5 pb-6 pt-3 space-y-4" style={{ paddingLeft: '72px' }}>
                <p className="font-sans text-sm font-light leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {day.description}
                </p>

                {day.activities?.length > 0 && (
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.22em] uppercase mb-2"
                      style={{ color: 'var(--color-text-muted)' }}>
                      Activities
                    </p>
                    <ul className="space-y-1.5">
                      {day.activities.map((a, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: 'var(--color-primary-light)', opacity: 0.6 }} />
                          <span className="font-sans text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {a}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.transport && (
                  <div className="flex items-center gap-2">
                    <TransportIcon transport={day.transport} />
                    <span className="font-sans text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {day.transport}
                    </span>
                  </div>
                )}

                {day.notes && (
                  <div
                    className="flex items-start gap-2 p-3"
                    style={{
                      backgroundColor: 'rgba(27,42,94,0.06)',
                      borderLeft: '3px solid var(--color-primary-light)',
                      borderRadius: '0 var(--radius-control) var(--radius-control) 0',
                    }}
                  >
                    <Info size={12} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                    <p className="font-sans text-xs italic" style={{ color: 'var(--color-text-muted)' }}>
                      {day.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
