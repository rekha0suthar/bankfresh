import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import '../styles/services.css';
import HigherOrderComponent from '../components/HigherOrderComponent';

const AccountServices = () => {
  const { account, accountSummary } = useContext(Context);
  //   const { customerName, accountNumber, accountType, balance } = account;
  useEffect(() => {
    accountSummary();
  }, []);
  return (
    <HigherOrderComponent>
      <div className="account-summary">
        <h2>Current & Saving Account Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>Net Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr key={account?.accountNumber}>
              <td>{account?.customerName?.fullName}</td>
              <td>{account?.accountNumber}</td>
              <td>{account?.accountType}</td>
              <td>₹ {account?.balance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </HigherOrderComponent>
  );
};

export default AccountServices;
