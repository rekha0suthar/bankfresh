import React from 'react';
import '../styles/dashboard.css';
import Balance from '../components/dashboard/Balance';
import Container from '../components/dashboard/Container';

const Dashboard = () => {
  return (
    <Container>
      <div className="dashboard-section">
        <Balance />
      </div>
    </Container>
  );
};

export default Dashboard;
