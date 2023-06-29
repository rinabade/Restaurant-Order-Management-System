import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {cartItems} from '../../../Data/Data';
import header from "../../../imgs/header.jpg";
import berry from "../../../imgs/berry.png";
import leaf from "../../../imgs/leaf.png";
import MenuSection from '../MenuSection/MenuSection';
import { FaSistrix, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import Feedback from '../Feedback/Feedback';
import Footer from '../Footer/Footer';
import { gsap, Power2 } from 'gsap';
import mixitup from 'mixitup';
import {motion} from "framer-motion";
import menu1 from "../../../imgs/menu-1.png";
import menu2 from "../../../imgs/menu-2.png";
import menu3 from "../../../imgs/menu-3.png";
import menu4 from "../../../imgs/menu-4.png";
import { FaAngleLeft, FaAngleRight, FaPlus, FaMinus } from "react-icons/fa";



const Navbar = ({size,handleClick,toggleCart}) => {
   
    const sliderRef = useRef(null);
   

    const about = useRef(null);
    const menu = useRef(null);
    const contact = useRef(null);
    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: "smooth",
        });
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    // cart js
    const [filterCategory, setFilterCategory] = useState('all');
  const [items, setItems] = useState(cartItems);

  const filterItem = (categItem) => {
    setFilterCategory(categItem);
  };
  const filteredItems = filterCategory === 'all' ? cartItems : cartItems.filter((item) => item.category === filterCategory);


    
      
    
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
        <>
            <header class="site-header">
                <nav className="navbar">
                    <div className="navbar-container">
                        <div className="navbar-logo">
                            <Link to="/">FOODIE</Link>
                        </div>
                        <div className="navbar-menu1">
                            <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                                <ul className="navbar-links ">
                                    <li onClick={() => scrollToSection(about)} className="navbar-item">
                                        <Link className="navbar-link" >
                                            About
                                        </Link>
                                    </li>
                                    <li onClick={() => scrollToSection(menu)} className="navbar-item">
                                        <Link className="navbar-link">
                                            Menu
                                        </Link>
                                    </li>
                                    <li onClick={() => scrollToSection(contact)} className="navbar-item">
                                        <Link className="navbar-link" >
                                            Feedback
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="navbar-search">
                                <form action="#" class="header-search-form for-des">
                                    <input type="search" class="form-input" placeholder="Search Here..." />
                                    <button type="submit">
                                        <FaSistrix />
                                    </button>
                                </form>
                            </div>
                            <div className="navbar-icons">
                                <div className="navbar-icon" onClick={toggleCart}>
                                    <FaCartShopping />
                                    <span>
                                    {size}
                                    </span>
                                </div>
                            </div>
                            <div className="navbar-toggle" onClick={toggleMenu}>
                                {isMenuOpen ? <FaTimes /> : <FaBars />}
                            </div>
                        </div>
                    </div>

                </nav>
            </header>
            {/* Welcome to our restaurant */}
            <section className="main-banner">
                <div className="js-parallax-scene">
                    <div className="banner-shape-1 w-100" data-depth="0.30">
                        <img src={berry} alt="" />
                    </div>
                    <div className="banner-shape-2 w-100" data-depth="0.25">
                        <img src={leaf} alt="" />
                    </div>
                </div>
                <div className="sec-wp">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="banner-text">
                                    <h1 className="h1-title">
                                        Welcome <br></br>
                                        to our<br />
                                        Restaurant.
                                    </h1>

                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="banner-img-wp">
                                    <div className="banner-img" style={{ backgroundImage: `url(${header})` }}>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT US */}
            <section className="about-sec section" ref={about}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="sec-title text-center mb-5">
                                <p className="sec-sub-title mb-3">About Us</p>
                                <h2 className="h2-title">About our Restaurant</h2>
                                <div className="sec-title-shape mb-4">
                                    <img src="assets/images/title-shape.svg" alt="" />
                                </div>
                                <p>Garden and restaurant !! A magnificent dine out and hand out?! It is one of the best place
                                    in town. It is counted as most happening restaurant with parking space and plenty of room for
                                    friends and families. In terms of food, it is out standing and keeps our mouth watering feeling
                                    on and on.Located at very convenient place at Lazimpat main road and offers you the one of the
                                    greatest hospitality in Kathmandu.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className="about-video">
                                <div className="about-video-img" style={{ backgroundImage: `url(${header})` }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Menu */} 
            <section className="about-sec section" ref={menu}>
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
                  <ul className="filters">
                    <div className="slider" ref={sliderRef}>
                    <li className={`filter ${filterCategory === 'all' ? 'active' : ''}`} onClick={() => filterItem('all')}>
                        <img src={menu1} alt="" />
                        All
                      </li>
                      <li className={`filter ${filterCategory === 'breakfast' ? 'active' : ''}`} onClick={() => filterItem('breakfast')}>
                        <img src={menu2} alt="" />
                        Breakfast
                      </li>
                      <li className={`filter ${filterCategory === 'lunch' ? 'active' : ''}`} onClick={() => filterItem('lunch')}>
                        <img src={menu3} alt="" />
                        Lunch
                      </li>
                      <li className={`filter ${filterCategory === 'dinner' ? 'active' : ''}`} onClick={() => filterItem('dinner')}>
                        <img src={menu4} alt="" />
                        Dinner
                      </li>
                      <li className={`filter ${filterCategory === 'snacks' ? 'active' : ''}`} onClick={() => filterItem('snacks')}>
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
          </div>
          </div>
            </section>
            <section className='menu-section'>
            {filteredItems.map((item) => (          
                <MenuSection item={item} handleClick={handleClick} key={item.id}  />
            ))}
       
           </section>
           <section className='feedback-section' ref={contact}>
           <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center mb-5">
                <h2 className="h2-title">Feedback</h2>
                <p>Should you have face any issue, feel free to contact us, we will soon get back to you as soon as we can.</p>
              </div>
            </div>
          </div>
                    
                <Feedback  />
           
       
           </section>
           <section>
                    
                    <Footer />
               
           
               </section>
            
        </>
    );
};

export default Navbar;
