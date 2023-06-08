import React, { useEffect } from 'react';
import $ from 'jquery';
import { gsap } from 'gsap';
import './MenuSection.css';
import mixitup from 'mixitup';
import menu1 from "../../imgs/menu-1.png";
import menu2 from "../../imgs/menu-2.png";
import menu3 from "../../imgs/menu-3.png";
import menu4 from "../../imgs/menu-4.png";

const MenuSection = () => {
  useEffect(() => {
    $('body').removeClass('body-fixed');

    let targets = document.querySelectorAll('.filter');
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
      targets[i].index = i;
      targets[i].addEventListener('click', moveBar);
    }

    // initial position on first === All 
    gsap.set('.filter-active', {
      x: targets[0].offsetLeft,
      width: targets[0].offsetWidth,
    });

    function moveBar(e) {
      old = activeTab;
      activeTab = e.currentTarget.index;

      gsap.to('.filter-active', {
        duration: dur,
        x: e.currentTarget.offsetLeft,
        width: e.currentTarget.offsetWidth,
        ease: 'power2',
      });
    }
    $(".filters").on("click", function () {
        $("#menu-dish").removeClass("bydefault_show");
      });
  
      $(function () {
        var container = document.querySelector('#menu-dish');
      var mixer = mixitup(container, {
        selectors: {
            target: ".dish-box-wp",
            filter: ".filter",
        },
        animation: {
          effects: 'fade',
          easing: 'ease-in-out',
        },
        load: {
          filter: '.all, .breakfast, .lunch, .dinner',
        },
      });
    });
      
    }, []);
  return (
    <section className="our-menu section " id="menu">
      <div className="sec-wp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center mb-5">
                <p className="sec-sub-title mb-3">our menu</p>
                <h2 className="h2-title">wake up early, <span>eat fresh &amp; healthy</span></h2>
                <div className="sec-title-shape mb-4">
                  <img src="assets/images/title-shape.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="menu-tab-wp">
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="menu-tab text-center">
                  <ul className="filters">
                    <div className="filter-active"></div>
                    <li className="filter" data-filter=".all, .breakfast, .lunch, .dinner">
                      <img src={menu1} alt="" />
                      All
                    </li>
                    <li className="filter" data-filter=".breakfast">
                      <img src={menu2} alt="" />
                      Breakfast
                    </li>
                    <li className="filter" data-filter=".lunch">
                      <img src={menu3} alt="" />
                      Lunch
                    </li>
                    <li className="filter" data-filter=".dinner">
                      <img src={menu4} alt="" />
                      Dinner
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-list-row">
            <div className="row g-xxl-5 bydefault_show" id="menu-dish">
              <div className="col-lg-4 col-sm-6 dish-box-wp breakfast" data-cat="breakfast">
                <div className="dish-box text-center">
                  <div className="dist-img">
                    <img src="assets/images/dish/1.png" alt="" />
                  </div>
                  <div className="dish-rating">
                    5
                    <i className="uil uil-star"></i>
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">Veggie Delight</h3>
                  </div>
                  <div className="dish-price">
                    <span className="price">$19.00</span>
                  </div>
                  <div className="dish-button">
                    <a href="#" className="btn btn-primary btn-sm">Order Now</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 dish-box-wp lunch" data-cat="lunch">
                <div className="dish-box text-center">
                  <div className="dist-img">
                    <img src="assets/images/dish/2.png" alt="" />
                  </div>
                  <div className="dish-rating">
                    4.5
                    <i className="uil uil-star"></i>
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">Chicken Salad</h3>
                  </div>
                  <div className="dish-price">
                    <span className="price">$12.99</span>
                  </div>
                  <div className="dish-button">
                    <a href="#" className="btn btn-primary btn-sm">Order Now</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 dish-box-wp dinner" data-cat="dinner">
                <div className="dish-box text-center">
                  <div className="dist-img">
                    <img src="assets/images/dish/3.png" alt="" />
                  </div>
                  <div className="dish-rating">
                    4.7
                    <i className="uil uil-star"></i>
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">Spicy Grilled Fish</h3>
                  </div>
                  <div className="dish-price">
                    <span className="price">$15.99</span>
                  </div>
                  <div className="dish-button">
                    <a href="#" className="btn btn-primary btn-sm">Order Now</a>
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