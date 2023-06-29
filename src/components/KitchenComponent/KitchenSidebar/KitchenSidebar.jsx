import React, { useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom"
import "./KitchenSidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { KitchenSidebarData } from "../../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";


const KitchenSidebar = () => {
 

  function handleLogout() {
    sessionStorage.clear();
    window.location.href = '/Kitchen/Kitchendash';
  }
  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='kitchensidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="kitchenlogo">
        <span>
          <span>Kitchen</span>
        </span>
      </div>

      <div className="menu">
        {KitchenSidebarData.map((item, index) => {
          return (
            <NavLink to={item.path} key={index}
            className={navClass => navClass.isActive ? 'menuItem kitactive'
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
        <div className="menuItem " >
          <UilSignOutAlt onClick={handleLogout}/>  Logout
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default KitchenSidebar;
