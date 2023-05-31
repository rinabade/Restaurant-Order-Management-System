import '../../../App.css'
import MainDash from '../MainDash/MainDash';
import Sidebar from '../../../components/Sidebar';
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