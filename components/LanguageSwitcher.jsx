'use client';
import { useLang } from '@/lib/LanguageContext';

// Kept for backward compatibility — Navbar handles the primary language toggle inline.
export default function LanguageSwitcher({ scrolled = true }) {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selection">
      {['en', 'es'].map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span
              className="text-xs"
              style={{ color: scrolled ? 'var(--color-border-strong)' : 'rgba(255,255,255,0.3)' }}
            >
              |
            </span>
          )}
          <button
            onClick={() => setLang(l)}
            className="font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
            aria-pressed={lang === l}
            style={{
              color: lang === l
                ? (scrolled ? 'var(--color-primary)' : 'var(--color-secondary)')
                : (scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.45)'),
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
