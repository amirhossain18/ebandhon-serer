import React from 'react';
import './ProfileCampaignProduct.css'

const ProfileCampaignProduct = (props) => {
    const {productName, productImage, campaignPrice, campaignShipment, campaignCategory, productId, productPrice, quantity} = props.data;
    return (
        <div className="PPR_single_campaign_product">
            <div className="d-flex align-items-center justify-content-space-between">
                <img className="PPR_single_campaign_product_image" src={productImage} alt={productImage} />
                <div className="PPR_single_campaign_product_title_quantity">
                    <h4>{productName}</h4>
                    <span>Quantity: {quantity}</span>
                    <span>Shipment: {campaignShipment}</span>
                </div>
                <div className="PPR_single_campaign_product_price">
                    <span title={productPrice}>৳{productPrice}</span>
                    <span>৳{campaignPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileCampaignProduct;