import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./TestimonialsSection.scss";
import baseUrl from '../../BaseUrl';

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [data1, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({
    });

    baseUrl.get('/reviews/texts', {
      headers: { 'Accept-Language': language },
    })
      .then(response => {
        const Reviews = response.data.data.map(item => ({
          review: item.review,
          reviewerName: item.reviewerName,
          subReview: item.subReview,
        }));
        setData(Reviews);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [language]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="fws_66aaf48d6affe" className='col-12 ll'>
      <div className="wpb_row col-12">
        <div className="container ColCard col-12" >
          {data1.map((testimonial, index) => (
            <div
              data-aos="fade-down"
              data-aos-duration={index * 1000 + 1500}


              key={index}
              className={`column COL${index + 1} col-4`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className='Filter'></div>
              <div className="column-bg-overlay"></div>
              <div className="wpb_wrapper">
                <div className="divider"></div>
                <blockquote className="nectar_single_testimonial">
                  <div className="inner" style={{ zIndex: 5, position: 'relative' }}>
                    <p className='flex PAR' lang={language}>
                      <span lang={language} className="open-quote">”</span>
                      {testimonial.review}
                    </p>
                    <span className="wrap">
                      <span lang={language}>{testimonial.reviewerName}</span>
                    </span>
                  </div>
                </blockquote>
                <div className="divider"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
