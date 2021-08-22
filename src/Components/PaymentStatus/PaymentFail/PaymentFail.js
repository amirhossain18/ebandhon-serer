import React from 'react';
import './PaymentFail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PaymentFail = () => {
    return (
        <div className="container payment_fail payment_success">
            <h1>Payment failed <FontAwesomeIcon className="payment_success_icon payment_fail_icon" icon={faTimesCircle}/></h1>
            <Link to='/page/cart'>Go back to cart</Link>
        </div>
    );
};

export default PaymentFail;