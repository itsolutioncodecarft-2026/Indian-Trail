'use client';
import { omStory } from '@/data/siteContent';
import { Star, Globe, BookOpen, Gem, MapPin, Users } from 'lucide-react';

const icons = [Star, Globe, BookOpen, Gem, MapPin, Users];

export default function AboutExpertise() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-surface-alt)',
        paddingTop:    'clamp(40px, 6vw, 80px)',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
      }}
    >
      <div className="container-luxury">
        <p className="eyebrow mb-3">Expertise</p>
        <h2 className="section-title mb-2">
          My Experience &amp; Expertise
        </h2>
        <div className="divider-gold mb-10" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '16px',
          }}
        >
          {omStory.expertise.map((item, i) => {
            const Icon = icons[i] || Star;
            return (
              <div
                key={i}
                className="flex gap-4 p-5"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-control)',
                    backgroundColor: 'rgba(27,42,94,0.08)',
                    marginTop: '2px',
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h3
                    className="font-serif font-light mb-1"
                    style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.3 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sans font-light leading-relaxed"
                    style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
