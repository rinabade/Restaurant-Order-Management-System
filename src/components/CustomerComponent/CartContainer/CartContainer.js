import React, {  useState,useEffect } from 'react';
import './CartContainer.css';
import { FaArrowLeft, FaTrashAlt, FaPlus, FaMinus, FaLeaf } from 'react-icons/fa';
import header from '../../../imgs/header.jpg';
import { motion } from 'framer-motion';
import { createCart } from '../../../api/userAction';

const CartContainer = ({cart, setCart, handleChange}) => {
  const [price, setPrice] = useState(0);

  const handlePrice = ()=>{
      let ans = 0;
      cart.map((item)=>(
        ans += item.quantity * item.price
      ))
      setPrice(ans);
  }

  const handleRemove = (menu_id) =>{
      const arr = cart.filter((item)=>item.menu_id !== menu_id);
      setCart(arr);
      // handlePrice();
  }

  useEffect(()=>{
      handlePrice();
  })
  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const handleSubmit = () => {
    // Prepare the cart data to be sent to the backend
    const cartData = cart.map((item) => ({
      menu_id: item.menu_id,
      item_name : item.item_name,
      price: item.price,
      quantity: item.quantity,
    }));

    // Send a POST request to the backend API
    createCart(cartData)
      .then((response) => {
        // Handle the response from the backend if needed
        console.log(response.data.data);
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error('Error:', error);
      });
  };

return (
  <article>
      {
          cart?.map((item)=>(
            <div className="cart_box">
                  <div className="cart_img">
                      <p>{item.item_name}</p>
                  </div>
                  <div>
                      <button onClick={()=>handleChange(item, +1)}> + </button>
                      <button>{item.quantity}</button>
                      <button onClick={()=>handleChange(item, -1)}> - </button>
                  </div>
                  <div>
                      <span>Rs.{item.price}</span>
                      <button onClick={()=>handleRemove(item.menu_id)}>Remove</button>
                  </div>
              </div>
            ))
          }
      <div className='total'>
          <span>Total Price of your Cart</span>
          <span>Rs - {price}</span>
      </div>
      <button onClick={handleSubmit}>Submit Cart</button>

  </article>
)
};


export default CartContainer;



