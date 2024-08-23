import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Optionally, save the selected language in localStorage
    localStorage.setItem('appLanguage', lang);
  };

  // Determine the text direction based on the language
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={direction}>
      <button onClick={() => handleLanguageChange('en')} disabled={language === 'en'}>
        English
      </button>
      <button onClick={() => handleLanguageChange('ar')} disabled={language === 'ar'}>
        Arabic
      </button>
    </div>
  );
};

export default LanguageToggle;
