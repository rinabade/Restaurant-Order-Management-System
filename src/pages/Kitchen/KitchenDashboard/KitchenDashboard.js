import '../../../App.css'

import KitchenSidebar from '../../../components/KitchenComponent/KitchenSidebar/KitchenSidebar';
import {Outlet} from 'react-router-dom';

function KitchenDashboard() {
  return (
    <div className="App">
      <div className="AppGlass">
        <KitchenSidebar/> 
        <Outlet/>
      </div>
    </div>
  );
}

export default KitchenDashboard;