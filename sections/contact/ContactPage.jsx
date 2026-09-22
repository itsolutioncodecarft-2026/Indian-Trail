'use client';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import { siteConfig } from '@/data/siteContent';
import EnquiryForm from '@/components/EnquiryForm';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/*
  Hero offset: fixed navbar is ~64px tall.
  Adding paddingTop pushes image + content below the nav bar.
  The hero uses minHeight instead of a fixed viewport fraction so
  the top padding doesn't reduce visible content height.
*/
const HERO_STYLE = {
  position:   'relative',
  minHeight:  'clamp(320px, 48vh, 520px)',
  display:    'flex',
  alignItems: 'flex-end',
  overflow:   'hidden',
  paddingTop: 'var(--header-height-desktop)',
};

function ContactContent() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const defaultTour = searchParams.get('tour') || '';
  const defaultDate = searchParams.get('date') || '';

  return (
    <>
      {/* Hero */}
      <section style={HERO_STYLE}>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&q=85"
            alt="Plan your India journey — Indian Routes & Trails"
            fill priority className="object-cover object-center" sizes="100vw"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(20,34,77,0.92) 0%, rgba(20,34,77,0.45) 55%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(20,34,77,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury pb-14">
          <p className="eyebrow mb-3" style={{ color: 'var(--color-secondary)' }}>Get in Touch</p>
          <h1 className="font-serif font-light leading-none"
            style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: 'var(--color-text-invert)' }}>
            Let&rsquo;s Create<br />
            <em style={{ color: 'var(--color-secondary)' }}>Your Journey</em>
          </h1>
          <p className="mt-4 font-sans font-light max-w-lg"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
            Every enquiry is personally answered by Om — no automated replies.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="eyebrow mb-4">Reach Om Directly</p>
                <h2 className="font-serif text-2xl font-light mb-5"
                  style={{ color: 'var(--color-text)' }}>
                  A Conversation,<br />
                  <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                    Not a Form
                  </em>
                </h2>
                <div className="divider-gold mb-6" />
                <p className="font-sans text-sm font-light leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}>
                  Om personally reads and responds to every message. Use the form or reach out directly —
                  whichever feels right.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: 'var(--color-text-muted)' }}>Email</p>
                  {siteConfig.contact.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`}
                      className="flex items-center gap-3 py-1.5 font-sans text-sm transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                      <Mail size={13} className="shrink-0" style={{ color: 'var(--color-secondary)' }} />
                      <span className="break-all">{email}</span>
                    </a>
                  ))}
                </div>

                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: 'var(--color-text-muted)' }}>Phone</p>
                  {siteConfig.contact.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                      className="flex items-center gap-3 py-1.5 font-sans text-sm transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                      <Phone size={13} className="shrink-0" style={{ color: 'var(--color-secondary)' }} />
                      {phone}
                    </a>
                  ))}
                </div>

                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: 'var(--color-text-muted)' }}>WhatsApp</p>
                  <a href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-sans text-sm transition-colors"
                    style={{ color: 'var(--color-primary)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-dark)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-primary)'}>
                    <MessageCircle size={13} className="shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    Chat on WhatsApp
                  </a>
                </div>

                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: 'var(--color-text-muted)' }}>Office</p>
                  <div className="flex items-start gap-3">
                    <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    <address className="not-italic font-sans text-sm font-light leading-relaxed"
                      style={{ color: 'var(--color-text-muted)' }}>
                      {siteConfig.contact.address}
                    </address>
                  </div>
                </div>
              </div>

              <blockquote className="py-5 px-6"
                style={{
                  backgroundColor: 'rgba(27,42,94,0.06)',
                  borderLeft: '3px solid var(--color-primary)',
                  borderRadius: '0 var(--radius-control) var(--radius-control) 0',
                }}>
                <p className="font-serif text-base italic leading-relaxed"
                  style={{ color: 'var(--color-primary)' }}>
                  &ldquo;We don&rsquo;t say the end of the trip — we say it&rsquo;s the beginning of our
                  long-term relationship.&rdquo;
                </p>
                <footer className="font-sans text-[10px] uppercase tracking-widest mt-3"
                  style={{ color: 'var(--color-secondary-hover)' }}>
                  — Om, Founder
                </footer>
              </blockquote>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 p-8 md:p-10"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-card)',
              }}>
              <h2 className="font-serif text-2xl font-light mb-1.5"
                style={{ color: 'var(--color-text)' }}>Plan Your Journey</h2>
              <p className="font-sans text-sm font-light mb-8"
                style={{ color: 'var(--color-text-muted)' }}>
                Tell us about your dream India experience. Om will personally respond.
              </p>
              <EnquiryForm defaultTour={defaultTour} defaultDate={defaultDate} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }} />}>
      <ContactContent />
    </Suspense>
  );
}
