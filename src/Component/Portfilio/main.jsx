import React from 'react';
import Portfolio from './Portfolio';
import './Main.scss';
const Main = () => {
  return (
    <div id="fws_66aaf48d63739" className="wpb_row vc_row-fluid vc_row full-width-section" style={{ paddingTop: '0px', paddingBottom: '0px', zIndex: '100' }}>
      <div className="row-bg-wrap">
        <div className="inner-wrap row-bg-layer">
          <div className="row-bg viewport-desktop"></div>
        </div>
      </div>
      <div className="row_col_wrap_12 col span_12 light left" style={{ opacity: '1' }}>
        <div className="vc_col-sm-12 wpb_column column_container vc_column_container col has-animation no-extra-padding inherit_tablet inherit_phone triggered-animation animated-in" data-padding-pos="all" data-animation="fade-in" style={{ opacity: '1', transform: 'none' }}>
          <div className="vc_column-inner">
            <div className="wpb_wrapper">
              <Portfolio />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
