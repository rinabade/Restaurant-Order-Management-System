import '../../../App.css'
import React , {useState} from 'react';
import Navbar from '../../../components/CustomerComponent/Navbar/Navbar';
import CartContainer from '../../../components/CustomerComponent/CartContainer/CartContainer';
import {Outlet} from 'react-router-dom';
import { FaSistrix, FaUser, FaBars, FaTimes } from 'react-icons/fa';

function Menu() {
  const [show, setShow] = useState(true);
	const [cart , setCart] = useState([]);
	// console.log("fjbjhbf----------", cart);
	const [warning, setWarning] = useState(false);
	const [table, setTable] = useState('');

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
	 
    setIsCartOpen((prevIsCartOpen) => !prevIsCartOpen);
  };
 
  const handleClick = (item, table_number) => {
    // Handle the click event
	// console.log("item--------", item.menu_id);   //menu_id display
	// console.log("table_number is----------", table_number);
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
		setTable([...table, table_number])
		// console.log(cart);
    // Add the item to the cart or perform any other action
  }
	const handleChange = (item, d) =>{
		console.log("fkenen---------", item);
		let ind = -1;
		cart.forEach((data, index)=>{
			if (data.menu_id === item.menu_id)
				ind = index;
		});
		const tempArr = cart;
		tempArr[ind].quantity += d;
		// console.log("nfrkjenf----------", tempArr)
		
		if (tempArr[ind].quantity === 0)
			tempArr[ind].quantity = 1;
		setCart([...tempArr])
		
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
            <CartContainer cart={cart}  table_number={table} setCart={ setCart} handleChange={handleChange} />
          </div>
        </div>
      )}
        {
			warning &&
			<div className='warning-overlay'>
				<div className='warning-popup'>

				<p className='warning'>Item is already added to your cart</p>
				</div>
				</div>
		}
       
     </div>
  );
}

export default Menu;