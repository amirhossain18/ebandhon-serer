import React, { useContext, useState } from 'react';
import { CategoryData } from '../../App';
import './BrandUploadPage.css'
import { IKContext, IKUpload } from 'imagekitio-react';

const BrandUploadPage = () => {
    const [categories, setCategories] = useContext(CategoryData)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [brandName, setBrandName] = useState('')
    // const [brandImage, setBrandImage] = useState()

    // uploading image and getting link
    const [imageLoading, setImageLoading] = useState(false)
    const [imageLink, setImageLink] = useState('')
    const onError = err => {
        setImageLoading(false)
        setImageLink('')
    };
      
    const onSuccess = res => {
        setImageLoading(false)
        setImageLink(res.url)
    };

    const imageUpload = (e) => {
        if(e.target.value){
            setImageLink('')
            setImageLoading(true)
        }
    }

    const select_category = (e) => {
        setSelectedCategory(e.target.value)
    }
    const randomId = Math.random()
    const category = categories?.find(category => category.name === selectedCategory)
    const upload_brand = (e) => {
        e.preventDefault()
        if(category) {
            if(brandName) {
                if(imageLink) {
                    let data = {...category}
                    let brands = {brandName, brandImage:imageLink, brandCategory:selectedCategory, id:randomId}
                    if (data.brands) {
                        data.brands =  [...category.brands, brands]
                    }
                    else {
                        data.brands =  [brands]
                    }
                    // console.log(data)
                    fetch(`https://bandhon-ecommerce.herokuapp.com/add-brand/id?id=${category._id}`, {
                        method:'PATCH',
                        headers: { 'content-type':'application/json'},
                        body:JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert('New brand successfully added.')
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
                else {
                    alert('Please select a brand photo')
                }
            }
            else {
                alert('Please write a brand name')
            }
        }
        else {
            alert('Please select a category.')
        }
        
    }

    return (
        <div className="brand_upload">
            <form action="">
                <div className="brand_category brand_field_div">
                    <label htmlFor="brand_category">Choose Category</label>
                    <select onChange={(e) => select_category(e)} id="brand_category">
                        <option value="Select Category">Select Category</option>
                        {
                            categories?.map(category => <option key={category._id}>{category.name}</option>)
                        }
                    </select>
                </div>
                <div className="brand_name brand_field_div">
                    <label htmlFor="brand_name">Brand Name</label>
                    <input onChange={(e) => setBrandName(e.target.value)} id="brand_name" type="text" placeholder="Brand Name..." required/>
                </div>
                <div className="brand_image brand_field_div">
                    <label htmlFor="brand_image">Upload Brand Image</label>
                    {/* <input onChange={(e) => setBrandImage(e.target.value)} id="brand_image" type="text" placeholder="Brand Image Link..."/> */}
                    <IKContext
                        publicKey="public_5rRmOCN1vK/MI28l98iNzt8jNhQ="
                        urlEndpoint="https://ik.imagekit.io/ebnirpt9i8agxu"
                        transformationPosition="path"
                        authenticationEndpoint="https://bandhon-ecommerce.herokuapp.com/auth">

                        <h1>{imageLoading && 'uploading image'}</h1>
                        {
                            imageLink && <img className="CP_image_upload_show" src={imageLink} alt="" />
                        }
                        <IKUpload onChange={(e) => imageUpload(e)} onError={onError} onSuccess={onSuccess} fileName="my-upload" />
                    </IKContext>
                </div>
                <button onClick={upload_brand} className="brand_upload_btn">Upload</button>
            </form>
        </div>
    );
};

export default BrandUploadPage;