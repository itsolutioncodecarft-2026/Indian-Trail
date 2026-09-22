'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About Om' },
  { href: '/tours',        label: 'Journeys' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/festivals',    label: 'Festival Calendar' },
  { href: '/experiences',  label: 'Experiences' },
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

  const heroPages = ['/', '/about', '/tours', '/destinations', '/experiences', '/contact', '/festivals'];
  const transparent = !scrolled && heroPages.includes(pathname);

  const logoVariant  = transparent ? 'light' : 'dark';
  /*
    Both states get a blurred semi-transparent background.
    Transparent (top of hero pages): deep indigo at ~20% — barely visible,
    keeps the cinematic hero image readable underneath while preventing
    the nav from being completely invisible.
    Scrolled: warm ivory at 95% opacity — matches brand surface colour.
  */
  const navBg = transparent
    ? 'rgba(20, 34, 77, 0.20)'          /* subtle indigo tint over hero */
    : 'rgba(251, 247, 239, 0.95)';      /* warm ivory, near-solid */
  const navBlur      = 'blur(10px)';    /* same blur for both states */
  const hamburgerCol = transparent ? 'rgba(255,255,255,0.85)' : 'var(--color-text)';

  /* Unified colour logic — same rule for every link including Festival Calendar.
     Active = current route → marigold (transparent) / indigo (solid).
     Inactive → muted white (transparent) / muted grey (solid).
     No link is permanently forced to marigold when not active. */
  const inactiveCol = transparent ? 'rgba(255,255,255,0.78)' : 'var(--color-text-muted)';
  const activeCol   = transparent ? 'var(--color-secondary)'  : 'var(--color-primary)';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor:      navBg,
        backdropFilter:       navBlur,
        WebkitBackdropFilter: navBlur,
        boxShadow:            transparent ? 'none' : '0 1px 0 rgba(20,20,43,0.08)',
        paddingTop:           scrolled ? '10px' : '18px',
        paddingBottom:        scrolled ? '10px' : '18px',
      }}
    >
      <div className="container-luxury flex items-center justify-between">

        {/* Logo */}
        <Link href="/" aria-label="Indian Routes & Trails — Home" className="shrink-0">
          <Logo variant={logoVariant} size="md" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            const col = isActive ? activeCol : inactiveCol;
            /* text-shadow: soft dark on light header, soft light on transparent/dark hero */
            const shadow = transparent
              ? '0 1px 4px rgba(0,0,0,0.45)'   /* on dark image: light readability boost */
              : '0 1px 2px rgba(20,20,43,0.12)'; /* on light bg: subtle depth */

            return (
              <Link
                key={href}
                href={href}
                className="relative font-sans text-[11px] tracking-[0.14em] uppercase pb-0.5 transition-colors duration-300"
                style={{ color: col, fontWeight: 500, textShadow: shadow }}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{
                    width:           isActive ? '100%' : '0',
                    backgroundColor: isActive ? col : 'transparent',
                  }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: language toggle + Enquire */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-1" role="group" aria-label="Language selection">
            {['en', 'es'].map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && (
                  <span className="mx-1 text-xs"
                    style={{ color: transparent ? 'rgba(255,255,255,0.3)' : 'var(--color-border-strong)' }}>
                    |
                  </span>
                )}
                <button
                  onClick={() => setLang(l)}
                  className="font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
                  aria-pressed={lang === l}
                  style={{
                    color: lang === l
                      ? (transparent ? 'var(--color-secondary)' : 'var(--color-primary)')
                      : (transparent ? 'rgba(255,255,255,0.5)' : 'var(--color-text-muted)'),
                    fontWeight: lang === l ? 600 : 500,
                    textShadow: transparent
                      ? '0 1px 4px rgba(0,0,0,0.4)'
                      : '0 1px 2px rgba(20,20,43,0.10)',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>

          <Link
            href="/contact"
            className="font-sans text-[11px] tracking-[0.18em] uppercase px-5 py-2.5 transition-all duration-300"
            style={{
              border:       `1.5px solid ${transparent ? 'rgba(255,255,255,0.45)' : 'var(--color-primary)'}`,
              color:        transparent ? 'rgba(255,255,255,0.85)' : 'var(--color-primary)',
              borderRadius: 'var(--radius-control)',
              fontWeight:   500,
              textShadow:   transparent
                ? '0 1px 4px rgba(0,0,0,0.35)'
                : '0 1px 2px rgba(20,20,43,0.10)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = transparent
                ? 'rgba(255,255,255,0.22)' : 'var(--color-primary)';
              e.currentTarget.style.borderColor = transparent
                ? 'rgba(255,255,255,0.80)' : 'var(--color-primary)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = transparent
                ? 'rgba(255,255,255,0.45)' : 'var(--color-primary)';
              e.currentTarget.style.color = transparent
                ? 'rgba(255,255,255,0.85)' : 'var(--color-primary)';
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
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-350"
        style={{
          maxHeight:       open ? '600px' : '0',
          opacity:         open ? 1 : 0,
          backgroundColor: 'rgba(251,247,239,0.99)',
          backdropFilter:  'blur(14px)',
        }}
        aria-hidden={!open}
      >
        <div className="container-luxury py-5 flex flex-col gap-0.5">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className="font-sans text-sm tracking-[0.12em] uppercase py-3"
                style={{
                  color:        isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight:   isActive ? 600 : 500,
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="font-sans text-sm tracking-[0.12em] uppercase py-3"
            style={{ color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}
          >
            Contact
          </Link>

          <div className="flex items-center justify-between pt-4 mt-1">
            <div className="flex items-center gap-2" role="group" aria-label="Language selection">
              {['en', 'es'].map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-1 text-xs" style={{ color: 'var(--color-border-strong)' }}>|</span>
                  )}
                  <button
                    onClick={() => setLang(l)}
                    className="font-sans text-xs tracking-widest uppercase"
                    aria-pressed={lang === l}
                    style={{
                      color:      lang === l ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontWeight: lang === l ? 500 : 400,
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className="font-sans text-xs tracking-[0.18em] uppercase px-5 py-2.5"
              style={{
                border:       '1.5px solid var(--color-primary)',
                color:        'var(--color-primary)',
                borderRadius: 'var(--radius-control)',
              }}
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
