import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import './NavBarComponent.scss';
import { Link } from 'react-router-dom';
import navBarLogo from '../../assets/لوجو_دينا_المعدل_1-removebg-preview.png';
import LanguageToggle from '../../store/LanguageToggle';
import { FaBars, FaTimes } from 'react-icons/fa'; // Font Awesome icons for toggle
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRecoilState } from 'recoil';

function NavBarComponent() {
  const { language } = useContext(LanguageContext);
  const [toggle, setToggle] = useState(false); // State for managing the toggle
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for token check

  useEffect(() => {
    AOS.init({
      duration: 2500,
    });

    // Check local storage for token on mount
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Sets isAuthenticated to true if token exists
  }, []);

  const handleToggle = () => {
    setToggle(!toggle); // Toggles the state
  };

  return (
    <div className="NavBar" data-aos="fade-down" lang={language}>
      <Link to="/" className='www'>
        <img className="navBarLogo" src={navBarLogo} alt="Logo" />
      </Link>

      <div className="menu-icon" onClick={handleToggle}>
        {toggle ? <FaTimes /> : <FaBars />} {/* Toggle icon based on state */}
      </div>

      <div className={`nav-links ${toggle ? 'active' : ''}`}>
        {language === 'ar' ? (
          <div className="flexR">
            <Link lang={language} className="Linko hover-1" to={isAuthenticated ? "/admin" : "/dr"}>دكتور دينا</Link>
            <Link lang={language} to="Procedures" className="Linko hover-1">أعمالنا</Link>
            <Link lang={language} to="Before" className="Linko hover-1">قبل و بعد</Link>
            <Link lang={language} to="/faq" className="Linko hover-1">الاسئلة الشائعة</Link>
            <Link lang={language} to="Videos" className="Linko hover-1">فيديوهات</Link>
            <Link lang={language} to="Blog" className="Linko hover-1">المدونة</Link>
            <Link lang={language} to="events" className="Linko hover-1"  > مؤتمرات عالميه</Link>
            <Link lang={language} to="Testimonials" className="Linko hover-1">شهادات العملاء</Link>
            <Link lang={language} to="ComingSoon" className="Linko hover-1">حجوزات</Link>
            <li><Link to={isAuthenticated ? "/Edit" : "/contact"} className="Linko hover-1">تواصل معانا </Link></li>

            <li><LanguageToggle /></li>
          </div>
        ) : (
          <ul>
            <Link lang={language} className="Linko hover-1" to={isAuthenticated ? "/admin" : "/dr"}> Dr DINA</Link>
            <li><Link to="Procedures" className="Linko hover-1">PROCEDURES</Link></li>
            <li><Link to="Before" className="Linko hover-1">BEFORE & AFTER</Link></li>
            <li><Link to="events" className="Linko hover-1">Events</Link></li>
            <li><Link className="Linko hover-1" to="/faq">FAQ</Link></li>
            <li><Link to="Videos" className="Linko hover-1">VIDEOS</Link></li>
            <li><Link to="Blog" className="Linko hover-1">BLOG</Link></li>
            <li><Link to="Testimonials" className="Linko hover-1">TESTIMONIALS</Link></li>
            <li><Link to="ComingSoon" className="Linko hover-1">CONSULTATION</Link></li>
            <li><Link to={isAuthenticated ? "/Edit" : "/contact"} className="Linko hover-1">Contact Us</Link></li>
            <li><LanguageToggle /></li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default NavBarComponent;
