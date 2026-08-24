'use client';
import { createContext, useContext, useState } from 'react';
import { t } from '@/data/translations';

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: () => '' });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const translate = (key) => t(lang, key);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
