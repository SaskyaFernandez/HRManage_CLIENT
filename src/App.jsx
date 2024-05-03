import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './composants/sidebar/sidebar';
import DashboardContent from './composants/dashboard/dashboard';

const App = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="dashboard">
      {!hideSidebar ? (
        <div>
          <Sidebar />
          <DashboardContent />
        </div>
      ) : (
        <DashboardContent />
      )}
    </div>
  );
};

export default App;
