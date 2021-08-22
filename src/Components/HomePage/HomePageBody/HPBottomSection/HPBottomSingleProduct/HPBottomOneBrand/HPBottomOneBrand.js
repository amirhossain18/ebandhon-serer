import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HPBottomOneBrand.css';
import defaultImage from '../../../../../../images/Spin-1.6s-200px.gif'

const HPBottomOneBrand = (props) => {
    const {brandCategory, brandName, brandImage} = props.data;
    const [imageLoad, setImageLoad] = useState(false)
    return (
        <>
            <Link to={`/brand/${brandCategory}/${brandName}`}>
                <img className="d-none" onLoad={() => setImageLoad(true)} src={brandImage} alt="" />
                {
                    imageLoad ? <img src={brandImage} alt="" /> : <img src={defaultImage} alt="" />
                }
            </Link>
        </>
    );
};

export default HPBottomOneBrand;