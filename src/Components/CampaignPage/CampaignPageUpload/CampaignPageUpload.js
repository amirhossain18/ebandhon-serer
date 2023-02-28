import React, { useEffect, useState } from 'react';
import './CampaignPageUplaod.css'
import uuid from 'react-uuid'
import { IKContext, IKUpload } from 'imagekitio-react';
import useLocalStorage from '../../LocalStorage/LocalStorage';
import AdminRoutePass from '../../AdminRoutePass/AdminRoutePass';

const CampaignPageUpload = () => {
    const [campaignData, setCampaignData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Maldives Tour')
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productImage, setProductImage] = useState('')
    useEffect(() => {
        fetch('http://localhost:5000/get-campaign-data')
        .then(response => response.json())
        .then(data => setCampaignData(data))
    }, [])

    // image upload process
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


    const uploadCampaignProduct = (e) => {
        e.preventDefault()
        const uniqueId = uuid()
        const selectedCat = campaignData.find(data => data.title === selectedCategory)
        const productData = [{productName, productPrice, productImage:imageLink, productCategory:selectedCategory, productId:uniqueId}]
        let newData = []
        if(selectedCat.products){
            const data = [...selectedCat.products, {productName, productPrice, productImage:imageLink, productCategory:selectedCategory, productId:uniqueId}]
            newData = data
        }
        if(selectedCat.products) {
            fetch(`http://localhost:5000/add-campaign-product/id?id=${selectedCat._id}`, {
                method:'PATCH',
                headers: { 'content-type':'application/json'},
                body:JSON.stringify(newData)
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount !== 0) {
                    fetch('https://ebandhon-server.up.railway.appget-campaign-data')
                    .then(response => response.json())
                    .then(data => {
                        setCampaignData(data)
                        alert('Product added in campaign successfully.')
                    })
                }
                else{
                    alert('Something went wrong, please try again.')
                }
            })
        }
        else{
            fetch(`http://localhost:5000/add-campaign-product/id?id=${selectedCat._id}`, {
                method:'PATCH',
                headers: { 'content-type':'application/json'},
                body:JSON.stringify(productData)
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount !== 0) {
                    fetch('https://ebandhon-server.up.railway.appget-campaign-data')
                    .then(response => response.json())
                    .then(data => {
                        setCampaignData(data)
                        alert('Product added in campaign successfully.')
                    })
                }
                else{
                    alert('Something went wrong, please try again.')
                }
            })
        }
    }

    const [adminSecret, setAdminSecret] = useLocalStorage('admin_secret', {})
    const adminSecretFind = (data) => {
        if(data.status === 'success') {
            setAdminSecret({status: true})
        }
        else{
            setAdminSecret({status: false})
        }
    }
    return (
        <>
            {
                !adminSecret.status && <AdminRoutePass data={adminSecretFind}/>
            }
            {
                adminSecret.status === true && <div className="container">
                    <div className="brand_upload mt-4">
                        <form action="">
                            <div className="brand_category brand_field_div">
                                <label htmlFor="brand_category">Choose Category</label>
                                <select onChange={(e) => setSelectedCategory(e.target.value)} id="category">
                                    {
                                        campaignData?.map(data => <option key={data._id}>{data.title}</option>)
                                    }
                                </select>
                            </div>
                            <div className="product_name brand_field_div">
                                <label htmlFor="product_name">Product Name</label>
                                <input onChange={(e) => setProductName(e.target.value)} id="product_name" type="text" placeholder="Product Name..." required/>
                            </div>
                            <div className="product_price brand_field_div">
                                <label htmlFor="product_price">Product Main Price</label>
                                <input onChange={(e) => setProductPrice(e.target.value)} id="product_price" type="number" placeholder="Product Main Price..." required/>
                            </div>
                            <div className="product_image brand_field_div">
                                <label htmlFor="product_image">Product Image URL</label>
                                {/* <input onChange={(e) => setProductImage(e.target.value)} id="product_image" type="text" placeholder="Product Image URL..." required/> */}
                                <IKContext
                                    publicKey="public_5rRmOCN1vK/MI28l98iNzt8jNhQ="
                                    urlEndpoint="https://ik.imagekit.io/ebnirpt9i8agxu"
                                    transformationPosition="path"
                                    authenticationEndpoint="https://ebandhon-server.up.railway.appauth">

                                    <h1>{imageLoading && 'uploading image'}</h1>
                                    {
                                        imageLink && <img className="CP_image_upload_show" src={imageLink} alt="" />
                                    }
                                    <IKUpload onChange={(e) => imageUpload(e)} onError={onError} onSuccess={onSuccess} fileName="my-upload" />
                                </IKContext>
                            </div>
                            <button onClick={(e) => uploadCampaignProduct(e)} className="brand_upload_btn">Upload</button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default CampaignPageUpload;