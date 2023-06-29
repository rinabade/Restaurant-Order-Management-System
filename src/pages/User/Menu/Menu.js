import '../../../App.css'
import React , {useState} from 'react';
import Navbar from '../../../components/CustomerComponent/Navbar/Navbar';
import CartContainer from '../../../components/CustomerComponent/CartContainer/CartContainer';
import {Outlet} from 'react-router-dom';
import { FaSistrix, FaUser, FaBars, FaTimes } from 'react-icons/fa';


function Menu() {
  const [show, setShow] = useState(true);
	const [cart , setCart] = useState([]);
	const [warning, setWarning] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
	 
    setIsCartOpen((prevIsCartOpen) => !prevIsCartOpen);
  };
 

  const handleClick = (item) => {
    console.log(item);
    let isPresent = false;
	cart.forEach((product)=>{
		if (item.menu_id === product.menu_id){
				isPresent = true;
			}
		})
		if (isPresent){
			setWarning(true);
			setTimeout(()=>{
				setWarning(false);
			}, 2000);
			return ;
		}
		setCart([...cart, item]);
    // Add the item to the cart or perform any other action
  }
	const handleChange = (item, d) =>{
		let ind = -1;
		cart.forEach((data, index)=>{
			if (data.menu_id === item.menu_id)
				ind = index;
		});
		const tempArr = cart;
		tempArr[ind].quantity += d;
		
		if (tempArr[ind].quantity === 0)
			tempArr[ind].quantity = 1;
		setCart([...tempArr])
		// console.log("asd--", cart);
	}
  return (
    <div>
        <Navbar size={cart.length} handleClick={handleClick} handleChange={handleChange}  toggleCart={toggleCart} /> 
        {isCartOpen && (
        <div className="cart-overlay">
          <div className="cart-popup">
            <button className="cart-close-btn" onClick={toggleCart}>
              <FaTimes />
            </button>
            <h2>Your Cart</h2>
				<CartContainer cart={cart}  setCart={ setCart} handleChange={handleChange} />
          </div>
        </div>
      )}
        {
			warning && <div className='warning'>Item is already added to your cart</div>
		}
       
     </div>
  );
}

export default Menu;