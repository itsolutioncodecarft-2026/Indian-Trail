'use client';
import { useLang } from '@/lib/LanguageContext';

export default function LanguageSwitcher({ scrolled = true }) {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1">
      {['en', 'es'].map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span className={`text-xs ${scrolled ? 'text-[#2C1810]/30' : 'text-[#FAF6EC]/40'}`}>|</span>
          )}
          <button
            onClick={() => setLang(l)}
            className={`font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
              lang === l
                ? scrolled ? 'text-[#B8892A] font-medium' : 'text-[#D4A853] font-medium'
                : scrolled ? 'text-[#2C1810]/50 hover:text-[#2C1810]' : 'text-[#FAF6EC]/50 hover:text-[#FAF6EC]'
            }`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
