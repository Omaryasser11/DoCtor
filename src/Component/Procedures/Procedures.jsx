import React from 'react'
import './Procedures.scss'
import girl from '../../assets/images/girl.jpg'

export default function Procedures() {
  return <>
<div className="row text-white montserrat gx-0 mb-5 col-12">
<div className="col-12 row gx-0 blueC mb-2" style={{ height: '318px' }}>
    <div className='offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100'>
        <div className='mt-3 d-flex flex-column justify-content-end' style={{ height: '200px' }}>
            <h4 className='fs-2 fw-semibold'>Cosmetic Procedures</h4>
            <p className='fs-4 fw-light mb-0'>Real Patients. Real Results.</p>
        </div>
    </div>
  </div>
<div className="col-12 row">
    <div className='offset-1 col-10 row g-2 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100'>
    <div className="col-lg-4 col-sm-6">
      <div className='name cursor-pointer overflow-hidden position-relative'>
        <div className="layer position-absolute top-0 bottom-0 start-0 end-0 z-1"></div>
          <div>
            <img src={girl} className='imgBig' alt="girl" />
          </div>
          <div className='position-absolute w-75 bottom-0 mb-3 ms-4 z-3'>
            <h5 className='text-white textShadow fw-medium fs-4'>Breast Reduction</h5>
          </div>
          <div>
            <hr className="horizontal-line position-absolute linePosition z-2 " />
            <i className="fa-solid fa-angle-right position-absolute anglePosition z-2 text-white"></i>
          </div>
      </div>
    </div>
    </div>
  </div>
  </div>
    </>
}
