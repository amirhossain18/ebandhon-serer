import React, { useEffect } from 'react';
import Header from '../Header/Header';
import './HomePage.css';
import HomePageBody from './HomePageBody/HomePageBody';
import Footer from '../Footer/Footer';

const HomePage = () => {
    useEffect(() => {
        document.title = "Home | E-Bandhon"
      }, [])
    return (
        <>
            <Header></Header>
            <HomePageBody></HomePageBody>
            <Footer></Footer>
        </>
    );
};

export default HomePage;