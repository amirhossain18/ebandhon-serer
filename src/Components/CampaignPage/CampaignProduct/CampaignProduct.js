import React, { useContext, useEffect, useState } from 'react';
import defaultImage from '../Spin-1.6s-200px.gif'
import Modal from 'react-modal';
import useLocalStorage from '../../LocalStorage/LocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import uuid from 'react-uuid'
import { CartProducts } from '../../../App';
import { Link } from 'react-router-dom';

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

const CampaignProduct = (props) => {
    const {productName, productImage, productPrice} = props.data
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const [imageLoad, setImageLoad] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [cartFormDetails, setCartFormDetails] = useLocalStorage('cart_form', {})
    const [quantity, setQuantity] = useState(1)
    const [campaignPaymentData, setCampaignPaymentData] = useLocalStorage('campaign_payment_data', {})
    const [cartInfo, setCartInfo] = useContext(CartProducts)

    // getting address
    const [getDivision, setGetDivision] = useState([])
    const [division, setDivision] = useState('')
    const [getDistrict, setGetDistrict] = useState([])
    const [district, setDistrict] = useState('')
    const [getUpazilla, setGetUpazilla] = useState([])
    const [upazilla, setUpazilla] = useState('')
    const [shipment, setShipment] = useState(100)

    const [loading, setLoading] = useState(false)

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
        if(data === "Dhaka"){
            setShipment(60)
        }
        else{
            setShipment(100)
        }
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

    // const [total, setTotal] = useState((quantity * parseInt(props.CPrice)) + shipment)
    // console.log(quantity * parseInt(props.CPrice) + shipment)
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
                setLoading(true)
                setCartFormDetails({fullName:data.fullName, number:data.number, email:data.email})
                setSelectError('')
                const transactionId = uuid().replaceAll('-', '')
                const newData = {...data}
                newData.division = division
                newData.district = district
                newData.upazilla = upazilla
                newData.productDetails = props.data
                newData.transactionId = transactionId
                newData.productDetails.quantity = quantity
                newData.productDetails.campaignPrice = props.CPrice
                newData.productDetails.campaignShipment = shipment
                newData.address = upazilla+','+' '+district+','+' '+division
                newData.userId = cartInfo._id
                const payment_data = {amount:(quantity * parseInt(props.CPrice)) + shipment, transaction_id:transactionId, success_url:'https://ebandhon.com/payment/success', fail_url:'https://ebandhon.com/payment/fail', customer_name:newData.fullName, customer_mobile:newData.number}
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
                        setCampaignPaymentData(newData)
                        window.location.replace(`${data.data.link}`)
                    }
                })
            }
        }
    };
    return (
        <>
            <div className="CP_detail_product">
                <div>
                    <img className="d-none" onLoad={() => setImageLoad(true)} src={productImage} alt="" />
                    {
                        imageLoad ? <img src={productImage} alt="" /> : <img src={defaultImage} alt="" />
                    }
                    <h5>{productName}</h5>
                    <p className="CP_full_price"><span className="CP_main_price">৳{productPrice}</span><span className="CP_price">৳{props.CPrice}</span></p>
                </div>
                <button onClick={() => setModalIsOpen(true)} className="btn CP_buy_now_btn">Buy Now</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="onRequestClose Example"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id="CP_shipment" className="cart_shipment">
                        <FontAwesomeIcon onClick={() => setModalIsOpen(false)} className="CP_close_modal" icon={faTimes}/>
                        <h1 id="CP_shipment_h1" className="shipment_h1">Shipment Details</h1>
                        <div id="CP_shipment_field" className="shipment_field">
                            <label htmlFor="fullName">Full Name</label>
                            <input defaultValue={cartFormDetails.fullName} {...register("fullName", { required: true })} id="fullName" type="text" placeholder="Full Name"/>
                        </div>
                        <div id="CP_shipment_field" className="shipment_field">
                            <label htmlFor="number">Phone Number</label>
                            <input defaultValue={cartFormDetails.number} {...register("number", { required: true })} id="number" type="number" placeholder="Phone Number"/>
                        </div>
                        <div id="CP_shipment_field" className="shipment_field">
                            <label htmlFor="email">Email</label>
                            <input defaultValue={cartFormDetails.email} {...register("email", { required: true })} id="email" type="email" placeholder="Email"/>
                        </div>
                        <div id="CP_shipment_field" className="shipment_field">
                            <label htmlFor="mainAddress">Main Address (Optional)</label>
                            <input defaultValue={cartFormDetails.mainAddress} {...register("mainAddress")} id="mainAddress" type="text" placeholder="Main Address (Optional)"/>
                        </div>
                        <div id="CP_shipment_field" className="shipment_field">
                            <label>Present Address <FontAwesomeIcon className="address_icon_down" icon={faCaretDown}/></label>
                            {
                                selectError !== '' && <p className="select_error">{selectError}</p>
                            }
                            <div className="get_address">
                                <div id="CP_sub_address" className="division sub_address">
                                    <label htmlFor="division">Division</label>
                                    <select defaultValue="Select Division" onChange={(e) => divisionSelect(e)} name="division" id="division">
                                        <option value="Select Division" disabled>Select Division</option>
                                        {
                                            getDivision.data && getDivision.data.map((data, index) => <option key={index}>{data.division}</option>)
                                        }
                                    </select>
                                </div>
                                <div id="CP_sub_address" className="district sub_address">
                                    <label htmlFor="district">District</label>
                                    <select defaultValue='Select District' onChange={(e) => districtSelect(e)} name="district" id="district">
                                        <option value="Select District" disabled>Select District</option>
                                        {
                                            getDistrict && getDistrict.map((data, index) => <option key={index}>{data.district}</option>)
                                        }
                                    </select>
                                </div>
                                <div id="CP_sub_address" className="upazilla sub_address">
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
                        <div className="CP_shipment_product">
                            <div className="d-flex align-items-center">
                                <img src={productImage} alt="" />
                                <div className="CP_P_name_quantity">
                                    <h4 className="CP_payment_pName">{productName}</h4>
                                    <span className="CP_quantity">Quantity: {quantity > 1 ? <FontAwesomeIcon className="CP_P_quantity_btn" onClick={() => setQuantity(quantity - 1)} icon={faMinus}/> : <FontAwesomeIcon className="CP_P_quantity_btn" icon={faMinus}/>} {quantity} <FontAwesomeIcon className="CP_P_quantity_btn" onClick={() => setQuantity(quantity + 1)} icon={faPlus} /></span>
                                </div>
                            </div>
                            <p className="CP_shipment_price">৳ {props.CPrice * quantity}</p>
                        </div>
                        <div className="CP_shipment_price_total">
                            <div className="CP_shipment_price_total_child">
                                <span>Shipment</span>
                                <span>৳ {shipment}</span>
                            </div>
                            <div className="CP_shipment_price_total_child">
                                <span>Total</span>
                                <span>৳ {(quantity * parseInt(props.CPrice)) + shipment}</span>
                            </div>
                        </div>
                        <div className="CP_payment_btn pb-4">
                            {
                                loginData.isSignedIn === false ? <Link to='/signIn'><button>Proceed to Payment</button></Link> : (loading === false ? <button type="submit">Proceed to Payment</button> : <button type="button">Submitting</button>)
                            }
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CampaignProduct;