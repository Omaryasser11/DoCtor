import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import './Footer.scss';
import LOGO from "../../assets/لوجو دينا المعدل.png";
import oOGO from "../../assets/logo-no-background.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faYoutube, faInstagram, faTiktok, faSnapchat, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import BasrUrl from '../../BaseUrl'; // Import the configured Axios instance
import LanguageToggle from '../../store/LanguageToggle';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await BasrUrl.get('/shared'); // Adjust the endpoint as needed
        setSocialLinks(response.data.socialLinks);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  const navItems = language === 'ar' ? [
    { to: '/dr', text: 'دكتور دينا' },
    { to: 'Procedures', text: 'أعمالنا' },
    { to: 'Before', text: 'قبل و بعد' },
    { to: '/faq', text: 'الاسئلة الشائعة' },
    { to: 'Videosb', text: 'فيديوهات' },
    { to: 'Blog', text: 'المدونة' },
    { to: 'Testimonials', text: 'شهادات العملاء' },
    { to: 'Reservations', text: 'حجوزات' },
  ] : [
    { to: '/dr', text: 'Dr DINA' },
    { to: 'Procedures', text: 'PROCEDURES' },
    { to: 'Before', text: 'BEFORE & AFTER' },
    { to: '/faq', text: 'FAQ' },
    { to: 'Videosb', text: 'VIDEOS' },
    { to: 'Blog', text: 'BLOG' },
    { to: 'Testimonials', text: 'TESTIMONIALS' },
    { to: 'Consultation', text: 'CONSULTATION' },
  ];

  return (
    <div id="footer-outer" className="col-12">
      <div id="footer-widgets col-12 flex">
        <div className=" flex col-12">
          <div className="row flexA col-12">
            {/* Logo */}
            <div className="col-lg-1  col-md-12 flex">
              <div className="widget widget_text">
                <div className="textwidget flex">
                  <p>
                    <img
                      decoding="async"
                      className="alignnone size-full wp-image-5932"
                      src={LOGO}
                      alt="Logo"
                      width="200"
                      height="150"
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="col-lg-7 col-md-12  flexR  SpanFooterParent">
              <ul className="footer-links flexR">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link lang={language} className="Linko hover-1" to={item.to}>
                      {item.text}
                    </Link>
                  </li>
                ))}

              </ul>
            </div>

            {/* Social Media Links */}
            <div className="col-lg-2 col-md-12 flexA position-relative m-4" style={{ marginBottom: '2rem' }}>
              <ul className='Social flexR col-12'>
                {socialLinks.onlyFans && (
                  <li>
                    <a href={socialLinks.onlyFans} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faSnapchat} />
                    </a>
                  </li>
                )}
                {socialLinks.tiktok && (
                  <li>
                    <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faTiktok} />
                    </a>
                  </li>
                )}
                {socialLinks.facebook && (
                  <li>
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  </li>
                )}
                {socialLinks.instagram && (
                  <li>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </li>
                )}
                {socialLinks.youtube && (
                  <li>
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </li>
                )}
                {(
                  <li>
                    <a href='https://api.whatsapp.com/send/?phone=966591986793' target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                  </li>
                )}

              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="row mt-4 col-12 " id="copyright">
        <div className="container col-12">
          <div className="col-12 flexRR" lang={language}>
            <p>
              {language === 'ar'
                ? 'جميع الحقوق محفوظة © 2024 Dina-Khairy.com'
                : 'All rights reserved © 2024 Dina-Khairy.com'}
            </p>
            <img
              decoding="async"
              className="alignnone size-full wp-image-5932"
              src={oOGO}
              alt="Footer Logo"
              width="150"
              height="50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
