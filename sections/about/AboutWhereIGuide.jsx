'use client';
import { omStory } from '@/data/siteContent';
import { MapPin } from 'lucide-react';

export default function AboutWhereIGuide() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-bg)',
        paddingTop:    'clamp(40px, 6vw, 80px)',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
      }}
    >
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* heading col */}
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">Coverage</p>
            <h2 className="section-title mb-4">
              From the Taj<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                to the Backwaters
              </em>
            </h2>
            <div className="divider-gold" />
          </div>

          {/* destinations col */}
          <div className="lg:col-span-8">
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}
            >
              {omStory.whereIGuide.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 py-4"
                  style={{
                    borderBottom: i < omStory.whereIGuide.length - 1
                      ? '1px solid var(--color-border)'
                      : 'none',
                  }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(27,42,94,0.07)',
                      marginTop: '2px',
                    }}
                  >
                    <MapPin size={14} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <div>
                    <span
                      className="font-serif font-light"
                      style={{ fontSize: '1.05rem', color: 'var(--color-text)' }}
                    >
                      {item.place}
                    </span>
                    <span
                      className="font-sans font-light"
                      style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginLeft: '10px' }}
                    >
                      — {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
