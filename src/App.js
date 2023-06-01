import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div>
        {/* {!location.pathname.includes("/admin") && (
        <Navbar isAuth={false} logoData={undefined} />
      )} */}
        <Routes>

          <Route path="/admin" element={<Dashboard />}>

            <Route path="MainDash" element={<MainDash />} />
            <Route path="Employees" element={<Employees />} />
            <Route path="AdminRegister" element={<AdminRegister />} />
            <Route path="AdminMenu" element={<AdminMenu />} />
            <Route path="Orders" element={<Orders/>} />
            <Route path="Inventory" element={<Inventory/>} />
            <Route path="Feedback" element={<Feedback/>} />
            <Route path="Payment" element={<Payment/>} />
            <Route path="Suppliers_payment" element={<Suppliers_payment/>} />
            <Route path="Admin_profile" element={<Admin_profile/>} />
            <Route path="Suppliers" element={<Suppliers/>} />
            <Route path="Category" element={<Category/>} />
            <Route path="Permission" element={<Permission/>} />
            <Route path="AdminRole" element={<AdminRole/>} />
          </Route>
          <Route path="/AdminLogin" element={<AdminLogin/>} />
        </Routes>
        {/* {(!location.pathname.includes("/admin")) && <Footer />} */}
      </div>
    </Router>
  );
}

export default App;
