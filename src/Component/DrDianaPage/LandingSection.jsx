import React from 'react';
import './LandingSection.scss';

const LandingSection = () => {
    return (
        <div id="row_col_wrap_12">
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
            >
                <div id="vc_column_inner_2">
                    <div id="wpb_wrapper_2">
                        <div id="divider_wrap_1" data-alignment="default">
                            <div id="divider_1"></div>
                        </div>

                        <div id="wpb_text_column_1">
                            <div id="wpb_wrapper_3">
                                <h2 className='H2Title'>Dr. Dina Khairy</h2>
                                <p><span className='spanAbout'>Board Certified Plastic Surgeon</span></p>
                            </div>
                        </div>

                        <div id="divider_wrap_2" data-alignment="default">
                            <div id="divider_2"></div>
                        </div>

                        <div id="wpb_text_column_2">
                            <div id="wpb_wrapper_4">
                                <h4 className='H4BOLD'>“I am thankful and sincerely grateful for the many happy faces that have trusted me and given me the opportunity to be their surgeon. I am truly touched by the love and through all of these happy faces you can see mine is happy too. Thank you.”</h4>
                            </div>
                        </div>

                        <div id="divider_wrap_3" data-alignment="default">
                            <div id="divider_3"></div>
                        </div>

                        <div id="wpb_text_column_3">
                            <div id="wpb_wrapper_5">
                                <p>Being a plastic surgeon has afforded the first seven years to become a general surgeon, and the last three years specializing in plastic surgery at Duke University. After this decade of learning to be a surgeon I was anxious to practice and treat my own patients. I spent the early part of my career performing both reconstructive and cosmetic surgery. I performed a lot of reconstructive surgery as I treated all types of patients; some had lost their breasts to breast cancer, others suffered horrible injuries from car accidents, dog attacks, and assaults or had been ravaged by the effects of cancer. When you begin as a plastic surgeon you practice based on the way you were taught, but as time passes and you gain more experience you begin to find your own style and your own focus. My ten years of training and vast reconstructive experience in my early years have led me to where I am today. I now only specialize in cosmetic surgery of the breast and body. Not only has this made me a better cosmetic surgeon, but it has given me the opportunity to share this....</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingSection;
