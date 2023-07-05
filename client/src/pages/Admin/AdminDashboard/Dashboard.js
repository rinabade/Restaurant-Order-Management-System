import '../../../App.css'

import Sidebar from '../../../components/AdminComponent/Sidebar/Sidebar';
import {Outlet} from 'react-router-dom';

function Dashboard() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/> 
        <Outlet/>
      </div>
    </div>
  );
}

export default Dashboard;