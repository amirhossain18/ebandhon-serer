import React, { useContext, useEffect } from 'react';
import './BrandPage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { CategoryData } from '../../App';
import { Link, useParams } from 'react-router-dom';
import loader from '../../images/GIF/Funnel.gif'

const Brandproduct = () => {
   useEffect(() => {
      document.title = "Product Brands | E-Bandhon"
    }, [])

   const [categories, setCategories] = useContext(CategoryData)
   const {catName, brandName} = useParams()
   const selectedCategory = categories?.find(category => category.name === catName)
   const selectedBrand = selectedCategory?.brands.find(brand => brand.brandName === brandName)
   const selectedBrandProduct = selectedCategory?.products?.filter(product => product.productBrand === brandName)

   useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

   return (
      <>
         <Header></Header>
         {
            categories === null ? <img className="loader" src={loader} alt="" /> : <div className="container brand_page">
            <div className="bp_brand_image">
               <img src={selectedBrand.brandImage} alt="" />
            </div>
            <div className="brand_page_all_products cat_all_products">
               <h2>All Products</h2>
               <div className="bp_products_list cat_products_list">
                  {
                     selectedBrandProduct ? selectedBrandProduct.map(product => <Link className="bp_single_product cat_single_product" to={`/product/${product.productCategory}/${product.id}`}>
                     <div key={product.id} >
                        <img src={product.productImage} alt="" />
                        <p>{product.productName}</p>
                        <span>৳ {product.productPrice} (-{product.productDiscount}%)</span>
                     </div></Link>) : <h1>No products found</h1>
                  }
               </div>
            </div>
         </div>
         }
         <Footer></Footer>
      </>
   );
};

export default Brandproduct;