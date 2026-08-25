'use client';
import { whyChooseUs } from '@/data/siteContent';
import { Globe, Star, Heart, Shield, Users, Map } from 'lucide-react';

const iconMap = { globe: Globe, star: Star, heart: Heart, shield: Shield, users: Users, map: Map };

export default function HomeWhyUs() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#F4F6FA' }}>
      <div className="container-luxury">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 items-end">
          <div>
            <p className="eyebrow mb-5">The Art of Slow Travel</p>
            <h2 className="section-title">
              Travel as It Was<br />
              <span className="italic font-light" style={{ color: '#2B6CB0' }}>Always Meant to Be</span>
            </h2>
          </div>
          <p className="body-large" style={{ color: '#4A5568' }}>
            Om offers what no generic tour can — exclusive cultural access, the rare gift of being truly understood as a traveller,
            and journeys that stay with you long after you return home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <div
                key={i}
                className="p-7 transition-all duration-300 group"
                style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2B6CB0';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(43,108,176,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5 transition-colors"
                  style={{ backgroundColor: '#EBF4FF', borderRadius: '8px' }}
                >
                  <Icon size={18} style={{ color: '#2B6CB0' }} />
                </div>
                <h3 className="font-serif text-lg font-light mb-2.5" style={{ color: '#1a2332' }}>{item.title}</h3>
                <p className="font-sans text-sm font-light leading-relaxed" style={{ color: '#718096' }}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
