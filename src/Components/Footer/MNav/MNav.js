import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoryOpen } from '../../../App';
import './MNav.css'

const MNav = () => {
  const [categoryOpen, setCategoryOpen] = useContext(CategoryOpen)
    return (
        <>


<div className="navbar">
  

  <span onClick={() => setCategoryOpen(!categoryOpen)}>Category</span>
  <Link to="/campaign">Campaign</Link>
  <Link to="/" className="active">Home</Link>
  <Link to="/page/cart">Cart</Link>
  <Link to="/profile">Profile</Link>
</div>


             
        </>
    );
};

export default MNav;