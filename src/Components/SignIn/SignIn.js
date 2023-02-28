import React, { useContext, useEffect, useState } from 'react';
import './SignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { facebookSignIn, googleSignIn, initializeLoginFrameworkFirebase } from '../FirebaseManager/FirebaseManager';
import { CartProducts, UserData } from '../../App';
import useLocalStorage from '../LocalStorage/LocalStorage';
import { useHistory, useLocation, Link } from 'react-router-dom';
import uuid from 'react-uuid'
import { IKContext, IKUpload } from 'imagekitio-react';

initializeLoginFrameworkFirebase()

const SignIn = () => {
    useEffect(() => {
        document.title = "Sign In | E-Bandhon"
      }, [])

    const [signInUp, setSignInUp] = useState('signUp')

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/hot-deal" } };
    // console.log(from)

    const [signedInUser, setSignedInUser] = useContext(UserData)
    const [cartInfo, setCartInfo] = useContext(CartProducts)
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const [signIn, setSignIn] = useState(false)
    // form data
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageLink, setImageLink] = useState('')

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(gotLoginData => {
            fetch(`http://localhost:5000/get-user-data/id?id=${gotLoginData.uid}`)
            .then(response => response.json())
            .then(data => {
                if (data.uid) {
                    setSignedInUser(gotLoginData)
                    setLoginData(gotLoginData)
                    setCartInfo(data)
                    if (from) {
                        history.replace(from);
                    }
                    else {
                        history.replace({pathname: '/'});
                    }
                }
                else {
                    const add_user_data = {name:gotLoginData.name, email:gotLoginData.email, image:gotLoginData.image, uid:gotLoginData.uid}
    
                    fetch('http://localhost:5000/add-user-data', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(add_user_data)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.uid){
                            setSignedInUser(gotLoginData)
                            setLoginData(gotLoginData)
                            setCartInfo(data)
                            if (from) {
                                history.replace(from);
                            }
                            else {
                                history.replace({pathname: '/hot-deal'});
                            }
                        }
                        else{
                            alert('We are unable to login to your account. Please reload the page and try again.')
                        }
                    })
                }
            })
        })
    }
    const handleFacebookSignIn = () => {
        facebookSignIn()
        .then(gotLoginData => {
            fetch(`http://localhost:5000/get-user-data/id?id=${gotLoginData.uid}`)
            .then(response => response.json())
            .then(data => {
                if (data.uid) {
                    setSignedInUser(gotLoginData)
                    setLoginData(gotLoginData)
                    setCartInfo(data)
                    if (from) {
                        history.replace(from);
                    }
                    else {
                        history.replace({pathname: '/hot-deal'});
                    }
                }
                else {
                    const add_user_data = {name:gotLoginData.name, email:gotLoginData.email, image:gotLoginData.image, uid:gotLoginData.uid}
    
                    fetch('http://localhost:5000/add-user-data', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(add_user_data)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.uid){
                            setSignedInUser(gotLoginData)
                            setLoginData(gotLoginData)
                            setCartInfo(data)
                            if (from) {
                                history.replace(from);
                            }
                            else {
                                history.replace({pathname: '/hot-deal'});
                            }
                        }
                        else{
                            alert('We are unable to login to your account. Please reload the page and try again.')
                        }
                    })
                }
            })
        })
    }

    // uploading image and getting link
    const [imageLoading, setImageLoading] = useState(false)
    const onError = err => {
        setImageLoading(false)
        setImageLink('')
    };
      
    const onSuccess = res => {
        setImageLoading(false)
        setImageLink(res.url)
    };

    const [imageUploadTitle, setImageUploadTitle] = useState('')
    const imageUpload = (e) => {
        setImageUploadTitle('')
        if(e.target.value){
            setImageUploadTitle(e.target.value)
            setImageLink('')
            setImageLoading(true)
        }
    }

    // email pass register
    const [imageSelect, setImageSelect] = useState('')
    const [registerClicked, setRegisterClicked] = useState(false)
    const registerUser = (e) => {
        e.preventDefault()
        if(fullName) {
            if(email) {
                if(password) {
                    // if(imageLink){
                        setRegisterClicked(true)
                        setImageSelect('')
                        const uid = uuid().replaceAll('-', '@')
                        const data = {name:fullName, email, password, uid, image:imageLink, imageProfile:imageLink}
                        fetch('http://localhost:5000/register-new-user', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.error) {
                                setRegisterClicked(false)
                                setImageSelect(data.error)
                            }
                            else if (data[0].uid) {
                                setRegisterClicked(false)
                                const newData = data[0]
                                delete newData.password
                                newData.isSignedIn = true
                                setSignedInUser(newData)
                                setLoginData(newData)
                                setCartInfo(newData)
                                if (from) {
                                    history.replace(from);
                                }
                                else {
                                    history.replace({pathname: '/hot-deal'});
                                }
                            }
                        })
                    // }
                    // else {
                    //     setImageSelect('Please select a profile picture.')
                    // }
                }
                else {
                    setImageSelect('Please write your password.')
                }
            }
            else {
                setImageSelect('Please write your email.')
            }
        }
        else {
            setImageSelect('Please write your name.')
        }
    }

    // email pass login
    const [loginClicked, setLoginClicked] = useState(false)
    const [loginValid, setLoginValid] = useState('')
    const emailPassLogin = (e) => {
        e.preventDefault()
        if(email) {
            if(password) {
                setLoginValid('')
                setLoginClicked(true)
                const data = {email, password}
                fetch('http://localhost:5000/email-pass-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.error) {
                        setLoginValid(data.error)
                        setLoginClicked(false)
                    }
                    else if (data.status === 'success') {
                        setLoginClicked(false)
                        setSignedInUser(data.data)
                        setLoginData(data.data)
                        setCartInfo(data.data)
                        if (from) {
                            history.replace(from);
                        }
                        else {
                            history.replace({pathname: '/hot-deal'});
                        }
                    }
                })
            }
            else {
                setLoginValid('Please write your password.')
            }
        }
        else {
            setLoginValid('Please write your email.')
        }
    }
    return (
        <div className="sign_in_page">
            {
                loginData.isSignedIn === true ? <h1>You already logged in. Please logout then you can see this page</h1> : 
                <div className={`sign_in_page_container ${signIn === true && 'right-panel-active'}`} id="login_page_container">
                    <div className="form-container sign-up-container">
                        <form className="sign_in_form" action="#">
                            <h1 className="sign_in_h1">Create Account</h1>
                            {/* <div className="social-container">
                                <FontAwesomeIcon onClick={handleFacebookSignIn} icon={faFacebookF} />
                                <FontAwesomeIcon onClick={handleGoogleSignIn} icon={faGoogle} />
                            </div>
                            <span className="sign_in_span">or use your email for registration</span> */}
                            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="sign_in_input" type="text" placeholder="Name" required/>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="sign_in_input" type="email" placeholder="Email or Phone Number" required/>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="sign_in_input" type="password" placeholder="Password" required/>
                            {/* <IKContext
                                publicKey="public_5rRmOCN1vK/MI28l98iNzt8jNhQ="
                                urlEndpoint="https://ik.imagekit.io/ebnirpt9i8agxu"
                                transformationPosition="path"
                                authenticationEndpoint="http://localhost:5000/auth">

                                <span className="text-center">{imageLoading && 'Uploading image'}</span>
                                <label className="sign_in_input up_profile_sign" htmlFor="user_profile">{imageUploadTitle ? `${imageUploadTitle}` : 'Select Profile Image'}</label>
                                <IKUpload id="user_profile" className="sign_in_input d-none" onChange={(e) => imageUpload(e)} onError={onError} onSuccess={onSuccess} fileName="user-register" />
                            </IKContext> */}
                            <span className="text-center text-danger image_error">{imageSelect}</span>
                            {
                                registerClicked ? <button className="sign_in_page_btn register_spin"><div className="spinner-border text-light" role="status">
                                <span className="sr-only">Loading...</span>
                              </div></button> : <button type="submit" onClick={(e) => registerUser(e)} className="sign_in_page_btn">Sign Up</button>
                            }
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
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="sign_in_input" type="email" placeholder="Email or Phone Number" required/>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="sign_in_input" type="password" placeholder="Password" required/>
                            <span className="text-center text-danger image_error">{loginValid}</span>
                            <a className="forgot_password" href="#">Forgot your password?</a>
                            {
                                loginClicked ? <button className="sign_in_page_btn register_spin"><div className="spinner-border text-light" role="status">
                                <span className="sr-only">Loading...</span>
                              </div></button> : <button type="submit" onClick={(e) => emailPassLogin(e)} className="sign_in_page_btn">Sign In</button>
                            }
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
                    {signInUp === 'signUp' && <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="sign_in_input" type="text" placeholder="Name" required/>}
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="sign_in_input" type="email" placeholder="Email or Phone Number" required/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="sign_in_input" type="password" placeholder="Password" required/>
                    {/* {
                        signInUp === 'signUp' && <IKContext
                        publicKey="public_5rRmOCN1vK/MI28l98iNzt8jNhQ="
                        urlEndpoint="https://ik.imagekit.io/ebnirpt9i8agxu"
                        transformationPosition="path"
                        authenticationEndpoint="http://localhost:5000/auth">

                        <span className="text-center">{imageLoading && 'Uploading image'}</span>
                        <label className="sign_in_input up_profile_sign" htmlFor="user_profile">{imageUploadTitle ? `${imageUploadTitle}` : 'Select Profile Image'}</label>
                        <IKUpload id="user_profile" className="sign_in_input d-none" onChange={(e) => imageUpload(e)} onError={onError} onSuccess={onSuccess} fileName="user-register" />
                    </IKContext>
                    } */}
                    <span className="text-center text-danger image_error">{imageSelect}</span>
                    {/* {
                        registerClicked ? <button className="sign_in_page_btn register_spin"><div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                        </div></button> : <button type="submit" onClick={(e) => registerUser(e)} className="sign_in_page_btn">Sign Up</button>
                    } */}
                    {
                        signInUp === 'signIn' && <p className="m_forgot_pass">Forgot Password!</p>
                    }
                    <span className="text-center text-danger image_error">{loginValid}</span>
                    {
                        signInUp === 'signIn' ? <p className="m_sign_detail">Don't have an account! <span onClick={() => setSignInUp('signUp')}>Register</span></p> : <p className="m_sign_detail">Already have an account! <span onClick={() => setSignInUp('signIn')}>Sign In</span></p>
                    }
                    {
                            signInUp === 'signIn' && (loginClicked ? <button className="m_sign_page_btn register_spin"><div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                          </div></button> : <button type="submit" onClick={(e) => emailPassLogin(e)} className="m_sign_page_btn">Sign In</button>)
                    }
                    {
                        signInUp === 'signUp' && (registerClicked ? <button className="m_sign_page_btn register_spin"><div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                        </div></button> : <button type="submit" onClick={(e) => registerUser(e)} className="m_sign_page_btn">Sign Up</button>)
                    }
                </form>
            </div>
        </div>
    );
};

export default SignIn;