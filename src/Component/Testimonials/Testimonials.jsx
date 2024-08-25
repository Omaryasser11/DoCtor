import React from 'react';
import style from './Testimonials.module.css'
import { Helmet } from 'react-helmet-async';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import slideHeader1 from '../../assets/images/IMG_0412.jpg'
// import slideHeader2 from '../../assets/images/IMG_4600-1.jpg'
import patientSelfie from '../../assets/images/patient-selfie.jpg'
import selfie from '../../assets/images/IMG_0420.jpg'
import carousel1 from '../../assets/images/IMG_3113-scaled.jpg'
// import carousel2 from '../../assets/images/IMG_3125.jpg'
// import carousel3 from '../../assets/images/patient-photo-3.jpg'
import ReactPlayer from 'react-player';


export default function Testimonials() {

  return <>
  <Helmet>
    <title>Testimonials</title>
  </Helmet>
  <div className="text-white montserrat">

                                                              {/* Header */}

    <div className="row gx-0 position-relative blueC" style={{ height: '318px' }}>
    <div className="layerC position-absolute top-0 bottom-0 start-0 end-0 z-1"></div>
      <div className='offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100'>
          <div className='mt-3 d-flex flex-column justify-content-end position-absolute z-3' style={{ height: '200px' }}>
              <h4 className='fs-2 fw-semibold'>Testimonials</h4>
              <p className='fs-4 fw-light mb-0'>Patient Reviews</p>
          </div>
      </div>
    </div>

                                                            {/* Carousel Header */}

    <div className="row g-0 align-items-center blueC py-5 mb-5">
        <div className="col-lg-6 bg-danger-subtle">
            <div className={`d-flex justify-content-center px-5 mx-xl-5 ${style.slideSize} z-3 flex-column z-3`}>
                <p className='fw-bold fs-5 mb-0'>Patient Testimonials</p>
                <p className='fw-semibold fs-2 my-2'>We Love Making You Smile</p>
                <p className='system-ui mt-3'>Before and Afters are great, but what really matters are the beautiful smiles I see on my patients after they achieve the shape they always wanted.</p>
            </div>
        </div>
        <div className="col-lg-6">
            <div className='d-flex justify-content-center align-items-center mt-lg-0 mt-5'>
            <Splide
                options={{
                    type: 'loop',         
                    padding: '5rem',      
                    arrows: false,      
                    autoplay: true,       
                    interval: 3500,      
                    pauseOnHover: false,
                    pagination: false,   
                    breakpoints: {
                        991: {
                            perPage: 2,
                            padding: '0px',
                        },
                        768: {
                            perPage: 1,
                            padding: '0px',
                        }
                    },
                }}
                >
                <SplideSlide className='px-md-3 px-1'>
                    <img src={slideHeader1} className='w-100' alt="Image1" />
                </SplideSlide>
            </Splide>
            </div>
        </div>
    </div>

                                                            {/* Reviews */}
    <div className="row gx-0 my-5">
    <div className='offset-1 col-10 row g-5 px-lg-4 px-md-3 px-2 my-5 d-flex align-items-center h-100'>
        <div className="col-lg-6">
            <div>
                <img src={patientSelfie} className='w-100' alt="Patient-Selfie" />
            </div>
        </div>
        <div className="col-lg-6">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner px-lg-5">
            <div className="carousel-item active bg-white">
                <div className="d-flex align-items-center justify-content-center flex-column w-75 mx-auto">
                    <p className='text-body-tertiary text-center lh-base'>“My experience was amazing with Dr. William. He explained me a lot of things about muy procedure on my evaluation day. He did a really good job. My procedure was a liposuction 12 areas and breast augmentation. I recommend him 100%.”</p>
                    <div className="d-flex justify-content-center align-items-center py-3">
                        <i className="fa-solid fa-star darkCyan-text small mx-1"></i>
                        <i className="fa-solid fa-star darkCyan-text small mx-1"></i>
                        <i className="fa-solid fa-star darkCyan-text small mx-1"></i>
                        <i className="fa-solid fa-star darkCyan-text small mx-1"></i>
                        <i className="fa-solid fa-star darkCyan-text small mx-1"></i>
                    </div>
                    <p className='text-body-secondary text-center small mb-0 mt-4'>Sarah, Nebraska</p>
                    <p className='text-body-secondary text-center small fst-italic opacity-50'>An amazing experience</p>
                </div>
            </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <i className="fa-solid fa-angle-left text-body-secondary fs-5"></i>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <i className="fa-solid fa-angle-right text-body-secondary fs-5"></i>
            </button>
            </div>
        </div>
    </div>
    </div>

                                                            {/* Videos */}
    <div className="row gx-0 bg-body-tertiary">
    <div className='offset-1 col-10 row g-5 px-lg-4 px-md-3 px-2 mb-5 mt-0 d-flex align-items-center h-100'>
            <div className='col-xl-4 col-lg-5 col-md-7 col-sm-10'>
                <p className='darkCyan text-uppercase fw-bold px-3 py-2'>What Our Patients Have to Say...</p>
            </div>
            <div className='col-8'>
            </div>
        <div className="col-lg-6">
            <div>
                <ReactPlayer controls url='https://www.youtube.com/watch?v=VVhuTH6pkv8' className='w-100'/>
            </div>
        </div>
    </div>
    </div>

                                                            {/* Doctor */}

    <div className="position-relative row gx-0 cover3">
        <div className="layer2 position-absolute top-0 bottom-0 start-0 end-0"></div>
        <div className='offset-1 col-10 row g-5 px-lg-4 px-md-3 px-2 mb-5 d-flex align-items-center h-100'>
            <div className="col-lg-8">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner px-lg-5">
                <div className="carousel-item active">
                    <div className="d-flex align-items-center justify-content-center flex-column w-100">
                        <div className=' circleSize rounded-circle p-4 border-opacity-50 border-white d-flex align-items-center justify-content-center mb-4'>
                            <i className="fa-solid fa-quote-left fs-5"></i>
                        </div>
                        <p className='text-center fw-light lh-base'>Las palabras nunca seran suficiente para demostrar el nivel de gratitud que siento por usted ,nunca voy a dejar de estar agradecida por hacer la diferencia en mi cambio, tuve la fortuna de ser atendida por el mejor doctor en el proceso de mi cambio , por eso yo lo considero un exelente doctor y mi doctor permanente para los proximos cambios solo es el comienso de mi transformacion y usted a sido el elegido ; por su atencion ,su trato ,su asistencia y sobre todo por su experiencia y conosimiento en lo que hace y eso me da seguridad ,es un placer haberlo conocido !!!!</p>
                        <div className="d-flex justify-content-center align-items-center py-3">
                            <i className="fa-solid fa-star darkCyan-text mx-1"></i>
                            <i className="fa-solid fa-star darkCyan-text mx-1"></i>
                            <i className="fa-solid fa-star darkCyan-text mx-1"></i>
                            <i className="fa-solid fa-star darkCyan-text mx-1"></i>
                            <i className="fa-solid fa-star darkCyan-text mx-1"></i>
                        </div>
                        <p className='text-center fw-medium mb-0 mt-4'>Emanuel, Miami</p>
                        <p className='text-center small opacity-50'>La Mejor Decisión</p>
                    </div>
                </div>
                </div>
                </div>
            </div>
            <div className="col-lg-4 mt-0">
                <div>
                    <img src={selfie} className='w-100' alt="Selfie" />
                </div>
            </div>
        </div>
    </div>

                                                            {/* Carousel Example */}

    <div className="position-relative row gx-0 my-5 pb-5 pt-md-5 ">
        <div className='offset-md-1 col-md-10 px-lg-4 px-md-3 px-2 mb-md-5 d-flex align-items-center h-100'>
            <Splide
            className='w-100'
                options={{
                    type: 'loop',         
                    padding: '3rem',      
                    autoplay: true,       
                    interval: 4000,      
                    pauseOnHover: false,
                    perPage: 4,
                    focus  : 'center', 
                    arrows: false,
                    pagination: true,
                    breakpoints: {
                        991: {
                            perPage: 3,
                            padding: '2rem',      
                        },
                        768: {
                            perPage: 2,
                            padding: '1rem',      
                        }
                    },
                }}
            >
                <SplideSlide className='px-3'>
                    <img src={carousel1} className='w-100' alt="Image1" />
                </SplideSlide>
            </Splide>
        </div>
    </div>

                                                            {/* End of page */}

    <div className="row gx-0">
        <div className={`position-relative col-lg-6 ${style.hoverRec} bg-light d-flex justify-content-center align-items-center`} style={{height :'80vh'}}>
            <div className={`${style.layer} position-absolute top-0 bottom-0 start-0 end-0 z-1`}></div>
            <div className={`${style.border} text-center d-flex flex-column justify-content-center align-items-center`}>
                <p className='darkCyan-text fs-5 fw-bold mb-0'>Free Consultation</p>
                <p className='darkCyan-text fs-1 fw-semibold mb-0'>Schedule</p>
            </div>
        </div>
        <div className={`position-relative col-lg-6 ${style.hoverRec} darkCyan d-flex justify-content-center align-items-center`} style={{height :'80vh'}}>
            <div className={`${style.layer} position-absolute top-0 bottom-0 start-0 end-0 z-1`}></div>
            <div className={`${style.border} border-white text-center d-flex flex-column justify-content-center align-items-center`}>
                <p className='text-white fs-5 fw-bold mb-0'>Leave us your</p>
                <p className='text-white fs-1 fw-semibold mb-0'>Review</p>
            </div>
        </div>
    </div>

</div>
</>
}