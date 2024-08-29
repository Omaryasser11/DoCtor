import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import './NavBarComponent.scss';
import { Link } from 'react-router-dom';
import navBarLogo from '../../assets/لوجو_دينا_المعدل_1-removebg-preview.png';
import LanguageToggle from '../../store/LanguageToggle';
import { FaBars, FaTimes } from 'react-icons/fa'; // Font Awesome icons for toggle
import AOS from 'aos';
import 'aos/dist/aos.css';

function NavBarComponent() {
  const { language } = useContext(LanguageContext);
  const [toggle, setToggle] = useState(false); // State for managing the toggle

  useEffect(() => {
    AOS.init({
      duration: 2500,
    });
  }, []);

  const handleToggle = () => {
    setToggle(!toggle); // Toggles the state
  };

  return (
    <div className="NavBar" data-aos="fade-down">
      <Link to="/" className='www'>
        <img className="navBarLogo" src={navBarLogo} alt="Logo" />
      </Link>
      
      <div className="menu-icon" onClick={handleToggle}>
        {toggle ? <FaTimes /> : <FaBars />} {/* Toggle icon based on state */}
      </div>

      <div className={`nav-links ${toggle ? 'active' : ''}`}>
        {language === 'ar' ? (
          <div className="flexR">
            <Link lang={language} className="Linko hover-1" to="/dr">دكتور دينا</Link>
            <Link lang={language} to="Procedures" className="Linko hover-1">أعمالنا</Link>
            <Link lang={language} to="Before" className="Linko hover-1">قبل و بعد</Link>
            <Link lang={language} className="Linko hover-1">الاسئلة الشائعة</Link>
            <Link lang={language} to="Videosb" className="Linko hover-1">فيديوهات</Link>
            <Link lang={language} to="Blog" className="Linko hover-1">المدونة</Link>
            <Link lang={language} to="Testimonials" className="Linko hover-1">شهادات العملاء</Link>
            <Link lang={language} className="Linko hover-1" to="Reservations">حجوزات</Link>
            <li><LanguageToggle /></li>
          </div>
        ) : (
          <ul>
            <li><Link className="Linko hover-1" to="/dr">Dr DINA</Link></li>
            <li><Link to="Procedures" className="Linko hover-1">PROCEDURES</Link></li>
            <li><Link to="Before" className="Linko hover-1">BEFORE & AFTER</Link></li>
            <li><Link className="Linko hover-1" to="/Faq">FAQ</Link></li>
            <li><Link to="Videosb" className="Linko hover-1">VIDEOS</Link></li>
            <li><Link to="Blog" className="Linko hover-1">BLOG</Link></li>
            <li><Link to="Testimonials" className="Linko hover-1">TESTIMONIALS</Link></li>
            <li><Link className="Linko hover-1">CONSULTATION</Link></li>
            <li><LanguageToggle /></li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default NavBarComponent;
