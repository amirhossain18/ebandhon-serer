import React, { useContext, useState } from 'react';

import './HPBottomSingleProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ScrollContainer from 'react-indiana-drag-scroll';
import { CategoryData } from '../../../../../App';
import { Link } from 'react-router-dom';
import HPBottomOneProduct from './HPBottomOneProduct/HPBottomOneProduct';
import HPBottomOneBrand from './HPBottomOneBrand/HPBottomOneBrand';


const HPBottomSingleProduct = (props) => {
    const [categories, setCategories] = useContext(CategoryData)
    const [selection, setSelection] = useState('brands')
    let selectedCategoryData = null
    if(categories) {
        selectedCategoryData = categories[props.id]
    }
    // console.log(selectedCategoryData)

    return (
        <div className='animate__animated animate__bounce animate__repeat-2'>
            {
                selectedCategoryData && <div className="home_single_category_products">
                    <div className="home_products_heading">
                        {/* <Link className="home_category_show_all" to={`/category/${selectedCategoryData.name}`}>{selectedCategoryData.name}</Link> */}
                        <span className="home_category_show_all">{selectedCategoryData.name}</span>
                        <div className="brands_products">
                            {/* <p className={`${selection === 'brands' && 'brands_product_active'}`} onClick={() => setSelection('brands')}>Brands</p> */}
                            <p >Product</p>
                        </div>
                        <div >
                        <Link className="home_category_show_all" to={`/category/${selectedCategoryData.name}`}>All Product</Link>
                        </div>
                    </div>
                    <div className="home_products_show">
                        {
                            selection === 'brands' ? <div className="HP_show_products">
                            <ScrollContainer className="scroll-container">
                                <div className="drag_scroll_products">
                                    {
                                        selectedCategoryData ? selectedCategoryData.products?.map((data, index) => <HPBottomOneProduct data={data} key={index}/>) : <h1>loading data</h1>
                                    }
                                </div>
                            </ScrollContainer>  
                        </div>:<div className="HP_show_brands">
                                <ScrollContainer className="scroll-container">
                                    <div className="drag_scroll_brands">
                                        {
                                            selectedCategoryData ? selectedCategoryData.brands?.map((data, index) => <HPBottomOneBrand data={data} key={index}/>) : <h1>loading data</h1>
                                        }
                                    </div>
                                </ScrollContainer>
                            </div> 
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default HPBottomSingleProduct;