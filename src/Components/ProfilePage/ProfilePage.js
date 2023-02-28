import React, { useContext, useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './ProfilePage.css'
import useLocalStorage from '../LocalStorage/LocalStorage';
import default_photo from './default_user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CartProducts, UserData } from '../../App';
import ProfileCampaignProduct from './ProfileCampaignProduct/ProfileCampaignProduct';
import ProfileHotDealProduct from './ProfileHotDealProduct/ProfileHotDealProduct';
import UploadProfileImage from './UploadProfileImage/UploadProfileImage';
import PurchasedProducts from './PurchasedProducts/PurchasedProducts';

const ProfilePage = () => {
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const [purchasedData, setPurchasedData] = useState({})
    const [signedInUser, setSignedInUser] = useContext(UserData)
    const [cartInfo, setCartInfo] = useContext(CartProducts)
    const [profileImage, setProfileImage] = useState(false)
    // getting cart info
    useEffect(() => {
        if(loginData.isSignedIn) {
            fetch(`http://localhost:5000/get-user-data/id?id=${loginData.uid}`)
            .then(response => response.json())
            .then(data => {
              if(loginData.isSignedIn) {
                setCartInfo(data)
              }
            })
          }
          if(signedInUser.isSignedIn) {
            fetch(`http://localhost:5000/get-user-data/id?id=${loginData.uid}`)
            .then(response => response.json())
            .then(data => {
              if(loginData.isSignedIn) {
                setCartInfo(data)
              }
            })
          }
    }, [])

    useEffect(() => {
        if(loginData.boughtProducts) {
            setPurchasedData(loginData.boughtProducts.reverse())
        }
    }, [loginData])


    // getting profile data
    useEffect(() => {
        if(loginData.isSignedIn) {
            fetch(`http://localhost:5000/get-profile-data/id?id=${loginData.uid}`)
            .then(res => res.json())
            .then(data => {
                setLoginData(data)
            })
        }
        
    }, [])

    const [showUID, setShowUID] = useState(false)
    const clickEye = () => {
        setShowUID(!showUID)
    }
    // console.log(cartInfo)

    // useEffect(() => {
    //      fetch('http://localhost:7000/call-payment-details')
    //      .then(res => res.json())
    //      .then(data => console.log(data))
    // }, [])

    return (
        <>
            <Header/>
            <div className="profile_page">
                <div className="main_profile container">
                    <div className="profile_left">
                        <div className="profile_page_image">
                            {
                                loginData.image ? <img className="profile_page_profile_photo" src={loginData.image} alt="" /> : <img className="profile_page_profile_photo" src={default_photo} alt="" />
                            }
                            {/* <img className="profile_page_profile_photo" src={default_photo} alt="" /> */}
                            <label onClick={e => setProfileImage(true)} className="upload_profile_image">
                                <span>Upload Profile Picture</span>
                            </label>
                            {
                                profileImage === true && <UploadProfileImage setProfileImage={setProfileImage} profileImage={profileImage} />
                            }
                        </div>
                        <h4 className="profile_page_my_profile">My Profile</h4>
                        <div className="profile_page_input_div">
                            <input defaultValue={loginData.name} readOnly className="profile_page_input" type="text" placeholder="Write you name*"/>
                        </div>
                        <div className="profile_page_input_div">
                            <input defaultValue={loginData.email} readOnly className="profile_page_input" type="text" disabled />
                        </div>
                        <div className="profile_page_input_div">
                            {
                                showUID === false ? <input id="profile_page_uid_input" defaultValue={loginData.uid} readOnly className="profile_page_input PP_UID_hidden" type="password" disabled /> : <input id="profile_page_uid_input" defaultValue={loginData.uid} readOnly className="profile_page_input" type="text" disabled />
                            }
                            {
                                showUID === false ? <FontAwesomeIcon onClick={clickEye} id="profile_page_uid" icon={faEye}/> : <FontAwesomeIcon onClick={clickEye} id="profile_page_uid" icon={faEyeSlash}/>
                            }
                        </div>
                    </div>
                    <div className="profile_right">
                        <div className="profile_right_cart_section profile_right_single_section">
                            <div className="PPR_header">
                                <h1>Purchased Items</h1>
                                <div className='purchased_items'>
                                    {
                                        loginData.boughtProducts ? 
                                            loginData.boughtProducts.map(product => <PurchasedProducts products={product} />)
                                        : 
                                        <h5 className="d-flex justify-content-center mt-4 text-center">You did not purchased any items!</h5>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <div className="profile_right_campaign_section profile_right_single_section">
                            <div className="PPR_header">
                                <h1>Campaign bought Products</h1>
                                <div className="PPR_campaign_data">
                                    {
                                        cartInfo?.campaignProducts ? cartInfo.campaignProducts.map(data => <ProfileCampaignProduct data={data.productDetails} key={data.transactionId}/>) : <h5 className="d-flex justify-content-center mt-4 text-center">You did not bought any campaign products!</h5>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            cartInfo?.hotDealData && <div className="profile_right_cart_section profile_right_single_section">
                                <div className="PPR_header">
                                    <h1>Hot-Deal bought Products</h1>
                                    <div className="PPR_campaign_data">
                                    {
                                        cartInfo?.hotDealData && cartInfo.hotDealData.map(data => <ProfileHotDealProduct status={data.productStatus} data={data.productDetails} key={data.TxID}/>)
                                    }
                                </div>
                                </div>
                            </div>
                        } */}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ProfilePage;