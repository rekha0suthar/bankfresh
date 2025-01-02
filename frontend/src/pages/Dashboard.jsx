import React, { lazy, Suspense } from 'react';
import '../styles/dashboard.css';
const Balance = lazy(() => import('../components/dashboard/Balance'));
const Container = lazy(() => import('../components/dashboard/Container'));

const Dashboard = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <div className="dashboard-section">
          <Balance />
        </div>
      </Container>
    </Suspense>
  );
};

export default Dashboard;
