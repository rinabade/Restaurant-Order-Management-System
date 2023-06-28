import React, {  useState,useEffect } from 'react';
import './CartContainer.css';
import { FaArrowLeft, FaTrashAlt, FaPlus, FaMinus, FaLeaf } from 'react-icons/fa';
import header from '../../../imgs/header.jpg';
import { motion } from 'framer-motion';

const CartContainer = ({cart, setCart, handleChange}) => {
  const [price, setPrice] = useState(0);

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

  useEffect(()=>{
      handlePrice();
  })
  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

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
                      <button>1</button>
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
  </article>
)



};


export default CartContainer;
