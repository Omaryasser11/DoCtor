import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import axios from 'axios';
import './LandingSection.scss';
import baseUrl from '../../BaseUrl';
import Spinner from '../Spinner/Spinner';
const LandingSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    baseUrl.get('/about', {
      headers: { 'Accept-Language': language },
    })
      .then(response => {
        setData(response.data.firstSection);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-light d-flex align-items-center justify-content-center high-index">
    <Spinner />
  </div>
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="row_col_wrap_12" className='flexA col-12'>
      <div
        id="column_container_1"
        data-using-bg="true"
        data-bg-cover="true"
        data-padding-pos="all"
        data-has-bg-color="true"
        data-bg-color="#262626"
        data-bg-opacity="0.3"
        data-animation=""
        data-delay="0"
        className='col-lg-6 col-md-12'
      >
        <div id="vc_column_inner_1">
          <div
            id="column_image_bg_wrap"
            data-bg-pos="center center"
            data-bg-animation="none"
            data-bg-overlay="false"

          >
            <div id="inner_wrap">
              <div id="Background"></div>
            </div>
          </div>
          <div
            id="column_bg_overlay_wrap"
            data-bg-animation="none"
          >
            <div id="column_bg_overlay"></div>
          </div>
          <div id="wpb_wrapper_1"></div>
        </div>
      </div>

      <div
        id="column_container_2"
        data-padding-pos="all"
        data-has-bg-color="false"
        data-bg-color=""
        data-bg-opacity="1"
        data-animation=""
        data-delay="0"
        className='col-lg-6 col-md-12'
      >
        <div id="vc_column_inner_2">
          <div id="wpb_wrapper_2">
            <div id="divider_wrap_1" data-alignment="default">
              <div id="divider_1"></div>
            </div>

            <div id="wpb_text_column_1">
              <div id="wpb_wrapper_3">
                <h2 className='white-pink-text'>{data.name}</h2>
                <p><span className='spanAbout' lang={language}>{data.title}</span></p>
              </div>
            </div>

            <div id="divider_wrap_2" data-alignment="default">
              <div id="divider_2"></div>
            </div>

            <div id="wpb_text_column_2">
              <div id="wpb_wrapper_4">
                <h4 className='H4BOLD' lang={language}>
                  “{data.quote || 'Loading quote...'}”
                </h4>
              </div>
            </div>

            <div id="divider_wrap_3" data-alignment="default">
              <div id="divider_3"></div>
            </div>

            <div id="wpb_text_column_3">
              <div id="wpb_wrapper_5 ">
                <p className='tttt' lang={language}>{data.bio || 'Loading bio...'}</p>
              </div>
            </div>

          </div>
        </div>
      </div >
    </div>
  );
}

export default LandingSection;
