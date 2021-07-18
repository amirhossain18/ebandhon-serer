import React, {useState, useEffect}  from 'react';
import './Time.css'

const Count = () => {
    const [time, setTime] = useState({})
    useEffect(() => {
         let countdownDate = new Date("jul 22, 2021 22:00:00").getTime();
         //update every secender count
         let x = setInterval( function () {
            //get tpdays date and timers
            let now = new Date().getTime();

            // fint the distance between now and count down Date

            let distance = countdownDate - now;

            let days = Math.floor(distance /(1000 * 60* 60 * 24));
            let hours = Math.floor( (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTime({days:days, hours:hours, minutes:minutes, seconds:seconds})
                if (distance < 0) {
                    clearInterval(x);
                    setTime("Happy Eid Rafael Draw ")
                }
         },1000 );

    },[])
    return (
        <>
            {
                time && <div className="countdown_timer">
                    <div className="four_type">
                        <h1>{time.days && time.days.toString().length === 1 && '0'}{time.days}</h1>
                        <h2>DAYS</h2>
                    </div>
                    <span>:</span>
                    <div className="four_type">
                        <h1>{time.hours && time.hours.toString().length === 1 && '0'}{time.hours}</h1>
                        <h2>HOURS</h2>
                    </div>
                    <span>:</span>
                    <div className="four_type">
                        <h1>{time.minutes && time.minutes.toString().length === 1 && '0'}{time.minutes}</h1>
                        <h2>MINUTES</h2>
                    </div>
                    <span>:</span>
                    <div className="four_type">
                        <h1>{time.seconds && time.seconds.toString().length === 1 && '0'}{time.seconds}</h1>
                        <h2>SECONDS</h2>
                    </div>
                </div>
            }
        </>
    );
   
};

export default Count;