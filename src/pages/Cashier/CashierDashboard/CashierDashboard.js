import './KitchenDashboard.css'

import CashierSidebar from '../../../components/CashierComponent/CashierSidebar/CashierSidebar';
import {Outlet} from 'react-router-dom';

function CashierDashboard() {
  return (
    <div className="kitchendashboard">
      <div className="kitchendashboardGlass">
        <CashierSidebar/> 
        <Outlet/>
      </div>
    </div>
  );
}

export default CashierDashboard;