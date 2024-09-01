
import React, { useEffect, useState } from 'react'
import './Procedures.scss'
import baseUrl from '../../BaseUrl'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import Spinner from '../Spinner/Spinner'


export default function Procedures() {
  const [data, setData] = useState([])
  const [currentId, setCurrentId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [apiError, setApiError] = useState('')
  const [formBased, setFormBased] = useState('')

  function openOverlay(mode, id = null) {
    setFormBased(mode)
    setCurrentId(id)
    setIsOverlayVisible(true)
  }

  function closeOverlay() {
    setIsOverlayVisible(false)
  }

  function fetchProcedures() {
    setLoading(true)
    baseUrl.get('procedures')
      .then(response => {
        setData(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  function handleProcedure(values) {
    setLoading(true)
    if (formBased === 'edit') {
      baseUrl.put(`procedures/${currentId}`, values)
        .then(() => {
          fetchProcedures()
          closeOverlay()
          setLoading(false)
          toast.success('Item Updated', { duration: 2000 })
        })
        .catch(error => {
          setApiError(error.message)
          setLoading(false)
        })
    } else if (formBased === 'add') {
      baseUrl.post('procedures', values)
        .then(() => {
          fetchProcedures()
          closeOverlay()
          setLoading(false)
          toast.success('Item Added', { duration: 2000 })
        })
        .catch(error => {
          setApiError(error.message)
          setLoading(false)
        })
    }
  }

  function deleteItem(itemId) {
    setLoading(true)
    baseUrl.delete(`procedures/${itemId}`)
      .then(() => {
        fetchProcedures()
        setLoading(false)
        toast.success('Item Deleted', { duration: 2000 })
      })
      .catch(error => {
        setApiError(error)
        setLoading(false)
      })
  }

  let validationSchema = yup.object({
    nameAr: yup.string().required('Name in arabic is required').min(3, 'Minimum length is 3'),
    nameEn: yup.string().required('Name in english is required').min(3, 'Minimum length is 3'),
    imageUrl: yup.string().required('Image URL is required')
  })

  let formik = useFormik({
    initialValues: {
      nameAr: '',
      nameEn: '',
      imageUrl: '',
      iconUrl: 'https://example.com/ct-scan-icon.png',
      reviewId: '1',
      sections: [
        {
          headerAr: 'string',
          headerEn: 'string',
          bodyAr: 'string',
          bodyEn: 'string',
        }
      ],
    }, validationSchema
    , onSubmit: handleProcedure
  })

  useEffect(() => {
    fetchProcedures()
  }, [])

  if (loading) return <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-light d-flex align-items-center justify-content-center z-3">
    <Spinner />
  </div>;
  if (error) return <p>Error: {error.message}</p>

  return <>
    <div className="text-white montserratmb-5">
      <div className="row gx-0 position-relative blueC mb-2" style={{ height: '318px' }}>
        <div className='offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100'>
          <div className='mt-3 d-flex flex-column justify-content-end' style={{ height: '200px' }}>
            <h4 className='fs-2 fw-semibold'>Cosmetic Procedures</h4>
            <p className='fs-4 fw-light mb-0'>Real Patients. Real Results.</p>
          </div>
        </div>
      </div>
      <div className="row gx-0">
        <div className='offset-1 col-10 row g-3 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100'>
          {data.map((item) => <>
            <div key={item.id} className="col-lg-4 col-sm-6">
              <div className='name cursor-pointer overflow-hidden position-relative'>
                <div className="layer position-absolute top-0 bottom-0 start-0 end-0 z-1"></div>
                <div className="btn-group dropend position-absolute top-0 end-0 z-2">
                  <button type="button" className="btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-ellipsis-vertical fs-5"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li className='btn bg-light w-100 mb-2 d-flex align-items-center justify-content-between edit-hover' onClick={() => openOverlay('edit', item.id)}>
                      <p className="mb-0">Edit</p>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </li>
                    <li className='btn bg-light w-100 d-flex align-items-center justify-content-between delete-hover' onClick={() => deleteItem(item.id)}>
                      <p className="mb-0">Delete</p>
                      <i className="fa-solid fa-trash-can"></i>
                    </li>
                  </ul>
                </div>
                <div>
                  <img src={item.imageUrl} className='w-100 scale' alt={item.name} />
                </div>
                <div className='position-absolute w-75 bottom-0 mb-3 ms-4 z-1'>
                  <h5 className='text-white textShadow fw-medium fs-4'>{item.name}</h5>
                </div>
                <div>
                  <hr className="horizontal-line position-absolute linePosition z-2 " />
                  <i className="fa-solid fa-angle-right position-absolute anglePosition z-2 text-white"></i>
                </div>
              </div>
            </div>
          </>)}
          <div className="col-lg-4 col-sm-6">
            <div className='cursor-pointer d-flex align-items-center justify-content-center w-100' style={{ height: '20rem' }} onClick={() => openOverlay('add')}>
              <i className="fa-solid fa-circle-plus text-body-tertiary iconAdd"></i>
            </div>
          </div>
        </div>
      </div>
      {isOverlayVisible ? <>
        <div className="vh-100 montserrat row position-fixed z-3 overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
          <div className="col-lg-6 col-sm-8 col-10 px-5">
            <div className="text-end w-100">
              <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeOverlay}></i>
            </div>
            <div className='bg-white p-4 text-dark-emphasis rounded-2 overflow-y-scroll scrollbar-popUp'>
              <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}

                <label htmlFor="nameAr">Name in Arabic : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="nameAr" id="nameAr" className='form-control mb-3' />
                {formik.errors.nameAr && formik.touched.nameAr ? <div className="alert alert-danger py-2">{formik.errors.nameAr}</div> : ''}

                <label htmlFor="nameEn">Name in English : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="nameEn" id="nameEn" className='form-control mb-3' />
                {formik.errors.nameEn && formik.touched.nameEn ? <div className="alert alert-danger py-2">{formik.errors.nameEn}</div> : ''}

                <label htmlFor="imageUrl">Image URl : </label>
                <input  onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="imageUrl" id="imageUrl" className='form-control mb-3' />
                {formik.errors.imageUrl && formik.touched.imageUrl ? <div className="alert alert-danger py-2">{formik.errors.imageUrl}</div> : ''}

                <div className="d-flex align-items-center justify-content-end w-100">
                  {loading ? <button type='button' className='btn blueC text-light'>
                    <i className='fas fa-spinner fa-spin'></i>
                  </button>
                    : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn blueC text-light'>Done</button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </> : ''}
    </div>
  </>

}
