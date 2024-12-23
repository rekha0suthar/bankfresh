import React from 'react';
import '../styles/dashboard.css';
import Balance from '../components/Balance';
import HigherOrderComponent from '../components/HigherOrderComponent';

const Dashboard = () => {
  return (
    <HigherOrderComponent>
      <div className="dashboard-section">
        <Balance />
      </div>
    </HigherOrderComponent>
  );
};

export default Dashboard;
