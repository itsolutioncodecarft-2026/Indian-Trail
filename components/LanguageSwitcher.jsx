'use client';
import { useLang } from '@/lib/LanguageContext';

export default function LanguageSwitcher({ scrolled = true }) {
  const { lang, setLang } = useLang();
  // This component is kept for backward compat — Navbar handles switching inline now
  return (
    <div className="flex items-center gap-1">
      {['en', 'es'].map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span className="text-xs" style={{ color: scrolled ? '#CBD5E0' : 'rgba(254,252,247,0.3)' }}>|</span>
          )}
          <button
            onClick={() => setLang(l)}
            className="font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
            style={{
              color: lang === l
                ? (scrolled ? '#2B6CB0' : '#C8A96E')
                : (scrolled ? '#A0AEC0' : 'rgba(254,252,247,0.45)'),
              fontWeight: lang === l ? 500 : 400,
            }}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
