import React, {  useState,useEffect } from 'react';
import './CartContainer.css';
import { FaArrowLeft, FaTrashAlt, FaPlus, FaMinus, FaLeaf } from 'react-icons/fa';
import header from '../../../imgs/header.jpg';
import { motion } from 'framer-motion';

const CartContainer = ({cart, setCart, handleChange}) => {
    
  const [price, setPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handlePrice = ()=>{
      let ans = 0;
      cart.map((item)=>(
          ans += item.amount * item.price
      ))
      setPrice(ans);
  }

  const handleRemove = (id) =>{
      const arr = cart.filter((item)=>item.id !== id);
      setCart(arr);
      // handlePrice();
  }

  const handleDone = () => {
    setShowPopup(true);
  };
  const handlepopupDone = () => {
    window.location.href = '/';
  };

  useEffect(()=>{
      handlePrice();
  })
  if (cart.length === 0) {
    return <p className='empty'>Your cart is empty.</p>;
  }

return (
  <article>
      {
          cart?.map((item)=>(
              <div className="cart_box">
                  <div className="cart_img">
                      <p>{item.title}</p>
                  </div>
                  <div>
                      <button onClick={()=>handleChange(item, +1)}> + </button>
                      <button>{item.amount}</button>
                      <button onClick={()=>handleChange(item, -1)}> - </button>
                  </div>
                  <div>
                      <span>Rs.{item.price}</span>
                      <button onClick={()=>handleRemove(item.id)}>Remove</button>
                  </div>
              </div>
          ))}
      <div className='total'>
          <span>Total Price of your Cart</span>
          <span>Rs - {price}</span>
      </div>
      <button className="done-button" onClick={handleDone}>
        Done
      </button>
      {showPopup && (
        <div className="popup">
            <div className='popup-container'>
          <p>
            <span>There is your code:</span> <br></br>
          <span>12345</span><br></br>
          <span>Please save or take a screenshot of it.</span>
          </p>
          
          <button className="done-button" onClick={handlepopupDone}>
            Done
          </button>
          <button className="cancel-button" onClick={() => setShowPopup(false)}>
            Cancel
          </button>
          </div>
        </div>
      )}
  </article>
)



};


export default CartContainer;
