import React, { useEffect, useState } from 'react';
import './LuckyWinnerForm.css';
import { useForm } from "react-hook-form";
import Count from './Time/Count';

const LuckyWinnerForm = () => {
    const [luckyWinnerData, setLuckyWinnerData] = useState([])
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        document.title = "Lucky Winner Form | E-Bandhon"
      }, [])

    useEffect(() => {
        fetch('http://localhost:5000/get-lucky-winner-data')
        .then(res => res.json())
        .then(data => setLuckyWinnerData(data))
    }, [])

    const [error, setError] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setLoading(true)
        fetch('http://localhost:5000/get-lucky-winner-data')
        .then(res => res.json())
        .then(registeredData => {
            setSuccess('')
            const random = Math.round(Math.random() * 1000000000).toString() + data.phoneNumber
            const newData = {...data}
            newData.uniqueId = random;
            newData.code = parseInt(registeredData[registeredData.length - 1].code) + 1
            const alreadySubmittedNumber = registeredData.find(data => data.phoneNumber === newData.phoneNumber)
            const alreadySubmittedEmail = registeredData.find(data => data.email === newData.email)
            setError('')

            if(data.phoneNumber.length === 11 || data.phoneNumber.length === 13) {
                setError('')
                if(alreadySubmittedEmail === undefined) {
                    setError('')
                    if(alreadySubmittedNumber === undefined) {
                        setError('')
                        fetch('http://localhost:5000/add-lucky-winner-data', {
                            method:'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(newData)
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.insertedCount === 1) {
                                fetch('http://localhost:5000/get-lucky-winner-data')
                                .then(res => res.json())
                                .then(data => {
                                    setLuckyWinnerData(data)
                                    setSuccess('Your record has been saved. Thank you for participating.')
                                    setLoading(false)
                                })
                            }
                        })
                    }
                    else {
                        setError('This phone number is already registered!')
                        setLoading(false)
                    }
                }
                else {
                    setError('This email address is already registered!')
                    setLoading(false)
                }
            }
            else {
                setError('Please check your phone number and try again!')
                setLoading(false)
            }
        })
    };

    return (
        <div className="container lucky_winner_form_page">
            <form onSubmit={handleSubmit(onSubmit)} className="LW_form">
                <h1>Eid Offer from</h1>
                <iframe className="pc_facebook_like" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Febandhon&tabs=timeline&width=420px&height=130px&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=344799740222711" width="420px" height="130px" style={{border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" title="E-bandhon Facebook"></iframe>
                <iframe className="phone_facebook_like" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Febandhon&tabs=timeline&width=280px&height=130px&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=344799740222711" width="280px" height="130px" style={{border:'none', overflow:'hidden'}} scrolling="no" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" title="E-bandhon Facebook"></iframe>
                <p className="lucky_winner_page_slogan">*উপরে আমাদের অফিসিয়াল পেইজে লাইক দিয়ে সঠিক তথ্য প্রদান করে ফরম টি পূরণ করে সাবমিট করুন।</p>
                <Count/>
                <div className="LW_field">
                    <label htmlFor="fullName">Full Name</label>
                    <input id="fullName" type="text" {...register("fullName", { required: true })} placeholder="Full Name*"/>
                </div>
                <div className="LW_field">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input id="phoneNumber" type="number" {...register("phoneNumber", { required: true })} placeholder="Phone Number*"/>
                </div>
                <div className="LW_field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" {...register("email", { required: true })} placeholder="Email*"/>
                </div>
                <div className="LW_field">
                    <label htmlFor="address">Present Address</label>
                    <input id="address" type="text" {...register("address", { required: false })} placeholder="Present Address (Optional)*"/>
                </div>
                <div className="LW_field">
                    <label htmlFor="facebookIdName">Facebook ID Name</label>
                    <input id="facebookIdName" type="text" {...register("facebookIdName", { required: true })} placeholder="Facebook ID Name*"/>
                </div>
                {
                    error && <p className="LW_error">{error}</p>
                }
                {
                    success && <p className="LW_success">{success}</p>
                }
                {
                    loading === true ? <div className="LW_submitting"><p className="btn LW_submit_btn">Submitting</p></div> : <button type="submit" className="btn LW_submit_btn">Submit</button>
                }
            </form>
        </div>
    );
};

export default LuckyWinnerForm;