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
                <p className="product_dis_home">-{productDiscount}%</p>
                <img className="d-none" onLoad={() => setImageLoad(true)} src={productImage} alt="" />
                {
                    imageLoad ? <img src={productImage} alt="" /> : <img src={defaultImage} alt="" />
                }
                <p>{productName}</p>
                <div className="drag_scroll_product_price">
                    <span title={productPrice}>৳ <del>{productPrice}</del> (-{productDiscount}%)</span>
                    <span>৳ {Math.round(productPrice - ((productPrice * productDiscount) / 100))}</span>
                </div>
            </Link>
        </>
    );
};

export default HPBottomOneProduct;