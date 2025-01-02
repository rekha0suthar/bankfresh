import React, { lazy, Suspense } from 'react';
import '../styles/services.css';
import { AccountContextProvider } from '../context/AccountContext';

const Container = lazy(() => import('../components/dashboard/Container'));
const AccountSummary = lazy(() =>
  import('../components/account/AccountSummary')
);
const AccountStatement = lazy(() =>
  import('../components/account/AccountStatement')
);

const AccountServices = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <AccountSummary />
        <AccountContextProvider>
          <AccountStatement />
        </AccountContextProvider>
      </Container>
    </Suspense>
  );
};

export default AccountServices;
