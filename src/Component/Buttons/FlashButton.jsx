import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import './FlashButton.scss';

export default function FlashButton() {
    const { language } = useContext(LanguageContext);
    return (
        <div className="container1">
            <h1 className="sparkle u-hover--sparkle" lang={language}>
                {language === 'ar' ? ' اشترك الآن ' : ' Subscrabe Now'}
            </h1>
        </div>
    );
}
