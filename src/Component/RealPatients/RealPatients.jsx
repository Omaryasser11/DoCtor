import React from 'react';
import './RealPatients.scss';

const RealPatientsResults = ({ headline }) => {
  return (
    <div id="fws_66aaf48d63491" className="wpb_row vc_row-fluid vc_row full-width-section top_margin_50px bottom_margin_10px col-12">
      <div className="row-bg-wrap">
        <div className="inner-wrap row-bg-layer ">
          <div className="row-bg viewport-desktop using-bg-color"></div>
        </div>
        <div className="row-bg-overlay row-bg-layer"></div>
      </div>
      <div className="row_col_wrap_12 col span_12 dark center">
        <div className="ttt vc_col-sm-12 wpb_column column_container vc_column_container col has-animation no-extra-padding inherit_tablet inherit_phone animated-in">
          <div className="vc_column-inner">
            <div className="wpb_wrapper">
              <div className="wpb_text_column wpb_content_element">
                <div className="wpb_wrapper">
                  <h1 className="text-center">
                    <span className="headline">{headline}</span>
                  </h1>
                </div>
              </div>
            </div> 
          </div>
        </div> 
      </div>
    </div>
  );
};

export default RealPatientsResults;
