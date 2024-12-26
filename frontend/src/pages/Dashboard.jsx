import React from 'react';
import '../styles/dashboard.css';
import Balance from '../components/Balance';
import Container from '../components/Container';

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
