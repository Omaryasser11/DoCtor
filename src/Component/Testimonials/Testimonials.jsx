import React, { useContext, useEffect, useState } from 'react'
import style from './Testimonials.module.css'
import { Helmet } from 'react-helmet-async';
import { LanguageContext } from '../../store/LanguageContext';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import slideHeader1 from '../../assets/images/IMG_0412.jpg'
import patientSelfie from '../../assets/images/patient-selfie.jpg'
import selfie from '../../assets/images/IMG_0420.jpg'
import carousel1 from '../../assets/images/IMG_3113-scaled.jpg'
import ReactPlayer from 'react-player';
import baseUrl from '../../BaseUrl'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import Spinner from '../Spinner/Spinner'
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

export default function Testimonials() {
    const [videos, setVideos] = useState([]);
    const [texts, setTexts] = useState([]);
    const [currentId, setCurrentId] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isOverlayVisibleVideo, setIsOverlayVisibleVideo] = useState(false);
    const [apiError, setApiError] = useState('')
    const [formBased, setFormBased] = useState('')
    const [activeIndex, setActiveIndex] = useState(0);
    // Get the current language from context
    const { language } = useContext(LanguageContext)
    const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const admin = localStorage.getItem("token")
      if (admin != null) {
        setToken(admin)
      }
    }, [token])

    function openOverlay(mode, id = null) {
        setFormBased(mode)
        setCurrentId(id)
        if(mode==='edit' && id){
          getInputs(id)
        }
        else if(mode==='add'){
          formik.resetForm({
            reviewerNameAr: '',
            reviewerNameEn: '',
            reviewAr: '',
            reviewEn: '',
            subReviewAr: '',
            subReviewEn: '',
            stars: ''
            })
        }
        setIsOverlayVisible(true)
      }
    
    function closeOverlay() {
        setIsOverlayVisible(false)
        setIsOverlayVisibleVideo(false);
      }

    function fetchTexts() {
        setLoading(true)
        baseUrl.get('reviews/texts')
        .then(response => {
            setTexts(response.data.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }

    function fetchVideos() {
        setLoading(true)
        baseUrl.get('reviews/videos')
        .then(response => {
            setVideos(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }

  function handleText(values) {
    if (formBased === 'edit') {
        Swal.fire({
        title: 'Please click confirm to make the review updated.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Confirm'
        }).then((result) => {
        if (result.isConfirmed) {
        setLoading(true)
      baseUrl.put(`reviews/texts/${currentId}`, values)
        .then(() => {
          fetchTexts()
          closeOverlay()
          setLoading(false)
          toast.success('Item Updated', { duration: 2000 })
        })
        .catch(error => {
          setApiError(error.message)
          setLoading(false)
        })
    }
})
    } else if (formBased === 'add') {
        Swal.fire({
            title: 'Please click confirm to add the review.',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#A9A9A9',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
            setLoading(true)
            baseUrl.post('reviews/texts', values)
                .then(() => {
                fetchTexts()
                closeOverlay()
                setLoading(false)
                toast.success('Item Added', { duration: 2000 })
                })
                .catch(error => {
                setApiError(error.message)
                setLoading(false)
                })
            }
        })
    }
  }

  function handleSubmit(values){
            Swal.fire({
            title: 'Please click confirm to add the video.',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#A9A9A9',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
            setLoading(true)
            baseUrl.post('reviews/videos', values)
                .then(() => {
                fetchVideos()
                closeOverlay()
                setLoading(false)
                toast.success('Item Added', { duration: 2000 })
                })
                .catch(error => {
                setApiError(error.message)
                setLoading(false)
                })
            }
        })
    }

  function deleteItem(whatApi, itemId) {
    if(whatApi==='video'){
      Swal.fire({
        title: 'Are you sure you want to delete this video?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
        setLoading(true)
        baseUrl.delete(`reviews/videos/${itemId}`)
        .then(() => {
            fetchVideos()
            setLoading(false)
            toast.success('Item Deleted', { duration: 2000 })
        })
        .catch(error => {
            setApiError(error.message)
            setLoading(false)
        })
    }
})
    }
    else if(whatApi==='review'){
      Swal.fire({
        title: 'Are you sure you want to delete this review?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
        setLoading(true)
        baseUrl.delete(`reviews/texts/${itemId}`)
        .then(() => {
            fetchTexts()
            setLoading(false)
            toast.success('Item Deleted', { duration: 2000 })
        })
        .catch(error => {
            setApiError(error.message)
            setLoading(false)
        })
    }
})
    }
}

  function getInputs(itemId) {
    baseUrl.get(`reviews/texts/${itemId}`)
      .then(response => {
        formik.setValues({
            reviewerNameAr: response.data.reviewerName,
            reviewerNameEn: response.data.reviewerName,
            reviewAr: response.data.review,
            reviewEn: response.data.review,
            subReviewAr: response.data.subReview,
            subReviewEn: response.data.subReview,
            stars: response.data.stars
            })
      })
      .catch(error => {
        setApiError(error.message)
      })
  }

  let validationSchemaVideo = yup.object({
    videoUrl: yup.string().required('Video Url is required'),
  })

  let formikVideo = useFormik({
    initialValues: {
        videoUrl: '',
        }, validationSchema: validationSchemaVideo
    , onSubmit: handleSubmit
  })

  let validationSchema = yup.object({
    reviewerNameAr: yup.string().required('Reviewer Name is required'),
    reviewerNameEn: yup.string().required('Reviewer Name is required'),
    reviewAr: yup.string().required('Review is required'),
    reviewEn: yup.string().required('Review is required'),
    subReviewAr: yup.string().required('SubReview is required'),
    subReviewEn: yup.string().required('SubReview is required'),
    stars: yup.string().required('Stars is required'),    
  })

  let formik = useFormik({
    initialValues: {
        reviewerNameAr: '',
        reviewerNameEn: '',
        reviewAr: '',
        reviewEn: '',
        subReviewAr: '',
        subReviewEn: '',
        stars: ''
        }, validationSchema
    , onSubmit: handleText
  })
  
    useEffect(() => {
        AOS.init({
            duration: 2000,
        })
        fetchTexts()
        fetchVideos()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsFlipped(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setIsFlipped]);

    if (loading) return <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-light d-flex align-items-center justify-content-center high-index">
    <Spinner />
  </div>
    if (error) return <p>Error: {error.message}</p>;
    
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
        <div className="col-lg-6" data-aos="fade-right">
            <div>
                <img src={patientSelfie} className='w-100' alt="Patient-Selfie" />
            </div>
        </div>
        <div className="col-lg-6" data-aos="fade-left">
        <div id="carouselExampleAutoplaying" className="carousel slide" {...(token == null? { 'data-bs-ride': 'carousel' }:{})}>
            <div className="carousel-inner px-lg-5">
            {texts.map((text,index) => (
            <div key={text.id} className={`carousel-item position-relative ${index === activeIndex ? 'active' : ''} bg-white`}>
                {token !=null? <div className="btn-group dropend position-absolute top-0 end-0 z-2">
                <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-ellipsis-vertical fs-5 text-dark"></i>
                </button>
                <ul className="dropdown-menu">
                    <li className='btn bg-light w-100 mb-2 d-flex align-items-center justify-content-between edit-hover' onClick={() => openOverlay('edit', text.id)}>
                    <p className="mb-0">Edit</p>
                    <i className="fa-solid fa-pen-to-square"></i>
                    </li>
                    <li className='btn bg-light w-100 d-flex align-items-center justify-content-between delete-hover' type='button' onClick={() => deleteItem('review' ,text.id)}>
                    <p className="mb-0">Delete</p>
                    <i className="fa-solid fa-trash-can"></i>
                    </li>
                </ul>
                </div>:''}
                <div className="d-flex align-items-center justify-content-center flex-column w-75 mx-auto">
                    <p className='text-body-tertiary text-center lh-base'>“{text.review}”</p>
                    <div className="d-flex justify-content-center align-items-center py-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                    <i
                        key={index}
                        className={`fa-solid fa-star ${index < text.stars ? 'text-warning' : 'text-secondary'} small mx-1`}
                    ></i>
                    ))}
                    </div>
                    <p className='text-body-secondary text-center small mb-0 mt-4'>{text.reviewerName}</p>
                    <p className='text-body-secondary text-center small fst-italic opacity-50'>{text.subReview}</p>
                </div>
            </div>
            ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length)}>
                <i className="fa-solid fa-angle-left text-body-secondary fs-5"></i>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % texts.length)}>
                <i className="fa-solid fa-angle-right text-body-secondary fs-5"></i>
            </button>
        </div>
        {token != null? <div className='mt-4 w-100'>
            <div>                            
            <button className="btn w-100 fw-semibold rounded-0 faqCollapse text-white border-none border-0 text-start ps-0 py-2 d-flex align-items-center justify-content-center" type="button"  onClick={() => openOverlay('add')}>
                <i className="fa-solid fa-circle-plus iconAdd fs-4"></i>
            </button>
            </div>
        </div> :''}
        </div>
    </div>
    </div>

                                                            {/* Videos */}
    <div className="row gx-0 bg-body-tertiary">
    <div className='offset-1 col-10 row g-5 px-lg-4 px-md-3 px-2 mb-5 mt-0 d-flex align-items-center h-100'>
            <div className='col-xl-4 col-lg-5 col-md-7 col-sm-10' data-aos="fade-right">
                <p className='darkCyan text-uppercase fw-bold px-3 py-2'>What Our Patients Have to Say...</p>
            </div>
            <div className='col-8'>
            </div>
            {videos.map((video, index) => <>
            <div key={video.id} className="col-lg-6" data-aos="fade-up" data-aos-duration={index * 500 + 1500}>
            <div className='position-relative'>
            {token !=null? <div className="position-absolute top-0 end-0 z-2 mt-2 me-2">
                <button type="button" className="btn btn-light delete-hover p-1 pb-0" onClick={() => deleteItem('video', video.id)}>
                <i className="fa-solid fa-trash-can fs-5"></i>
                </button>
            </div>:''}
                <ReactPlayer playing={true} controls={true} url={video.videoUrl} className='w-100'/>
            </div>
        </div>
        </>)}
        {token!=null? <div className="col-lg-6" data-aos="fade-up" data-aos-duration={videos.length * 500 + 1500}>
            <div className='cursor-pointer d-flex align-items-center justify-content-center w-100' style={{ height: '20rem' }} onClick={() => setIsOverlayVisibleVideo(true)}>
            <i className="fa-solid fa-circle-plus text-body-tertiary iconAdd"></i>
            </div>
        </div> :''}
    </div>
    </div>

                                                            {/* Doctor */}

    <div className="position-relative row gx-0 cover3">
        <div className="layer2 position-absolute top-0 bottom-0 start-0 end-0"></div>
        <div className='offset-1 col-10 row g-5 px-lg-4 px-md-3 px-2 mb-5 d-flex align-items-center h-100'>
            <div className="col-lg-8" data-aos="fade-right">
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
            <div className="col-lg-4 mt-0" data-aos="fade-left">
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

                                                            {/* Pop Up Texts */}
    {isOverlayVisible && token!=null? <>
        <div className="vh-100 montserrat row position-fixed overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
            <div className="col-lg-6 col-sm-8 col-10 px-5">
            <div className="text-end w-100">
                <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeOverlay}></i>
            </div>
            <div className='bg-white p-4 text-dark-emphasis rounded-2 overflow-y-scroll scrollbar-popUp'>
                <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}

                <label htmlFor="reviewerNameAr">Question in Arabic : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="reviewerNameAr" value={formik.values.reviewerNameAr} id="reviewerNameAr" className='form-control mb-3' />
                {formik.errors.reviewerNameAr && formik.touched.reviewerNameAr ? <div className="alert alert-danger py-2">{formik.errors.reviewerNameAr}</div> : ''}

                <label htmlFor="reviewerNameEn">reviewerName in English : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="reviewerNameEn" value={formik.values.reviewerNameEn} id="reviewerNameEn" className='form-control mb-3' />
                {formik.errors.reviewerNameEn && formik.touched.reviewerNameEn ? <div className="alert alert-danger py-2">{formik.errors.reviewerNameEn}</div> : ''}

                <label htmlFor="reviewAr">review in Arabic : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="reviewAr" value={formik.values.reviewAr} id="reviewAr" className='form-control mb-3' />
                {formik.errors.reviewAr && formik.touched.reviewAr ? <div className="alert alert-danger py-2">{formik.errors.reviewAr}</div> : ''}

                <label htmlFor="reviewEn">review in English : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="reviewEn" value={formik.values.reviewEn} id="reviewEn" className='form-control mb-3' />
                {formik.errors.reviewEn && formik.touched.reviewEn ? <div className="alert alert-danger py-2">{formik.errors.reviewEn}</div> : ''}


                <label htmlFor="subReviewAr">subReview in Arabic : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="subReviewAr" value={formik.values.subReviewAr} id="subReviewAr" className='form-control mb-3' />
                {formik.errors.subReviewAr && formik.touched.subReviewAr ? <div className="alert alert-danger py-2">{formik.errors.subReviewAr}</div> : ''}

                <label htmlFor="subReviewEn">subReview in English : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="subReviewEn" value={formik.values.subReviewEn} id="subReviewEn" className='form-control mb-3' />
                {formik.errors.subReviewEn && formik.touched.subReviewEn ? <div className="alert alert-danger py-2">{formik.errors.subReviewEn}</div> : ''}

                <label htmlFor="stars">Star Rating: </label>
                <select
                name="stars"
                id="stars"
                className="form-control mb-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stars}
                >
                <option value="" label="Select number of stars" />
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
                {formik.errors.stars && formik.touched.stars ? <>
                <div className="alert alert-danger py-2">{formik.errors.stars}</div>
                </>: ''}

                {/* <div className="d-flex align-items-center justify-content-end w-100"> */}
                    {loading ? <button type='button' className='btn blueC w-100 text-light'>
                    <i className='fas fa-spinner fa-spin'></i>
                    </button>
                    : <button disabled={formBased === 'edit' ? !formik.isValid : !(formik.isValid && formik.dirty)} type='submit' className='btn blueC w-100 text-light'>{formBased === 'edit' ? 'Update' : 'Add'}</button>
                    }
                {/* </div> */}
                </form>
            </div>
            </div>
        </div>
        </> : ''}

                                                           {/* Pop Up Videos */}
    {isOverlayVisibleVideo && token!=null? <>
        <div className="vh-100 montserrat row position-fixed overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
            <div className="col-lg-6 col-sm-8 col-10 px-5">
            <div className="text-end w-100">
                <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeOverlay}></i>
            </div>
            <div className='bg-white p-4 text-dark-emphasis rounded-2 overflow-y-scroll scrollbar-popUp'>
                <form onSubmit={formikVideo.handleSubmit}>
                {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}

                <label htmlFor="videoUrl">Video Url : </label>
                <input onBlur={formikVideo.handleBlur} onChange={formikVideo.handleChange} type="text" name="videoUrl" value={formikVideo.values.videoUrl} id="videoUrl" className='form-control mb-3' />
                {formikVideo.errors.videoUrl && formikVideo.touched.videoUrl ? <div className="alert alert-danger py-2">{formikVideo.errors.videoUrl}</div> : ''}

                {loading ? <button type='button' className='btn blueC w-100 text-light'>
                <i className='fas fa-spinner fa-spin'></i>
                </button>
                : <button disabled={!(formikVideo.isValid && formikVideo.dirty)} type='submit' className='btn blueC w-100 text-light'>Add</button>
                }
                </form>
            </div>
            </div>
        </div>
        </> : ''}
        </div>
    </>
}
