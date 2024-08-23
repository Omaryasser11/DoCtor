import React, { useContext } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import './NavBarComponent.scss';
import { Link } from 'react-router-dom';
import navBarLogo from '../../assets/لوجو_دينا_المعدل_1-removebg-preview.png';
import LanguageToggle from '../../store/LanguageToggle';

function NavBarComponent() {
  const { language } = useContext(LanguageContext);

  return (
    <div className='NavBar'>
      {language === 'ar' ? (
        <>
          <Link to="/">
            <img className='navBarLogo' src={navBarLogo} alt="Logo" />
          </Link>
          <Link className='Linko hover-1' to="/dr">دكتور دينا</Link>
          <Link to='Procedures' className='Linko hover-1'>
            <li>أعمالنا</li>
          </Link>
          <Link to='Before' className='Linko hover-1'>
            <li>قبل و بعد</li>
          </Link>
          <Link className='Linko hover-1'>
            <li>الاسئلة الشائعة</li>
          </Link>
          <Link to='Videosb' className='Linko hover-1'>
            <li>فيديوهات</li>
          </Link>
          <Link to='Blog' className='Linko hover-1'>
            <li>المدونة</li>
          </Link>
          <Link to='Testimonials' className='Linko hover-1'>
            <li>شهادات العملاء</li>
          </Link>
          <Link className='Linko hover-1' to='Reservations'>
            <li>حجوزات</li>
          </Link>
          <li><LanguageToggle /></li>

          <li><button>تسجيل الدخول </button></li>
        </>
      ) : (
        <>
          <Link to="/">
            <img className='navBarLogo' src={navBarLogo} alt="Logo" />
          </Link>
          <ul>
            <li><Link className='Linko hover-1' to="/dr">Dr DINA</Link></li>
            <li><Link to='Procedures' className='Linko hover-1'>PROCEDURES</Link></li>
            <li><Link to='Before' className='Linko hover-1'>BEFORE & AFTER</Link></li>
            <li><Link className='Linko hover-1'>FAQ</Link></li>
            <li><Link to='Videosb' className='Linko hover-1'>VIDEOS</Link></li>
            <li><Link to='Blog' className='Linko hover-1'>BLOG</Link></li>
            <li><Link to='Testimonials' className='Linko hover-1'>TESTIMONIALS</Link></li>
            <li><Link className='Linko hover-1'>CONSULTATION</Link></li>
            <li><button>Login</button></li>
            <li><LanguageToggle /></li>
          </ul>
        </>
      )}
    </div>
  );
}

export default NavBarComponent;
