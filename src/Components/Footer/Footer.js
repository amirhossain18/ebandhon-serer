import React from 'react';
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnapchatSquare, faTwitter, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer_details">
                    <div className="footer_menu footer_options">
                        <h1>MENU</h1>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/cookie-policy">Cookie Policy</Link>
                        <Link to="/terms-conditions">Terms & Conditions</Link>
                        <Link to="/career">Career</Link>
                    </div>
                    <div className="footer_contact footer_options">
                        <h1>CONTACT US</h1>
                        <p>23/3 NABAB KATARA</p>
                        <p>BANGSHAL</p>
                        <p>1000 DHAKA,</p>
                        <a href="tel:01709038101"><FontAwesomeIcon className="footer_contact_icon" icon={faPhoneAlt}/>01709-038101</a>
                        <a href="mailto:ebandhon@gmail.com"><FontAwesomeIcon className="footer_contact_icon" icon={faEnvelope}/>ebandhon@gmail.com</a>
                    </div>
                    <div className="footer_get_in_touch footer_options">
                        <h1>GET IN TOUCH</h1>
                        <div className="footer_social_icons">
                            <a id="footer_icon" href=""><FontAwesomeIcon icon={faSnapchatSquare} /></a>
                            <a id="footer_icon" href=""><FontAwesomeIcon icon={faTwitter} /></a>
                            <a target="_blank" id="footer_icon" href="https://www.facebook.com/ebandhon"><FontAwesomeIcon icon={faFacebookSquare} /></a>
                            <a target="_blank" id="footer_icon" href="https://www.instagram.com/ebandhon.com7/"><FontAwesomeIcon icon={faInstagram} /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_copyright">
                <p>Copyright @ Ebandhon.com | Proudly Powered by: <span>Super Bond Tech 2021</span></p>
            </div>
        </div>
    );
};

export default Footer;