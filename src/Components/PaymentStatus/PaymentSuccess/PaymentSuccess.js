import React, { useEffect, useState } from 'react';
import './PaymentSuccess.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../LocalStorage/LocalStorage';
import loader from '../../../images/Spin-1.6s-200px.gif'

const PaymentSuccess = () => {
    const [campaignPaymentData, setCampaignPaymentData] = useLocalStorage('campaign_payment_data', {})
    const [paymentData, setPaymentData] = useLocalStorage('payment_data', {})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // if(paymentData.transactionId){
        //     setLoading(true)
        //     // console.log('calling simple payment')
        //     fetch('https://bandhon-ecommerce.herokuapp.com/add-payment-details', {
        //         method:'POST',
        //         headers: {'content-type':'application/json'},
        //         body:JSON.stringify(paymentData)
        //     })
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        // }

        if(campaignPaymentData.transactionId){
            setLoading(true)
            // console.log('calling campaign payment')
            fetch('https://api.ebandhon.com/call-campaign-payment-details', {
                method:'POST',
                headers: {'content-type':'application/json'},
                body:JSON.stringify(campaignPaymentData)
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if(data.insertedCount !== 0){
                    setCampaignPaymentData([])
                    setLoading(false)
                }
                else(alert(data.error))
            })
        }
    }, [])
    return (
        <>
            {
                loading === false ? <div className="payment_success container">
                <h1>Payment Successful <FontAwesomeIcon className="payment_success_icon" icon={faCheckCircle}/></h1>
                <Link to="/">Go back to home page</Link>
            </div> : <div className="payment_success container">
                <img src={loader} alt="" />
            <h1>Checking your payment, Please wait</h1>
        </div>
            }
        </>
    );
};

export default PaymentSuccess;