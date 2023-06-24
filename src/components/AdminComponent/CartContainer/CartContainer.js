import React, {  useState } from 'react';
import './CartContainer.css';
import { FaArrowLeft, FaTrashAlt, FaPlus, FaMinus, FaLeaf } from 'react-icons/fa';
import header from '../../imgs/header.jpg';
import { motion } from 'framer-motion';

const CartContainer = ({ items, updateCartItemQuantity, removeCartItem }) => {
  const [isCartOpen, setIsCartOpen] = React.useState(true);

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const arrowVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  const [quantity, setQuantity] = useState(1);
    
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      {isCartOpen && (
        <div className="cart-container">
          <div className="cart-heading w-full d-flex items-center justify-content-between p-4">
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={handleCartClose}
              variants={arrowVariants}
              initial="hidden"
              animate="visible"
            >
              <FaArrowLeft />
            </motion.div>
            <p>Cart</p>
            <p className="d-flex items-center">
              <motion.div whileTap={{ scale: 0.75 }}>
                <FaTrashAlt />
              </motion.div>
            </p>
          </div>
          <div className="cart-item-container d-flex gap-2">
            {items && items.length > 0 ? (
              items.map((item) => (
                <div className="cart-items" key={item.id}>
                  <div className="cart-img p-1 px-4 d-flex gap-4">
                    {/* <img src={item.image} alt="" /> */}
                    <div className="cart-name d-flex flex-column">
                      <p>{item.title}</p>
                      <p className="cart-price">{item.price}</p>
                    </div>
                    <div className="quantity-input d-flex items-center gap-3 cursor-pointer">
                      <motion.div
                        whileTap={{ scale: 0.75 }}
                        onClick={handleDecrement}
                      >
                        <FaMinus />
                      </motion.div>
                      <p className="quantity-num w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </p>
                      <motion.div
                        whileTap={{ scale: 0.75 }}
                        onClick={handleIncrement}
                      >
                        <FaPlus />
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart.</p>
            )}
          </div>
          {/* cart total */}
          <div className="cart-total-container">
            <div className="cart-total">
              <p className="total-text">Sub Total</p>
              <p className="total-text">Rs 100</p>
            </div>
            <div className="divider"></div>
            <div className="cart-total">
              <p className="total-text fw-bold">Total</p>
              <p className="total-text fw-bold">Rs 100</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="cart-total-btn p-2"xcxccx
            >
              Check Out
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartContainer;
