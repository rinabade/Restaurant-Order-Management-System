import React, { useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom"
import "./Sidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";


const Sidebar = () => { 

  function handleLogout() {
    sessionStorage.clear();
    window.location.href = '/admin/Maindash';
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
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <span>
          <span>FOODIE</span>
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <NavLink to={item.path} key={index}
            className={navClass => navClass.isActive ? 'menuItem active'
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
        <div className="menuItem mt-3px" >
          <UilSignOutAlt onClick={handleLogout}/>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
