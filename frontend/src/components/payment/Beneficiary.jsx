import React, { useContext } from 'react';
import { MoneyContext } from '../../context/MoneyContext';

const Beneficiary = ({ beneficiary, setShowAccount }) => {
  const { setInputAccount } = useContext(MoneyContext);

  const handleInputAccount = async () => {
    setInputAccount(beneficiary.accountNumber);
    setShowAccount(true);
  };

  return (
    <table className="account-table">
      <thead>
        <tr>
          <th>Name</th>
          <th> Short Name</th>
          <th>Account Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="radio" name="ben" onClick={handleInputAccount} />{' '}
            {beneficiary?.realName}
          </td>
          <td>{beneficiary?.beneficiaryName}</td>
          <td>{beneficiary?.accountNumber}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Beneficiary;
