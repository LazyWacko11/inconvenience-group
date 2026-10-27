import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('icg_lang') || 'cs';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('icg_lang', newLang);
  };

  const t = (key) => {
    const dict = translations[lang] || translations['cs'];
    return dict[key] !== undefined ? dict[key] : (translations['en'][key] || key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
