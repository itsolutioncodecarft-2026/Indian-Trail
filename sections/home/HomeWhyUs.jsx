'use client';
import { whyChooseUs } from '@/data/siteContent';
import { Globe, Star, Heart, Shield, Users, Map } from 'lucide-react';

const iconMap = { globe: Globe, star: Star, heart: Heart, shield: Shield, users: Users, map: Map };

export default function HomeWhyUs() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="container-luxury">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 items-end">
          <div>
            <p className="eyebrow mb-5">The Art of Slow Travel</p>
            <h2 className="section-title">
              Travel as It Was<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                Always Meant to Be
              </em>
            </h2>
          </div>
          <p className="body-large">
            Om offers what no generic tour can — exclusive cultural access, the rare gift of being truly
            understood as a traveller, and journeys that stay with you long after you return home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <div
                key={i}
                className="p-7 transition-all duration-300 group"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-primary-light)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-overlay)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: 'var(--radius-control)',
                    opacity: 0.15,
                  }}
                />
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5 -mt-10 transition-colors"
                  style={{
                    backgroundColor: 'rgba(27,42,94,0.1)',
                    borderRadius: 'var(--radius-control)',
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-serif text-lg font-light mb-2.5"
                  style={{ color: 'var(--color-text)' }}>
                  {item.title}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
