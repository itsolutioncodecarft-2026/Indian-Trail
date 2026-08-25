'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',            label: 'Home' },
  { href: '/about',       label: 'About Om' },
  { href: '/tours',       label: 'Journeys' },
  { href: '/destinations',label: 'Destinations' },
  { href: '/experiences', label: 'Experiences' },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero pages — start transparent
  const heroPages = ['/', '/about', '/tours', '/destinations', '/experiences', '/contact'];
  const transparent = !scrolled && heroPages.includes(pathname);

  // Color tokens based on state
  const logoVariant = transparent ? 'light' : 'dark';
  const navBg = transparent ? 'transparent' : 'rgba(250,251,253,0.97)';
  const linkCol = transparent ? 'rgba(254,252,247,0.78)' : '#4A5568';
  const linkActive = transparent ? '#C8A96E' : '#2B6CB0';
  const hamburgerCol = transparent ? 'rgba(254,252,247,0.85)' : '#1a2332';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: navBg,
        backdropFilter: transparent ? 'none' : 'blur(14px)',
        boxShadow: transparent ? 'none' : '0 1px 0 rgba(26,35,50,0.08)',
        paddingTop: scrolled ? '10px' : '18px',
        paddingBottom: scrolled ? '10px' : '18px',
      }}
    >
      <div className="container-luxury flex items-center justify-between">

        {/* Logo */}
        <Link href="/" aria-label="Indian Routes & Trails — Home" className="shrink-0">
          <Logo variant={logoVariant} size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="relative font-sans text-[11px] tracking-[0.14em] uppercase pb-0.5 transition-colors duration-300"
                style={{ color: isActive ? linkActive : linkCol }}
              >
                {label}
                {/* Active underline */}
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{
                    width: isActive ? '100%' : '0',
                    backgroundColor: isActive ? linkActive : 'transparent',
                  }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center gap-1">
            {['en', 'es'].map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && (
                  <span className="mx-1 text-xs" style={{ color: transparent ? 'rgba(254,252,247,0.3)' : '#CBD5E0' }}>|</span>
                )}
                <button
                  onClick={() => setLang(l)}
                  className="font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{
                    color: lang === l
                      ? (transparent ? '#C8A96E' : '#2B6CB0')
                      : (transparent ? 'rgba(254,252,247,0.5)' : '#A0AEC0'),
                    fontWeight: lang === l ? 500 : 400,
                  }}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>

          {/* Enquire button */}
          <Link
            href="/contact"
            className="font-sans text-[11px] tracking-[0.18em] uppercase px-5 py-2.5 transition-all duration-300"
            style={{
              border: `1.5px solid ${transparent ? 'rgba(254,252,247,0.45)' : '#2B6CB0'}`,
              color: transparent ? 'rgba(254,252,247,0.85)' : '#2B6CB0',
              borderRadius: '2px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = transparent ? 'rgba(254,252,247,0.12)' : '#2B6CB0';
              e.currentTarget.style.color = transparent ? '#FEFCF7' : '#ffffff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = transparent ? 'rgba(254,252,247,0.85)' : '#2B6CB0';
            }}
          >
            Enquire
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 -mr-2 transition-colors"
          style={{ color: hamburgerCol }}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-350"
        style={{
          maxHeight: open ? '500px' : '0',
          opacity: open ? 1 : 0,
          backgroundColor: 'rgba(250,251,253,0.99)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div className="container-luxury py-5 flex flex-col gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href} href={href}
              className="font-sans text-sm tracking-[0.12em] uppercase py-3"
              style={{
                color: pathname === href ? '#2B6CB0' : '#4A5568',
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-4 mt-1">
            <div className="flex items-center gap-2">
              {['en', 'es'].map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && <span className="mx-1 text-xs text-gray-300">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    className="font-sans text-xs tracking-widest uppercase"
                    style={{ color: lang === l ? '#2B6CB0' : '#A0AEC0', fontWeight: lang === l ? 500 : 400 }}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className="font-sans text-xs tracking-[0.18em] uppercase px-5 py-2.5 transition-all"
              style={{ border: '1.5px solid #2B6CB0', color: '#2B6CB0', borderRadius: '2px' }}
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
