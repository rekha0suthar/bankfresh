import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Context';

const AccountSummary = () => {
  const { account, accountSummary } = useContext(Context);
  useEffect(() => {
    accountSummary();
  }, []);
  return (
    <div className="account-summary mt">
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
  );
};

export default AccountSummary;
