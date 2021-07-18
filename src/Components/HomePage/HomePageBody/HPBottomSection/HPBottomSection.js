import React, { useContext, useState } from 'react';
import { CategoryData } from '../../../../App';
import './HPBottomSection.css'
import HPBottomSingleProduct from './HPBottomSingleProduct/HPBottomSingleProduct';
import loader from '../../../../images/GIF/Funnel.gif'


const HPBottomSection = () => {
    const [categories, setCategories] = useContext(CategoryData)
    const [count, setCount] = useState(2)
    const serial = [
        {id: 0},
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10},
        {id: 11},
        {id: 12},
        {id: 13},
        {id: 14},
        {id: 15}
    ]
    // console.log(count)
    let finalData = serial.slice(0, count)

    const showMoreBtn = (e) => {
        e.preventDefault()
        setCount(count + 2)
    }

    return (
        <>
            {
                categories ? <div className="home_page_bottom_section">{
                    finalData.map(data => <HPBottomSingleProduct key={data.id} id={data.id}></HPBottomSingleProduct>)
                }
                {
                    count >= 16 ? '' : <button onClick={(e) => showMoreBtn(e)} className="btn home_show_more_btn">Show More</button>
                }</div> : <img className="loader" src={loader} alt="" />
            }
        </>
    );
};

export default HPBottomSection;