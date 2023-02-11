import React, { useContext, useEffect, useState } from 'react';
import './HotDealPaymentModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from '../../LocalStorage/LocalStorage';
import uuid from 'react-uuid'
import { useForm } from "react-hook-form";
import { CartProducts } from '../../../App';
import { Link } from 'react-router-dom';
import Ripples from 'react-ripples'

const HotDealPaymentModal = (props) => {
    const [cartFormDetails, setCartFormDetails] = useLocalStorage('cart_form', {})
    const [hotDealDetails, setHotDealDetails] = useLocalStorage('hot_deal_details', {})
    const [cartInfo, setCartInfo] = useContext(CartProducts)
    const {productName, productImage} = props.data
    const [loginData, setLoginData] = useLocalStorage('user_data', {})

    const [quantity, setQuantity] = useState(1)

    // getting address
    const [getDistrict, setGetDistrict] = useState([])
    const [district, setDistrict] = useState('')
    const [shipment, setShipment] = useState(120)

    const [loading, setLoading] = useState(false)

    const districtSelect = (e) => {
        const data = e.target.value
        setDistrict(data)
        if(data === "Dhaka"){
            setShipment(100)
        }
        else{
            setShipment(120)
        }
    }

    useEffect(() => {
        fetch(`https://bdapis.herokuapp.com/api/v1.1/districts`)
        .then(res => res.json())
        .then(data => {
            setGetDistrict(data.data)
        })
    }, [])

    const [fullName, setFullName] = useState(cartFormDetails ? cartFormDetails.fullName : '')
    const [email, setEmail] = useState(cartFormDetails ? cartFormDetails.email : '')
    const [number, setNumber] = useState(cartFormDetails ? cartFormDetails.number : '')
    const [mainAddress, setMainAddress] = useState(cartFormDetails ? cartFormDetails.mainAddress : '')

    const [selectError, setSelectError] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        setSelectError('')
        if(district === '') {
            setSelectError('Please choose your district*')
        }
        else {
            // setSelectError('Hot Deal payment will be added in 1 day. So please standby!')
            setLoading(true)
            setCartFormDetails({fullName:fullName, number:number, email:email, mainAddress:mainAddress})
            setSelectError('')
            const transactionId = uuid().replaceAll('-', '')
            const newData = {...data}
            newData.district = district
            newData.fullName = fullName
            newData.email = email
            newData.number = number
            newData.mainAddress = mainAddress
            newData.productDetails = props.data
            newData.transactionId = transactionId
            newData.productDetails.purchasedQuantity = quantity
            newData.productDetails.hotDealPrice = props.discountedPrice
            newData.productDetails.hotDealShipment = shipment
            newData.COD = false
            newData.userId = cartInfo._id
            newData.totalPrice = (quantity * parseInt(props.discountedPrice)) + shipment
            const payment_data = {amount:(quantity * parseInt(props.discountedPrice)) + shipment, transaction_id:transactionId, success_url:'https://ebandhon.com/payment/success', fail_url:'https://ebandhon.com/payment/fail', customer_name:newData.fullName, customer_mobile:newData.number}
            // console.log({newData}, {payment_data})
            // console.log({payment_data}, {newData})
            fetch(`https://api.ebandhon.com/call-payment-gateway`, {
                method:'POST',
                headers: {'content-type':'application/json'},
                body:JSON.stringify(payment_data)
            })
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    setLoading(false)
                    alert(data.error)
                }
                else {
                    setLoading(false)
                    setHotDealDetails(newData)
                    window.location.replace(`${data.data.link}`)
                }
            })
        }
    }

    const [txID, setTxID] = useState('')
    const cashOnDeliveryBtn = (e) => {
        e.preventDefault()
        if(txID !== ''){
            setSelectError('')
            setCartFormDetails({fullName:fullName, number:number, email:email, mainAddress:mainAddress})
            setSelectError('')
            const newData = {}
            newData.district = district
            newData.fullName = fullName
            newData.email = email
            newData.TxID = txID
            newData.productStatus = "pending"
            newData.number = number
            newData.mainAddress = mainAddress
            newData.productDetails = props.data
            newData.productDetails.purchasedQuantity = quantity
            newData.productDetails.hotDealPrice = props.discountedPrice
            newData.COD = true
            newData.userId = cartInfo._id

            fetch('https://ebandhon-server.up.railway.apphot-deal-cash-on-delivery', {
                method: 'POST',
                headers: { 'content-type':'application/json' },
                body: JSON.stringify(newData)
            })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount !== 0){
                    alert('Your purchased has been recorded. We will contact you shortly.')
                    window.location.replace(`https://ebandhon.com/profile`)
                }
                else{
                    alert(data.error)
                }
            })
        }
        else{
            setSelectError('For Cash-on-Delivery you need to pay the shipment charge and give us the Transaction ID (TXID)')
        }
    }
    return (
        <>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="CP_shipment" className="cart_shipment">
                    {/* <FontAwesomeIcon onClick={() => setModalIsOpen(false)} className="CP_close_modal" icon={faTimes}/> */}
                    <h1 id="CP_shipment_h1" className="shipment_h1">Shipment Details</h1>
                    <div id="CP_shipment_field" className="shipment_field">
                        <label htmlFor="fullName">Full Name</label>
                        <input defaultValue={cartFormDetails.fullName} onChange={(e) => setFullName(e.target.value)} id="fullName" type="text" placeholder="Full Name" required/>
                    </div>
                    <div id="CP_shipment_field" className="shipment_field">
                        <label htmlFor="number">Phone Number</label>
                        <input defaultValue={cartFormDetails.number} onChange={(e) => setNumber(e.target.value)} id="number" type="number" placeholder="Phone Number" required/>
                    </div>
                    <div id="CP_shipment_field" className="shipment_field">
                        <label htmlFor="email">Email</label>
                        <input defaultValue={cartFormDetails.email} onChange={(e) => setEmail(e.target.value)} id="email" type="text" placeholder="Email" required/>
                    </div>
                    <div id="CP_shipment_field" className="shipment_field">
                        <label htmlFor="mainAddress">Main Address</label>
                        <input defaultValue={cartFormDetails.mainAddress} onChange={(e) => setMainAddress(e.target.value)} id="mainAddress" type="text" placeholder="Main Address" required/>
                    </div>
                    <div id="CP_shipment_field" className="shipment_field">
                        {/* <label>Present Address <FontAwesomeIcon className="address_icon_down" icon={faCaretDown}/></label> */}
                        {
                            selectError !== '' && <p className="select_error">{selectError}</p>
                        }
                        <div className="get_address HDGet_address">
                            {/* <div id="CP_sub_address" className="division sub_address">
                                <label htmlFor="division">Division</label>
                                <select defaultValue="Select Division" onChange={(e) => divisionSelect(e)} name="division" id="division">
                                    <option value="Select Division" disabled>Select Division</option>
                                    {
                                        getDivision.data && getDivision.data.map((data, index) => <option key={index}>{data.division}</option>)
                                    }
                                </select>
                            </div> */}
                            <div id="CP_sub_address" className="district sub_address HDSub_address">
                                <label htmlFor="district">Select District</label>
                                <select defaultValue='Select District' onChange={(e) => districtSelect(e)} name="district" id="district">
                                    <option value="Select District" disabled>Select District</option>
                                    {
                                        getDistrict && getDistrict.map((data, index) => <option key={index}>{data.district}</option>)
                                    }
                                </select>
                            </div>
                            {/* <div id="CP_sub_address" className="upazilla sub_address">
                                <label htmlFor="upazilla">Upazilla</label>
                                <select defaultValue="Select Upazilla" onChange={(e) => upazillaSelect(e)} name="upazilla" id="upazilla">
                                    <option value="Select Upazilla" disabled>Select Upazilla</option>
                                    {
                                        getUpazilla && getUpazilla.map((data, index) => <option key={index}>{data}</option>)
                                    }
                                </select>
                            </div> */}
                        </div>
                    </div>
                    {
                        district === 'Dhaka' && <div id="CP_shipment_field" className="shipment_field">
                            <label htmlFor="txID">Transaction ID (for Cash on Delivery)</label>
                            <input onChange={(e) => setTxID(e.target.value)} id="txID" type="text" placeholder="XXXXXXXXXXXX"/>
                        </div>
                    }
                    <div className="CP_shipment_product">
                        <div className="d-flex align-items-center">
                            <img src={productImage} alt="" />
                            <div className="CP_P_name_quantity">
                                <h4 className="CP_payment_pName">{productName}</h4>
                                <span className="CP_quantity">Quantity: {quantity > 1 ? <FontAwesomeIcon className="CP_P_quantity_btn" onClick={() => setQuantity(quantity - 1)} icon={faMinus}/> : <FontAwesomeIcon className="CP_P_quantity_btn" icon={faMinus}/>} {quantity} <FontAwesomeIcon className="CP_P_quantity_btn" onClick={() => setQuantity(quantity + 1)} icon={faPlus} /></span>
                            </div>
                        </div>
                        <p className="CP_shipment_price">৳ {Math.floor(props.discountedPrice * quantity)}</p>
                    </div>
                    <div className="CP_shipment_price_total">
                        <div className="CP_shipment_price_total_child">
                            <span>Shipment</span>
                            <span>৳ {shipment}</span>
                        </div>
                        <div className="CP_shipment_price_total_child">
                            <span>Total</span>
                            <span>৳ {(quantity * parseInt(props.discountedPrice)) + shipment}</span>
                        </div>
                    </div>
                    <div className="CP_payment_btn pb-4">
                        {/* {
                            loginData.isSignedIn === false ? <Link to='/signIn'><button>Proceed to Payment</button></Link> : (loading === false ? <button type="submit">Proceed to Payment</button> : <button type="button">Submitting</button>)
                        } */}
                        {
                            district === 'Dhaka' && <Ripples className="w-100 mt-2" color="#ffffff57" during={1500}>
                            <span onClick={(e) => cashOnDeliveryBtn(e)} className="CP_payment_btn_button">Cash on Delivery</span>
                        </Ripples>
                        }
                        <Ripples className="w-100 mt-2" color="#ffffff57" during={1500}>
                            <button className="CP_payment_btn_button" type="submit">Proceed to Payment</button>
                        </Ripples>
                    </div>
                </div>
            </form>
        </>
    );
};

export default HotDealPaymentModal;