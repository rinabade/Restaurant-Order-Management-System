import React, { useEffect,useRef , useState  } from 'react';
import $ from 'jquery';
import { gsap , Power2 } from 'gsap';

import './MenuSection.css';
import mixitup from 'mixitup';
import menu1 from "../../imgs/menu-1.png";
import menu2 from "../../imgs/menu-2.png";
import menu3 from "../../imgs/menu-3.png";
import menu4 from "../../imgs/menu-4.png";
import {FaAngleLeft, FaAngleRight, FaPlus} from "react-icons/fa";



const MenuSection = () => {
   
    
    const containerRef = useRef(null);
    const mixerRef = useRef(null);
    const sliderRef = useRef(null);
  
  
    useEffect(() => {
      const container = containerRef.current;
  
      const mixer = mixitup(container, {
        selectors: {
          target: '.dish-box-wp',
          control: '.filter',
        },
      });
      mixerRef.current = mixer;

    }, []);
 
  
    const handleFilterClick = (category) => {
      if (mixerRef.current) {
        const targetSelector = category === 'all' ? '.dish-box-wp' : `.${category}`;
        mixerRef.current.filter(targetSelector);
      }
    };
  
  
    const handleSliderLeft = () => {
        const slider = sliderRef.current;
        gsap.to(slider, {
          x: '+=100',
          duration: 0.3,
        });
      };
    
      const handleSliderRight = () => {
        const slider = sliderRef.current;
        gsap.to(slider, {
          x: '-=100',
          duration: 0.3,
        });
      };
      
  
    return (
      <section className="our-menu section" id="menu">
        <div className="sec-wp">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="sec-title text-center mb-5">
                  <p className="sec-sub-title mb-3">our menu</p>
                  <h2 className="h2-title">Eat fresh &amp; healthy</h2>
                </div>
              </div>
            </div>
            <div className="menu-tab-wp">
              <div className="row">
                <div className="col-lg-12 m-auto">
                  <div className="menu-tab text-center">
                    <button className="slider-button left" onClick={handleSliderLeft}>
                      <FaAngleLeft />
                    </button>
                    <ul className="filters" ref={containerRef}> 
                    <div className="slider" ref={sliderRef}>
                      <li className="filter" onClick={() => handleFilterClick('all')}>
                        <img src={menu1} alt="" />
                        All
                      </li>
                      <li className="filter" onClick={() => handleFilterClick('breakfast')}>
                        <img src={menu2} alt="" />
                        Breakfast
                      </li>
                      <li className="filter" onClick={() => handleFilterClick('lunch')}>
                        <img src={menu3} alt="" />
                        Lunch
                      </li>
                      <li className="filter" onClick={() => handleFilterClick('dinner')}>
                        <img src={menu4} alt="" />
                        Dinner
                      </li>
                      <li className="filter snacks" onClick={() => handleFilterClick('snacks')}>
                        <img src={menu4} alt="" />
                        Snacks
                      </li>
                      </div>
                    </ul>
                    <button className="slider-button right" onClick={handleSliderRight}>
                      <FaAngleRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          <div className="menu-list-row">
                            <div className="row g-xxl-5 bydefault_show" id="menu-dish" ref={containerRef}>
                                <div className="col-lg-4 col-sm-6 dish-box-wp breakfast" data-cat="breakfast">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/dish/1.png" alt=""/>
                                        </div>
                                        <div className="dish-title">
                                            <h3 className="h3-title">Fresh Chicken Veggies</h3>
                                        </div>
                                        <div className="dish-info">
                                           
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 499</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                        <FaPlus/>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- 2 --> */}
                                <div className="col-lg-4 col-sm-6 dish-box-wp breakfast" data-cat="breakfast">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/dish/2.png" alt=""/>
                                        </div>
                                        <div className="dish-title">
                                            <h3 className="h3-title">Grilled Chicken</h3>
                                        </div>
                                        <div className="dish-info">
                                         
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 359</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                    <FaPlus/>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- 3 --> */}
                                <div className="col-lg-4 col-sm-6 dish-box-wp lunch" data-cat="lunch">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/dish/3.png" alt=""/>
                                        </div>
                                      
                                        <div className="dish-title">
                                            <h3 className="h3-title">Panner Noodles</h3>
                                           
                                        </div>
                                        <div className="dish-info">
                                            
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 149</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                    <FaPlus/>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- 4 --> */}
                                <div className="col-lg-4 col-sm-6 dish-box-wp lunch" data-cat="lunch">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/dish/4.png" alt=""/>
                                        </div>
                                     
                                        <div className="dish-title">
                                            <h3 className="h3-title">Chicken Noodles</h3>
                                            
                                        </div>
                                        <div className="dish-info">
                                           
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 379</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                    <FaPlus/>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- 5 --> */}
                                <div className="col-lg-4 col-sm-6 dish-box-wp dinner" data-cat="dinner">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/dish/5.png" alt=""/>
                                        </div>
                                       
                                        <div className="dish-title">
                                            <h3 className="h3-title">Bread Boiled Egg</h3>
                                            
                                        </div>
                                        <div className="dish-info">
                                            
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 99</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                    <FaPlus/>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- 6 --> */}
                                <div className="col-lg-4 col-sm-6 dish-box-wp dinner" data-cat="dinner">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/dish/6.png" alt=""/>
                                        </div>
                                       
                                        <div className="dish-title">
                                            <h3 className="h3-title">Immunity Dish</h3>
                                            
                                        </div>
                                        <div className="dish-info">
                                           
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 159</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                    <FaPlus/>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
  );
};

export default MenuSection;


