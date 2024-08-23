import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get the saved language from localStorage or default to 'en'
    return localStorage.getItem('appLanguage') || 'en';
  });

  useEffect(() => {
    // Update localStorage whenever the language changes
    localStorage.setItem('appLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
