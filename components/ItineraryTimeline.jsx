'use client';
import { useState } from 'react';
import { ChevronDown, MapPin, Train, Plane, Car, Footprints, Info } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

function TransportIcon({ transport }) {
  const tr = (transport || '').toLowerCase();
  if (tr.includes('flight') || tr.includes('fly')) return <Plane size={13} className="text-[#B8892A]" />;
  if (tr.includes('train')) return <Train size={13} className="text-[#B8892A]" />;
  if (tr.includes('walk') || tr.includes('boat')) return <Footprints size={13} className="text-[#B8892A]" />;
  return <Car size={13} className="text-[#B8892A]" />;
}

export default function ItineraryTimeline({ days }) {
  const { t } = useLang();
  const [openDay, setOpenDay] = useState(0);

  return (
    <div>
      {days.map((day, index) => {
        const isOpen = openDay === index;
        return (
          <div key={index} className="border-b border-[#E8D5B0]/40 last:border-b-0">
            {/* Header */}
            <button
              onClick={() => setOpenDay(isOpen ? -1 : index)}
              className="w-full flex items-center gap-5 py-5 text-left group hover:bg-[#FAF6EC]/50 transition-colors px-2 -mx-2 rounded"
              aria-expanded={isOpen}
            >
              {/* Day number box */}
              <div className="flex-shrink-0 w-12 h-12 border border-[#E8D5B0] flex flex-col items-center justify-center">
                <span className="font-sans text-[9px] tracking-wider uppercase text-[#2C1810]/40">
                  {t('common.day')}
                </span>
                <span className="font-serif text-lg font-light text-[#2C1810] leading-none">
                  {day.day}
                </span>
              </div>

              {/* Location & title */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <MapPin size={11} className="text-[#B8892A] shrink-0" />
                  <span className="font-sans text-xs text-[#B8892A] tracking-wide">{day.location}</span>
                  {day.isOptional && (
                    <span className="ml-2 font-sans text-[10px] tracking-wider uppercase bg-[#E8D5B0]/50 text-[#2C1810]/50 px-2 py-0.5">
                      {t('common.optional')}
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-lg font-light text-[#2C1810] truncate pr-4">
                  {day.title}
                </h4>
              </div>

              <ChevronDown
                size={18}
                className={`text-[#2C1810]/30 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Expandable content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-7 space-y-5" style={{ paddingLeft: '68px' }}>
                {/* Description */}
                <p className="font-sans text-sm font-light text-[#2C1810]/70 leading-relaxed">
                  {day.description}
                </p>

                {/* Activities */}
                {day.activities?.length > 0 && (
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#2C1810]/40 mb-2">
                      {t('common.activities')}
                    </p>
                    <ul className="space-y-1.5">
                      {day.activities.map((a, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#B8892A] mt-2 shrink-0" />
                          <span className="font-sans text-sm text-[#2C1810]/60">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Transport */}
                {day.transport && (
                  <div className="flex items-center gap-2 pt-1">
                    <TransportIcon transport={day.transport} />
                    <span className="font-sans text-xs text-[#2C1810]/50">{day.transport}</span>
                  </div>
                )}

                {/* Notes */}
                {day.notes && (
                  <div
                    className="flex items-start gap-2 p-3 border-l-2"
                    style={{ backgroundColor: '#F5EDD9', borderColor: '#B8892A' }}
                  >
                    <Info size={13} className="text-[#B8892A] mt-0.5 shrink-0" />
                    <p className="font-sans text-xs text-[#2C1810]/60 italic">{day.notes}</p>
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
