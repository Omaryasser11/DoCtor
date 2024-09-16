import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import './Blog.scss';
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import Spinner from '../Spinner/Spinner'
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import baseUrl from '../../BaseUrl'

export default function Blog() {
  const [data, setData] = useState([])
  const [authors, setAuthors] = useState([]);
  const [currentId, setCurrentId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [apiError, setApiError] = useState('')
  const [formBased, setFormBased] = useState('')
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
  const [token, setToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const admin = localStorage.getItem("token")
    if (admin != null) {
      setToken(admin)
    }
  }, [token]);

  const cardsPerPage = 24;
  const cardData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    // Add more data as needed
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsFlipped]);


  const count = Math.ceil(cardData.length / cardsPerPage);
  // const startIndex = (currentPage - 1) * cardsPerPage;
  // const currentCards = cardData.slice(startIndex, startIndex + cardsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  function fetchBlogs() {
    setLoading(true)
    baseUrl.get('blogs')
      .then(response => {
        setData(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  function openOverlay(mode, id = null) {
    setFormBased(mode)
    setCurrentId(id)
    if (mode === 'edit' && id) {
      getInputs(id)
    }
    else if (mode === 'add') {
      formik.resetForm({
        imageUrl: '',
        titleAr: '',
        titleEn: '',
        descriptionAr: '',
        descriptionEn: '',
        contentAr: '',
        contentEn: '',
        recommendedVideoUrl: '',
        authorId: '',
        categoryIds: []
      })
    }
    setIsOverlayVisible(true)
  }

  function closeOverlay() {
    setIsOverlayVisible(false)
  }

  function deleteItem(itemId) {
    Swal.fire({
      title: 'Are you sure you want to delete this blog?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#A9A9A9',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        baseUrl.delete(`blogs/${itemId}`)
          .then(() => {
            fetchBlogs()
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

  function handleBlogs(values) {
    if (formBased === 'edit') {
      Swal.fire({
        title: 'Please click confirm to make the blog updated.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true)
          baseUrl.put(`blogs/${currentId}`, values)
            .then(() => {
              fetchBlogs()
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
        title: 'Please click confirm to add the blog.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#A9A9A9',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true)
          baseUrl.post('blogs', values)
            .then(() => {
              fetchBlogs()
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

  function getInputs(itemId) {
    baseUrl.get(`blogs/${itemId}`)
      .then(response => {
        formik.setValues({
          imageUrl: response.data.imageUrl,
          titleAr: response.data.title,
          titleEn: response.data.title,
          descriptionAr: response.data.description,
          descriptionEn: response.data.description,
          contentAr: response.data.content,
          contentEn: response.data.content,
          recommendedVideoUrl: response.data.recommendedVideoUrl,
          authorId: response.data.author.id,
          categoryIds: []
        });
      })
      .catch(error => {
        setApiError(error);
      });
  }

  let validationSchema = yup.object({
    imageUrl: yup.string().required('Image URL is required'),
    titleAr: yup.string().required('Title in arabic is required'),
    titleEn: yup.string().required('Title in english is required'),
    descriptionAr: yup.string().required('Description in arabic is required'),
    descriptionEn: yup.string().required('Description in english is required'),
    contentAr: yup.string().required('Content in arabic is required'),
    contentEn: yup.string().required('Content in english is required'),
    recommendedVideoUrl: yup.string().required('Recommended Video URL is required'),
    authorId: yup.string().required('Author name is required')
  })

  let formik = useFormik({
    initialValues: {
      imageUrl: '',
      titleAr: '',
      titleEn: '',
      descriptionAr: '',
      descriptionEn: '',
      contentAr: '',
      contentEn: '',
      recommendedVideoUrl: '',
      authorId: '',
      categoryIds: [1]
    }, validationSchema
    , onSubmit: handleBlogs
  })

  function fetchAuthors() {
    setLoading(true)
    baseUrl.get('authors')
      .then(response => {
        setAuthors(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchBlogs()
    fetchAuthors()
  }, [])


  if (loading) return <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-light d-flex align-items-center justify-content-center high-index">
    <Spinner />
  </div>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <Helmet>
        <title>Our Blog</title>
      </Helmet>
      <div className="montserrat bg-light pb-5">
        {/* Header */}
        <div className="row gx-0 position-relative blueC mb-2" style={{ height: '318px' }}>
          <div className='container d-flex align-items-center justify-content-center h-100'>
            <div className='mt-3 d-flex align-items-end position-absolute z-3 text-center justify-content-center' style={{ height: '200px' }}>
              <h4 className='fs-1 fw-semibold text-white' lang={language}>







                {
                  language === 'ar' ? 'أحدث ما توصلت إليه جراحة التجميل' : '  Latest in Cosmetic Surgery'
                }


              </h4>
            </div>
          </div>
        </div>

        {/* Body of cards */}
        <div className="row gx-0">
          <div className='offset-1 col-10 p-4 row g-5'>
            {data.map((item) => <>
              <div  lang={language} key={item.id} className="col-lg-4 col-sm-6">
                <div  lang={language} className={`cursor-pointer position-relative shadow video overflow-hidden rounded-2 bg-white`}>
                  {token != null ? <div className="btn-group dropend position-absolute top-0 end-0 z-2">
                    <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa-solid fa-ellipsis-vertical fs-5"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li className='btn bg-light w-100 mb-2 d-flex align-items-center justify-content-between edit-hover' onClick={() => openOverlay('edit', item.id)}>
                        <p  lang={language} className="mb-0">Edit</p>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </li>
                      <li className='btn bg-light w-100 d-flex align-items-center justify-content-between delete-hover' onClick={() => deleteItem(item.id)}>
                        <p className="mb-0">Delete</p>
                        <i className="fa-solid fa-trash-can"></i>
                      </li>
                    </ul>
                  </div> : ''}
                  <div className='overflow-hidden'>
                    <img src={item.imageUrl} className='w-100 scale' alt="Blog img" />
                  </div>
                  <div className='m-4'>
                    <div className='my-2 position-relative d-flex flex-wrap'>
                      {item.categories.map((category) => <>
                        <Link key={category.id} to={'/Blog'} className={`small text-decoration-none darkCyan-text fw-medium linkBlog mb-2 me-3`}>{category.name}</Link>
                      </>)}
                    </div>
                    <div>
                      <h4 lang={language} className='fs-5 fw-semibold text-black'>{item.title}</h4>
                      <p  lang={language} className='text-secondary-emphasis my-3'>{item.description}</p>
                      <Link to={'/Blog'} className={`small text-decoration-none fw-medium text-secondary-emphasis d-flex mb-2 me-3 circleLink`}>
                        <div className={`rounded-circle sizeCircle shadowCircle me-3`}></div>
                        {item.author.name}<br />
                        {item.writtenOn.split('T')[0]}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </>)}
            {token != null ? <div className="col-lg-4 col-sm-6" data-aos-duration={data.length * 500 + 1500}>
              <div className='cursor-pointer d-flex align-items-center justify-content-center w-100' style={{ height: '20rem' }} onClick={() => openOverlay('add')}>
                <i className="fa-solid fa-circle-plus text-body-tertiary iconAdd"></i>
              </div>
            </div> : ''}
          </div>
        </div>

        {/* Pagination */}
        <nav className='mt-4 mb-5'>
          <div className='d-flex justify-content-center align-items-center w-100 small'>
            <Pagination
              count={count}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </nav>

        {isOverlayVisible && token != null ? <>
          <div className="vh-100 montserrat row position-fixed overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
            <div className="col-lg-6 col-sm-8 col-10 px-5">
              <div className="text-end w-100">
                <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeOverlay}></i>
              </div>
              <div className='bg-white p-4 text-dark-emphasis rounded-2 overflow-y-scroll scrollbar-popUp'>
                <form onSubmit={formik.handleSubmit}>
                  {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}

                  <label htmlFor="imageUrl">Image URL : </label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="imageUrl" value={formik.values.imageUrl} id="imageUrl" className='form-control mb-3' />
                  {formik.errors.imageUrl && formik.touched.imageUrl ? <div className="alert alert-danger py-2">{formik.errors.imageUrl}</div> : ''}

                  <label htmlFor="titleAr">Title in Arabic : </label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="titleAr" value={formik.values.titleAr} id="titleAr" className='form-control mb-3' />
                  {formik.errors.titleAr && formik.touched.titleAr ? <div className="alert alert-danger py-2">{formik.errors.titleAr}</div> : ''}

                  <label htmlFor="titleEn">Title in English : </label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="titleEn" value={formik.values.titleEn} id="titleEn" className='form-control mb-3' />
                  {formik.errors.titleEn && formik.touched.titleEn ? <div className="alert alert-danger py-2">{formik.errors.titleEn}</div> : ''}

                  <label htmlFor="descriptionAr">Description in Arabic : </label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="descriptionAr" value={formik.values.descriptionAr} id="descriptionAr" className='form-control mb-3' />
                  {formik.errors.descriptionAr && formik.touched.descriptionAr ? <div className="alert alert-danger py-2">{formik.errors.descriptionAr}</div> : ''}

                  <label htmlFor="descriptionEn">Description in English : </label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="descriptionEn" value={formik.values.descriptionEn} id="descriptionEn" className='form-control mb-3' />
                  {formik.errors.descriptionEn && formik.touched.descriptionEn ? <div className="alert alert-danger py-2">{formik.errors.descriptionEn}</div> : ''}

                  <label htmlFor="contentAr">Content in Arabic : </label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="contentAr" value={formik.values.contentAr} id="contentAr" className='form-control mb-3' />
                  {formik.errors.contentAr && formik.touched.contentAr ? <div className="alert alert-danger py-2">{formik.errors.contentAr}</div> : ''}

                  <label htmlFor="contentEn">Content in English : </label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="contentEn" value={formik.values.contentEn} id="contentEn" className='form-control mb-3' />
                  {formik.errors.contentEn && formik.touched.contentEn ? <div className="alert alert-danger py-2">{formik.errors.contentEn}</div> : ''}

                  <label htmlFor="recommendedVideoUrl">Recommended Video URl : </label>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="recommendedVideoUrl" value={formik.values.recommendedVideoUrl} id="recommendedVideoUrl" className='form-control mb-3' />
                  {formik.errors.recommendedVideoUrl && formik.touched.recommendedVideoUrl ? <div className="alert alert-danger py-2">{formik.errors.recommendedVideoUrl}</div> : ''}

                  <label htmlFor="author" className="mb-2">Author Name:</label>
                  {authors.map((author) => (
                    <div className="form-check mb-3" key={author.id}>
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="radio"
                        name="authorId"
                        value={author.id}
                        id={author.id}
                        className="form-check-input"
                        checked={formik.values.authorId === `${author.id}`}
                      />
                      <label htmlFor={author.id} className="form-check-label">
                        {author.name}
                      </label>
                    </div>
                  ))}

                  {formik.errors.authorId && formik.touched.authorId ? (
                    <div className="alert alert-danger py-2">{formik.errors.type}</div>
                  ) : null}

                  {/* 
                <label htmlFor="categoryIds">Categories : </label>
                <input  onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="categoryIds" value={formik.values.categoryIds} id="categoryIds" className='form-control mb-3' />
                {formik.errors.categoryIds && formik.touched.categoryIds ? <div className="alert alert-danger py-2">{formik.errors.categoryIds}</div> : ''} */}

                  {loading ? <button type='button' className='btn blueC w-100 text-light'>
                    <i className='fas fa-spinner fa-spin'></i>
                  </button>
                    : <button disabled={formBased === 'edit' ? !formik.isValid : !(formik.isValid && formik.dirty)} type='submit' className='btn blueC w-100 text-light'>{formBased === 'edit' ? 'Update' : 'Add'}</button>
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
