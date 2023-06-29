import './CashierDashboard.css'

import CashierSidebar from '../../../components/CashierComponent/CashierSidebar/CashierSidebar';
import {Outlet} from 'react-router-dom';

function CashierDashboard() {
  return (
    <div className="Cashierdashboard">
      <div className="CashierdashboardGlass">
        <CashierSidebar/> 
        <Outlet/>
      </div>
    </div>
  );
}

export default CashierDashboard;