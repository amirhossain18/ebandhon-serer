import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HPBottomOneProduct.css';
import defaultImage from '../../../../../../images/Spin-1.6s-200px.gif'

const HPBottomOneProduct = (props) => {
    const {productImage, productName, productCategory, productPrice, productDiscount, id} = props.data;
    const [imageLoad, setImageLoad] = useState(false)
    return (
        <>
            <Link className="drag_scroll_product" to={`/product/${productCategory}/${id}`}>
                <img className="d-none" onLoad={() => setImageLoad(true)} src={productImage} alt="" />
                {
                    imageLoad ? <img src={productImage} alt="" /> : <img src={defaultImage} alt="" />
                }
                <p>{productName}</p>
                <span>৳ {productPrice} (-{productDiscount}%)</span>
            </Link>
        </>
    );
};

export default HPBottomOneProduct;