import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './FamilyHobbiesSection.scss';

// Import Swiper modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const FamilyHobbies = () => {
  return (
    <div className="family-hobbies col-12">
      <div className="content-section flexR">
        <div className="text-section">
          <h3>Family & Hobbies</h3>
          <p>
            Dr. Dina and his husband  raised three boys, and three large dogs, in a very busy household, spending most weekends at a lacrosse or hockey tournament, but recently became empty nesters as all their boys moved out of state to attend college. Now, with all three sons playing lacrosse at the collegiate level, the couple still enjoys attending their games, but have more time to focus on their newest arrival: their German Shepherd. Much of their time is now spent going on walks, and playing fetch at the field. Shauna and Dr. William love to cook, attend the Miami City Ballet, and are avid Florida Panthers fans. They both love to travel and it gives them an opportunity to bring the family together and share such adventures as dog sledding in Norway and Safariing in Africa!
          </p>
        </div>
        <div className="gallery-section">
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
            <SwiperSlide>
              <img src="https://www.drwilliammiami.com/wp-content/uploads/2023/08/Matt-Yardley-High-Res-Print-5367-1024x768.jpg" alt="Family" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://www.drwilliammiami.com/wp-content/uploads/2023/08/Matt-Yardley-High-Res-Print-5377-1024x768.jpg" alt="Family" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://www.drwilliammiami.com/wp-content/uploads/2023/08/Matt-Yardley-High-Res-Print-0261-1024x683.jpg" alt="Family" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://www.drwilliammiami.com/wp-content/uploads/2023/02/IMG_0570-768x1024.jpg" alt="Family" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://www.drwilliammiami.com/wp-content/uploads/2023/02/IMG_0607-768x1024.jpg" alt="Family" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://www.drwilliammiami.com/wp-content/uploads/2023/02/IMG_0370-768x1024.jpg" alt="Family" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FamilyHobbies;
