import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import AccountDetail from './AccountDetail';
import { useNavigate } from 'react-router-dom';
import { MoneyContext } from '../../context/MoneyContext';

const Payment = () => {
  const [showAccount, setShowAccount] = useState(false);
  const {
    inputAccount,
    setInputAccount,
    inputAmount,
    setInputAmount,
    purpose,
    setPurpose,
    setConfirmTransfer,
  } = useContext(MoneyContext);
  const { account, balance, userAccount, getAccount } = useContext(Context);
  const navigate = useNavigate();

  const handleAccount = async () => {
    setShowAccount(true);
    await getAccount(inputAccount);
  };
  return (
    <div className="main-wrapper money-transfer">
      <div>
        <label>Account to be debited</label>
        <br />
        <select>
          <option value="">{account?.accountNumber}</option>
        </select>
      </div>
      <strong>Balance: ₹{balance}</strong>
      <div>
        <label>Account to be credited</label> <br />
        <input
          type="text"
          value={inputAccount}
          onChange={(e) => setInputAccount(e.target.value)}
        />
        <button onClick={handleAccount}>Get Account Details</button>
      </div>
      {showAccount &&
        (Object.keys(userAccount).length !== 0 ? (
          <>
            <AccountDetail />
            <div>
              <input
                type="text"
                placeholder="₹ Amount"
                className="trans-input"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Purpose"
                className="trans-input"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>
          </>
        ) : (
          <p style={{ marginTop: '10px' }}>No Account found</p>
        ))}
      <div>
        <h3>Note:</h3>
        <ul>
          <li>
            1.Please note that the funds transfer to the newly added
            beneficiaries are disabled till 4 hours from the time of beneficiary
            addition.
          </li>
          <li>
            2.From 4 hours till 24 hours, up to Rs. 50000 can be transferred.
            After 24 hours you can transfer up to your permitted limit.
          </li>
        </ul>
      </div>
      <button onClick={() => setConfirmTransfer(true)}>Transfer</button>
      <button onClick={() => navigate('/dashboard')}>Cancel</button>
    </div>
  );
};

export default Payment;
