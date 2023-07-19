import React, { useEffect, useRef, useState } from "react";
import "./MenuSection.css";
import header from "../../../imgs/header.jpg";
import { FaAngleLeft, FaAngleRight, FaPlus, FaMinus } from "react-icons/fa";
import {Config} from "../../../Config";

const MenuSection = ({ item, table_number, handleClick }) => {
  const { menu_id, item_name, description, price, image } = item;

  return (
    <div className="menu-list-row">
      <div className="row g-xxl-5 bydefault_show" id="menu-dish">
        <div className="col-lg-4 col-sm-6 dish-box-wp breakfast">
          <div className="dish-box text-center">
            <div className="dist-img">
              <img src={image ? `${Config.BaseUrl}${image}`: null} alt="Image" />
            </div>
            <div className="dish-title">
              <h3 className="h3-title">{item_name}</h3>
            </div>
            <div className="dish-info">{description}</div>
            <div className="dist-bottom-row">
              <ul>
                <li>
                  <b> Rs. {price}</b>
                </li>
                <li>
                  <button className="dish-add-btn"onClick={() => handleClick(item, table_number)}>
                    <FaPlus  />
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
