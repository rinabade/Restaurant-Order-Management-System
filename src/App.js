import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainDash from './pages/Admin/MainDash/MainDash';
import Dashboard from './pages/Admin/AdminDashboard/Dashboard';
import Employees from './pages/Admin/Employees/Employees';
import AdminRegister from './pages/Admin/AdminRegister/AdminRegister';
import AdminMenu from './pages/Admin/AdminMenu/AdminMenu';
import Category from './pages/Admin/Category/Category';
import Orders from './pages/Admin/Orders/Orders';
import Inventory from './pages/Admin/Inventory/Inventory';
import Feedback from './pages/Admin/Feedback/Feedback';
import Payment from './pages/Admin/Payment/Payment';
import Suppliers_payment from './pages/Admin/Suppliers_payment/Suppliers_payment';
import Admin_profile from './pages/Admin/Admin_profile/Admin_profile';
import Suppliers from './pages/Admin/Suppliers/Suppliers';
import Permission from './pages/Admin/Permission/Permission';
import AdminRole from './pages/Admin/AdminRole/AdminRole';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import Menu from './pages/User/Menu/Menu';
import useToken from './components/Token/useToken';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  
  const { token, setToken } = useToken();


  // const [token, setToken] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Menu />} />

          {!token && <Route path="/admin/Maindash" element={<AdminLogin setToken={setToken} />} />}
          {token && (
            <Route path="/admin" element={<Dashboard />}>
              <Route path="Maindash" element={<MainDash />} />
              <Route path="Employees" element={<Employees />} />
              <Route path="AdminRegister" element={<AdminRegister />} />
              <Route path="AdminMenu" element={<AdminMenu />} />
              <Route path="Orders" element={<Orders />} />
              <Route path="Inventory" element={<Inventory />} />
              <Route path="Feedback" element={<Feedback />} />
              <Route path="Payment" element={<Payment />} />
              <Route path="Suppliers_payment" element={<Suppliers_payment />} />
              <Route path="Admin_profile" element={<Admin_profile />} />
              <Route path="Suppliers" element={<Suppliers />} />
              <Route path="Category" element={<Category />} />
              <Route path="Permission" element={<Permission />} />
              <Route path="AdminRole" element={<AdminRole />} />
            </Route>
          )}
          <Route path="/AdminLogin" element={<AdminLogin />} />
          
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
