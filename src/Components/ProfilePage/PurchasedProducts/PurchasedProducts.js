import './PurchasedProducts.css'
import { BsPlusLg } from 'react-icons/bs';
import { useState } from 'react';
import ShowPurchasedProducts from './ShowPurchasedProducts/ShowPurchasedProducts';


const PurchasedProducts = (props) => {
    const [productsShow, setProductShow] = useState(false)

    const {date, status, cartProducts} = props.products
    // console.log(props.products)
    return (
        <>
            <div className={`purchased_products`}>
                <span className="purchased_products_date">{date}</span>
                <span className={`${status === 'pending' ? 'purchased_products_status_pending' : 'purchased_products_status_success'}`}>{status}</span>
                <BsPlusLg className='purchased_products_plus' onClick={(e) => setProductShow(!productsShow)} />
            </div>
            <div className={`purchased_products_show ${productsShow === true && 'purchased_product_show_active'}`}>
                {
                    cartProducts.map(product => <ShowPurchasedProducts key={product.id} product={product} />)
                }
            </div>
        </>
    )
}

export default PurchasedProducts;