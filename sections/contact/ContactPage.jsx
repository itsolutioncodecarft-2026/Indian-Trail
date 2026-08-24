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
      <section className="relative h-[45vh] min-h-[320px] flex items-end pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80"
            alt="Begin your India journey"
            fill priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/10" />
        </div>
        <div className="relative container-luxury">
          <p className="eyebrow text-gold mb-3">{t('contact.title')}</p>
          <h1 className="font-serif text-5xl font-light text-ivory-100 leading-tight">
            Begin Your Journey
          </h1>
          <p className="mt-4 font-sans text-base font-light text-ivory-100/60 max-w-lg">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="eyebrow text-gold mb-4">Get in Touch</p>
                <h2 className="font-serif text-2xl font-light text-charcoal mb-4">
                  Reach Om Directly
                </h2>
                <div className="divider-gold mb-6" />
                <p className="body-text text-charcoal/60 leading-relaxed">
                  Every enquiry is personally read and responded to by Om. There are no automated replies — only a genuine, thoughtful response from the man behind the journeys.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-5">
                <div>
                  <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-charcoal/40 mb-3">
                    {t('contact.email_title')}
                  </h3>
                  {siteConfig.contact.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`}
                      className="flex items-center gap-3 py-2 group">
                      <Mail size={14} className="text-gold shrink-0" />
                      <span className="font-sans text-sm text-charcoal/70 group-hover:text-gold transition-colors break-all">
                        {email}
                      </span>
                    </a>
                  ))}
                </div>

                <div>
                  <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-charcoal/40 mb-3">
                    {t('contact.phone_title')}
                  </h3>
                  {siteConfig.contact.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                      className="flex items-center gap-3 py-2 group">
                      <Phone size={14} className="text-gold shrink-0" />
                      <span className="font-sans text-sm text-charcoal/70 group-hover:text-gold transition-colors">
                        {phone}
                      </span>
                    </a>
                  ))}
                </div>

                <div>
                  <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-charcoal/40 mb-3">
                    {t('contact.whatsapp_title')}
                  </h3>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 py-2 group"
                  >
                    <MessageCircle size={14} className="text-gold shrink-0" />
                    <span className="font-sans text-sm text-charcoal/70 group-hover:text-gold transition-colors">
                      Chat on WhatsApp
                    </span>
                  </a>
                </div>

                <div>
                  <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-charcoal/40 mb-3">
                    {t('contact.address_title')}
                  </h3>
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                    <address className="not-italic font-sans text-sm text-charcoal/70 leading-relaxed">
                      {siteConfig.contact.address}
                    </address>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="border-l-4 border-gold pl-5 py-2 bg-sand/20">
                <p className="font-serif text-base italic text-charcoal/70 leading-relaxed">
                  &ldquo;We don&rsquo;t say the end of the trip, we say it&rsquo;s the beginning of our long-term relationship.&rdquo;
                </p>
                <footer className="font-sans text-xs text-gold mt-2">— Om, Founder</footer>
              </blockquote>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white border border-sand p-8 md:p-10">
              <h2 className="font-serif text-2xl font-light text-charcoal mb-2">{t('form.title')}</h2>
              <p className="font-sans text-sm text-charcoal/50 mb-8">{t('form.subtitle')}</p>
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
    <Suspense fallback={<div className="min-h-screen bg-ivory-50" />}>
      <ContactContent />
    </Suspense>
  );
}
