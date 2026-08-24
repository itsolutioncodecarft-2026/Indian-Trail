'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/tours', label: t('nav.tours') },
    { href: '/destinations', label: t('nav.destinations') },
    { href: '/experiences', label: t('nav.experiences') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const navBg = scrolled
    ? 'bg-[#FEFCF7]/95 backdrop-blur-sm shadow-sm py-3'
    : 'bg-transparent py-5';

  const textColor = scrolled ? 'text-[#2C1810]' : 'text-[#FAF6EC]';
  const linkColor = scrolled ? 'text-[#2C1810]/70 hover:text-[#B8892A]' : 'text-[#FAF6EC]/80 hover:text-[#D4A853]';
  const borderColor = scrolled ? 'border-[#2C1810] text-[#2C1810] hover:bg-[#2C1810] hover:text-[#FAF6EC]' : 'border-[#FAF6EC]/60 text-[#FAF6EC] hover:bg-[#FAF6EC]/10';
  const hamburgerColor = scrolled ? 'text-[#2C1810]' : 'text-[#FAF6EC]';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container-luxury flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className={`font-serif text-xl font-light tracking-wide transition-colors duration-300 ${textColor}`}>
            Indian Routes &amp; Trails
          </span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D4A853]">
            A Signature of Excellence
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${linkColor}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher scrolled={scrolled} />
          <Link
            href="/contact"
            className={`font-sans text-xs tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 ${borderColor}`}
          >
            {t('common.enquire_now')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 transition-colors duration-300 ${hamburgerColor}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#FEFCF7]/98 backdrop-blur-sm shadow-lg transition-all duration-300 overflow-hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-luxury py-6 flex flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-sans text-sm tracking-[0.15em] uppercase text-[#2C1810]/70 hover:text-[#B8892A] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-[#E8D5B0]/60">
            <LanguageSwitcher scrolled />
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="font-sans text-xs tracking-[0.2em] uppercase px-5 py-2.5 border border-[#2C1810] text-[#2C1810] hover:bg-[#2C1810] hover:text-[#FAF6EC] transition-all duration-300"
            >
              {t('common.enquire_now')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
