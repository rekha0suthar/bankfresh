import React from 'react';
import '../styles/services.css';
import HigherOrderComponent from '../components/HigherOrderComponent';
import AccountSummary from '../components/AccountSummary';
import AccountStatement from '../components/AccountStatement';

const AccountServices = () => {
  return (
    <HigherOrderComponent>
      <AccountSummary />
      <AccountStatement />
    </HigherOrderComponent>
  );
};

export default AccountServices;
