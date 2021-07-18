import React, { useContext, useEffect, useState } from 'react';
import './SignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { facebookSignIn, googleSignIn, initializeLoginFrameworkFirebase } from '../FirebaseManager/FirebaseManager';
import { CartProducts, UserData } from '../../App';
import useLocalStorage from '../LocalStorage/LocalStorage';
import { useHistory, useLocation, Link } from 'react-router-dom';

initializeLoginFrameworkFirebase()

const SignIn = () => {
    useEffect(() => {
        document.title = "Sign In | E-Bandhon"
      }, [])

    const [signInUp, setSignInUp] = useState('signIn')

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [signedInUser, setSignedInUser] = useContext(UserData)
    const [cartInfo, setCartInfo] = useContext(CartProducts)
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const [signIn, setSignIn] = useState(false)
    const [dbUserData, setDbUserData] = useState([])

    useEffect(() => {
        fetch('https://bandhon-ecommerce.herokuapp.com/get-user-data')
        .then(response => response.json())
        .then(data => {
            setDbUserData(data)
            if(loginData) {
                const myData = data?.find(user => user.uid === loginData.uid)
                setCartInfo(myData)
            }
        })
    }, [signedInUser, loginData])

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(gotLoginData => {
            const myData = dbUserData?.find(user => user.uid === gotLoginData.uid)
            // console.log(myData)
            if (myData) {
                setSignedInUser(gotLoginData)
                setLoginData(gotLoginData)
                setCartInfo(myData)
                history.replace(from);
            }
            else {
                const add_user_data = {name:gotLoginData.name, email:gotLoginData.email, image:gotLoginData.image, uid:gotLoginData.uid}

                fetch('https://bandhon-ecommerce.herokuapp.com/add-user-data', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(add_user_data)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedCount === 1){
                        setSignedInUser(gotLoginData)
                        setLoginData(gotLoginData)
                        setCartInfo(myData)
                        history.replace(from);
                    }
                })
            }
        })
    }
    const handleFacebookSignIn = () => {
        facebookSignIn()
        .then(gotLoginData => {
            const myData = dbUserData?.find(user => user.uid === gotLoginData.uid)
            // console.log(myData)
            if (myData) {
                setSignedInUser(gotLoginData)
                setLoginData(gotLoginData)
                setCartInfo(myData)
                history.replace(from);
            }
            else {
                const add_user_data = {name:gotLoginData.name, email:gotLoginData.email, image:gotLoginData.image, uid:gotLoginData.uid}

                fetch('https://bandhon-ecommerce.herokuapp.com/add-user-data', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(add_user_data)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedCount === 1){
                        setSignedInUser(gotLoginData)
                        setLoginData(gotLoginData)
                        setCartInfo(myData)
                        history.replace(from);
                    }
                })
            }
        })
    }
    return (
        <div className="sign_in_page">
            {
                loginData.isSignedIn === true ? <h1>You already logged in. Please logout then you can see this page</h1> : 
                <div className={`sign_in_page_container ${signIn === true && 'right-panel-active'}`} id="login_page_container">
                    <div className="form-container sign-up-container">
                        <form className="sign_in_form" action="#">
                            <h1 className="sign_in_h1">Create Account</h1>
                            <div className="social-container">
                                <FontAwesomeIcon onClick={handleFacebookSignIn} icon={faFacebookF} />
                                <FontAwesomeIcon onClick={handleGoogleSignIn} icon={faGoogle} />
                            </div>
                            <span className="sign_in_span">or use your email for registration</span>
                            <input className="sign_in_input" type="text" placeholder="Name" />
                            <input className="sign_in_input" type="email" placeholder="Email" />
                            <input className="sign_in_input" type="password" placeholder="Password" />
                            {
                                signedInUser.error !== '' && <p>{signedInUser.error}</p>
                            }
                            <button className="sign_in_page_btn">Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form className="sign_in_form" action="#">
                            <h1 className="sign_in_h1">Sign in</h1>
                            <div className="social-container">
                                <FontAwesomeIcon onClick={handleFacebookSignIn} icon={faFacebookF} />
                                <FontAwesomeIcon onClick={handleGoogleSignIn} icon={faGoogle} />
                            </div>
                            <span className="sign_in_span">or use your account</span>
                            <input className="sign_in_input" type="email" placeholder="Email" />
                            <input className="sign_in_input" type="password" placeholder="Password" />
                            <a className="forgot_password" href="#">Forgot your password?</a>
                            <button className="sign_in_page_btn">Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="sign_in_h1">Welcome Back!</h1>
                                <p className="sign_in_p">To keep connected with us please login with your personal info</p>
                                <button onClick={() => setSignIn(false)} className="sign_in_page_btn ghost" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="sign_in_h1">Hello, Friend!</h1>
                                <p className="sign_in_p">Enter your personal details and start journey with us</p>
                                <button onClick={() => setSignIn(true)} className="sign_in_page_btn ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="m_sign_in_page container">
                <form className="m_sign_in_form">
                    <h1 className="m_sign_in_h1">
                        {
                            signInUp === 'signIn' ? 'Sign In' : 'Sign Up'
                        }
                    </h1>
                    <div className="m_sign_in_icons">
                        <FontAwesomeIcon onClick={handleFacebookSignIn} icon={faFacebookF} />
                        <FontAwesomeIcon onClick={handleGoogleSignIn} icon={faGoogle} />
                    </div>
                    <span className="m_sign_span">or use your account</span>
                    {signInUp === 'signUp' && <input className="m_sign_input" type="text" placeholder="Full Name" />}
                    <input className="m_sign_input" type="text" placeholder="Email" />
                    <input className="m_sign_input" type="text" placeholder="Password" />
                    <Link className="m_forgot_pass">Forgot Password!</Link>
                    {
                        signInUp === 'signIn' ? <p className="m_sign_detail">Don't have an account! <span onClick={() => setSignInUp('signUp')}>Register</span></p> : <p className="m_sign_detail">Already have an account! <span onClick={() => setSignInUp('signIn')}>Sign In</span></p>
                    }
                    <button className="m_sign_page_btn">
                    {
                        signInUp === 'signIn' ? 'Sign In' : 'Sign Up'
                    }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;