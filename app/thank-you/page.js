'use client';
import Link from 'next/link';
import { CheckCircle, MessageCircle, Mail } from 'lucide-react';
import { siteConfig } from '@/data/siteContent';
import { useLang } from '@/lib/LanguageContext';

export default function ThankYouPage() {
  const { t } = useLang();
  return (
    <section className="min-h-screen bg-ivory-50 flex items-center justify-center py-20">
      <div className="container-narrow text-center">
        <CheckCircle size={56} className="text-gold mx-auto mb-7" strokeWidth={1.5} />
        <p className="eyebrow text-gold mb-4">Thank You</p>
        <h1 className="section-title text-charcoal mb-5">
          Your Enquiry Has Been Received
        </h1>
        <div className="divider-gold mx-auto mb-7" />
        <p className="body-large text-charcoal/60 mb-4 max-w-lg mx-auto">
          Om personally reads every enquiry and will respond to you directly, very soon.
        </p>
        <p className="font-serif text-base italic text-charcoal/50 mb-10">
          &ldquo;We don&rsquo;t say the end of the trip — we say it&rsquo;s the beginning of our long-term relationship.&rdquo;
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
          <a href={`mailto:${siteConfig.contact.emails[0]}`} className="btn-outline flex items-center gap-2">
            <Mail size={16} />
            Send an Email
          </a>
        </div>

        <Link href="/" className="btn-ghost">{t('nav.home')}</Link>
      </div>
    </section>
  );
}
