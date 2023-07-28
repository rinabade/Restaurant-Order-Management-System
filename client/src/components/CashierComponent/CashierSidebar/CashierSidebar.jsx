import React, { useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom"
import "./CashierSidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { CashierSidebarData } from "../../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const CashierSidebar = () => { 

  function handleLogout() {
    sessionStorage.clear();
    window.location.href = '/Cashier/Cashierdash';
  }
  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-100%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '32%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='Cashiersidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768|| window.innerWidth <= 1200?`${expanded}`:''}
    >
      {/* logo */}
      <div className="cashierlogo">
        <span>
          <span>RMS</span>
        </span>
      </div>

      <div className="menu">
        {CashierSidebarData.map((item, index) => {
          return (
            <NavLink to={item.path} key={index}
            className={navClass => navClass.isActive ? 'menuItem cashactive'
              : 'menuItem'}

              // onClick={() => {
              //   if (item.heading === 'Employee') {
              //     toggleDropdown();
              //   }
              // }}
          >
            <div className='icon'> <item.icon /></div>
            <span>{item.heading}</span>
          </NavLink>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem-logout " >
          <UilSignOutAlt onClick={handleLogout}/> Logout
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default CashierSidebar;
