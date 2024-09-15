import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './FamilyHobbiesSection.scss';
import baseUrl from '../../BaseUrl';
import Spinner from '../Spinner/Spinner';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const FamilyHobbies = () => {
  const { language } = useContext(LanguageContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 3000, // Duration of animations
      // You can add more AOS options here
    });
    baseUrl.get('/about', {
      headers: { 'Accept-Language': language },
    })
      .then(response => {
        setData(response.data.fourthSection);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [language]);

  if (loading) return <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-light d-flex align-items-center justify-content-center high-index">
    <Spinner />
  </div>
  if (error) {
    return <div className="family-hobbies">Error loading data. Please try again later.</div>;
  }

  return (
    <div className="family-hobbies col-12">
      <div className="content-section col-12 flexA ">
        <div className="text-section col-lg-6 col-md-12" data-aos="flip-left">
          <h3 lang={language}>{data?.header || "Default Header"}</h3>
          <p className='Y3' lang={language}>{data?.body || "Default body text."}</p>
        </div>
        <div className="gallery-section  col-lg-6 col-md-12" data-aos="flip-right">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {data?.imageUrls?.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url || 'default-image.png'}
                  alt={`Family Image ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FamilyHobbies;
