import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Desiner from './Desiner';
import Dev from './Dev';
import './Freelancer.css'

const Freelancer = () => {
    return (
        <div className='container'>
        <Tabs
 defaultActiveKey="profile"
 id="fill-tab-example"
 className="mb-3"
 fill
>
 <Tab  eventKey="home"  title="Desiner">
   <Desiner></Desiner>
 </Tab>
 <Tab eventKey="profile" title="Developer">
<Dev></Dev>
 </Tab>
 <Tab eventKey="longer-tab" title="SEO">
 <p>This is Seo Section</p>
 </Tab>
 <Tab eventKey="contact" title="Video Editing" >
 <p>This is Video Section</p>
 </Tab>
</Tabs> 
   </div>
    );
};

export default Freelancer;