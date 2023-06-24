// import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar/Navbar';
// import CartContainer from '../CartContainer/CartContainer';

// const ParentCart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   // Load cart items from local storage on component mount
//   useEffect(() => {
//     const storedCartItems = localStorage.getItem('cartItems');
//     if (storedCartItems) {
//       setCartItems(JSON.parse(storedCartItems));
//     }
//   }, []);

//   // Save cart items to local storage whenever they change
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Function to add an item to the cart
//   const addToCart = (item) => {
//     setCartItems((prevCartItems) => [...prevCartItems, item]);
//   };

//   // Function to remove an item from the cart
//   const removeFromCart = (itemId) => {
//     setCartItems((prevCartItems) =>
//       prevCartItems.filter((item) => item.id !== itemId)
//     );
//   };

//   // Function to update the quantity of a cart item
//   const updateCartItemQuantity = (itemId, newQuantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   // Function to remove a cart item
//   const removeCartItem = (itemId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//   };

//   return (
//     <div>
//       <Navbar cartItems={cartItems} />
//       {/* Other components */}
//       <CartContainer
//         items={cartItems}
//         updateCartItemQuantity={updateCartItemQuantity}
//         removeCartItem={removeCartItem}
//       />
//     </div>
//   );
// };

// export default ParentCart;
