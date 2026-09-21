'use client';
import Link from 'next/link';
import { siteConfig } from '@/data/siteContent';
import Logo from './Logo';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',              label: 'Home' },
  { href: '/about',         label: 'About Om' },
  { href: '/tours',         label: 'Journeys' },
  { href: '/destinations',  label: 'Destinations' },
  { href: '/festivals',     label: 'Festival Calendar' },
  { href: '/experiences',   label: 'Experiences' },
  { href: '/contact',       label: 'Contact' },
];

const FESTIVAL_LINKS = [
  { href: '/festivals/holi',                     label: 'Holi' },
  { href: '/festivals/diwali',                   label: 'Diwali' },
  { href: '/festivals/pushkar-camel-fair',       label: 'Pushkar Camel Fair' },
  { href: '/festivals/dev-deepawali',            label: 'Dev Deepawali' },
  { href: '/festivals/makar-sankranti-kite-festival', label: 'Makar Sankranti' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-primary-dark)' }}>
      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="block mb-6" aria-label="Indian Routes & Trails">
              <Logo variant="light" size="md" />
            </Link>
            <p className="font-sans text-sm font-light leading-relaxed max-w-xs"
              style={{ color: 'var(--color-text-invert-muted)' }}>
              Curated luxury journeys across India — where heritage meets authenticity and every itinerary is a hand-woven masterpiece.
            </p>
            <Link href="/contact"
              className="group inline-flex items-center gap-2 mt-7 font-sans text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-secondary)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-secondary-hover)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-secondary)'}>
              Plan My Journey
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase mb-6"
              style={{ color: 'var(--color-text-invert-muted)' }}>
              Navigate
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="font-sans text-sm transition-colors duration-300"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Festivals */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase mb-6"
              style={{ color: 'var(--color-text-invert-muted)' }}>
              Festivals
            </h4>
            <ul className="space-y-3">
              {FESTIVAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="font-sans text-sm transition-colors duration-300"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="lg:col-span-4">
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase mb-6"
              style={{ color: 'var(--color-text-invert-muted)' }}>
              Get in Touch
            </h4>
            <ul className="space-y-4">
              {siteConfig.contact.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`}
                    className="flex items-start gap-3 font-sans text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.82)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}>
                    <Mail size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    <span className="break-all">{email}</span>
                  </a>
                </li>
              ))}
              {siteConfig.contact.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                    className="flex items-center gap-3 font-sans text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.82)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}>
                    <Phone size={13} className="shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                <address className="not-italic font-sans text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.32)' }}>
                  {siteConfig.contact.address}
                </address>
              </li>
              <li>
                <a href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm transition-colors"
                  style={{ color: 'var(--color-secondary)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-secondary-hover)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-secondary)'}>
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-luxury py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Dynamic copyright year — never hardcoded */}
          <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
            &copy; {new Date().getFullYear()} Indian Routes &amp; Trails. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[{ href: '/privacy', label: 'Privacy Policy' }, { href: '/terms', label: 'Terms' }].map(l => (
              <Link key={l.href} href={l.href}
                className="font-sans text-xs transition-colors"
                style={{ color: 'rgba(255,255,255,0.22)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.22)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
