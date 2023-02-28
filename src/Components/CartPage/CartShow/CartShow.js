import React, { useContext, useEffect, useState } from 'react';
import { CartProducts, CategoryData } from '../../../App';
import './CartShow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import useLocalStorage from '../../LocalStorage/LocalStorage';
import defaultImage from '../../../images/Spin-1.6s-200px.gif'

const CartShow = (props) => {
    // console.log(props)
    const { addToast } = useToasts();
    const [cartInfo, setCartInfo] = useContext(CartProducts)
    const [imageLoad, setImageLoad] = useState(false)
    // const [cartSubTotal, setCartSubTotal] = useContext(CartSubTotal)
    const {id, quantity, productCategory} = props.data;
    const [categories, setCategories] = useContext(CategoryData)
    const selectedCategory = categories?.find(category => category.name === productCategory)
    const cartedProduct = selectedCategory?.products?.find(product => product.id === id)
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const [loading, setLoading] = useState(false)

    const discountedPrice = cartedProduct && cartedProduct.productPrice - ((cartedProduct.productPrice * cartedProduct.productDiscount) / 100)

    const deleteCartProductBtn = (e) => {
        e.preventDefault()
        setLoading(true)
        const newCartProducts = cartInfo.cartProducts.filter(product => product.id !== id)

        fetch(`http://localhost:5000/add-cart-product/id?id=${cartInfo._id}`, {
            method:'PATCH',
            headers: { 'content-type':'application/json'},
            body:JSON.stringify(newCartProducts)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount !== 0) {
                fetch(`http://localhost:5000/get-user-data/id?id=${loginData.uid}`)
                .then(response => response.json())
                .then(data => {
                    if(loginData.isSignedIn) {
                        setCartInfo(data)
                        addToast('Product successfully deleted from cart', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 })
                    }
                })
            }
        })
    }

    return (
        <>
            {
                props.data.dataCategory === 'Hot_Deal' ? <>
                    <div className="cart_show">
                        <div className="cart_page_2_icon">
                            <Link to={`/hot-deal/product/${props.data._id}`} className="cart_page_edit"><FontAwesomeIcon className="cart_page_svg" icon={faEdit}/></Link>
                            {
                                loading === true ? <FontAwesomeIcon className="cart_page_svg cart_delete_btn" icon={faTrashAlt} /> : <FontAwesomeIcon className="cart_page_svg cart_delete_btn" onClick={deleteCartProductBtn} icon={faTrashAlt} />
                            }
                        </div>
                        <div className="cart_show_info">
                            <img className="d-none" onLoad={() => setImageLoad(true)}src={props.data.productImage} alt="" />
                            {
                                imageLoad === true ? <img src={props.data.productImage} alt="" /> : <img src={defaultImage} alt="" />
                            }
                            <div className="cart_show_middle">
                                <h3>{props.data.productName}</h3>
                                <span>Quantity: {props.data.quantity}</span>
                            </div>
                        </div>
                        <p>৳ {Math.round(props.data.mainPrice)}</p>
                    </div>
                </> : <>
                        {
                        selectedCategory && cartedProduct && 
                        <div className="cart_show">
                            <div className="cart_page_2_icon">
                                <Link to={`/product/${productCategory}/${id}`} className="cart_page_edit"><FontAwesomeIcon className="cart_page_svg" icon={faEdit}/></Link>
                                {
                                    loading === true ? <FontAwesomeIcon className="cart_page_svg cart_delete_btn" icon={faTrashAlt} /> : <FontAwesomeIcon className="cart_page_svg cart_delete_btn" onClick={deleteCartProductBtn} icon={faTrashAlt} />
                                }
                            </div>
                            <div className="cart_show_info">
                                <img className="d-none" onLoad={() => setImageLoad(true)}src={cartedProduct.productImage} alt="" />
                                {
                                    imageLoad === true ? <img src={cartedProduct.productImage} alt="" /> : <img src={defaultImage} alt="" />
                                }
                                <div className="cart_show_middle">
                                    <h3>{cartedProduct.productName}</h3>
                                    <span>Quantity: {quantity}</span>
                                </div>
                            </div>
                            <p>৳ {Math.round(discountedPrice)}</p>
                        </div>
                    }
                </>
            }
        </>
    );
};

export default CartShow;