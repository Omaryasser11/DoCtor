import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Img1 from "../../assets/Cover youtube.png";
import Img2 from "../../assets/Youtube Thumbnail DINA.png";
// Import core and necessary Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AutoplaySwiper = () => {
  const Hieght = '60vh';
  
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      slidesPerGroup={1}  // Make sure this is set to 1
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      loop={true}
      style={{ marginTop: '8rem', marginBottom: "2rem" }}
    >
      <SwiperSlide style={{ height: Hieght, width: '100%' }}>
        <img src={Img1} style={{ height: Hieght, width: '100%' }} alt="Slide 1" />
        <div className='Filter col-12' style={{ height: Hieght, borderRadius: "0" }}></div>
      </SwiperSlide>
      
      <SwiperSlide>
        <img src={Img2} alt="Slide 2" style={{ height: Hieght, width: '100%' }} />
        <div className='Filter col-12' style={{ height: Hieght, borderRadius: "0" }}></div>
      </SwiperSlide>
      
      <SwiperSlide>
        <img src={Img2} alt="Slide 3" style={{ height: Hieght, width: '100%' }} />
        <div className='Filter col-12' style={{ height: Hieght, borderRadius: "0" }}></div>
      </SwiperSlide>
      
      {/* Duplicate slides if necessary */}
      <SwiperSlide>
        <img src={Img1} style={{ height: Hieght, width: '100%' }} alt="Slide 4" />
        <div className='Filter col-12' style={{ height: Hieght, borderRadius: "0" }}></div>
      </SwiperSlide>
      
      <SwiperSlide>
        <img src={Img1} style={{ height: Hieght, width: '100%' }} alt="Slide 5" />
        <div className='Filter col-12' style={{ height: Hieght, borderRadius: "0" }}></div>
      </SwiperSlide>

    </Swiper>
  );
};

export default AutoplaySwiper;
