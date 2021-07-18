import React, { useContext, useEffect } from 'react';
import { CartProducts, CartSubTotal } from '../../App';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './CartPage.css'
import CartShow from './CartShow/CartShow';
import loader from '../../images/GIF/Funnel.gif'
import Shpping from '../Shipping/Shipping';

const CartPage = () => {
    useEffect(() => {
        document.title = "Cart Items | E-Bandhon"
      }, [])

    const [cartInfo, setCartInfo] = useContext(CartProducts)
    // const [cartSubTotal, setCartSubTotal] = useContext(CartSubTotal)
    // console.log(cartSubTotal)

    let subTotal = 0
    if(cartInfo?.cartProducts) {
        for (let i = 0; i < cartInfo.cartProducts.length; i++) {
            const realPrice = cartInfo.cartProducts[i].mainPrice * cartInfo.cartProducts[i].quantity
            subTotal = subTotal + realPrice
          }
    }
    let shipmentCost = 500;
    let total = subTotal + shipmentCost
    return (
        <>
            <Header></Header>
            <div className="container cart_page">
                <div className="cart_shipment">
                    <Shpping></Shpping>
                </div>
                <div className="cart_cart">
                    <div className="cart_top_header">
                        <h2>ORDER</h2>
                        <h2>{cartInfo?.cartProducts ? cartInfo.cartProducts.length : '0'} Products</h2>
                    </div>
                    <div className="cart_show_list">
                        {
                            cartInfo === null ? <div class="spinner-border text-secondary cart_spinner" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div> : <div>
                                    {
                                        cartInfo?.cartProducts.map((product, index) => <CartShow key={index} data={product}/>)
                                    }
                                </div>
                        }
                    </div>
                    <div className="cart_bottom_prices">
                        <p>Sub Total: <span>৳ {subTotal}</span></p>
                        <p>Shipment: <span>৳ {shipmentCost}</span></p>
                        <p>Total: <span>৳ {total}</span></p>
                    </div>
                    <button className="cart_page_btn">Proceed to Payment</button>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default CartPage;