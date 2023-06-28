import React, { useEffect, useRef, useState } from 'react';

import './MenuSection.css';

import { FaAngleLeft, FaAngleRight, FaPlus, FaMinus } from "react-icons/fa";

const MenuSection = ({item, handleClick}) => {
 

  const {title,discription, price, img} = item;
  
  
  
    
  return (
 
    
          <div className="menu-list-row">
            <div className="row g-xxl-5 bydefault_show" id="menu-dish" >
          
               <div className="col-lg-4 col-sm-6 dish-box-wp breakfast" >
                 <div className="dish-box text-center">
                   <div className="dist-img">
                   <img src={img} alt="Image" />
                   </div>
                   <div className="dish-title">
                    <h3 className="h3-title">{title}</h3>
                   </div>
                   <div className="dish-info">{discription}</div>
                   <div className="dist-bottom-row">
                    <ul>
                      <li>
                        <b> {price}Rs</b>
                      </li>
                      <li>
                        <button className="dish-add-btn" >
                          <FaPlus onClick={()=>handleClick(item)}/>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
   
  );
};

export default MenuSection;
