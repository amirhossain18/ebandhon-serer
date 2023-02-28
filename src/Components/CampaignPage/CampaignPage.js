import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './CampaignPage.css'
import CampaignProduct from './CampaignProduct/CampaignProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import dataLoading from '../../images/Pulse-1s-200px.gif'
import maldive from './images/Maldive-Tour.jpg'
import bike from './images/Bike.jpg'
import laptop from './images/Laptop.jpg'
import phone from './images/Phone-Vibo.jpg'
import maldive2 from './images/maldives.jpg'
import bike2 from './images/bike (1).jpg'
import laptop2 from './images/laptop (1).jpg'
import phone2 from './images/phone.jpg'

const CampaignPage = () => {
    useEffect(() => {
        document.title = "Campaign | E-Bandhon"
      }, [])

    const [campaignData, setCampaignData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/get-campaign-data')
        .then(response => response.json())
        .then(data => setCampaignData(data))
    }, [])
    // window.onscroll = function() {scrollFunction()};

    // function scrollFunction() {
    //     if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 200) {
    //         document.getElementById('campaign_top').style.display = "block";
    //     } else {
    //         document.getElementById('campaign_top').style.display = "none";
    //     }
    // }
    return (
        <>
            <Header/>
            <div className="animate__animated animate__bounce campaign_page container">
                <a href="#"><FontAwesomeIcon id="campaign_top" className="campaign_go_top" icon={faArrowAltCircleUp}/></a>
                <div className="CP_header">
                    <a href="#tour">
                        <img src={maldive} alt=""/>
                    </a>
                    <a href="#bike">
                        <img src={bike} alt=""/>
                    </a>
                    <a href="#laptop">
                        <img src={laptop} alt=""/>
                    </a>
                    <a href="#phone">
                        <img src={phone} alt=""/>
                    </a>
                </div>
                <div className="CP_details">
                    <div id="tour" className="CP_detail">
                        <div className="CP_detail_head">
                            <img src={maldive2} alt="" />
                            <div className="CP_detail_head_details">
                                <h4>Terms & Conditions</h4>
                                <div className="CP_detail_head_detail">
                                    <span>“Real campaign Offer”এর মাধ্যমে নিচের দেওয়া ৩৯০ টাকার সমমূল্যের নির্দিষ্ট এক বা একাধিক পণ্য অর্ডার করে একজন পেতে পারেন ৩ রাত ২ দিনের মালদ্বীপ টুর সিংগেল টিকেট ।</span>
                                    <span>অর্ডারকৃত পণ্য ১০ কর্ম দিবসের মধ্যে ডেলিভারি পর্যায়ে দেওয়া হবে।</span>
                                    <span>অর্ডারকৃত পণ্য পেমেন্ট করে ডেলিভারি নিতে পারবেন।</span>
                                    <span>অক্টোবর ২০২১ এর তৃতীয়  শুক্রবার ফেইসবুক লাইভে অর্ডারকৃতদের হতে ০১ (এক) জনকে পুরস্কৃত করা হবে অর্থাৎ একজন পাবেন ৩ রাত ২ দিনের মালদ্বীপ টুর টিকেট।</span>
                                    <span>একজন কাস্টমার একাধিকবার "Real Campaign Offer" এ পণ্য  অর্ডার করতে পারবেন। যতো বেশি অর্ডার ততো বেশি সম্ভাবনা পুরস্কৃত হবার।</span>
                                </div>
                            </div>
                        </div>
                        <div className="CP_detail_products">
                            {
                                campaignData[0] ? (campaignData[0].products && campaignData[0].products.map((data, index) => <CampaignProduct CPrice="390" data={data} key={index}></CampaignProduct>)) : <img className="d-block text-center m-auto" src={dataLoading} alt="" />
                            }
                        </div>
                    </div>
                    <div id="bike" className="CP_detail">
                        <div className="CP_detail_head">
                            <img src={bike2} alt="" />
                            <div className="CP_detail_head_details">
                                <h4>Terms & Conditions</h4>
                                <div className="CP_detail_head_detail">
                                    <span>“Real campaign Offer”এর মাধ্যমে নিচের দেওয়া ৩৪৯ টাকার সমমূল্যের নির্দিষ্ট এক বা একাধিক পণ্য অর্ডার করে পেতে পারেন একটি ব্র্যান্ড নিউ বাইক।</span>
                                    <span>অর্ডারকৃত পণ্য ১০ কর্ম দিবসের মধ্যে ডেলিভারি পর্যায়ে দেওয়া হবে।</span>
                                    <span>অর্ডারকৃত পণ্য পেমেন্ট করে ডেলিভারি নিতে পারবেন।</span>
                                    <span>অক্টোবর ২০২১ এর তৃতীয় শুক্রবার ফেইসবুক লাইভে অর্ডারকৃতদের হতে ০১ (এক) জনকে পুরস্কৃত করা হবে অর্থাৎ একজন পাবে একটি ব্র্যান্ড নিউ বাইক।</span>
                                    <span>একজন কাস্টমার একাধিকবার "Real Campaign Offer" এ পণ্য অর্ডার করতে পারবেন। যতো বেশি অর্ডার ততো বেশি সম্ভাবনা পুরস্কৃত হবার।</span>
                                </div>
                            </div>
                        </div>
                        <div className="CP_detail_products">
                            {
                                campaignData[1] ? (campaignData[1].products && campaignData[1].products.map((data, index) => <CampaignProduct CPrice="349" data={data} key={index}></CampaignProduct>)) : <img className="d-block text-center m-auto" src={dataLoading} alt="" />
                            }
                        </div>
                    </div>
                    <div id="laptop" className="CP_detail">
                        <div className="CP_detail_head">
                            <img src={laptop2} alt="" />
                            <div className="CP_detail_head_details">
                                <h4>Terms & Conditions</h4>
                                <div className="CP_detail_head_detail">
                                    <span>“Real campaign Offer”এর মাধ্যমে নিচের দেওয়া ২৯৯ টাকার সমমূল্যের নির্দিষ্ট এক বা একাধিক পণ্য অর্ডার করে পেতে পারেন একটি ব্র্যান্ড নিউ ল্যাপটপ।</span>
                                    <span>অর্ডারকৃত পণ্য ১০ কর্ম দিবসের মধ্যে ডেলিভারি পর্যায়ে দেওয়া হবে।</span>
                                    <span>অর্ডারকৃত পণ্য পেমেন্ট করে  ডেলিভারি নিতে পারবেন।</span>
                                    <span>অক্টোবর ২০২১ এর তৃতীয় শুক্রবার ফেইসবুক লাইভে অর্ডারকৃতদের হতে ০১ (এক) জনকে পুরস্কৃত করা হবে অর্থাৎ একজন পাবে একটি ব্র্যান্ড নিউ ল্যাপটপ।
                                    </span>
                                    <span>একজন কাস্টমার একাধিকবার "Real Campaign Offer" এ পণ্য  অর্ডার করতে পারবেন। যতো বেশি অর্ডার ততো বেশি সম্ভাবনা পুরস্কৃত হবার।</span>
                                </div>
                            </div>
                        </div>
                        <div className="CP_detail_products">
                            {
                                campaignData[2] ? (campaignData[2].products && campaignData[2].products.map((data, index) => <CampaignProduct CPrice="299" data={data} key={index}></CampaignProduct>)) : <img className="d-block text-center m-auto" src={dataLoading} alt="" />
                            }
                        </div>
                    </div>
                    <div id="phone" className="CP_detail">
                        <div className="CP_detail_head">
                            <img src={phone2} alt="" />
                            <div className="CP_detail_head_details">
                                <h4>Terms & Conditions</h4>
                                <div className="CP_detail_head_detail">
                                    <span>“Real campaign Offer”এর মাধ্যমে নিচের দেওয়া ২৪৯ টাকার সমমূল্যের নির্দিষ্ট এক বা একাধিক পণ্য অর্ডার করে পেতে পারেন একটি ব্র্যান্ড নিউ Smart phone ।</span>
                                    <span>অর্ডারকৃত পণ্য ১০ কর্ম  দিবসের মধ্যে ডেলিভারি পর্যায়ে দেওয়া হবে।
                                    </span>
                                    <span>অর্ডারকৃত পণ্য পেমেন্ট করে ডেলিভারি নিতে পারবেন।
                                    </span>
                                    <span>অক্টোবর  ২০২১ এর তৃতীয়  শুক্রবার ফেইসবুক লাইভে অর্ডারকৃতদের হতে ০১ (এক) জনকে পুরস্কৃত করা হবে অর্থাৎ একজন পাবে একটি ব্র্যান্ড নিউ Smart phone ।</span>
                                    <span>একজন কাস্টমার একাধিকবার  "Real Campaign Offer" এ পণ্য  অর্ডার করতে পারবেন। যতো বেশি অর্ডার ততো বেশি সম্ভাবনা পুরস্কৃত হবার।</span>
                                </div>
                            </div>
                        </div>
                        <div className="CP_detail_products">
                            {
                                campaignData[3] ? (campaignData[3].products && campaignData[3].products.map((data, index) => <CampaignProduct CPrice="249" data={data} key={index}></CampaignProduct>)) : <img className="d-block text-center m-auto" src={dataLoading} alt="" />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default CampaignPage;