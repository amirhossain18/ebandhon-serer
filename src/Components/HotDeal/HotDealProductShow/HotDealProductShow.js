import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import './HotDealProductShow.css';
import pageLoading from '../../../images/Pulse-1s-200px.gif'
// import ReactImageMagnify from 'react-image-magnify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Ripples from 'react-ripples'
import Modal from 'react-modal';
import HotDealPaymentModal from '../HotDealPaymentModal/HotDealPaymentModal';
import useLocalStorage from '../../LocalStorage/LocalStorage';
import { CartProducts } from '../../../App';
import { Link } from 'react-router-dom';
import { ToastProvider, useToasts } from 'react-toast-notifications';

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

const HotDealProductShow = () => {
    const [selectedProduct, setSelectedProduct] = useState([])
    const paramId = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const [cartInfo, setCartInfo] = useContext(CartProducts)
    const { addToast } = useToasts();

    useEffect(() => {
        fetch('http://localhost:5000/get-all-hot-deal-data')
        .then(res => res.json())
        .then(result => {
            setSelectedProduct(result.find(data => data._id === paramId.productId))
            // console.log(result)
            setIsLoaded(true)
        })
    }, [paramId])

    const [quantity, setQuantity] = useState(1)
    const minusBtn = () => {
        if (quantity === 1) {

        }
        else {
            setQuantity(quantity - 1)
        }
    }

    const plusBtn = () => {
        if (quantity >= selectedProduct.productQuantity) {

        }
        else {
            setQuantity(quantity + 1)
        }
    }
    const discountedPrice = (selectedProduct?.productPrice * selectedProduct?.productDiscount) / 100
    const discountedMainPrice = selectedProduct.productPrice - discountedPrice

    const buyNowBtn = (e) => {
        if(loginData.uid){
            e.preventDefault()
            setModalIsOpen(true)
        }
        else {
            window.location.replace(`https://ebandhon.com/signIn`)
        }
    }


    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [alreadyAdded, setAlreadyAdded] = useState(null)
    // console.log({alreadyAdded})
    useEffect(() => {
        if(selectedProduct && cartInfo && cartInfo.cartProducts){
            const data = cartInfo.cartProducts.find(product => product._id === selectedProduct._id)
            // console.log({data})
            if(data) {
                setAlreadyAdded(data)
                setQuantity(data.quantity)
            }
            else {
                setAlreadyAdded(null)
                setQuantity(1)
            }
        }
    }, [cartInfo, selectedProduct])
    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    const updateCartBtn = (e) => {
        e.preventDefault()
        if(loginData.uid) {
            setUpdateLoading(true)
            const discountedPrice = (selectedProduct.productPrice * selectedProduct.productDiscount) / 100
            const mainPrice = selectedProduct.productPrice - discountedPrice
            const productData = selectedProduct
            productData.quantity = quantity
            productData.dataCategory = "Hot_Deal"
            productData.mainPrice = mainPrice

            const findIndex = cartInfo.cartProducts.findIndex(product => product._id === selectedProduct._id)
            // const updatedData = {id:selectedProduct._id, quantity:quantity, productCategory:selectedProduct.productCategory, mainPrice:mainPrice}
            const newCartData = [...cartInfo.cartProducts]
            newCartData[findIndex] = productData

            fetch(`http://localhost:5000/add-cart-product/id?id=${cartInfo._id}`, {
                method:'PATCH',
                headers: { 'content-type':'application/json'},
                body:JSON.stringify(newCartData)
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount !== 0) {
                    fetch(`http://localhost:5000/get-user-data/id?id=${loginData.uid}`)
                    .then(response => response.json())
                    .then(data => {
                        if(loginData.isSignedIn) {
                            setCartInfo(data)
                            addToast('Product updated to Cart Successfully', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
                            setUpdateLoading(false)
                        }
                    })
                }
            })
        }
        else {
            history.push("/signIn")
        }

        
        // console.log(newCartData)
    }

    const addCartBtn = (e) => {
        e.preventDefault()
        setLoading(true)
        const discountedPrice = (selectedProduct.productPrice * selectedProduct.productDiscount) / 100
        const mainPrice = Math.round(selectedProduct.productPrice - discountedPrice)
        const productData = selectedProduct
        productData.quantity = quantity
        productData.dataCategory = "Hot_Deal"
        productData.mainPrice = mainPrice
        // const cartData = [{id:selectedProduct._id, quantity:quantity, productCategory:selectedProduct.productCategory, mainPrice:mainPrice}]
        if (cartInfo?.cartProducts) {
            const userCartData = [...cartInfo.cartProducts, productData]
            fetch(`http://localhost:5000/add-cart-product/id?id=${cartInfo._id}`, {
                method:'PATCH',
                headers: { 'content-type':'application/json'},
                body:JSON.stringify(userCartData)
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount !== 0) {
                    fetch(`http://localhost:5000/get-user-data/id?id=${loginData.uid}`)
                    .then(response => response.json())
                    .then(data => {
                        if(loginData.isSignedIn) {
                            setCartInfo(data)
                            addToast('Product added to Cart Successfully', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
                            setLoading(false)
                        }
                    })
                }
            })
        }
        else {
            // console.log(cartInfo)
            fetch(`http://localhost:5000/add-cart-product/id?id=${cartInfo._id}`, {
                method:'PATCH',
                headers: { 'content-type':'application/json'},
                body:JSON.stringify([productData])
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount !== 0) {
                    fetch(`http://localhost:5000/get-user-data/id?id=${loginData.uid}`)
                    .then(response => response.json())
                    .then(data => {
                        if(loginData.isSignedIn) {
                            setCartInfo(data)
                            addToast('Product added to Cart Successfully', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
                            setLoading(false)
                        }
                    })
                }
            })
        }
    }
    
    return (
        <>
            {
                isLoaded === false && <div className="bg-dark vw-100 vh-100 d-flex justify-content-center align-items-center"><img src={pageLoading} alt="" /></div>
            }
            {
                isLoaded === true && <>
                    <Header/>
                    <div className="container">
                        <div className="product_page_top">
                            <div className="product_page_img">
                            {/* <ReactImageMagnify style={{zIndex: '999'}} {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: selectedProduct.productImage
                                },
                                largeImage: {
                                    src: selectedProduct.productImage,
                                    width: 1200,
                                    height: 1200
                                }
                            }} /> */}
                                <img src={selectedProduct.productImage} alt="" />
                            </div>
                            <div className="product_page_right">
                                <h2>{selectedProduct.productName}</h2>
                                <p className="product_page_brand">Brand: {selectedProduct.productBrand}</p>
                                <div className="product_page_discount">
                                    <span className="product_page_price">৳ {Math.round(selectedProduct.productPrice - discountedPrice)}</span>
                                    <span title={`৳ ${selectedProduct.productPrice}`}>৳ {selectedProduct.productPrice}</span>
                                    <span>-{selectedProduct.productDiscount}%</span>
                                </div>
                                <div className="product_page_quantity">
                                    <p>Quantity</p>
                                    <FontAwesomeIcon onClick={minusBtn} icon={faMinus}/>
                                    <p>{quantity}</p>
                                    <FontAwesomeIcon onClick={plusBtn} icon={faPlus}/>
                                    <p>Only {selectedProduct.productQuantity} items left</p>
                                </div>
                                <div>
                                    {
                                        loginData.uid ? (alreadyAdded !== null ? (updateLoading === true ? <button className="add_cart_btn">Updating...</button> : <button onClick={(e) => updateCartBtn(e)} className="add_cart_btn">Update Cart</button>) : 
                                        (loading === true ? <button className="add_cart_btn">Adding...</button> : <button title="You must login before added to cart!" onClick={(e) => addCartBtn(e)} className="add_cart_btn">Add to cart</button>)) : <Link to={{ 
                                            pathname: `/signIn`,
                                            state: location.pathname
                                        }}><button className="add_cart_btn">Add to cart</button></Link>
                                    }
                                    <Ripples color="#ffffff57" during={1500} className="add_cart_btn p-0">
                                        <button onClick={(e) => buyNowBtn(e)} id="mt-0" className="add_cart_btn mt-0">BUY NOW</button>
                                    </Ripples>
                                </div>
                            </div>
                        </div>
                        <div className="single_product_detail">
                            <span>PRODUCT DETAILS</span>
                            <ul>
                                {
                                    selectedProduct.productDescription0 && <li>{selectedProduct.productDescription0}</li>
                                }
                                {
                                    selectedProduct.productDescription1 && <li>{selectedProduct.productDescription1}</li>
                                }
                                {
                                    selectedProduct.productDescription2 && <li>{selectedProduct.productDescription2}</li>
                                }
                                {
                                    selectedProduct.productDescription3 && <li>{selectedProduct.productDescription3}</li>
                                }
                                {
                                    selectedProduct.productDescription4 && <li>{selectedProduct.productDescription4}</li>
                                }
                                {
                                    selectedProduct.productDescription5 && <li>{selectedProduct.productDescription5}</li>
                                }
                                {
                                    selectedProduct.productDescription6 && <li>{selectedProduct.productDescription6}</li>
                                }
                                {
                                    selectedProduct.productDescription7 && <li>{selectedProduct.productDescription7}</li>
                                }
                                {
                                    selectedProduct.productDescription8 && <li>{selectedProduct.productDescription8}</li>
                                }
                                {
                                    selectedProduct.productDescription9 && <li>{selectedProduct.productDescription9}</li>
                                }
                            </ul>
                        </div> 
                    </div>
                    <Footer/>
                    <Modal
                        isOpen={modalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        // onRequestClose={closeModal}
                        style={customStyles}
                        ariaHideApp={false}
                        onRequestClose={() => setModalIsOpen(false)}
                        contentLabel="onRequestClose Example"
                    >
                        <HotDealPaymentModal data={selectedProduct} discountedPrice={discountedMainPrice}/>
                    </Modal>
                </>
            }
        </>
    );
};

export default HotDealProductShow;