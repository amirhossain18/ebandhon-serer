import React from 'react';
import './ProfileHotDealProduct.css'

const ProfileHotDealProduct = (props) => {
    // console.log(props.data)
    const {productName, productImage, hotDealPrice, productPrice, purchasedQuantity} = props.data;
    return (
        <div className="PPR_single_campaign_product">
            <div className="d-flex align-items-center justify-content-space-between">
                <img className="PPR_single_campaign_product_image" src={productImage} alt={productImage} />
                <div className="PPR_single_campaign_product_title_quantity">
                    <h4>{productName}</h4>
                    <span>Quantity: {purchasedQuantity}</span>
                    <span>Status: {props.status}</span>
                </div>
                <div className="PPR_single_campaign_product_price">
                    <span title={productPrice}>৳{productPrice}</span>
                    <span>৳{hotDealPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileHotDealProduct;