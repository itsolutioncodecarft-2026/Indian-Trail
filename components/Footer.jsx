'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { siteConfig } from '@/data/siteContent';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { t } = useLang();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/tours', label: t('nav.tours') },
    { href: '/destinations', label: t('nav.destinations') },
    { href: '/experiences', label: t('nav.experiences') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer style={{ backgroundColor: '#2C1810' }} className="text-[#FAF6EC]/70">
      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-4">
              <span className="font-serif text-2xl font-light text-[#FAF6EC]">
                Indian Routes &amp; Trails
              </span>
            </Link>
            <p className="eyebrow text-[#B8892A] mb-6">{t('footer.tagline')}</p>
            <p className="font-sans text-sm font-light text-[#FAF6EC]/50 max-w-sm leading-relaxed">
              Curated luxury journeys across India — where heritage meets authenticity.
              Every itinerary is a hand-woven masterpiece by Om.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#B8892A] mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-[#FAF6EC]/50 hover:text-[#FAF6EC] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#B8892A] mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              {siteConfig.contact.emails.map((email) => (
                <li key={email} className="flex items-start gap-3">
                  <Mail size={14} className="text-[#B8892A] mt-0.5 shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="font-sans text-sm text-[#FAF6EC]/50 hover:text-[#FAF6EC] transition-colors break-all"
                  >
                    {email}
                  </a>
                </li>
              ))}
              {siteConfig.contact.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone size={14} className="text-[#B8892A] shrink-0" />
                  <a
                    href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                    className="font-sans text-sm text-[#FAF6EC]/50 hover:text-[#FAF6EC] transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#B8892A] mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-[#FAF6EC]/50 leading-relaxed">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm text-[#B8892A] hover:text-[#D4A853] transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FAF6EC]/10">
        <div className="container-luxury py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-[#FAF6EC]/30">{t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-sans text-xs text-[#FAF6EC]/30 hover:text-[#FAF6EC]/60 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="font-sans text-xs text-[#FAF6EC]/30 hover:text-[#FAF6EC]/60 transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
