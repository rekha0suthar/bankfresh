import React from 'react';
import '../styles/services.css';
import Container from '../components/dashboard/Container';
import AccountSummary from '../components/account/AccountSummary';
import AccountStatement from '../components/account/AccountStatement';

const AccountServices = () => {
  return (
    <Container>
      <AccountSummary />
      <AccountStatement />
    </Container>
  );
};

export default AccountServices;
