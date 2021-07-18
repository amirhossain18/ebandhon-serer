import React, { useContext, useEffect, useState } from 'react';
import { CategoryData } from '../../App';
import './ProductUploadPage.css';
import { useForm } from "react-hook-form";



const UploadPage  = () => {
  const [categories, setCategories] = useContext(CategoryData)
  const [selectedCategory, setSelectedCategory] = useState('Motor Bike')
  const [descriptionInput, setDescriptionInput] = useState([{id:0}])
  const [selectedBrand, setSelectedBrand] = useState('')
   
  const select_category = (e) => {
    setSelectedCategory(e.target.value)
  }
  const category = categories?.find(category => category.name === selectedCategory)
  
  const select_brand = (e) => {
    setSelectedBrand(e.target.value)
  }

  const add_box = (e) => {
    e.preventDefault()
    if (descriptionInput.length === 10) {
      alert('maximum number of description input added')
    }
    else {
      setDescriptionInput([...descriptionInput, {id:descriptionInput.length}])
    }
  }

  const randomId = Math.random()

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    if(selectedBrand === 'Select Brand' || selectedBrand === '') {
      alert('Please select a brand first.')
    }
    else {
      let products = {...data, productCategory:selectedCategory, productBrand:selectedBrand, id:randomId}
      // console.log(products)
      let catData = {...category}
      if (catData.products) {
          catData.products =  [...category.products, products]
      }
      else {
          catData.products =  [products]
      }
      fetch(`https://bandhon-ecommerce.herokuapp.com/add-product/id?id=${category._id}`, {
          method:'PATCH',
          headers: { 'content-type':'application/json'},
          body:JSON.stringify(catData)
      })
      .then(response => response.json())
      .then(data => {
          alert('New product successfully added.')
          fetch(`https://bandhon-ecommerce.herokuapp.com/get-categories`)
          .then(res => res.json())
          .then(data => {
              setCategories(data)
              }
          )
      })
      .catch(error => {
          console.error(error)
      })
    }
  };

  return (
    <div className="mform container">
      <h1 > Product Upload Page </h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="upload_category product_field">
          <label>Category</label>
          <select onChange={(e) => select_category(e)} name="" id="">
            {
              categories?.map(category => <option key={category._id} value={category.name}>{category.name}</option>)
            }
          </select>
        </div>
        <div className="upload_brand product_field">
          <label>Select Brand</label>
          <select name="" id="" onChange={(e) => select_brand(e)}>
            <option value="Select Brand">Select Brand</option>
            {
              category?.brands?.map(brand => <option key={brand._id} value={brand.brandName}>{brand.brandName}</option>)
            }
          </select>
        </div>
        <div className="upload_product_name product_field">
          <label htmlFor="product_name">Product Name</label>
          <input {...register("productName")} id="product_name" type="text" placeholder="Product Name..." required/>
        </div>
        <div className="upload_product_name product_field">
          <label htmlFor="product_image">Product Image</label>
          <input {...register("productImage")} id="product_image" type="text" placeholder="Product Image..." required/>
        </div>
        <div className="upload_details product_field">
          <label htmlFor="product_details">Product Quantity</label>
          <input {...register("productQuantity")} id="product_details" type="number" placeholder="Product Quantity..." required/>
        </div>
        <div className="upload_price product_field">
          <label htmlFor="upload_price">Price(TK)</label>
          <input {...register("productPrice")} type="number" id="upload_price" placeholder="Price(TK)" required />
        </div>
        <div className="upload_discount product_field">
          <label htmlFor="upload_discount">Discount(%)</label>
          <input {...register("productDiscount")} id="upload_discount" type="number" placeholder="Discount(%)" required/>
        </div>
        {
          descriptionInput.map(data => <div className="upload_product_name product_field">
              <label htmlFor={`product_description_${data.id}`}>Product Description {data.id}</label>
              <input {...register(`productDescription${data.id}`)} id={`product_description_${data.id}`} type="text" placeholder={`Product Description ${data.id}...`} required/>
            </div>)
        }
        <button>Upload</button>
        <button type="submit" onClick={add_box} class="m-2">Add Description Box</button>
      </form>
    </div>
  );
};

export default UploadPage ;