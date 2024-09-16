import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OurSevices.scss'; // Import the SCSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
// import DD from "../../assets/عيادات غسن اعلان (1).png"

import DD from '../../assets/كارت 2.png'; // Update with the correct path
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { Link } from 'react-router-dom';
const OurSevices = () => {

  const { language } = useContext(LanguageContext);
  useEffect(() => {
    AOS.init({
      duration: 3000, // Duration of animations
      // You can add more AOS options here
    });
  }, []);

  return (
    <section className='col-12  Section2'>
      <div
        id="reasons"
        className=" row  flexA col-10"

      >
        <div className="col-md-12   col-lg-6 video-column" data-aos="fade-right">
          <div className="video-box"

          >
            <a href="https://www.youtube.com/watch?v=7d_chgKzJ_8" className="full-link magnific-popup"></a>
            <img
              decoding="async"
              width="1280"
              height="320"
              src={DD}
              className="img-fluid radius"
              alt=""
              srcSet={DD} />
            <a
              href="https://youtu.be/9ExTXng13iU"
              className="play_button large magnific-popup"
            >
              <span>
                <span className="play">
                  <span className="inner-wrap inner flex">
                    <FontAwesomeIcon className='playIcon' icon={faPlay} />
                  </span>
                </span>
              </span>
            </a>
            <div className='Filter2'></div>
          </div>
        </div>
        <div className="col-md-12 p-4  col-lg-6 text-column " data-aos="fade-left">
          <div className="content-wrapper">
            <h3 className="title" lang={language}>{language === 'ar' ? "أهم خدمات افضل دكتور تجميل في المملكه" : "Services provided by Dr. Dina"}</h3>
            <div className="divider"></div>
            <blockquote>
              <p lang={language} className='about-description'>
                {
                  language === 'ar'
                    ? `وجود أي مشكلة جمالية بالوجه أو بالجسم قد يكون لها أثر سلبي على نفسية الفرد وقد تؤثر ايضًا على قدرات التواصل لديه وإنتاجيته بشكل عام، ولهذا كان حل هذه المشكلات أمر ضروري. ومع التقدم العلمي أصبحت مراكز جراحة التجميل تقدم العديد من الخدمات بكفاءة عالية . دعنا نذكر لك نبذة عن أهم الخدمات المقدمة من مراكز الدكتوره دينا خيري - استشاري جراحات التجميل والليزر وأستاذه جراحة التجميل بكلية الطب جامعة عين شمس`
                    : "Welcome to the new gold standard in faja fit – The Ogee Faja, featuring functional fit technology created by a board-certified plastic surgeon. Thoughtfully designed to complement the work performed in the operating room"

                }
              </p>
            </blockquote>
            <div className="divider"></div>
            <Link className="btn1 btn" role="button" to="/Procedures">
              {language === 'ar' ? "معرفه المزيد" : " learn more"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSevices;
