'use client';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import { siteConfig } from '@/data/siteContent';
import EnquiryForm from '@/components/EnquiryForm';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ContactContent() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const defaultTour = searchParams.get('tour') || '';

  return (
    <>
      {/* Hero */}
      <section className="relative h-[48vh] min-h-[320px] flex items-end pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&q=85"
            alt="Plan your India journey" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.45) 55%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,27,42,0.55) 0%, transparent 60%)' }} />
        </div>
        <div className="relative container-luxury">
          <p className="eyebrow mb-3" style={{ color: '#C8A96E' }}>Get in Touch</p>
          <h1 className="font-serif font-light leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', color: '#FEFCF7' }}>
            Let&rsquo;s Create<br />
            <span className="italic" style={{ color: '#C8A96E' }}>Your Journey</span>
          </h1>
          <p className="mt-4 font-sans font-light max-w-lg" style={{ color: 'rgba(254,252,247,0.6)', fontSize: '1rem' }}>
            Every enquiry is personally answered by Om — no automated replies.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="section-padding" style={{ backgroundColor: '#FAFBFD' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="eyebrow mb-4">Reach Om Directly</p>
                <h2 className="font-serif text-2xl font-light mb-5" style={{ color: '#1a2332' }}>
                  A Conversation,<br />
                  <span className="italic font-light" style={{ color: '#2B6CB0' }}>Not a Form</span>
                </h2>
                <div className="divider-gold mb-6" />
                <p className="font-sans text-sm font-light leading-relaxed" style={{ color: '#4A5568' }}>
                  Om personally reads and responds to every message. Use the form or reach out directly — whichever feels right.
                </p>
              </div>

              {/* Details */}
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: '#A0AEC0' }}>Email</p>
                  {siteConfig.contact.emails.map(email => (
                    <a key={email} href={`mailto:${email}`}
                      className="flex items-center gap-3 py-1.5 font-sans text-sm transition-colors group"
                      style={{ color: '#4A5568' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#2B6CB0'}
                      onMouseLeave={e => e.currentTarget.style.color = '#4A5568'}>
                      <Mail size={13} className="shrink-0" style={{ color: '#C49A3C' }} />
                      <span className="break-all">{email}</span>
                    </a>
                  ))}
                </div>

                {/* Phone */}
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: '#A0AEC0' }}>Phone</p>
                  {siteConfig.contact.phones.map(phone => (
                    <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                      className="flex items-center gap-3 py-1.5 font-sans text-sm transition-colors"
                      style={{ color: '#4A5568' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#2B6CB0'}
                      onMouseLeave={e => e.currentTarget.style.color = '#4A5568'}>
                      <Phone size={13} className="shrink-0" style={{ color: '#C49A3C' }} />
                      {phone}
                    </a>
                  ))}
                </div>

                {/* WhatsApp */}
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: '#A0AEC0' }}>WhatsApp</p>
                  <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-sans text-sm transition-colors"
                    style={{ color: '#2B6CB0' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1A4A7A'}
                    onMouseLeave={e => e.currentTarget.style.color = '#2B6CB0'}>
                    <MessageCircle size={13} className="shrink-0" style={{ color: '#C49A3C' }} />
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Address */}
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: '#A0AEC0' }}>Office</p>
                  <div className="flex items-start gap-3">
                    <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: '#C49A3C' }} />
                    <address className="not-italic font-sans text-sm font-light leading-relaxed" style={{ color: '#718096' }}>
                      {siteConfig.contact.address}
                    </address>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="py-5 px-6" style={{ backgroundColor: '#EBF4FF', borderLeft: '3px solid #2B6CB0' }}>
                <p className="font-serif text-base italic leading-relaxed" style={{ color: '#2C5282' }}>
                  &ldquo;We don&rsquo;t say the end of the trip — we say it&rsquo;s the beginning of our long-term relationship.&rdquo;
                </p>
                <footer className="font-sans text-[10px] uppercase tracking-widest mt-3" style={{ color: '#C49A3C' }}>
                  — Om, Founder
                </footer>
              </blockquote>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 p-8 md:p-10"
              style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}>
              <h2 className="font-serif text-2xl font-light mb-1.5" style={{ color: '#1a2332' }}>Plan Your Journey</h2>
              <p className="font-sans text-sm font-light mb-8" style={{ color: '#718096' }}>
                Tell us about your dream India experience. Om will personally respond.
              </p>
              <EnquiryForm defaultTour={defaultTour} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#FAFBFD' }} />}>
      <ContactContent />
    </Suspense>
  );
}
