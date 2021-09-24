import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartProducts, CategoryOpen, UserData } from '../../App';
import './MNav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSnapchatSquare, faTwitter, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Ripples from 'react-ripples'
import OutsideClickHandler from 'react-outside-click-handler';
import { Cart, Person, Sliders, Facebook } from 'react-bootstrap-icons';
import e_logo from '../../images/e_logo.png'
import useLocalStorage from '../LocalStorage/LocalStorage';

const MNav = () => {
  const [categoryOpen, setCategoryOpen] = useContext(CategoryOpen)
  const [cartInfo, setCartInfo] = useContext(CartProducts)
  const [profileClick, setProfileClick] = useState(false)
  const [loginData, setLoginData] = useLocalStorage('user_data', {})
  const [paymentData, setPaymentData] = useLocalStorage('payment_data', {})
  const [campaignPaymentData, setCampaignPaymentData] = useLocalStorage('campaign_payment_data', {})
  const [adminSecret, setAdminSecret] = useLocalStorage('admin_secret', {})
  const [signedInUser, setSignedInUser] = useContext(UserData)

  const logOutBtn = (e) => {
    e.preventDefault()
    setAdminSecret({status: false})
    setLoginData({isSignedIn: false})
    setPaymentData([])
    setCampaignPaymentData([])
    setProfileClick(!profileClick)
    window.location.reload()
}
  return (
    <div className="footer_navbar">
      <div className="footer_nav_icon" onClick={() => setCategoryOpen(true)}>        
          <Sliders className="footer_nav_icon_svg"/>        
      </div>
      <a target="_blank" href="https://www.facebook.com/groups/1948850748611012/?ref=share" className="footer_nav_icon footer_fb_icon_div">        
          <Facebook className="footer_nav_icon_svg footer_fb_icon" />        
      </a>
      <Link to="/" className="footer_nav_icon e_logo_footer_div">        
          <img className="e_logo_footer" src={e_logo} alt="" />      
      </Link>
      <Link to="/page/cart" className="footer_nav_icon">
        <Link to="/page/cart" className="header_cart_icon"><Cart className="footer_nav_icon_svg" /><span className="cart_item_count_show">{cartInfo?.cartProducts ? `${cartInfo?.cartProducts.length}` : '0' }</span></Link>
      </Link>
      
      <OutsideClickHandler className="footer_nav_icon_svg" onOutsideClick={() => {
            setProfileClick(false)
        }}>
        <div onClick={() => setProfileClick(!profileClick)} className="footer_nav_icon">
              <Person className="footer_nav_icon_svg" />
              <div className={`footer_profile_hidden ${profileClick === true && 'footer_profile_active'}`}>
                <Link to="/profile" className="footer_hidden_link">Profile</Link>
                <span className="only_border"></span>
                {
                  loginData?.isSignedIn || signedInUser?.isSignedIn ? <span onClick={(e) => logOutBtn(e)} className="footer_hidden_link">Log Out</span> : <Link to="/signIn" className="footer_hidden_link">Login</Link>
                }
              </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default MNav;