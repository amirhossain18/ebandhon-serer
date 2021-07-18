import React from 'react';
import './HomePageBody.css'
import HPBottomSection from './HPBottomSection/HPBottomSection';
import HPTopSection from './HPTopSection/HPTopSection';

const HomePageBody = () => {
    return (
        <div className="container">
            <HPTopSection></HPTopSection>
            <HPBottomSection></HPBottomSection>
        </div>
    );
};

export default HomePageBody;