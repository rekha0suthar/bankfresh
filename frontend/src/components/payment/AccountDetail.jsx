import React, { useContext } from 'react';
import { Context } from '../../context/Context';

const AccountDetail = () => {
  const { userAccount } = useContext(Context);
  return (
    <table className="account-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Account Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{userAccount?.customerName}</td>
          <td>{userAccount?.accountNumber}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AccountDetail;
