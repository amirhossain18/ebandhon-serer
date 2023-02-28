import React, { useContext, useEffect, useState } from 'react';
import { CartProducts, CartSubTotal } from '../../App';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './CartPage.css'
import CartShow from './CartShow/CartShow';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-uuid'
import useLocalStorage from '../LocalStorage/LocalStorage';

const CartPage = () => {
    useEffect(() => {
        document.title = "Cart Items | E-Bandhon"
      }, [])
    const [cartFormDetails, setCartFormDetails] = useLocalStorage('cart_form', {})
    const [paymentData, setPaymentData] = useLocalStorage('payment_data', {})


    const [cartInfo, setCartInfo] = useContext(CartProducts)
    // const [cartSubTotal, setCartSubTotal] = useContext(CartSubTotal)
    // console.log(cartInfo)

    let subTotal = 0
    if(cartInfo?.cartProducts) {
        for (let i = 0; i < cartInfo.cartProducts.length; i++) {
            const realPrice = Math.round(cartInfo.cartProducts[i].mainPrice) * cartInfo.cartProducts[i].quantity
            subTotal = subTotal + realPrice
          }
    }
 
    // getting address
    // const [getDistrict, setGetDistrict] = useState([])
    // const [district, setDistrict] = useState('')

    // const districtSelect = (e) => {
    //     const data = e.target.value
    //     setDistrict(data)
    // }
    // useEffect(() => {
    //     fetch(``)
    //     .then(res => res.json())
    //     .then(data => {
    //         setGetDistrict(data.data)
    //     })
    // }, [])

    // setting shipment cost
    // const [shipmentCost, setShipmentCost] = useState(120)
    // useEffect(() => {
    //     if(district === 'Dhaka'){
    //         setShipmentCost(100)
    //     }
    //     else{
    //         setShipmentCost(120)
    //     }
    // }, [district])
    let total = subTotal

    

    // get current date
    const monthNameData = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let newDate = new Date()
    let date = newDate.getDate();
    let month = monthNameData[newDate.getMonth()];
    let year = newDate.getFullYear();

    // get form data and submitting
    const [selectError, setSelectError] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        if(total > '500000'){
            setSelectError("You cannot buy products worth more than 500,000 TK")
        }
        else{
            // if(district === '') {
            //     setSelectError('Please choose your district*')
            // }
            // else {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = today.getMonth()
                // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                var month = monthName[mm]

                today = dd + ' ' + month + ' ' + yyyy;
                
                
                if(cartInfo.cartProducts && cartInfo.cartProducts.length !== 0) {
                    setCartFormDetails({fullName:data.fullName, number:data.number, email:data.email, mainAddress: data.mainAddress})
                    setSelectError('')
                    const newData = {...cartInfo}
                    newData.name = data.fullName
                    newData.email = data.email
                    newData.phone = data.number
                    newData.mainAddress = data.mainAddress
                    newData.totalAmount = total
                    newData.status = "pending"
                    newData.date = today
                    delete newData.admin
                    delete newData.image
                    delete newData._id
                    delete newData.hotDealData
                    delete newData.password
                    delete newData.boughtProducts
                    newData.userMDBId = cartInfo._id
                    // newData.district = district
                    const transactionId = uuid()
                    newData.transactionId = transactionId
                    
                    fetch(`http://localhost:5000/buy-products/id?id=${newData.uid}`, {
                        method:'PATCH',
                        headers: { 'content-type':'application/json'},
                        body:JSON.stringify(newData)
                    })
                    .then(res => res.json())
                    .then(result => {
                        // console.log(result.insertedCount)
                        if(result.success === true) {
                            window.location.replace('http://localhost:3000/payment/success')
                        }
                    })

                    // const payment_data = {amount:total, transaction_id:transactionId, success_url:'https://ebandhon.com/payment/success', fail_url:'https://ebandhon.com/payment/fail', customer_name:newData.fullName, customer_mobile:newData.number}
                    // fetch(`https://api.ebandhon.com/call-payment-gateway`, {
                    //     method:'POST',
                    //     headers: {'content-type':'application/json'},
                    //     body:JSON.stringify(payment_data)
                    // })
                    // .then(res => res.json())
                    // .then(data => {
                    //     if(data.error){
                    //         console.log(data.error)
                    //     }
                    //     else {
                    //         setPaymentData({...newData, transactionId, date:date+" "+month+" "+year})
                    //         window.location.replace(`${data.data.link}`)
                    //     }
                    // })
                }
                else{
                    setSelectError('Your cart is empty. Buy something to proceed.')
                }
            // }
        }
    };
    return (
        <>
            <Header></Header>
            <form onSubmit={handleSubmit(onSubmit)} className="container cart_page">
                <div className="cart_shipment">
                    <div className="CPS_form">
                        <h1 className="shipment_h1">Shipment Details</h1>
                        <div className="shipment_field">
                            <label htmlFor="fullName">Full Name</label>
                            <input defaultValue={cartFormDetails.fullName} {...register("fullName", { required: true })} id="fullName" type="text" placeholder="Full Name"/>
                        </div>
                        <div className="shipment_field">
                            <label htmlFor="number">Phone Number</label>
                            <input defaultValue={cartFormDetails.number} {...register("number", { required: true })} id="number" type="number" placeholder="Phone Number"/>
                        </div>
                        <div className="shipment_field">
                            <label htmlFor="email">Email</label>
                            <input defaultValue={cartFormDetails.email} {...register("email", { required: true })} id="email" type="email" placeholder="Email"/>
                        </div>
                        <div className="shipment_field">
                            <label htmlFor="mainAddress">Main Address</label>
                            <input defaultValue={cartFormDetails.mainAddress} {...register("mainAddress", { required: true })} id="mainAddress" type="text" placeholder="House/Holding Address"/>
                        </div>
                        {/* <div className="shipment_field">
                            {
                                selectError !== '' && <p className="select_error">{selectError}</p>
                            }
                            <div className="get_address">
                                <div className="district sub_address">
                                    <label htmlFor="district">District</label>
                                    <select defaultValue='Select District' onChange={(e) => districtSelect(e)} name="district" id="district">
                                        <option value="Select District" disabled>Select District</option>
                                        {
                                            getDistrict && getDistrict.map((data, index) => <option key={index}>{data.district}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="cart_cart">
                    <div className="cart_top_header">
                        <h2>ORDER</h2>
                        <h2>{cartInfo?.cartProducts ? cartInfo?.cartProducts.length : '0'} Products</h2>
                    </div>
                    <div className="cart_show_list">
                        {
                            cartInfo === null ? <div className="spinner-border text-secondary cart_spinner" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : <div>
                                    {
                                        cartInfo && cartInfo?.cartProducts && cartInfo?.cartProducts.map((product, index) => <CartShow key={index} data={product}/>)
                                    }
                                </div>
                        }
                    </div>
                    <div className="cart_bottom_prices">
                        {/* <p>Sub Total: <span>৳ {subTotal}</span></p>
                        <p>Shipment: <span>৳ {shipmentCost}</span></p> */}
                        <p>Total: <span>৳ {total}</span></p>
                    </div>
                    <button className="cart_page_btn">Proceed to Payment</button>
                </div>
            </form>
            <Footer></Footer>
        </>
    );
};

export default CartPage;