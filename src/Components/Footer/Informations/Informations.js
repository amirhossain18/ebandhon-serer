import React from 'react';
import style from './Information.css'

const Informations = () => {
    return (
       <div>
           <div className="container">
                 
                    
                     <div >
                     <div width="100%" className="table1">
                     <tr>
                         <td width="75px">
                             <div className="logotype">
                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVYAAACACAYAAABQv0EFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5YWU4YTExMi1jOTNhLTE1NGQtOWUzZC1mNzZjZDRlNzQ4N2YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkFGMjNGRENENjQ4MTFFQjk4MkJFNjJFREI5RDEyRDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkFGMjNGREJENjQ4MTFFQjk4MkJFNjJFREI5RDEyRDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OWFlOGExMTItYzkzYS0xNTRkLTllM2QtZjc2Y2Q0ZTc0ODdmIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlhZThhMTEyLWM5M2EtMTU0ZC05ZTNkLWY3NmNkNGU3NDg3ZiIv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" alt="" />

                             </div>
                         </td>
                        
                       
                     </tr>

                   </div>
                   <div className="img">
        
                     
                     <td width="300px" className="order">Order Confirm </td>
                     <img src="https://media.istockphoto.com/vectors/tick-icon-vector-symbol-cartoon-green-3d-checkmark-isolated-on-white-vector-id1047774014?k=6&m=1047774014&s=612x612&w=0&h=wrywUTiQI3slPdM57O-cAttrmm9FC57ZljLaEosK2a0=" alt="" />
                     <div className="detail" > 
                         <div width="100%" className="table2">
                         <p>Your Details 
                        </p> 

                  <tr>
                       <td width="180px"  className="column-title"> Order No:</td>
                       <td className="column-title"> EB205685</td>
                  
                   </tr>
                  
                   <tr>
                       <td className="column-title"> Name</td>
                       <td className="column-title"> John Doe</td>
                   </tr>
                   <tr>
                   <td font-weight="bold" className="column-title"> Total Amount</td>
                   <td className="column-title"> BDT</td>
                   </tr>
                   <tr>
                   <td className="column-title"> Phone</td>
                   <td className="column-title"> 09575455455</td>
                   </tr>
                  </div>
                  </div>
           </div>
                   
                         </div>     
                        
                        
                     </div>
                    
                  
                    <div >
                
                    </div>
                   
                    

       </div>

       
    );
};

export default Informations;