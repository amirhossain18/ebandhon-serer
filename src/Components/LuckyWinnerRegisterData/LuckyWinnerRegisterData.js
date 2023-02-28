import React, { useEffect, useState } from 'react';
import './LuckyWinnerRegisterData.css'

const LuckyWinnerRegisterData = () => {
    const [registerData, setRegisterData] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/get-lucky-winner-data')
        .then(res => res.json())
        .then(data => setRegisterData(data))
    }, [])

    return (
        <div className="container register_data">
            <h1>Total {registerData && registerData.length} people submitted the form.</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Number</th>
                        <th>ID</th>
                    </tr>
                </thead>
                {
                    registerData && registerData.map(data => <tbody key={data.uniqueId}>
                        <tr>
                            <td>{data.fullName}</td>
                            <td>{data.email}</td>
                            <td>{data.address}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.code && data.code}</td>
                        </tr>
                    </tbody>)
                }
            </table>
        </div>
    );
};

export default LuckyWinnerRegisterData;