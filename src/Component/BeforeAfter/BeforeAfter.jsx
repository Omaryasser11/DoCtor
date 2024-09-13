import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useRecoilState } from 'recoil';
import style from './BeforeAfter.module.css';
import after1 from '../../assets/شفايف 74.png';
import after2 from '../../assets/شفايف 77.png';
import { useFormik } from 'formik'
import * as yup from 'yup'
import baseUrl from '../../BaseUrl';
import { isFlippedState } from '../../store/index.js';
import Spinner from '../../Component/Spinner/Spinner.jsx';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast'
import ReactPlayer from 'react-player';

export default function BeforeAfter() {
  const [data, setData] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentId, setCurrentId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [apiError, setApiError] = useState('')
  const [activeLink, setActiveLink] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isOverlayVisiblePhoto, setIsOverlayVisiblePhoto] = useState(false);
  const [isOverlayVisibleVideo, setIsOverlayVisibleVideo] = useState(false);
  const [isArrowsVisible, setIsArrowsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
  const { language } = useContext(LanguageContext);
  const [token, setToken] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      const admin = localStorage.getItem("token")
    if (admin != null) {
      setToken(admin)
    }
  }, []);

  const linkClick = (linkName) => {
    setActiveLink(linkName);
  };

  function openCard(imageSrc){
    setSelectedImage(imageSrc);
    setIsVideoOpen(true);
  };

  function closeCard(){
    setSelectedImage('');
    setIsVideoOpen(false);
    setIsArrowsVisible(false);
  };

  function openCarousel(imageSrc){
    openCard(imageSrc);
    setIsArrowsVisible(true);
  };
  
  function closeOverlay() {
      setIsOverlayVisiblePhoto(false);
      setIsOverlayVisibleVideo(false);
  }

  function fetchPhotos() {
      setLoading(true)
      baseUrl.get(`before-after/images?ImageType=${activeLink}`)
        .then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
  }

    function fetchVideos() {
        setLoading(true)
        baseUrl.get('before-after/videos', {
        headers: { 'Accept-Language': language },
      })
          .then((response) => {
            console.log(response.data);
            setVideos(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
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
        baseUrl.delete(`before-after/videos/${itemId}`)
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
    else if(whatApi==='photo'){
      Swal.fire({
        title: 'Are you sure you want to delete this photo?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
        setLoading(true)
        baseUrl.delete(`before-after/images/${itemId}`)
        .then(() => {
            fetchPhotos()
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

  function handlePhoto(values){
            Swal.fire({
            title: 'Please click confirm to add the image.',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#A9A9A9',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
            setLoading(true)
            baseUrl.post('before-after/images', values)
                .then(() => {
                fetchPhotos()
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
      baseUrl.post('before-after/videos', values)
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

    let validationSchemaVideo = yup.object({
      posterUrl: yup.string().required('Poster Url is required'),
      videoUrl: yup.string().required('Video Url is required'),
      procedureId: yup.string().required('Procedure name is required'),
    })
  
    let formikVideo = useFormik({
      initialValues: {
        posterUrl: '',
        videoUrl: '',
        procedureId: '',
        }, validationSchema: validationSchemaVideo
      , onSubmit: handleSubmit
    })

  let validationSchemaPhoto = yup.object({
    imageType: yup.string().required('Image Type is required'),
    imageUrl: yup.string().required('Image Url is required'),
  })

  


  const validationSchema = yup.object({
    imageType: yup.string().required('Image Type is required'),
    imageUrl: yup.string().required('Image Url is required'),
    procedureId: yup.number().required('Procedure ID is required').positive().integer(),
  });
  
  const formik = useFormik({
    initialValues: {
      imageType: '',
      imageUrl: '',
      procedureId: 0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');
  
      baseUrl.post('before-after/images', values)
        .then(() => {
          resetForm();
          setLoading(false);
          toast.success('Item Added', { duration: 5000 });
          closeOverlay();
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage('Error submitting form.');
        });
    },
  });
  

  function fetchProcedures() {
    setLoading(true)
    baseUrl.get('procedures')
      .then(response => {
        setProcedures(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }


  useEffect(() => {
    // Fetch images data
      fetchPhotos()
    // Fetch videos data
      fetchVideos()
    // Fetch procedures data
      fetchProcedures()
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
  if (error) return <p lang={language}>Error: {error.message || 'An error occurred'}</p>;

  return (
    <>
      <Helmet>
        <title lang={language}>{language === 'ar' ? "قبل و بعد" : "Before-After"}</title>
      </Helmet>
      <div className="text-white montserrat mb-5" lang={language}>

        {/* Header */}
        <div className="row gx-0 position-relative blueC mb-2" style={{ height: '318px' }}>
          <div className="offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100">
            <div className="mt-3 d-flex flex-column justify-content-end position-absolute z-3" style={{ height: '200px' }}>
              <h4 className="fs-2 fw-semibold" lang={language}>{language === 'ar' ? 'قبل و بعد' : 'Before & After'}</h4>
              <p className="fs-4 fw-light mb-0" lang={language}>{language === 'ar' ? 'الإعمال التي أجراتها الدكتوره دينا خيري' : 'Procedures by Dr. Dina Khairy'}</p>
            </div>
          </div>
        </div>

        {/* Body of cards */}
        <div className="row gx-0 mb-5">
          <div className="offset-1 col-10 px-4">
            <ul className="nav text-uppercase justify-content-center py-2 px-3">
              {['All', 'Real', 'Fake', 'BBL', 'Lift', 'Tummy', 'Mommy', 'Implant', 'Breast'].map((link) => (
                <li className="nav-item" key={link}>
                  <Link
                    className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === link ? 'active' : ''}`}
                    to="/before"
                    onClick={() => linkClick(link)}
                    lang={language}
                  >
                    {language === 'ar' ? translateLink(link) : link}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="row gy-2">
              {data.map((item ,index) => (
                <div key={item.id} className="col-lg-3 col-md-4 col-sm-6" data-aos="fade-up" data-aos-duration={index * 500 + 1500}>
                  <div className="me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden position-relative">
                      {token !=null? <div className="position-absolute top-0 end-0 z-2 mt-2 me-2">
                        <button type="button" className="btn btn-light delete-hover p-1 pb-0" onClick={() => deleteItem('photo', item.id)}>
                          <i className="fa-solid fa-trash-can fs-5"></i>
                        </button>
                      </div>:''}
                    <img src={item.imageUrl} className="w-100" alt="before&after" onClick={() => openCard(item.imageUrl)}/>
                  </div>
                </div>
              ))}
                {token!=null? <div className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-center" data-aos="fade-up" data-aos-duration={data.length * 500 + 1500}>
                  <div className='cursor-pointer my-md-0 my-5 d-flex align-items-center justify-content-center w-100' style={{height: '10rem'}} onClick={() => setIsOverlayVisiblePhoto(true)}>
                    <i className={`fa-solid fa-circle-plus text-body-tertiary me-xl-5 ${style.iconAdd}`}></i>
                  </div>
                </div> :''}
            </div>
          </div>
        </div>

        <div className="row gx-0 bg-light py-5 pt-4 mb-5">
          <p className="display-6 text-center fw-semibold blueT p-2" lang={language}>{language === 'ar' ? 'النتائج الحقيقية. المرضى الحقيقيون.' : 'Real Patients. Real Results.'}</p>
          <div className="offset-1 col-10 px-md-5 px-4">
            <div className="row g-5">
              <div className="col-lg-4 col-md-6">
                <div className="me-xl-5 me-sm-4 cursor-pointer overflow-hidden">
                  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active" data-bs-interval="4000" onClick={() => openCarousel(after1)}>
                        <img src={after1} className="d-block w-100" alt="First-Slide" />
                      </div>
                      <div className="carousel-item" data-bs-interval="4000">
                        <img src={after2} className="d-block w-100" alt="Second-Slide" onClick={() => openCarousel(after2)} />
                      </div>
                    </div>
                    <button className="carousel-control-prev prev opacity-100" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                      <i className="fa-solid fa-angle-left cursor-pointer darkCyan py-1 px-2 text-white" aria-hidden="true"></i>
                    </button>
                    <button className="carousel-control-next next opacity-100" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                      <i className="fa-solid fa-angle-right cursor-pointer darkCyan py-1 px-2 text-white" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body of videos */}
        <div className="row gx-0 montserrat mb-5">
          <div className="offset-1 col-10 px-4">
            <div className="row gx-4 gy-5">
              {videos.map((video,index) => (
                <div key={video.id} className="col-sm-6 position-relative" data-aos="fade-up" data-aos-duration={index * 500 + 1500}>
                {token !=null? <div className="position-absolute top-0 end-0 z-2 mt-2 me-2">
                    <button type="button" className="btn btn-light delete-hover p-1 pb-0" onClick={() => deleteItem('video', video.id)}>
                    <i className="fa-solid fa-trash-can fs-5"></i>
                    </button>
                </div>:''}
                  <div className="text-center border-bottom border-secondary-subtle">
                    <p className="fw-semibold text-body-secondary fs-5 mb-1" lang={language}>{video.procedure.name}</p>
                    <p className="text-body-tertiary fw-medium pb-3" lang={language}>{language === 'ar' ? 'نتائج المريض' : 'Patient Results'}</p>
                  </div>
                  <div className="row">
                    <div className="offset-3 col-6 pt-4 px-0">
                      <div>
                      <ReactPlayer playing={true} controls={true} url={video.videoUrl} className={`w-100`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {token!=null? <div className="col-sm-6 d-flex align-items-center" data-aos="fade-up" data-aos-duration={videos.length * 500 + 1500}>
                  <div className='cursor-pointer d-flex align-items-center justify-content-center w-100' style={{ height: '20rem' }} onClick={() => setIsOverlayVisibleVideo(true)}>
                  <i className="fa-solid fa-circle-plus text-body-tertiary iconAdd"></i>
                  </div>
              </div> :''}
            </div>
          </div>
        </div>

        {/* Overlay of card */}
        {isVideoOpen? <>
        <div className="vh-100 montserrat row position-fixed overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center" lang={language}>
          <div className="col-lg-6 col-sm-8 col-10">
            <div className='w-100 px-5'>
              <div className="text-end w-100">
                <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeCard}></i>
              </div>
              <div className='py-2'>
                <img src={selectedImage} className={`w-100 ${style.imageSize}`} alt="before&after" />
              </div>
            </div>
          </div>
        {
          isArrowsVisible? <>
          <button class="carousel-control-prev opacity-100" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <div className="cursor-pointer rounded-circle d-flex justify-content-center align-items-center circleSize position-relative">
            <i className="fa-solid fa-angle-left anglePositionOverlay" aria-hidden="true"></i>
          </div>
        </button>
        <button class="carousel-control-next opacity-100" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <div className="cursor-pointer rounded-circle d-flex justify-content-center align-items-center circleSize position-relative rotateArrow">
            <i className="fa-solid fa-angle-left anglePositionOverlay" aria-hidden="true"></i>
          </div>
        </button>
          </>:''}
        </div>
        </>:''}
     
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
      
                      <label htmlFor="posterUrl">Poster Url : </label>
                      <input onBlur={formikVideo.handleBlur} onChange={formikVideo.handleChange} type="text" name="posterUrl" value={formikVideo.values.posterUrl} id="posterUrl" className='form-control mb-3' />
                      {formikVideo.errors.posterUrl && formikVideo.touched.posterUrl ? <div className="alert alert-danger py-2">{formikVideo.errors.posterUrl}</div> : ''}
      
                      <label htmlFor="videoUrl">Video Url : </label>
                      <input onBlur={formikVideo.handleBlur} onChange={formikVideo.handleChange} type="text" name="videoUrl" value={formikVideo.values.videoUrl} id="videoUrl" className='form-control mb-3' />
                      {formikVideo.errors.videoUrl && formikVideo.touched.videoUrl ? <div className="alert alert-danger py-2">{formikVideo.errors.videoUrl}</div> : ''}
            
                      <label htmlFor="procedure" className="mb-2">Procedure Name:</label>
                      {procedures.map((procedure) => (
                        <div className="form-check mb-3" key={procedure.id}>
                          <input
                            onBlur={formikVideo.handleBlur}
                            onChange={formikVideo.handleChange}
                            type="radio"
                            name="procedureId"
                            value={procedure.id}
                            id={procedure.id}
                            className="form-check-input"
                            checked={formikVideo.values.procedureId === `${procedure.id}`}
                          />
                          <label htmlFor={procedure.id} className="form-check-label">
                            {procedure.name}
                          </label>
                        </div>
                      ))}

                        {formikVideo.errors.procedureId && formikVideo.touched.procedureId ? (
                            <div className="alert alert-danger py-2">{formikVideo.errors.type}</div>
                        ) : null}
                        
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

        {/* Pop Up Photos */}
        {isOverlayVisiblePhoto && token != null ? (
  <div className="vh-100 montserrat row position-fixed overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
    <div className="col-lg-6 col-sm-8 col-10 px-5">
      <div className="text-end w-100">
        <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeOverlay}></i>
      </div>
      <div className='bg-white p-4 text-dark-emphasis rounded-2 overflow-y-scroll scrollbar-popUp'>
        <form onSubmit={formik.handleSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <label htmlFor="imageType">Image Type : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="imageType"
            value={formik.values.imageType}
            id="imageType"
            className='form-control mb-3'
          />
          {formik.errors.imageType && formik.touched.imageType && (
            <div className="alert alert-danger py-2">{formik.errors.imageType}</div>
          )}

          <label htmlFor="imageUrl">Image Url : </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            name="imageUrl"
            value={formik.values.imageUrl}
            id="ImageUrl"
            className='form-control mb-3'
          />
          {formik.errors.imageUrl && formik.touched.imageUrl && (
            <div className="alert alert-danger py-2">{formik.errors.imageUrl}</div>
          )}

          <label htmlFor="procedureId" className="form-label">Procedure ID:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.procedureId}
            type="number"
            name="procedureId"
            id="procedureId"
            className={`form-control ${formik.errors.procedureId && formik.touched.procedureId ? 'is-invalid' : ''}`}
          />
          {formik.errors.procedureId && formik.touched.procedureId && (
            <div className="invalid-feedback">{formik.errors.procedureId}</div>
          )}

          {loading ? (
            <button type='button' className='btn blueC w-100 text-light'>
              <i className='fas fa-spinner fa-spin'></i>
            </button>
          ) : (
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn blueC w-100 text-light'>Add</button>
          )}
        </form>
      </div>
    </div>
  </div>
) : ''}

      </div>
    </>
  );
}

// Helper function for translations
function translateLink(link) {
  const translations = {
    'All': 'الكل',
    'Augmentation': 'تكبير',
    'Reduction': 'تصغير',
    'BBL': 'نحت',
    'Lift': 'شد',
    'Tummy': 'بطن',
    'Mommy': 'أمومة',
    'Implant': 'زرع',
    'Breast': 'ثدي'
  };
  return translations[link] || link;
}
