import React, { useState } from 'react';
import './HotDealAdmin.css';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useForm } from "react-hook-form";
import useLocalStorage from '../LocalStorage/LocalStorage';
import AdminRoutePass from '../AdminRoutePass/AdminRoutePass'

const HotDealAdmin = () => {
    const [selectSection, setSelectSection] = useState('upload')

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
                adminSecret.status === true && <div className="container hot_deal_manage">
                    <div className="upload_manage">
                        <span onClick={() => setSelectSection("upload")} className={`upload_manage_span ${selectSection === 'upload' && "up_active"}`}>Upload</span>
                        <span className="middle_dot"></span>
                        <span onClick={() => setSelectSection("manage")} className={`upload_manage_span ${selectSection === 'manage' && "up_active"}`}>Manage</span>
                    </div>
                    {
                        selectSection === 'upload' ? <HotDealAdminUpload/> : <h1 className="mt-4">This page is not ready yet</h1>
                    }
                </div>
            }
        </>
    );
};

export default HotDealAdmin;

const HotDealAdminUpload = () => {
    const [descriptionInput, setDescriptionInput] = useState([{id:0}])

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

    const add_box = (e) => {
        e.preventDefault()
        if (descriptionInput.length === 10) {
          alert('maximum number of description input added')
        }
        else {
          setDescriptionInput([...descriptionInput, {id:descriptionInput.length}])
        }
      }

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        if(imageLink !== ''){
            const hotDealData = {...data, productImage: imageLink}
            fetch(`http://localhost:5000/add-hot-deal-data`, {
                method: 'POST',
                headers: { 'content-type':'application/json'},
                body:JSON.stringify(hotDealData)
            })
            .then(response => response.json())
            .then(result => {
                if(result.insertedCount !== 0){
                    alert('Data added in database successfully')
                }
                else{
                    alert('Something went wrong, please try again')
                }
            })
        }
        else{
            alert('Please upload a product image*')
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="hot_deal_manage_upload">
            <input {...register("productName")} placeholder="Product Name*" type="text" required/>
            <input {...register("productDiscount")} placeholder="Product Discount*" type="text" required/>
            <input {...register("productPrice")} placeholder="Product Price*" type="text" required/>
            <input {...register("productBrand")} placeholder="Product Brand*" type="text" required/>
            <input {...register("productQuantity")} placeholder="Product Quantity*" type="text" required/>
            <IKContext
                publicKey="public_5rRmOCN1vK/MI28l98iNzt8jNhQ="
                urlEndpoint="https://ik.imagekit.io/ebnirpt9i8agxu"
                transformationPosition="path"
                authenticationEndpoint="http://localhost:5000/auth">

                <h1>{imageLoading && 'uploading image'}</h1>
                {
                    imageLink && <img className="CP_image_upload_show" src={imageLink} alt="" />
                }
                <IKUpload onChange={(e) => imageUpload(e)} onError={onError} onSuccess={onSuccess} fileName="my-upload" />
            </IKContext>
            {
              descriptionInput.map((data, index) => <input key={index} {...register(`productDescription${data.id}`)} type="text" placeholder={`Product Description ${data.id}*`} required/>)
            }
            {
                descriptionInput.length !== 10 && <button onClick={add_box} className="mb-2 hot_deal_upload_btn">Add Description Box</button> 
            }
            <button type="submit" className="hot_deal_upload_btn">Upload Hot Deal</button>
        </form>
    );
};