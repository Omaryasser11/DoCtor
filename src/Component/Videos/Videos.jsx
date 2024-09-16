import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LanguageContext } from '../../store/LanguageContext';
import style from './Videos.module.css';
import { Helmet } from 'react-helmet-async';
import ReactPlayer from 'react-player';
import baseUrl from '../../BaseUrl';
import { isFlippedState } from '../../store/index.js';
import LandingVideo from '../../assets/4_5893503520266522924.mp4';
import Spinner from '../Spinner/Spinner.jsx';
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2';

export default function Videos() {
  const [data, setData] = useState([])
  const [currentId, setCurrentId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [apiError, setApiError] = useState('')
  const [formBased, setFormBased] = useState('')
  const [youtubeVideo, setYoutubeVideo] = useState(null);
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const admin = localStorage.getItem("token")
    if (admin != null) {
      setToken(admin)
    }
  }, [token]);

  // Get the current language from context
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    // Event listener for scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsFlipped]);

  function openVideo(videoUrl) {
    setYoutubeVideo(videoUrl)
    setIsVideoOpen(true)
  }

  function closeVideo() {
    setIsVideoOpen(false)
  }

  function openOverlay(mode, id = null) {
    setFormBased(mode)
    setCurrentId(id)
    if (mode === 'edit' && id) {
      getInputs(id)
    }
    else if (mode === 'add') {
      formik.resetForm({
        posterUrl: "",
        videoUrl: "",
        titleAr: "",
        titleEn: "",
        subTitleAr: "",
        subTitleEn: "",
        descriptionAr: "",
        descriptionEn: "",
        type: ""
      })
    }
    setIsOverlayVisible(true)
  }

  function closeOverlay() {
    setIsOverlayVisible(false)
  }

  function fetchVideos() {
    setLoading(true)
    baseUrl.get('videos', {
      headers: { 'Accept-Language': language },
    })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  function handleProcedure(values) {
    if (formBased === 'edit') {
      Swal.fire({
        title: 'Please click confirm to make the video updated.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true)
          baseUrl.put(`videos/${currentId}`, values)
            .then(() => {
              fetchVideos()
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
        title: 'Please click confirm to add the video.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true)
          baseUrl.post('videos', values)
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
  }

  function deleteItem(itemId) {
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
        baseUrl.delete(`videos/${itemId}`)
          .then(() => {
            fetchVideos()
            setLoading(false)
            toast.success('Item Deleted', { duration: 2000 })
          })
          .catch(error => {
            setApiError(error)
            setLoading(false)
          })
      }
    })
  }

  function getInputs(itemId) {
    baseUrl.get(`videos/${itemId}`)
      .then(response => {
        formik.setValues({
          posterUrl: response.data.posterUrl,
          videoUrl: response.data.videoUrl,
          titleAr: response.data.title,
          titleEn: response.data.title,
          subTitleAr: response.data.subTitle,
          subTitleEn: response.data.subTitle,
          descriptionAr: response.data.description,
          descriptionEn: response.data.description,
          type: response.data.type
        })
      })
      .catch(error => {
        setApiError(error)
      })
  }

  let validationSchema = yup.object({
    posterUrl: yup.string().required('Poster Url is required'),
    videoUrl: yup.string().required('Video Url is required'),
    titleAr: yup.string().required('Title in arabic is required'),
    titleEn: yup.string().required('Title in english required'),
    subTitleAr: yup.string().required('SubTitle in arabic is required'),
    subTitleEn: yup.string().required('SubTitle in english required'),
    descriptionAr: yup.string().required('Description in arabic is required'),
    descriptionEn: yup.string().required('Description in english required'),
    type: yup.string().required('Type is required')
  })

  let formik = useFormik({
    initialValues: {
      posterUrl: "",
      videoUrl: "",
      titleAr: "",
      titleEn: "",
      subTitleAr: "",
      subTitleEn: "",
      descriptionAr: "",
      descriptionEn: "",
      type: ""
    }, validationSchema
    , onSubmit: handleProcedure
  })

  useEffect(() => {
    fetchVideos()
  }, []);

  if (loading) return <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-light d-flex align-items-center justify-content-center high-index">
    <Spinner />
  </div>
  if (error) return <p>{language === 'en' ? `Error: ${error.message}` : `خطأ: ${error.message}`}</p>;

  return (
    <>
      <Helmet>
        <title>{language === 'en' ? 'Videos' : 'الفيديوهات'}</title>
      </Helmet>
      <div className="montserrat">
        {/* Header */}
        <div className="VVVV row rowW  gx-0 position-relative blueC mb-2 " style={{ height: '318px' }}>
          <video className='landingVideo col-12' src={LandingVideo} autoPlay loop muted></video>
          <div className='filterContainer col-12'>
            <div className='container d-flex align-items-center justify-content-center h-100'>
              <div className='mt-3 d-flex align-items-end position-absolute z-3 text-center justify-content-center' style={{ height: '200px' }}>
                <h4 className='fs-1 fw-semibold text-white'>{language === 'en' ? 'Educational Videos' : 'فيديوهات تعليمية'}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Body of videos */}
        <div className="row gx-0 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start ">
          <div className='offset-1 col-10 px-4 ms-0'>
            <div className='text-center my-5'>
              <p lang={language} className={`text-dark-emphasis fw-semibold mb-0 ${style.font}`}>
                {language === 'en' ? 'Behind the Mask is now also a Podcast!' : 'خلف القناع الآن أيضاً بودكاست!'}
              </p>
              <p className='fs-5 text-body-tertiary fw-bold text-uppercase'>
                {language === 'en' ? 'Available on YouTube, Spotify, and Apple Podcast.' : 'متاح على يوتيوب، سبوتيفاي، وآبل بودكاست.'}
              </p>
            </div>
            <div className="row g-5 ">
              {data.map((video) => (
                video.type === 'Podcast' ? (
                  <div key={video.id} className="col-lg-4" data-aos-duration={video * 500 + 1500} lang={language}>
                    <div className='position-relative overflow-hidden' lang={language} >
                      <div lang={language} className={`cursor-pointer position-relative ${style.shadow} video`} onClick={() => openVideo(video.videoUrl)}>
                        <div lang={language} className="position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex align-items-center justify-content-center">
                          <i className="fa-solid fa-play fs-5 text-white d-flex align-items-center justify-content-center rounded-circle play"></i>
                        </div>
                        <div lang={language} style={{ height: "280px" }}>
                          <img src={video.posterUrl} className='w-100 h-100' alt="youtube video" />
                        </div>
                      </div>
                      {token != null ? <div className="btn-group dropend position-absolute top-0 end-0 z-2">
                        <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis-vertical fs-5"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li className='btn bg-light w-100 mb-2 d-flex align-items-center justify-content-between edit-hover' onClick={() => openOverlay('edit', video.id)}>
                            <p className="mb-0">Edit</p>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </li>
                          <li className='btn bg-light w-100 d-flex align-items-center justify-content-between delete-hover' onClick={() => deleteItem(video.id)}>
                            <p className="mb-0">Delete</p>
                            <i className="fa-solid fa-trash-can"></i>
                          </li>
                        </ul>
                      </div> : ''}
                      <div lang={language} className='my-5'>
                        <p className='text-body-secondary fw-semibold fs-4 mb-2' lang={language} >
                          {video.title}: <span lang={language} className='text-body-tertiary'>{video.subTitle}</span>
                        </p>
                        <p lang={language} className='text-light-emphasis'>{video.description}</p>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
              {token != null ? <div className="col-lg-4 col-sm-6" data-aos-duration={data.length * 500 + 1500}>
                <div className='cursor-pointer d-flex align-items-center justify-content-center w-100' style={{ height: '20rem' }} onClick={() => openOverlay('add')}>
                  <i className="fa-solid fa-circle-plus text-body-tertiary iconAdd"></i>
                </div>
              </div> : ''}
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className='blueC text-white row gx-0 mt-5 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start'>
          <div className='offset-1 col-10 ms-0'>
            <div className="d-flex flex-lg-row flex-column align-items-center justify-content-lg-between justify-content-center w-100 p-4">
              <p className={`fw-semibold mb-lg-0 mb-3 fs-5 pe-lg-4`}>
                {language === 'en' ? 'All the information you need to know for your cosmetic surgery journey.' : 'كل المعلومات التي تحتاج إلى معرفتها لرحلة جراحة التجميل الخاصة بك.'}
              </p>
              <Link to='https://www.youtube.com/@dr.dina_khairy' target="_blank" lang={language} className={`d-flex text-white text-decoration-none align-items-center cursor-pointer ${style.subscribe}`}>
                <div lang={language} className={`d-flex justify-content-end overflow-hidden pe-4 align-items-center ${style.arrow} position-relative rotateArrow`}>
                  <i className={`${style.anglePositionOverlay}`}></i>
                  <i className={`fa-solid fa-angle-left ${style.right} `}></i>
                </div>
                <p className='fw-bold text-uppercase mb-0'>
                  {language === 'en' ? 'Subscribe Now' : 'اشترك الآن'}
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Body of videos 2 */}
        <div className="row bg-light gx-0 py-5 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start">
          <div className='offset-1 col-10 px-4 ms-0'>
            <div className='text-center my-5'>
              <p className={`text-dark-emphasis fw-semibold mb-0 ${style.font}`}>
                {language === 'en' ? 'Educational Videos' : 'فيديوهات تعليمية'}
              </p>
              <p className='fs-5 text-body-tertiary fw-bold text-uppercase'>
                {language === 'en' ? 'Years of Experience | All Your Questions Answered' : 'سنوات من الخبرة | جميع أسئلتك مجابة'}
              </p>
            </div>
            <div className="row g-5">
              {data.map((video) => (
                video.type === 'Education' ? (
                  <div key={video.id} className="col-lg-4" data-aos-duration={video * 500 + 1500} lang={language}>
                    <div className='position-relative overflow-hidden' lang={language} >
                      <div lang={language} className={`cursor-pointer position-relative ${style.shadow} video`} onClick={() => openVideo(video.videoUrl)}>
                        <div className="position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex align-items-center justify-content-center">
                          <i className="fa-solid fa-play fs-5 text-white d-flex align-items-center justify-content-center rounded-circle"></i>
                        </div>
                        <div style={{ height: "280px" }}>
                          <img src={video.posterUrl} className='w-100 h-100 scale' alt="youtube video" />
                        </div>
                      </div>
                      {token != null ? <div className="btn-group dropend position-absolute top-0 end-0 z-2">
                        <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis-vertical fs-5"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li className='btn bg-light w-100 mb-2 d-flex align-items-center justify-content-between edit-hover' onClick={() => openOverlay('edit', video.id)}>
                            <p className="mb-0">Edit</p>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </li>
                          <li className='btn bg-light w-100 d-flex align-items-center justify-content-between delete-hover' type='button' onClick={() => deleteItem(video.id)}>
                            <p className="mb-0">Delete</p>
                            <i className="fa-solid fa-trash-can"></i>
                          </li>
                        </ul>
                      </div> : ''}
                      <div lang={language} className='my-5'>
                        <p className='text-body-secondary fw-semibold fs-4 mb-2' lang={language} >
                          {video.title}: <span lang={language} className='text-body-tertiary'>{video.subTitle}</span>
                        </p>
                        <p className='text-light-emphasis' lang={language}>{video.description}</p>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
              {token != null ? <div className="col-lg-4 col-sm-6" data-aos-duration={data.length * 500 + 1500}>
                <div className='cursor-pointer d-flex align-items-center justify-content-center w-100' style={{ height: '20rem' }} onClick={() => openOverlay('add')}>
                  <i className="fa-solid fa-circle-plus text-body-tertiary iconAdd"></i>
                </div>
              </div> : ''}
            </div>
          </div>
        </div>
      </div >

      {/* Overlay of card */}
      {isVideoOpen && (
        <div className="vh-100 montserrat row position-fixed overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
          <div className="col-xl-8 col-lg-9 col-md-10 col-11">
            <div className='w-100'>
              <div className="text-end w-100">
                <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeVideo}></i>
              </div>
              <div className='py-2'>
                <ReactPlayer playing={true} controls={true} url={youtubeVideo} className={`w-100 ${style.videoSize}`} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pop Up */}
      {isOverlayVisible && token != null ? <>
        <div className="vh-100 montserrat row position-fixed overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
          <div className="col-lg-6 col-sm-8 col-10 px-5">
            <div className="text-end w-100">
              <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeOverlay}></i>
            </div>
            <div className='bg-white p-4 text-dark-emphasis rounded-2 scrollbar-popUp'>
              <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}

                <label htmlFor="posterUrl">Poster Url : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="posterUrl" value={formik.values.posterUrl} id="posterUrl" className='form-control mb-3' />
                {formik.errors.posterUrl && formik.touched.posterUrl ? <div className="alert alert-danger py-2">{formik.errors.posterUrl}</div> : ''}

                <label htmlFor="videoUrl">Video Url : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="videoUrl" value={formik.values.videoUrl} id="videoUrl" className='form-control mb-3' />
                {formik.errors.videoUrl && formik.touched.videoUrl ? <div className="alert alert-danger py-2">{formik.errors.videoUrl}</div> : ''}

                <label htmlFor="titleAr">Title In Arabic : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="titleAr" value={formik.values.titleAr} id="titleAr" className='form-control mb-3' />
                {formik.errors.titleAr && formik.touched.titleAr ? <div className="alert alert-danger py-2">{formik.errors.titleAr}</div> : ''}

                <label htmlFor="titleEn">Title In English : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="titleEn" value={formik.values.titleEn} id="titleEn" className='form-control mb-3' />
                {formik.errors.titleEn && formik.touched.titleEn ? <div className="alert alert-danger py-2">{formik.errors.titleEn}</div> : ''}

                <label htmlFor="subTitleAr">SubTitle In Arabic : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="subTitleAr" value={formik.values.subTitleAr} id="subTitleAr" className='form-control mb-3' />
                {formik.errors.subTitleAr && formik.touched.subTitleAr ? <div className="alert alert-danger py-2">{formik.errors.subTitleAr}</div> : ''}

                <label htmlFor="subTitleEn">SubTitle In English : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="subTitleEn" value={formik.values.subTitleEn} id="subTitleEn" className='form-control mb-3' />
                {formik.errors.subTitleEn && formik.touched.subTitleEn ? <div className="alert alert-danger py-2">{formik.errors.subTitleEn}</div> : ''}

                <label htmlFor="descriptionAr">Description In Arabic : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="descriptionAr" value={formik.values.descriptionAr} id="descriptionAr" className='form-control mb-3' />
                {formik.errors.descriptionAr && formik.touched.descriptionAr ? <div className="alert alert-danger py-2">{formik.errors.descriptionAr}</div> : ''}

                <label htmlFor="descriptionEn">Description In English : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="descriptionEn" value={formik.values.descriptionEn} id="descriptionEn" className='form-control mb-3' />
                {formik.errors.descriptionEn && formik.touched.descriptionEn ? <div className="alert alert-danger py-2">{formik.errors.descriptionEn}</div> : ''}

                <label htmlFor="type">Type : </label>
                <div className="form-check mt-1">
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="radio"
                    name="type"
                    value="Podcast"
                    id="Podcast"
                    className="form-check-input"
                    checked={formik.values.type === 'Podcast'} />
                  <label htmlFor="Podcast" className="form-check-label">Podcast</label>
                </div>
                <div className="form-check mb-3">
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="radio"
                    name="type"
                    value="Education"
                    id="Education"
                    className="form-check-input"
                    checked={formik.values.type === 'Education'} />
                  <label htmlFor="Education" className="form-check-label">Education</label>
                </div>

                {/* <div className="d-flex align-items-center justify-content-end w-100"> */}
                {loading ? <button type='button' className='btn blueC w-100 text-light'>
                  <i className='fas fa-spinner fa-spin'></i>
                </button>
                  : <button disabled={!(formik.isValid)} type='submit' className='btn blueC w-100 text-light'>{formBased === 'edit' ? 'Update' : 'Add'}</button>
                }
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </> : ''}
    </>
  );
}
