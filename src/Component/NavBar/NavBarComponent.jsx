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
          <Link to="/" >
            <img className='navBarLogo' src={navBarLogo} alt="Logo" />
          </Link>
       <div className='flexR'>
       <Link lang={language} className='Linko hover-1' to="/dr">دكتور دينا</Link>
          <Link lang={language} to='Procedures' className='Linko hover-1'>
        أعمالنا
          </Link>
          <Link lang={language} to='Before' className='Linko hover-1'>
      قبل و بعد
          </Link>
          <Link lang={language} className='Linko hover-1'>
           الاسئلة الشائعة
          </Link>
          <Link lang={language} to='Videosb' className='Linko hover-1'>
          فيديوهات
          </Link>
          <Link lang={language} to='Blog' className='Linko hover-1'>
    المدونة
          </Link>
          <Link lang={language} to='Testimonials' className='Linko hover-1'>
        شهادات العملاء
          </Link>
          <Link lang={language} className='Linko hover-1' to='Reservations'>
          حجوزات
          </Link>
       </div>
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
