import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import './LanguageSwitch.scss'; // Ensure you import your CSS for styling

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleLanguageChange = () => {
    const selectedLang = language === 'en' ? 'ar' : 'en';
    setLanguage(selectedLang);
    localStorage.setItem('appLanguage', selectedLang);
  };

  return (
    <center>
      <div className="switch">
        <input
          id="language-toggle"
          className="check-toggle check-toggle-round-flat"
          type="checkbox"
          checked={language === 'ar'}
          onChange={handleLanguageChange}
        />
        <label htmlFor="language-toggle"></label>
        <span className="on">AR</span>
        <span className="off">EN</span>
      </div>
    </center>
  );
};

export default LanguageToggle;
