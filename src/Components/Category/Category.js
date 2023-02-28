import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryData } from '../../App';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Category.css';
import { Link } from 'react-router-dom'
import loader from '../../images/GIF/Funnel.gif'





const Category = () => {
   useEffect(() => {
      document.title = "Products Category | E-Bandhon"
    }, [])

   const [categories, setCategories] = useContext(CategoryData)
   const { catName } = useParams()
   const selectedCategory = categories?.find(category => category.name === catName)

   useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

   return (
      <>
         <Header></Header>
         {
            categories === null ? <img className="loader" src={loader} alt="" /> : <div className="container category_page">
               {/* <div className="cat_brand">
                  <h2>Brands</h2>
                  <div className="cat_brands_list">
                     {
                        selectedCategory.brands ? selectedCategory.brands.map(brand => <Link to={`/brand/${brand.brandCategory}/${brand.brandName}`} key={brand.index} className="cat_single_brand">
                           <img src={brand.brandImage} alt="" />
                        </Link>) : <h1>No brands found</h1>
                     }
                  </div>
               </div> */}
               <div className="cat_all_products">
                  <h2>All Products</h2>
                  <div className="cat_products_list">
                     {
                        selectedCategory.products ? selectedCategory.products.map((product, index) => <Link key={index} to={`/product/${product.productCategory}/${product.id}`} className="cat_single_product">
                           <p className="product_dis_home">-{product.productDiscount}%</p>
                           <img src={product.productImage} alt="" />
                           <p>{product.productName}</p>
                           {/* <span>৳ {product.productPrice} (-{product.productDiscount}%)</span> */}
                           <div className="drag_scroll_product drag_scroll_product_price">
                              <span title={product.productPrice}>৳ <del>{product.productPrice}</del> (-{product.productDiscount}%)</span>
                              <span>৳ {Math.round(product.productPrice - ((product.productPrice * product.productDiscount) / 100))}</span>
                           </div>
                        </Link>) : <h1>No products found</h1>
                     }
                  </div>
               </div>
            </div>
         }
         <Footer></Footer>
      </>
   );
};

export default Category;