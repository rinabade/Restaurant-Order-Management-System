import './KitchenDashboard.css'

import KitchenSidebar from '../../../components/KitchenComponent/KitchenSidebar/KitchenSidebar';
import {Outlet} from 'react-router-dom';

function KitchenDashboard() {
  return (
    <div className="kitchendashboard">
      <div className="kitchendashboardGlass">
        <KitchenSidebar/> 
        <Outlet/>
      </div>
    </div>
  );
}

export default KitchenDashboard;