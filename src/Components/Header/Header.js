import React, { useContext, useState } from 'react';
import './Header.css';
import { Cart, Person } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faAngleRight, faTimes, faCaretRight, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import useLocalStorage from '../LocalStorage/LocalStorage'
import { CartProducts, UserData } from '../../App';

const Header = () => {
    const [cartInfo, setCartInfo] = useContext(CartProducts)
    const [signedInUser, setSignedInUser] = useContext(UserData)
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const [openHiddenCategory, setOpenHiddenCategory] = useState('')
    let [categoryOpen, setCategoryOpen] = useState(false)

    const categoryToggler = () => {
        setCategoryOpen(false)
    }
    return (
        <div className="header">
            <div className={`category_left_hidden ${categoryOpen && 'category_open_active'}`}>
                <div style={{position: 'relative'}}>
                    <FontAwesomeIcon onClick={() => setCategoryOpen(false)} className="cross_icon" icon={faTimes} />
                    <h1 className="category_left_h1">CATEGORIES</h1>
                    <div className="category_left_hidden_in">
                        <Link onClick={categoryToggler} to="/category/Animal Food" className="categories_single_name_hidden">
                            <a href="#">Animal Food</a>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                        <div onClick={() => {
                            if (openHiddenCategory === 'driving') {
                                setOpenHiddenCategory('')
                            }
                            else{
                                setOpenHiddenCategory('driving')
                            }
                        }} className={`categories_single_name_hidden ${openHiddenCategory === 'driving' && 'categories_single_name_hovered'}`}>
                            <a href="#">Motor Bike/Car</a>
                            <FontAwesomeIcon className={`${openHiddenCategory === 'driving' && 'active_sub_category_arrow'}`} icon={faCaretRight} />
                        </div>
                        <div className={`hidden_sub_categories ${openHiddenCategory === "driving" && 'active_sub_category'}`}>
                            <Link onClick={categoryToggler} to="/category/Motor Bike" className="hidden_sub_category">
                                <a href="#">Motor Bike</a>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                            <Link onClick={categoryToggler} to="/category/Car" className="hidden_sub_category">
                                <a href="#">Car</a>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                        <div onClick={() => {
                            if (openHiddenCategory === 'electronics') {
                                setOpenHiddenCategory('')
                            }
                            else{
                                setOpenHiddenCategory('electronics')
                            }
                        }} className={`categories_single_name_hidden ${openHiddenCategory === 'electronics' && 'categories_single_name_hovered'}`}>
                            <a href="#">Electronics</a>
                            <FontAwesomeIcon className={`${openHiddenCategory === 'electronics' && 'active_sub_category_arrow'}`} icon={faCaretRight} />
                        </div>
                        <div className={`hidden_sub_categories ${openHiddenCategory === "electronics" && 'active_sub_category'}`}>
                            <Link onClick={categoryToggler} to="/category/Refrigerator" className="hidden_sub_category">
                                <a href="#">Refrigerator</a>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                            <Link onClick={categoryToggler} to="/category/Air-Conditioner" className="hidden_sub_category">
                                <a href="#">Air-Conditioner</a>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                        <Link onClick={categoryToggler} to="/category/Smart & Android TV" className="categories_single_name_hidden">
                            <a href="#">Smart & Android TV</a>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                        <div onClick={() => {
                            if (openHiddenCategory === 'computer') {
                                setOpenHiddenCategory('')
                            }
                            else{
                                setOpenHiddenCategory('computer')
                            }
                        }} className={`categories_single_name_hidden ${openHiddenCategory === 'computer' && 'categories_single_name_hovered'}`}>
                            <a href="#">Laptop/Desktop</a>
                            <FontAwesomeIcon className={`${openHiddenCategory === 'computer' && 'active_sub_category_arrow'}`} icon={faCaretRight} />
                        </div>
                        <div className={`hidden_sub_categories ${openHiddenCategory === "computer" && 'active_sub_category'}`}>
                            <Link onClick={categoryToggler} to="/category/Laptop" className="hidden_sub_category">
                                <a href="#">Laptop</a>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                            <Link onClick={categoryToggler} to="/category/Desktop" className="hidden_sub_category">
                                <a href="#">Desktop</a>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                        <Link onClick={categoryToggler} to="/category/Grocery" className="categories_single_name_hidden">
                            <a href="#">Grocery</a>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                        <Link onClick={categoryToggler} to="/category/Smart Phone" className="categories_single_name_hidden">
                            <a href="#">Smart Phone</a>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                        <div onClick={() => {
                            if (openHiddenCategory === 'fashion') {
                                setOpenHiddenCategory('')
                            }
                            else{
                                setOpenHiddenCategory('fashion')
                            }
                        }} className={`categories_single_name_hidden ${openHiddenCategory === 'fashion' && 'categories_single_name_hovered'}`}>
                            <a href="#">Fashion</a>
                            <FontAwesomeIcon className={`${openHiddenCategory === 'fashion' && 'active_sub_category_arrow'}`} icon={faCaretRight} />
                        </div>
                        <div className={`hidden_sub_categories ${openHiddenCategory === "fashion" && 'active_sub_category'}`}>
                            <Link onClick={categoryToggler} to="/category/Man" className="hidden_sub_category">
                                <a href="#">Man</a>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                            <Link onClick={categoryToggler} to="/category/Woman" className="hidden_sub_category">
                                <a href="#">Woman</a>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Link>
                        </div>
                        <Link onClick={categoryToggler} to="/category/Tours & Travel" className="categories_single_name_hidden">
                            <a href="#">Tours & Travel</a>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                        <Link onClick={categoryToggler} to="/category/Bandhon Food" className="categories_single_name_hidden">
                            <a href="#">Bandhon Food</a>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                        <Link onClick={categoryToggler} to="/category/Beauty & Body Care" className="categories_single_name_hidden">
                            <a href="#">Beauty & Body Care</a>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                        <Link onClick={categoryToggler} to="/category/Home Appliance" className="categories_single_name_hidden">
                            <a href="#">Home Appliance</a>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="header_first">
                <div className="container">
                    <div className="header_top_dev_details">
                        <div className="contact_details">
                            <a href="tel:01709038101"><FontAwesomeIcon className="header_contact_icon" icon={faPhoneAlt}/>01709-038101</a>
                            <a className="email_ebandhon" href = "mailto:ebandhon@gmail.com"><FontAwesomeIcon className="header_contact_icon" icon={faEnvelope}/>ebandhon@gmail.com</a>
                        </div>
                        <div className="header_login_btn">
                            {
                                signedInUser.isSignedIn === true ? <span>{signedInUser.name}<img className="header_image" src={signedInUser.image} alt=""/></span> : loginData.isSignedIn ? <span>{loginData.name}<img className="header_image" src={loginData.image} alt=""/></span> : <Link to="/SignIn"><span>Login</span></Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="header_second container">
                <div className="header_second_left">
                    <Link to="/"><img src={logo} alt="LOGO" className="logo" /></Link>
                    {/* <h1 className="logo_text">bandhon</h1> */}
                </div>
                <div className="header_second_right">
                    <div className="header_search_box">
                        <input id="search" type="text" placeholder="Search any brands or products..." name="search" />
                        <label htmlFor="search"><FontAwesomeIcon icon={faSearch} /></label>
                    </div>
                    <Link className="header_cart_icon header_right_svg" to="/page/cart"><Cart /><span className="cart_item_count_show">{cartInfo?.cartProducts ? `${cartInfo?.cartProducts.length}` : '0' }</span></Link>
                    <Person className="header_profile_icon" />
                </div>
            </div>
            <div className="header_third">
                <div className="container">
                    <div onClick={() => setCategoryOpen(!categoryOpen)}className="categories">
                        <FontAwesomeIcon icon={faBars} />
                        <h1>CATEGORIES</h1>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                    <div className="extra_nav">
                        <a href="#">Hot Deal</a>
                        <a href="#">Gift Cart</a>
                        <a href="#">Whole Sale</a>
                        <a href="#">Announcement</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;