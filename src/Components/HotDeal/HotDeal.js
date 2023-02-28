import React, { useContext, useEffect, useState } from 'react';
import { CategoryData } from '../../App';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './HotDeal.css'
import defaultImage from '../../images/Spin-1.6s-200px.gif'
import defaultLoader from '../../images/Pulse-1s-200px.gif'
import { Link } from 'react-router-dom';
import Ripples from 'react-ripples'
import Modal from 'react-modal';
import HotDealPaymentModal from './HotDealPaymentModal/HotDealPaymentModal';
import hot_deal from '../../images/Boost_1.jpg'
import useLocalStorage from '../LocalStorage/LocalStorage';
import tutorialHotDeal from '../../videos/tutorial_hot_deal.mp4'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '450px',
      width: '90%',
      borderRadius: '15px',
      padding: '0',
      height: 'auto',
      maxHeight: '95vh',
      position: 'relative'
    },
  };

const HotDeal = () => {
    const [categories, setCategories] = useContext(CategoryData)
    const [hotDealData, setHotDealData] = useState([])
    const [dataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:5000/get-all-hot-deal-data')
        .then(res => res.json())
        .then(result => {
            setHotDealData(result)
            setDataLoading(false)
        })
    }, [])
    return (
        <>
            <Header/>
            <div className="hot_deal_header">
                <div className="CP_detail_head container">
                    {/* <img src={hot_deal} alt="" /> */}
                    <video className="CP_head_tutorial" src={tutorialHotDeal} controls>
                        {/* <source src="movie.mp4" type="video/mp4">
                        <source src="movie.ogg" type="video/ogg">
                        Your browser does not support the video tag. */}
                    </video>
                    <div className="CP_detail_head_details">
                        <h4>Terms & Conditions</h4>
                        <div className="CP_detail_head_detail">
                        <span>Ebandhon নিয়ে আসলো Hot deal (COD) উৎসব।</span>

                        <span>#ঢাকার ভিতর ৫ এবং ঢাকার বাহিরে ১০ কর্মদিবসের ভিতরে ডেলিভারি দেওয়া হবে।</span>

                        <span>#Delivery charge ঢাকার ভিতরে ১০০ এবং ঢাকার বাহিরে ১২০ টাকা।</span>

                        <span><strong>বিঃদ্রঃ শুধুমাত্র ঢাকার ভিতরে Cash on delivery করা যাবে।</strong></span>
                        <span>আর যারা Cash on delivery তে পণ্য নিতে আগ্রহী,তাদের  অগ্রিম বিকাশ মার্চেন্ট  এই 01798948988 নাম্বার এ শুধুমাত্র  Delivery Charge Payment করতে হবে এবং নির্ধারিত জায়গায় 'TRANSACTION ID' টা বসাতে হবে।</span>

                        <span>বিস্তারিত জানতে যোগাযোগ করুনঃ 01709038101</span>

                        <span>Group link: <a target="_blank" href="https://www.facebook.com/groups/1948850748611012/?ref=share">https://www.facebook.com/groups/1948850748611012/?ref=share</a></span>

                        <span>Ebandhon এর, সাথে থাকুন।</span>

                        <span>*শর্ত প্রযোজ্য</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                dataLoading === false && <div className="hot_deal">
                    <div className="container d-flex flex-wrap">
                        {
                            hotDealData?.map(data => <HotDealSingleProduct key={data._id} data={data}/>)
                        }
                    </div>
                </div>
            }
            {
                dataLoading === true && <img className="default_loader" src={defaultLoader} alt="" />
            }
            <Footer/>
        </>
    );
};

export default HotDeal;

const HotDealSingleProduct = (props) => {
    const {productName, productImage, productPrice, productDiscount, _id} = props.data
    const [imageLoad, setImageLoad] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [loginData, setLoginData] = useLocalStorage('user_data', {})

    const buyNowBtn = (e) => {
        if(loginData.uid){
            e.preventDefault()
            setModalIsOpen(true)
        }
        else{
            window.location.replace(`https://ebandhon.com/signIn`)
        }
    }
    return (
        <div className="HDSP">
            <Link to={`/hot-deal/product/${_id}`}>
                <p className="product_dis_home HDSP_dis_hidden">-{productDiscount}%</p>
                <div className="HDSP_image">
                    <img className="d-none" onLoad={() => setImageLoad(true)} src={productImage} alt="" />
                    {
                        imageLoad === false && <img src={defaultImage} alt="" />
                    }
                    {
                        imageLoad === true && <img src={productImage} alt="" />
                    }
                </div>
                <p className="HDSP_head_text">{productName}</p>
                <div className="drag_scroll_product drag_scroll_product_price">
                    <span title={productPrice}>৳ <del>{productPrice}</del></span>
                    <span>৳ {Math.round(productPrice - ((productPrice * productDiscount) / 100))}</span>
                </div>
            </Link>
            <div>
                <Ripples color="#ffffff57" during={1500} className="HDSP_buy_btn HDSP_buy_btn_ripple">
                    <button onClick={e => buyNowBtn(e)} className="HDSP_buy_btn">BUY NOW</button>
                </Ripples>
            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="onRequestClose Example"
            >
                <HotDealPaymentModal data={props.data} discountedPrice={Math.round(productPrice - ((productPrice * productDiscount) / 100))}/>
            </Modal>
        </div>
    );
};