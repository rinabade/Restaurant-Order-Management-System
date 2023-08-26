import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainDash from './pages/Admin/MainDash/MainDash';
import Dashboard from './pages/Admin/AdminDashboard/Dashboard';
import Employees from './pages/Admin/Employees/Employees';
import AdminRegister from './pages/Admin/AdminRegister/AdminRegister';
import AdminMenu from './pages/Admin/AdminMenu/AdminMenu';
import Category from './pages/Admin/Category/Category';
import Orders from './pages/Admin/Orders/Orders';
import Feedback from './pages/Admin/Feedback/Feedback';
import Payment from './pages/Admin/Payment/Payment';
import Admin_profile from './pages/Admin/Admin_profile/Admin_profile';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import Tablebook from './pages/Admin/Tablebook/Tablebook';

// kitchen route
import KitchenDash from './pages/Kitchen/KitchenDash/KitchenDash';
import KitchenDashboard from './pages/Kitchen/KitchenDashboard/KitchenDashboard';
import KitchenLogin from './pages/Kitchen/KitchenLogin/KitchenLogin';
import Kitchen_profile from './pages/Kitchen/Kitchen_profile/Kitchen_profile';


import CashierDash from './pages/Cashier/CashierDash/CashierDash';
import CashierDashboard from './pages/Cashier/CashierDashboard/CashierDashboard';
import CashierLogin from './pages/Cashier/CashierLogin/CashierLogin';
import Billlist from './pages/Cashier/Bill_list/Billlist';
import Cashier_profile from './pages/Cashier/Cashier_profile/Cashier_profile';

import Menu from './pages/User/Menu/Menu';
import useToken from './components/Token/useToken';
// import "./components/Token/axiosinterceptor";
import { io } from "socket.io-client";


function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  // const { token, setToken } = useToken();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://202.52.248.120:8000/"));
  }, []);

  // useEffect(() => {
  //   socket?.emit("newUser", user);
  // }, [socket, user]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Menu />} />
          {!getToken() && <Route path="/admin/Maindash" element={<AdminLogin/>} />}
          {getToken() && (
            <Route path="/admin" element={<Dashboard />}>
              <Route path="Maindash" element={<MainDash />} />
              <Route path="Employees" element={<Employees />} />
              <Route path="AdminRegister" element={<AdminRegister />} />
              <Route path="AdminMenu" element={<AdminMenu />} />
              <Route path="Orders" element={<Orders />} />
              <Route path="Feedback" element={<Feedback />} />
              <Route path="Payment" element={<Payment />} />
              <Route path="Admin_profile" element={<Admin_profile />} />
              <Route path="Category" element={<Category />} />
              <Route path="AdminTablebook" element={<Tablebook/>}/>
            </Route>
           )} 
          
          {/* )} */}
          

          {/* kitchen route */}

         {!getToken() && <Route path="/Kitchen/Kitchendash" element={<KitchenLogin/>} />}
          {getToken() && (
            <Route path="/Kitchen" element={<KitchenDashboard/>}>
              <Route path="kitchendash" element={<KitchenDash />} />
              <Route path="Kitchen_profile" element={<Kitchen_profile />} />
            </Route>
          )}

               {/* Cashier route */}
          {!getToken() && <Route path="/Cashier/Cashierdash" element={<CashierLogin />} />}
          {getToken() && (
            <Route path="/Cashier" element={<CashierDashboard />}>
              <Route path="Cashierdash" element={<CashierDash />} />
              <Route path="Cashier_profile" element={<Cashier_profile />} />
              <Route path="Billlist" element={<Billlist />} />
              <Route path="CashierTablebook" element={<Tablebook/>}/>
              <Route path="Cashier_profile" element={<Cashier_profile />} />
            </Route>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;