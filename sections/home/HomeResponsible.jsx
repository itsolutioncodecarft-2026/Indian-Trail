'use client';
import Image from 'next/image';
import { responsibleTourism } from '@/data/siteContent';

export default function HomeResponsible() {
  return (
    <section className="overflow-hidden" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Image */}
        <div className="relative h-72 lg:h-auto lg:min-h-[420px] order-2 lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=85"
            alt="Responsible tourism — Indian Routes & Trails"
            fill className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13,27,42,0.15)' }} />
        </div>

        {/* Text */}
        <div
          className="order-1 lg:order-2 flex flex-col justify-center px-8 py-14 md:px-12 lg:px-16"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-5 h-5 flex items-center justify-center rounded-full" style={{ backgroundColor: '#EBF4FF' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2B6CB0" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="eyebrow" style={{ color: '#2B6CB0' }}>Responsible Tourism</p>
          </div>

          <h2 className="section-title mb-5" style={{ color: '#1a2332' }}>
            Travel with<br />
            <span className="italic font-light" style={{ color: '#2B6CB0' }}>Conscience</span>
          </h2>
          <div className="divider-gold mb-8" />

          <blockquote className="pl-5 mb-6" style={{ borderLeft: '3px solid #C49A3C' }}>
            <p className="font-serif text-base italic leading-relaxed" style={{ color: '#4A5568' }}>
              &ldquo;{responsibleTourism.statement}&rdquo;
            </p>
          </blockquote>

          <p className="body-text">{responsibleTourism.note}</p>
        </div>
      </div>
    </section>
  );
}
