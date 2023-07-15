import React, { useState, useEffect } from "react";
import "./CartContainer.css";
import header from "../../../imgs/header.jpg";
import { motion } from "framer-motion";
import { createOrder, getOrderDetails, getOrderID } from "../../../api/userAction";
import {
  FaArrowLeft,
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaLeaf,
} from "react-icons/fa";
import io from "socket.io-client";

const CartContainer = ({ cart, table_number, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
  const [data, setData] = useState([]);
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [tableNumber, setTableNumber] = useState();
  const [codenum, setCodenum] = useState("");

  const socket = io("http://localhost:8000");

  const handlePrice = () => {
    let ans = 0;
    cart?.map((item) => (ans += item.quantity * item.price));   //question mark require to increase price
    setPrice(ans);
  };

  const handleRemove = (menu_id) => {
    const arr = cart.filter((item) => item.menu_id !== menu_id);
    setCart(arr);
  };

  const handlePopupDone = () => {
    setShowPopup(true);
  };

  const handleDone = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the order data to be sent to the backend
    const cartData = {
      cartItems: cart.map((item) => ({
        menu_id: item.menu_id,
        quantity: item.quantity,
      })),

      table_number: table_number[0],
    };
    
    createOrder(cartData)
      .then((response) => {
        // console.log(response.data);
        setCart([]);       
      
  })        
      .catch((error) => {
        console.error("Error:", error);
      });
      
    socket.emit("order", {cart, table_number }); // Emit a socket event with the order details
    // console.log("values--------", values)
    // window.location.href = "/";
  };

 
  useEffect(() => {
    handlePrice();
  });

  if (cart === undefined || cart.length === 0) {
    return <p>Your order is successful. Thank You </p>;
  }

  return (
    <article>
      {cart?.map((item) => (
        <div className="cart_box">
          <div className="cart_img">
            <p>{item.item_name}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, +1)}> + </button>
            <button>{item.quantity}</button>
            <button onClick={() => handleChange(item, -1)}> - </button>
          </div>
          <div>
            <span>Rs.{item.price}</span>
            <button onClick={() => handleRemove(item.menu_id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>Rs - {price}</span>
      </div>
      <br></br>
      <button className="done-button" onClick={handlePopupDone}>
        Continue
      </button>
      
      {showPopup && (
        <div className="popup">
          <div className="popup-container">
            <p>
            <span>Are you sure you want to confirm this order?</span>

              {/* <span>There is your code:</span> <br></br>
              <span>{values}</span>
              <br></br>
              <span>Please save or take a screenshot of it.</span> */}
            </p>

            <button
              type="submit"
              className="done-button"
              onClick={handleDone}
            >
              confirm
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </article>
  );
};

export default CartContainer;
