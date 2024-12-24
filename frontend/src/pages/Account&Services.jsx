import React from 'react';
import '../styles/services.css';
import HigherOrderComponent from '../components/HigherOrderComponent';
import AccountSummary from '../components/account/AccountSummary';
import AccountStatement from '../components/account/AccountStatement';

const AccountServices = () => {
  return (
    <HigherOrderComponent>
      <AccountSummary />
      <AccountStatement />
    </HigherOrderComponent>
  );
};

export default AccountServices;
