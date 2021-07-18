import React, { useContext, useState } from 'react';
import './HPBottomSingleProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ScrollContainer from 'react-indiana-drag-scroll';
import { CategoryData } from '../../../../../App';
import { Link } from 'react-router-dom';


const HPBottomSingleProduct = (props) => {
    const [categories, setCategories] = useContext(CategoryData)
    const [selection, setSelection] = useState('brands')
    let selectedCategoryData = null
    if(categories) {
        selectedCategoryData = categories[props.id]
    }
    // console.log(selectedCategoryData)

    return (
        <>
            {
                selectedCategoryData && <div className="home_single_category_products">
                    <div className="home_products_heading">
                        <h1>{selectedCategoryData.name}</h1>
                        <div className="brands_products">
                            <p className={`${selection === 'brands' && 'brands_product_active'}`} onClick={() => setSelection('brands')}>Brands</p>
                            <p className={`${selection === 'products' && 'brands_product_active'}`} onClick={() => setSelection('products')}>All Product</p>
                        </div>
                        <div className="products_category_search">
                            <input id={'search' + props.id} type="text" placeholder="Search product..."/>
                            <label htmlFor={'search' + props.id}><FontAwesomeIcon icon={faSearch} /></label>
                        </div>
                    </div>
                    <div className="home_products_show">
                        {
                            selection === 'brands' ? <div className="HP_show_brands">
                                <ScrollContainer className="scroll-container">
                                    <div className="drag_scroll_brands">
                                        {
                                            selectedCategoryData ? selectedCategoryData.brands?.map(data => <Link to={`/brand/${data.brandCategory}/${data.brandName}`} key={data._id}><img src={data.brandImage} alt="" /></Link>) : <h1>loading data</h1>
                                        }
                                    </div>
                                </ScrollContainer>
                            </div> : <div className="HP_show_products">
                                <ScrollContainer className="scroll-container">
                                    <div className="drag_scroll_products">
                                        {
                                            selectedCategoryData ? selectedCategoryData.products?.map(data => 
                                            <Link key={data.id} to={`/product/${data.productCategory}/${data.id}`}>
                                                <img src={data.productImage} alt="" />
                                                <p>{data.productName}</p>
                                                <span>৳ {data.productPrice} (-{data.productDiscount}%)</span>
                                            </Link>) : <h1>loading data</h1>
                                        }
                                    </div>
                                </ScrollContainer>  
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default HPBottomSingleProduct;