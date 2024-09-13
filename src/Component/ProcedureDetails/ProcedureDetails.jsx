import React, { useEffect, useState } from 'react'
import './ProcedureDetails.scss'
import { useParams } from 'react-router-dom'
import baseUrl from '../../BaseUrl'
import Spinner from '../Spinner/Spinner'
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom'

export default function ProcedureDetails() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
  let {id} = useParams()
  
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

  function fetchProcedureDetails() {
    setLoading(true)
    baseUrl.get(`procedures/${id}`)
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }
  
  useEffect(() => {
    fetchProcedureDetails()
  }, [])

  if (loading) return <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-light d-flex align-items-center justify-content-center high-index">
  <Spinner />
  </div>
  if (error) return <p>Error: {error.message}</p>

  return <>
    <div className="row gx-0 position-relative blueC" style={{ height: '41vh' }}>
      <div className='container d-flex align-items-center justify-content-center h-100'>
        <div className='mt-3 d-flex align-items-end position-absolute z-3 text-center justify-content-center' style={{ height: '200px' }}>
          <h4 className='fs-1 fw-semibold text-white'>{data.name}</h4>
        </div>
      </div>
    </div>
    <div className="row">
      {data.sections.map((section,index)=><>
        <div key={section.id} className="col-12 text-center bg-danger-subtle" style={{ height: '70vh' }}>
          <div className="p-5 m-5">
            <p className='fs-4 fw-medium mb-2'>{section.header}</p>
            <p className='text-secondary'>{section.body}</p>
          </div>
        </div>
      </>)}
      {/* <div className="col-md-6"></div> */}
        <div className="col-md-6 p-0">
          <div className='position-relative'>
            <div className="bg-black opacity-25 position-absolute top-0 bottom-0 start-0 end-0 z-1"></div>
            <img src={data.imageUrl} className='w-100' alt={data.name}  style={{ height: '60vh' }}/>
          </div>
        </div>
      <div className="col-md-6 p-0 bg-pink">
      <div className="d-flex align-items-start justify-content-center flex-column px-5 py-md-1 py-5 mx-auto h-100">
          <i className="fa-solid fa-quote-right fs-1 text-white"></i>
          <p className='fs-4 text-white lh-base my-4'>“{data.review.review}”</p>
          <p className='text-white mb-0'>{data.review.reviewerName}</p>
          <p className='text-light small opacity-50'>Patient</p>
      </div>
      </div>
      
                                                            {/* End of page */}
      
        <Link to={'/testimonials'} className='position-relative col-lg-6 hoverRec bg-light d-flex justify-content-center align-items-center text-decoration-none' style={{height :'80vh'}}>
            <div className='layer position-absolute top-0 bottom-0 start-0 end-0 z-1'></div>
            <div className='borderP text-center d-flex flex-column justify-content-center align-items-center'>
                <p className='darkCyan-text fs-5 fw-bold mb-0'>Patient</p>
                <p className='darkCyan-text fs-3 fw-semibold mb-0'>Testimonials</p>
            </div>
        </Link>
        <div className='position-relative col-lg-6 hoverRec darkCyan d-flex justify-content-center align-items-center' style={{height :'80vh'}}>
            <div className='layer position-absolute top-0 bottom-0 start-0 end-0 z-1'></div>
            <div className='borderP border-white text-center d-flex flex-column justify-content-center align-items-center'>
                <p className='text-white fs-5 fw-bold mb-0'>Free Consultation</p>
                <p className='text-white fs-1 fw-semibold mb-0'>Schedule</p>
            </div>
        </div>
    </div>
  </>
}
