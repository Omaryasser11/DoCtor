import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../store/LanguageContext'
import { useRecoilState } from 'recoil';
import './Faq.scss';
import { Helmet } from 'react-helmet-async';
import baseUrl from '../../BaseUrl';
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import ReactPlayer from 'react-player';
import patientSelfie from '../../assets/images/patient-selfie.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { isFlippedState } from '../../store/index.js';
import Spinner from '../Spinner/Spinner.jsx';
import Swal from 'sweetalert2';

export default function Faq() {
    const [videos, setVideos] = useState([]);
    const [texts, setTexts] = useState([]);
    const [currentId, setCurrentId] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isOverlayVisibleVideo, setIsOverlayVisibleVideo] = useState(false);
    const [apiError, setApiError] = useState('')
    const [formBased, setFormBased] = useState('')
    const [youtubeVideo, setYoutubeVideo] = useState(null);
    const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
    // Get the current language from context
    const { language } = useContext(LanguageContext)
    const [token, setToken] = useState(null);

    useEffect(() => {
        const admin = localStorage.getItem("token")
      if (admin != null) {
        setToken(admin)
      }
    }, [token]);

    // Function to open a video card
    function openCard(videoUrl) {
        setYoutubeVideo(videoUrl);
    }

    // Function to close the video card
    function closeCard() {
        setYoutubeVideo('');
    }

    function openOverlay(mode, id = null) {
        setFormBased(mode)
        setCurrentId(id)
        if(mode==='edit' && id){
          getInputs(id)
        }
        else if(mode==='add'){
          formik.resetForm({
            questionAr: '',
            questionEn: '',
            answerAr: '',
            answerEn: '',
            type: ''
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
        baseUrl.get('faq/texts')
        .then(response => {
            setTexts(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }

    function fetchVideos() {
        setLoading(true)
        baseUrl.get('faq/videos')
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
        title: 'Please click confirm to make the question updated.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Confirm'
        }).then((result) => {
        if (result.isConfirmed) {
        setLoading(true)
      baseUrl.put(`faq/texts/${currentId}`, values)
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
            title: 'Please click confirm to add the question.',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#A9A9A9',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
            setLoading(true)
            baseUrl.post('faq/texts', values)
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
            baseUrl.post('faq/videos', values)
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
        baseUrl.delete(`faq/videos/${itemId}`)
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
    else if(whatApi==='question'){
      Swal.fire({
        title: 'Are you sure you want to delete this question?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
        setLoading(true)
        baseUrl.delete(`faq/texts/${itemId}`)
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
    baseUrl.get(`faq/texts/${itemId}`)
      .then(response => {
        formik.setValues({
            questionAr: response.data.question,
            questionEn: response.data.question,
            answerAr: response.data.answer,
            answerEn: response.data.answer,
            type: response.data.type
          })
      })
      .catch(error => {
        setApiError(error.message)
      })
  }

  let validationSchemaVideo = yup.object({
    posterUrl: yup.string().required('Poster Url is required'),
    videoUrl: yup.string().required('Video Url is required'),
  })

  let formikVideo = useFormik({
    initialValues: {
      posterUrl: '',
      videoUrl: '',
      }, validationSchema: validationSchemaVideo
    , onSubmit: handleSubmit
  })

  let validationSchema = yup.object({
    questionAr: yup.string().required('Question in Arabic is required'),
    questionEn: yup.string().required('Question in English is required'),
    answerAr: yup.string().required('Answer in Arabic is required'),
    answerEn: yup.string().required('Answer in English is required'),
    type: yup.string().required('Type is required')
  })

  let formik = useFormik({
    initialValues: {
        questionAr: '',
        questionEn: '',
        answerAr: '',
        answerEn: '',
        type: ''
      }, validationSchema
    , onSubmit: handleText
  })

    useEffect(() => {
        AOS.init({
            duration: 2000,
        })
        fetchTexts()
        fetchVideos()
    }, []);

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

    // Translations for the component
    const translations = {
        en: {
            title: "Frequently Asked Questions (FAQ)",
            faqHeader: "FAQ",
            faqSubtitle: "Frequently Asked Questions",
            faqVideosTitle: "FAQ Videos",
            faqVideosDescription: "Frequently asked questions and tips on preparing for surgery, your procedure and post op care.",
            aboutMeTitle: "About Me",
            switchToArabic: "Switch to Arabic",
        },
        ar: {
            title: "الأسئلة الشائعة",
            faqHeader: "الأسئلة الشائعة",
            faqSubtitle: "الأسئلة الشائعة",
            faqVideosTitle: "فيديوهات الأسئلة الشائعة",
            faqVideosDescription: "الأسئلة الشائعة والنصائح حول التحضير للجراحة وإجراءك والرعاية بعد العملية.",
            aboutMeTitle: "معلومات عني",
            switchToArabic: "التبديل إلى الإنجليزية",
        }
    };

    // Select the appropriate translations based on the current language
    const t = translations[language] || translations.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
            </Helmet>
            <div className="text-white">
                {/* Header */}
                <header className="row gx-0 position-relative blueC d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start" style={{ height: '318px' }}>
                    <div className='offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100 ms-0'>
                        <div className='mt-3 d-flex flex-column justify-content-end position-absolute z-3' style={{ height: '200px' }}>
                            <h4 className='fs-1 fw-semibold'>{t.faqHeader}</h4>
                            <p className='fs-4 fw-light mb-0'>{t.faqSubtitle}</p>
                        </div>
                    </div>
                </header>

                {/* Body of FAQ videos */}
                <div className="row gx-0 py-5 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start">
                    <div className='offset-1 col-10 px-4 ms-0'>
                        <div className='mt-5'>
                            <p className="text-dark-emphasis fw-semibold mb-0 fs-4">{t.faqVideosTitle}</p>
                            <p className='text-body-tertiary fw-light'>{t.faqVideosDescription}</p>
                        </div>
                        <div className="row g-4">
                            {videos.map((video, index) => (
                                <div key={video.id} className="col-lg-4 col-sm-6" data-aos="fade-up" data-aos-duration={index * 500 + 1500}>
                                    <div className='my-5 position-relative'>
                                    {token !=null? <div className="position-absolute top-0 end-0 z-2 mt-2 me-2">
                                      <button type="button" className="btn btn-light delete-hover p-1 pb-0" onClick={() => deleteItem('video', video.id)}>
                                        <i className="fa-solid fa-trash-can fs-5"></i>
                                      </button>
                                    </div>:''}
                                        <div className="cursor-pointer faqShadow video overflow-hidden" onClick={() => openCard(video.videoUrl)}>
                                            <div className="position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex align-items-center justify-content-center">
                                                <i className="fa-solid fa-play fs-5 text-white d-flex align-items-center justify-content-center rounded-circle"></i>
                                            </div>
                                            <div>
                                                <img src={video.posterUrl} className='w-100 scale' alt="youtube video" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {token!=null? <div className="col-lg-4 col-sm-6" data-aos="fade-up" data-aos-duration={videos.length * 500 + 1500}>
                              <div className='cursor-pointer d-flex align-items-center justify-content-center w-100' style={{ height: '20rem' }} onClick={() => setIsOverlayVisibleVideo(true)}>
                                <i className="fa-solid fa-circle-plus text-body-tertiary iconAdd"></i>
                              </div>
                            </div> :''}
                        </div>
                    </div>
                </div>

                {/* Body of FAQ texts */}
                <div className="row gx-0 blueC d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start">
                    <div className='offset-1 col-10 row gx-5 gy-3 py-5 px-lg-4 px-md-3 px-2 h-100 ms-0'>
                        {texts.map((text, index) => (
                            text.type === 'Medical' ? (
                                <div key={text.id} className='col-lg-6' data-aos="fade-right" data-aos-duration={index * 500 + 1500}>
                                    <div className='position-relative'>        
                                        {token != null? <div className="position-absolute my-2 me-2 d-flex align-items-center end-0">
                                        <button className='btn bg-light p-1 d-flex align-items-center justify-content-between edit-hover' onClick={() => openOverlay('edit', text.id)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        </button>        
                                        <button className='btn bg-light ms-2 p-1 d-flex align-items-center justify-content-between delete-hover' onClick={() => deleteItem('question', text.id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>  
                                        </div>:''}                  
                                    <button className="btn w-100 fw-semibold rounded-0 faqCollapse text-white border-none border-0 text-start ps-0 py-2 d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${text.id}`} aria-expanded="false" aria-controls={`collapseExample${text.id}`}>
                                            <span className='faqIcon d-flex justify-content-center align-items-center mx-2 rounded-circle fw-bold'></span>
                                            <p className='mb-0'>{text.question}</p>
                                        </button>
                                        <div className="collapse" id={`collapseExample${text.id}`}>
                                            <div className="card card-body bg-transparent rounded-0 shadow-none text-white border-top-0">
                                                {text.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))}
                        {token != null? <div className='col-lg-6' data-aos="fade-right" data-aos-duration={texts.length * 500 + 1500}>
                            <div>                            
                            <button className="btn w-100 fw-semibold rounded-0 faqCollapse text-white border-none border-0 text-start ps-0 py-2 d-flex align-items-center justify-content-center" type="button"  onClick={() => openOverlay('add')}>
                                <i className="fa-solid fa-circle-plus iconAddFaq fs-4"></i>
                            </button>
                            </div>
                        </div> :''}
                    </div>
                </div>

                {/* Body of FAQ about */}
                <div className="row gx-0 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start">
                    <div className='offset-1 col-10 row gx-5 gy-lg-0 gy-4 px-lg-4 px-md-3 px-2 h-100 ms-0'>
                        <div className='col-lg-6'>
                            <div className='pt-5 mt-3 pb-2' data-aos="fade-right">
                                <span className='blueC my-3 px-3 py-1 fs-5 fw-semibold text-uppercase'>{t.aboutMeTitle}</span>
                            </div>
                            {texts.map((text, index) => (
                                text.type === 'AboutMe' ? (
                                    <div key={text.id} className='my-3' data-aos="fade-left" data-aos-duration={index * 500 + 1500}>
                                        <div className='position-relative'>
                                        {token != null?  <div className="position-absolute my-2 me-2 d-flex align-items-center end-0">
                                        <button className='btn bg-light p-1 d-flex align-items-center justify-content-between edit-hover' onClick={() => openOverlay('edit', text.id)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        </button>        
                                        <button className='btn bg-light ms-2 p-1 d-flex align-items-center justify-content-between delete-hover' onClick={() => deleteItem(text.id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>  
                                        </div> :''}
                                        <button className="btn w-100 fw-semibold rounded-0 faqCollapse text-white border-none border-0 text-start ps-0 py-2 d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${text.id}`} aria-expanded="false" aria-controls={`collapseExample${text.id}`}>
                                            <span className='faqIcon d-flex justify-content-center align-items-center mx-2 rounded-circle fw-bold faqIconAbout'></span>
                                            <p className='mb-0 text-gray'>{text.question}</p>
                                        </button>
                                        <div className="collapse" id={`collapseExample${text.id}`}>
                                            <div className="card card-body bg-transparent rounded-0 shadow text-gray fw-light border-top-0">
                                                {text.answer}
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                ) : null
                            ))}
                            {token !=null? <div className='my-3' data-aos="fade-left" data-aos-duration={texts.length * 500 + 1500}>
                            <div>                            
                            <button className="btn w-100 fw-semibold rounded-0 faqCollapse text-white border-none border-0 text-start ps-0 py-2 d-flex align-items-center justify-content-center" type="button"  onClick={() => openOverlay('add')}>
                                <i className="fa-solid fa-circle-plus iconAdd fs-4"></i>
                            </button>
                            </div>
                        </div> :''}
                        </div>
                        <div className='col-lg-6 position-relative' data-aos="fade-left">
                            <img src={patientSelfie} className='rounded-3 w-100' alt='Patient Selfie' />
                        </div>
                    </div>
                </div>

                {/* Video overlay */}
                {youtubeVideo && (
                <div className="vh-100 montserrat row position-fixed overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
                <div className="col-xl-8 col-lg-9 col-md-10 col-11">
                  <div className='w-100'>
                    <div className="text-end w-100">
                      <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeCard}></i>
                    </div>
                    <div className='py-2'>
                      <ReactPlayer playing={true} controls={true} url={youtubeVideo} className={`w-100`} />
                    </div>
                  </div>
                </div>
              </div>
                )}

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
            
                            <label htmlFor="questionAr">Question in Arabic : </label>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="questionAr" value={formik.values.questionAr} id="questionAr" className='form-control mb-3' />
                            {formik.errors.questionAr && formik.touched.questionAr ? <div className="alert alert-danger py-2">{formik.errors.questionAr}</div> : ''}
            
                            <label htmlFor="questionEn">Question in English : </label>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="questionEn" value={formik.values.questionEn} id="questionEn" className='form-control mb-3' />
                            {formik.errors.questionEn && formik.touched.questionEn ? <div className="alert alert-danger py-2">{formik.errors.questionEn}</div> : ''}
            
                            <label htmlFor="answerAr">Answer in Arabic : </label>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="answerAr" value={formik.values.answerAr} id="answerAr" className='form-control mb-3' />
                            {formik.errors.answerAr && formik.touched.answerAr ? <div className="alert alert-danger py-2">{formik.errors.answerAr}</div> : ''}
            
                            <label htmlFor="answerEn">Answer in English : </label>
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="answerEn" value={formik.values.answerEn} id="answerEn" className='form-control mb-3' />
                            {formik.errors.answerEn && formik.touched.answerEn ? <div className="alert alert-danger py-2">{formik.errors.answerEn}</div> : ''}
            
                            <label htmlFor="type">Type : </label>
                                <div className="form-check mt-1">
                                    <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="radio"
                                    name="type"
                                    value="Medical"
                                    id="medical"
                                    className="form-check-input"
                                    checked={formik.values.type === 'Medical'} />
                                    <label htmlFor="medical" className="form-check-label">Medical</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="radio"
                                    name="type"
                                    value="AboutMe"
                                    id="aboutMe"
                                    className="form-check-input"
                                    checked={formik.values.type === 'AboutMe'} />
                                    <label htmlFor="aboutMe" className="form-check-label">About Me</label>
                                </div>

                                {formik.errors.type && formik.touched.type ? (
                                    <div className="alert alert-danger py-2">{formik.errors.type}</div>
                                ) : null}
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
            
                            <label htmlFor="posterUrl">Poster Url : </label>
                            <input onBlur={formikVideo.handleBlur} onChange={formikVideo.handleChange} type="text" name="posterUrl" value={formikVideo.values.posterUrl} id="posterUrl" className='form-control mb-3' />
                            {formikVideo.errors.posterUrl && formikVideo.touched.posterUrl ? <div className="alert alert-danger py-2">{formikVideo.errors.posterUrl}</div> : ''}
            
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
    );
}
