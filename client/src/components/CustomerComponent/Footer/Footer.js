import React from 'react'
import "./Footer.css"
import { FaFacebookF,FaInstagram, FaYoutube } from 'react-icons/fa';
const Footer = () => {
  return (
    <div>
       <footer className="site-footer" id="contact">
                <div className="top-footer section">
                    <div className="sec-wp">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="footer-info">
                                        <div className="footer-logo">
                                            <a href="index.html">
                                                <img src="logo.png" alt=""/>
                                            </a>
                                        </div>
                                       
                                        
                                        <div className="social-icon">
                                            <ul>
                                                <li>
                                                   
                                                        <FaFacebookF className="uil uil-facebook-f"></FaFacebookF>
                                                    
                                                </li>
                                                <li>
                                                  
                                                        <FaInstagram className="uil uil-instagram"></FaInstagram>
                                                  
                                                </li>
                                                <li>
                                                   
                                                        <FaYoutube className="uil uil-youtube"></FaYoutube>
                                                  
                                                </li>
                                               
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="footer-flex-box">
                                        <div className="footer-table-info">
                                            <h3 className="h3-title">open hours</h3>
                                            <ul>
                                                <li><i className="uil uil-clock"></i> Mon-Thurs : 9am - 10pm</li>
                                                <li><i className="uil uil-clock"></i> Fri-Sun : 11am - 10pm</li>
                                            </ul>
                                        </div>
                                        <div className="footer-menu">
                                        <div className="copyright-text">
                                    <p>Copyright &copy; 2021 <span className="name">TechieCoder.</span>All Rights Reserved.
                                    </p>
                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </footer>
    </div>
  )
}

export default Footer
