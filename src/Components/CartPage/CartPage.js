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
    // console.log(cartSubTotal)

    let subTotal = 0
    if(cartInfo?.cartProducts) {
        for (let i = 0; i < cartInfo.cartProducts.length; i++) {
            const realPrice = cartInfo.cartProducts[i].mainPrice * cartInfo.cartProducts[i].quantity
            subTotal = subTotal + realPrice
          }
    }

    // getting address
    const [getDivision, setGetDivision] = useState([])
    const [division, setDivision] = useState('')
    const [getDistrict, setGetDistrict] = useState([])
    const [district, setDistrict] = useState('')
    const [getUpazilla, setGetUpazilla] = useState([])
    const [upazilla, setUpazilla] = useState('')

    const divisionSelect = (e) => {
        setDivision(e.target.value)
    }
    useEffect(() => {
        fetch(`https://bdapis.herokuapp.com/api/v1.1/divisions`)
        .then(response => response.json())
        .then(data => {
            setGetDivision(data)
            // setDivision(data.data[0].division)
        })
    }, [])

    const districtSelect = (e) => {
        const data = e.target.value
        setDistrict(data)
        const selectedDistrict = getDistrict.find(dis => dis.district === data)
        setGetUpazilla(selectedDistrict.upazilla)
    }
    const upazillaSelect = (e) => {
        setUpazilla(e.target.value)
    }
    useEffect(() => {
        fetch(`https://bdapis.herokuapp.com/api/v1.1/division/${division}`)
        .then(res => res.json())
        .then(data => {
            setGetDistrict(data.data)
        })
    }, [division])

    // setting shipment cost
    const [shipmentCost, setShipmentCost] = useState(120)
    useEffect(() => {
        if(district === 'Dhaka'){
            setShipmentCost(60)
        }
        else{
            setShipmentCost(100)
        }
    }, [district, division])
    let total = subTotal + shipmentCost

    // get form data and submitting
    const [selectError, setSelectError] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        if(division === '') {
            setSelectError('Please choose your division*')
        }
        else {
            if(district === '') {
                setSelectError('Please choose your district*')
            }
            else {
                if(upazilla === '') {
                    setSelectError('Please choose your upazilla*')
                }
                else {
                    setCartFormDetails({fullName:data.fullName, number:data.number, email:data.email, mainAddress: data.mainAddress})
                    setSelectError('')
                    const newData = {...data}
                    newData.division = division
                    newData.district = district
                    newData.upazilla = upazilla
                    newData.address = upazilla+','+' '+district+','+' '+division
                    const transactionId = uuid()
                    const payment_data = {amount:total, transaction_id:transactionId, success_url:'https://ebandhon.com/payment/success', fail_url:'https://ebandhon.com/payment/fail', customer_name:newData.fullName, customer_mobile:newData.number}
                    fetch(`https://bandhon-ecommerce.herokuapp.com/call-payment-gateway`, {
                        method:'POST',
                        headers: {'content-type':'application/json'},
                        body:JSON.stringify(payment_data)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.error){
                            console.log(data.error)
                        }
                        else {
                            setPaymentData({...newData, transactionId, cartData:cartInfo.cartProducts, date:Date().toLocaleString()})
                            window.location.replace(`${data.data.link}`)
                        }
                    })
                }
            }
        }
    };
    return (
        <>
            <Header></Header>
            <form onSubmit={handleSubmit(onSubmit)} className="container cart_page">
                <div className="cart_shipment">
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
                        <label htmlFor="mainAddress">Main Address (Optional)</label>
                        <input defaultValue={cartFormDetails.mainAddress} {...register("mainAddress")} id="mainAddress" type="text" placeholder="House/Holding Address"/>
                    </div>
                    <div className="shipment_field">
                        <label>Present Address <FontAwesomeIcon className="address_icon_down" icon={faCaretDown}/></label>
                        {
                            selectError !== '' && <p className="select_error">{selectError}</p>
                        }
                        <div className="get_address">
                            <div className="division sub_address">
                                <label htmlFor="division">Division</label>
                                <select defaultValue="Select Division" onChange={(e) => divisionSelect(e)} name="division" id="division">
                                    <option value="Select Division" disabled>Select Division</option>
                                    {
                                        getDivision.data && getDivision.data.map((data, index) => <option key={index}>{data.division}</option>)
                                    }
                                </select>
                            </div>
                            <div className="district sub_address">
                                <label htmlFor="district">District</label>
                                <select defaultValue='Select District' onChange={(e) => districtSelect(e)} name="district" id="district">
                                    <option value="Select District" disabled>Select District</option>
                                    {
                                        getDistrict && getDistrict.map((data, index) => <option key={index}>{data.district}</option>)
                                    }
                                </select>
                            </div>
                            <div className="upazilla sub_address">
                                <label htmlFor="upazilla">Upazilla</label>
                                <select defaultValue="Select Upazilla" onChange={(e) => upazillaSelect(e)} name="upazilla" id="upazilla">
                                    <option value="Select Upazilla" disabled>Select Upazilla</option>
                                    {
                                        getUpazilla && getUpazilla.map((data, index) => <option key={index}>{data}</option>)
                                    }
                                </select>
                            </div>
                        </div>
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
                                        cartInfo?.cartProducts && cartInfo?.cartProducts.map((product, index) => <CartShow key={index} data={product}/>)
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
            </form>
            <Footer></Footer>
        </>
    );
};

export default CartPage;