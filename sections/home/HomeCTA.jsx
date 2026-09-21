'use client';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/siteContent';
import { MessageCircle, Mail } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="relative min-h-[460px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1548013146-72479768bada?w=2000&q=85"
          alt="Taj Mahal — your India journey begins here"
          fill className="object-cover object-center" sizes="100vw"
        />
        <div className="absolute inset-0"
          style={{ backgroundColor: 'rgba(20,34,77,0.78)' }} />
      </div>

      <div className="relative container-narrow text-center py-20">
        <p className="eyebrow mb-5" style={{ color: 'var(--color-secondary)' }}>Begin Your Journey</p>

        <h2 className="font-serif font-light mb-5"
          style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.15, color: 'var(--color-text-invert)' }}>
          Your India Journey<br />
          <em style={{ color: 'var(--color-secondary)' }}>Begins Here.</em>
        </h2>

        <p className="font-sans font-light mb-10 max-w-lg mx-auto"
          style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
          Every conversation with Om begins with listening. Share your vision — he will craft an experience
          that transcends the ordinary.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link href="/contact" className="btn-hero-primary">Plan My Journey</Link>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-all duration-300"
            style={{
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: 'rgba(255,255,255,0.75)',
              borderRadius: 'var(--radius-control)',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            Explore Journeys
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-xs tracking-wider transition-colors"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-secondary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
            <MessageCircle size={13} /> WhatsApp
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <a
            href={`mailto:${siteConfig.contact.emails[0]}`}
            className="flex items-center gap-2 font-sans text-xs tracking-wider transition-colors"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-secondary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
            <Mail size={13} /> {siteConfig.contact.emails[0]}
          </a>
        </div>
      </div>
    </section>
  );
}
