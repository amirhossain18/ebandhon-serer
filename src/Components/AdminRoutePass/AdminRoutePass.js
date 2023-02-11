import React, { useState } from 'react';
import './AdminRoutePass.css'

const AdminRoutePass = (data) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const submitBtn = () => {
        if(inputValue === "prion1122"){
            setError('')
            data.data({status: "success"})
        }
        else{
            setError('The secret code is invalid!')
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
            <div className="admin_secret_check">
                <h1>This is an admin only page. So please put your secret code here.</h1>
                <input onChange={(e) => setInputValue(e.target.value)} type="password" placeholder="Put your secret code*"/>
                {
                    error && <p className="text-danger">{error}</p>
                }
                <button onClick={submitBtn}>SUBMIT</button>
            </div>
        </div>
    );
};

export default AdminRoutePass;