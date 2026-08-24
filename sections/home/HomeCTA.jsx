'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { siteConfig } from '@/data/siteContent';
import { MessageCircle, Mail, Phone } from 'lucide-react';

export default function HomeCTA() {
  const { t } = useLang();
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&q=80"
          alt="Begin your India journey"
          fill className="object-cover" sizes="100vw"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(44,24,16,0.75)' }} />
      </div>
      <div className="relative container-narrow text-center">
        <p className="eyebrow mb-5" style={{ color: '#B8892A' }}>Begin Your Journey</p>
        <h2 className="section-title mb-6" style={{ color: '#FAF6EC' }}>
          Ready to Discover India<br />
          <span className="italic font-light" style={{ color: '#D4A853' }}>Through Om&rsquo;s Eyes?</span>
        </h2>
        <p className="font-sans text-lg font-light mb-10 max-w-xl mx-auto" style={{ color: 'rgba(250,246,236,0.6)' }}>
          Every journey begins with a conversation. Share your vision with Om, and he will craft an experience that transcends the ordinary.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/contact" className="btn-gold">{t('common.plan_journey')}</Link>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-8 py-3.5 border border-[#FAF6EC]/40 text-[#FAF6EC] hover:bg-[#FAF6EC]/10 transition-all duration-300"
          >
            {t('common.view_itinerary')}
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-xs tracking-wider transition-colors"
            style={{ color: 'rgba(250,246,236,0.5)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,246,236,0.5)'}
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a href={`mailto:${siteConfig.contact.emails[0]}`}
            className="flex items-center gap-2 font-sans text-xs tracking-wider"
            style={{ color: 'rgba(250,246,236,0.5)' }}
          >
            <Mail size={14} /> {siteConfig.contact.emails[0]}
          </a>
          <a href={`tel:${siteConfig.contact.phones[0].replace(/[^+\d]/g,'')}`}
            className="flex items-center gap-2 font-sans text-xs tracking-wider"
            style={{ color: 'rgba(250,246,236,0.5)' }}
          >
            <Phone size={14} /> {siteConfig.contact.phones[0]}
          </a>
        </div>
      </div>
    </section>
  );
}
