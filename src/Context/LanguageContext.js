import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  let {t} = useTranslation();

  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.body.classList.add('transition-dir');
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    cookies.set('i18next', lang || 'en');
    document.documentElement.dir = i18n.dir(lang);
  };
  return (
    <LanguageContext.Provider value={{ changeLanguage, language, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
