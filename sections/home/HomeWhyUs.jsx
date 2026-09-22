'use client';
import { useState, useEffect } from 'react';
import { whyChooseUs } from '@/data/siteContent';
import { Globe, Star, Heart, Shield, Users, Map } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';
import { CarouselDots } from '@/sections/home/HomeTours';

const iconMap = { globe: Globe, star: Star, heart: Heart, shield: Shield, users: Users, map: Map };

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

function WhyCard({ item }) {
  const [hov, setHov] = useState(false);
  const Icon = iconMap[item.icon] || Star;

  return (
    <div
      className="relative flex flex-col p-6 h-full"
      style={{
        backgroundColor: 'var(--color-surface)',
        border:          `1px solid ${hov ? 'var(--color-border-gold)' : 'var(--color-border)'}`,
        borderRadius:    'var(--radius-card)',
        transform:       hov ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow:       hov ? 'var(--shadow-card-hover)' : '0 1px 4px rgba(20,20,43,0.05)',
        transition:      'transform 300ms ease, box-shadow 300ms ease, border-color 200ms ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* gold left accent */}
      <div style={{
        position:        'absolute',
        left:            0, top: '20%', bottom: '20%',
        width:           '3px',
        borderRadius:    '0 3px 3px 0',
        backgroundColor: 'var(--color-secondary)',
        opacity:         hov ? 1 : 0,
        transition:      'opacity 240ms ease',
      }} />

      {/* icon */}
      <div
        className="flex items-center justify-center mb-4"
        style={{
          width:           '44px', height: '44px',
          borderRadius:    'var(--radius-control)',
          backgroundColor: hov ? 'var(--color-primary)' : 'rgba(27,42,94,0.08)',
          transition:      'background-color 260ms ease',
          flexShrink:      0,
        }}
      >
        <Icon size={19} style={{ color: hov ? '#fff' : 'var(--color-primary)', transition: 'color 260ms ease' }} />
      </div>

      <h3 className="font-serif font-light mb-2"
        style={{ color: 'var(--color-text)', fontSize: '1.1rem', lineHeight: 1.3 }}>
        {item.title}
      </h3>

      {/* animated gold underline */}
      <div style={{
        width:           hov ? '2.5rem' : '1.25rem',
        height:          '1px',
        backgroundColor: 'var(--color-secondary)',
        marginBottom:    '10px',
        opacity:         0.65,
        transition:      'width 300ms ease',
      }} />

      <p className="font-sans text-sm font-light leading-relaxed"
        style={{ color: 'var(--color-text-muted)', flexGrow: 1 }}>
        {item.description}
      </p>
    </div>
  );
}

export default function HomeWhyUs() {
  const isMobile = useIsMobile();
  const { index, goTo, touchHandlers } = useCarousel(whyChooseUs.length, 1);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-tint)' }}>
      <div className="container-luxury">

        {/* header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-10 items-end">
          <div>
            <p className="eyebrow mb-3">The Art of Slow Travel</p>
            <h2 className="section-title">
              Travel as It Was<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                Always Meant to Be
              </em>
            </h2>
          </div>
          <p className="body-large">
            Om offers what no generic tour can — exclusive cultural access, the rare gift of being
            truly understood as a traveller, and journeys that stay with you long after you return home.
          </p>
        </div>

        {/* desktop: 3-col grid */}
        {!isMobile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChooseUs.map((item, i) => <WhyCard key={i} item={item} />)}
          </div>
        )}

        {/* mobile: 1-up swipe slider — no arrows, dots only */}
        {isMobile && (
          <>
            <div
              style={{ overflow: 'hidden', borderRadius: 'var(--radius-card)' }}
              {...touchHandlers}
            >
              <div style={{
                display:    'flex',
                gap:        '12px',
                transform:  `translateX(calc(${index} * (-100% - 12px)))`,
                transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
              }}>
                {whyChooseUs.map((item, i) => (
                  <div key={i} style={{ flexShrink: 0, width: '100%' }}>
                    <WhyCard item={item} />
                  </div>
                ))}
              </div>
            </div>
            <CarouselDots
              total={whyChooseUs.length}
              active={index}
              onDotClick={goTo}
              className="mt-5"
            />
          </>
        )}
      </div>
    </section>
  );
}
