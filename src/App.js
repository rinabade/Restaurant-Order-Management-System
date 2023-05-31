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
            <Route path="Category" element={<Category/>} />

          </Route>
        </Routes>
        {/* {(!location.pathname.includes("/admin")) && <Footer />} */}
      </div>
    </Router>
  );
}

export default App;
