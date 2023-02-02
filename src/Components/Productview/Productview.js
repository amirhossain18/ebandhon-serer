import React, { useContext, useEffect, useState } from 'react';
import style from './Productview.css';
import img from '../Category/22.jpg';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { CartProducts, CategoryData } from '../../App';
import ReactImageMagnify from 'react-image-magnify';
import useLocalStorage from '../LocalStorage/LocalStorage';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import loader from '../../images/GIF/Funnel.gif'


const Productview = () => {
    useEffect(() => {
        document.title = "Product Details | E-Bandhon"
      }, [])

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const { addToast } = useToasts();
    const [categories, setCategories] = useContext(CategoryData)
    const [cartInfo, setCartInfo] = useContext(CartProducts)
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const { catName, productId } = useParams()
    const selectedCategory = categories?.find(category => category.name === catName)
    const selectedProduct = selectedCategory?.products?.find(product => product.id.toString() === productId)
    const discountedPrice = (selectedProduct?.productPrice * selectedProduct?.productDiscount) / 100
    // console.log(selectedProduct)
    const [quantity, setQuantity] = useState(1)

    const [alreadyAdded, setAlreadyAdded] = useState(null)
    useEffect(() => {
        const data = cartInfo?.cartProducts?.find(product => product?.id === selectedProduct?.id)
        if(data) {
            setAlreadyAdded(data)
            setQuantity(data.quantity)
        }
        else (
            setQuantity(1)
        )
    }, [cartInfo])
    
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

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

    const updateCartBtn = (e) => {
        e.preventDefault()
        if(loginData.uid) {

        }
        else {
            history.push("/signIn")
        }

        setUpdateLoading(true)
        const discountedPrice = (selectedProduct.productPrice * selectedProduct.productDiscount) / 100
        const mainPrice = selectedProduct.productPrice - discountedPrice
        const findIndex = cartInfo.cartProducts.findIndex(product => product.id === selectedProduct.id)
        const updatedData = {id:selectedProduct.id, quantity:quantity, productCategory:selectedProduct.productCategory, mainPrice:mainPrice}
        const newCartData = [...cartInfo.cartProducts]
        newCartData[findIndex] = updatedData

        fetch(`https://build-amirhossainbond.vercel.app/add-cart-product/id?id=${cartInfo._id}`, {
            method:'PATCH',
            headers: { 'content-type':'application/json'},
            body:JSON.stringify(newCartData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount !== 0) {
                fetch(`https://build-amirhossainbond.vercel.app/get-user-data/id?id=${loginData.uid}`)
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
        // console.log(newCartData)
    }

    const addCartBtn = (e) => {
        e.preventDefault()
        setLoading(true)
        const discountedPrice = (selectedProduct.productPrice * selectedProduct.productDiscount) / 100
        const mainPrice = Math.round(selectedProduct.productPrice - discountedPrice)
        const cartData = [{id:selectedProduct.id, quantity:quantity, productCategory:selectedProduct.productCategory, mainPrice:mainPrice}]
        if (cartInfo?.cartProducts) {
            const userCartData = [...cartInfo.cartProducts, {id:selectedProduct.id, quantity:quantity, productCategory:selectedProduct.productCategory, mainPrice:mainPrice}]
            fetch(`https://build-amirhossainbond.vercel.app/add-cart-product/id?id=${cartInfo._id}`, {
                method:'PATCH',
                headers: { 'content-type':'application/json'},
                body:JSON.stringify(userCartData)
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount !== 0) {
                    fetch(`https://build-amirhossainbond.vercel.app/get-user-data/id?id=${loginData.uid}`)
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
            fetch(`https://build-amirhossainbond.vercel.app/add-cart-product/id?id=${cartInfo._id}`, {
                method:'PATCH',
                headers: { 'content-type':'application/json'},
                body:JSON.stringify(cartData)
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount !== 0) {
                    fetch(`https://build-amirhossainbond.vercel.app/get-user-data/id?id=${loginData.uid}`)
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
            <Header></Header>
            <div className="container">
                {
                    categories === null ? <img className="loader" src={loader} alt="" /> : <div><div className="product_page_top">
                        
                    <div className="product_page_img">
                    <ReactImageMagnify {...{
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
                    }} />
                        {/* <img src={selectedProduct.productImage} alt="" /> */}
                    </div>
                    <div className="product_page_right">
                        <h2>{selectedProduct.productName}</h2>
                        <p className="product_page_brand">Brand: <Link to={`/brand/${selectedProduct.productCategory}/${selectedProduct.productBrand}`}>{selectedProduct.productBrand} | More product from {selectedProduct.productBrand}</Link></p>
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
                        {
                            loginData.uid ? (alreadyAdded ? (updateLoading === true ? <button className="add_cart_btn">Updating...</button> : <button onClick={(e) => updateCartBtn(e)} className="add_cart_btn">Update Cart</button>) : 
                            (loading === true ? <button className="add_cart_btn">Adding...</button> : <button title="You must login before added to cart!" onClick={(e) => addCartBtn(e)} className="add_cart_btn">Add to cart</button>)) : <Link to={{ 
                                pathname: `/signIn`,
                                state: location.pathname
                              }}><button className="add_cart_btn">Add to cart</button></Link>
                        }
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
                </div> </div>
                }
            </div>
            <Footer></Footer>
        </>
       
    );
};

export default Productview;