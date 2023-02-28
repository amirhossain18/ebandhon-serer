import './UploadProfileImage.css';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useContext, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import loading from '../../../images/Spin-1.6s-200px.gif'
import useLocalStorage from '../../LocalStorage/LocalStorage';
import { CartProducts } from '../../../App';

const UploadProfileImage = (props) => {
    const [loginData, setLoginData] = useLocalStorage('user_data', {})
    const [cartInfo, setCartInfo] = useContext(CartProducts)

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


    const uploadImage = (e) => {
        // console.log({image: imageLink, id: cartInfo._id})
        fetch(`http://localhost:5000/upload-profile-image/id?id=${cartInfo._id}`, {
            method:'POST',
            headers: { 'content-type':'application/json'},
            body:JSON.stringify({image: imageLink, uid: cartInfo._id})
        })
        .then(res => res.json())
        .then(result => {
            console.log(result.modifiedCount)
        })
    }
    return (
        <div className='profile_image_upload'>
            <div className='profile_image_upload_div'>
                {
                    imageLink ? <div>
                        <img className='profile_upload_image_show' src={imageLink} alt="" />
                        <div className="profile_upload_image_confirm_cancel">
                            <button onClick={e => uploadImage(e)} className='btn profile_image_upload_btn'>Upload</button>
                            <button onClick={e => props.setProfileImage(false)} className='btn profile_image_upload_btn'>Cancel</button>
                        </div>
                    </div> : 
                    (imageLoading === true ? <img src={loading} alt="" /> : 
                    <div>
                        <FaTimes onClick={e => props.setProfileImage(false)} className='profile_image_close' />
                        <label htmlFor="profile_image_upload_label" className='profile_image_upload_label'>Upload Image</label>
                        <IKContext
                            publicKey="public_5rRmOCN1vK/MI28l98iNzt8jNhQ="
                            urlEndpoint="https://ik.imagekit.io/ebnirpt9i8agxu"
                            transformationPosition="path"
                            authenticationEndpoint="http://localhost:5000/auth">
                                
                            {
                                imageLink && <img className="CP_image_upload_show" src={imageLink} alt="" />
                            }
                            <IKUpload className='profile_image_upload_input' id="profile_image_upload_label" onChange={(e) => imageUpload(e)} onError={onError} onSuccess={onSuccess} fileName="my-upload" />
                        </IKContext>
                    </div>)
                }
            </div>
        </div>
    )
}

export default UploadProfileImage;