import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import { gsap, Power2 } from 'gsap';
import header from "../../../imgs/header.jpg";
import { cartItems } from '../../../Data/Data';
import './MenuSection.css';
import CartContainer from '../CartContainer/CartContainer';
import mixitup from 'mixitup';
import {checkTargetForNewValues, motion} from "framer-motion";
import menu1 from "../../../imgs/menu-1.png";
import menu2 from "../../../imgs/menu-2.png";
import menu3 from "../../../imgs/menu-3.png";
import menu4 from "../../../imgs/menu-4.png";
import { FaAngleLeft, FaAngleRight, FaPlus, FaMinus } from "react-icons/fa";

const MenuSection = ({item, handleClick}) => {
  const containerRef = useRef(null);
  const mixerRef = useRef(null);
  const sliderRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const {title,discription, price, img, category} = item;
  
  useEffect(() => {
    const container = containerRef.current;
  
    const mixer = mixitup(container, {
      selectors: {
        target: '.dish-box-wp',
        control: '.filter',
      },
    });
    mixerRef.current = mixer;
  
    handleFilterClick(category); // Filter items based on the initial category
  }, [category]);


  const handleFilterClick = (category) => {
    if (mixerRef.current) {
      const targetSelector = category === 'all' ? '.dish-box-wp' : `.${category}`;
      mixerRef.current.filter(targetSelector);
      setSelectedDish(null);
    }
  };
  
    
  return (
 
    
          <div className="menu-list-row">
            <div className="row g-xxl-5 bydefault_show" id="menu-dish" ref={containerRef}>
          
               <div className="col-lg-4 col-sm-6 dish-box-wp breakfast" >
                 <div className="dish-box text-center">
                  <div className="dist-img">
                  <img src={img} alt="Image" />
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">{title}</h3>
                  </div>
                  <div className="dish-info">{category}</div>
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
