import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import header from "../../imgs/header.jpg"
import berry from "../../imgs/berry.png"
import leaf from "../../imgs/leaf.png"
import { FaSistrix, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <Link to="/">FOODIE</Link>
                    </div>
                    <div className="navbar-menu1">
                        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                            <ul className="navbar-links ">
                                <li className="navbar-item">
                                    <Link to="/menu" className="navbar-link">
                                        Menu
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/about" className="navbar-link" >
                                        About
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/contact" className="navbar-link" >
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
                        <div className="navbar-toggle" onClick={toggleMenu}>
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </div>
                    </div>
                </div>

            </nav>
          
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
                                                to our<br/>
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
            
        </>
    );
};

export default Navbar;
