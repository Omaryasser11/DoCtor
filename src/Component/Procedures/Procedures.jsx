import React, { useEffect, useState } from 'react'
import './Procedures.scss'
import baseUrl from '../../BaseUrl'

export default function Procedures() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    baseUrl.get('procedures')
    .then(response=>{
      setData(response.data.data)
      setLoading(false)
    })
    .catch(error =>{
    setError(error)
    setLoading(false)
    })
  },[])

  if (loading) return <p>Loading...</p>
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
    <div className='offset-1 col-10 row g-2 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100'>
    {data.map((item) => <>
    <div key={item.id} className="col-lg-4 col-sm-6">
        <div className='name cursor-pointer overflow-hidden position-relative'>
          <div className="layer position-absolute top-0 bottom-0 start-0 end-0 z-1"></div>
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
    </div>
  </div>
  </div>
    </>
}
