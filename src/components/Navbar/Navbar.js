import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import ParentCart from '../ParentCart/ParentCart';
import header from "../../imgs/header.jpg";
import berry from "../../imgs/berry.png";
import leaf from "../../imgs/leaf.png";
import MenuSection from '../MenuSection/MenuSection';
import { FaSistrix, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import CartContainer from '../CartContainer/CartContainer';
import { motion } from "framer-motion"


const Navbar = ({ cartItems }) => {
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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
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
                                <div className="navbar-icon">
                                    <FaUser />
                                </div>
                            </div>
                            <div className="navbar-icons">
                                <div className="navbar-icon" onClick={toggleCart}>
                                    <FaCartShopping />
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
                <MenuSection />
            </section>
            {isCartOpen && <CartContainer cartItems={cartItems} />}
            
        </>
    );
};

export default Navbar;
