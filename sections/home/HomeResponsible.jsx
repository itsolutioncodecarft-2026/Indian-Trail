'use client';
import Image from 'next/image';
import { responsibleTourism } from '@/data/siteContent';
import { useLang } from '@/lib/LanguageContext';
import { Leaf } from 'lucide-react';

export default function HomeResponsible() {
  const { t } = useLang();
  return (
    <section className="section-padding-sm overflow-hidden" style={{ backgroundColor: 'rgba(44,24,16,0.95)' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Leaf size={16} style={{ color: '#B8892A' }} />
              <p className="eyebrow" style={{ color: '#B8892A' }}>{t('responsible.title')}</p>
            </div>
            <h2 className="section-title mb-5" style={{ color: '#FAF6EC' }}>
              {responsibleTourism.headline}
            </h2>
            <div className="divider-gold mb-8" />
            <blockquote className="border-l-2 pl-6 mb-6" style={{ borderColor: '#B8892A' }}>
              <p className="font-serif text-lg italic leading-relaxed" style={{ color: 'rgba(250,246,236,0.8)' }}>
                &ldquo;{responsibleTourism.statement}&rdquo;
              </p>
            </blockquote>
            <p className="font-sans text-base font-light leading-relaxed" style={{ color: 'rgba(250,246,236,0.5)' }}>
              {responsibleTourism.note}
            </p>
          </div>
          <div className="relative aspect-video lg:aspect-square overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=900&q=80"
              alt="Responsible travel in India"
              fill className="object-cover opacity-60"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(44,24,16,0.30)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
