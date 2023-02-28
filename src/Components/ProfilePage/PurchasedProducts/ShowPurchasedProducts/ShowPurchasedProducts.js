import { useContext, useEffect, useState } from 'react';
import { CategoryData } from '../../../../App';
import './ShowPurchasedProducts.css';

const ShowPurchasedProducts = (props) => {
    const [categories, setCategories] = useContext(CategoryData)

    const [selectedProduct, setSelectedProduct] = useState({})


    const {id, mainPrice, productCategory, quantity} = props.product
    const {productName, productPrice, productImage} = selectedProduct

    useEffect(() => {
        if(categories) {
            setSelectedProduct((categories.find(category => category.name === productCategory)).products.find(product => product.id === id))
        }
    }, [categories])
    return (
        <div className='purchased_product_single_item'>
            <div className='PPSI_image_name_quantity'>
                <img src={productImage} alt="" />
                <div className="PPSI_name_quantity">
                    <h3>{productName}</h3>
                    <span>Quantity - {quantity}</span>
                </div>
            </div>
            <h3 className='PPSI_price'>৳ {mainPrice*quantity}</h3>
        </div>
    )
}

export default ShowPurchasedProducts;