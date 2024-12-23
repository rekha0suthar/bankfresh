import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import { MoneyContext } from '../../context/MoneyContext';

const PaymentInfo = () => {
  const { account, transactionOtp } = useContext(Context);
  const {
    inputAccount,
    inputAmount,
    purpose,
    setVerifyTransaction,
    setConfirmTransfer,
  } = useContext(MoneyContext);
  const navigate = useNavigate();

  const handleTransfer = () => {
    setVerifyTransaction(true);
    transactionOtp();
  };

  return (
    <div className="main-wrapper">
      <div className="review-msg">
        <h3>REVIEW</h3>
        <p>
          You initiated a request for Money Transfer. Please review the details
          below.
        </p>
      </div>
      <div className="confirm-detail">
        <span>
          <p>Account to be debited</p>
          <strong>{account?.accountNumber}</strong>
        </span>
        <span>
          <p>Account to be credited</p>
          <strong>{inputAccount}</strong>
        </span>
        <span>
          <p>Transaction Date</p>
          <strong>{new Date().toLocaleDateString()}</strong>
        </span>
        <span>
          <p>Amount</p>
          <strong>₹ {inputAmount}</strong>
        </span>

        <span>
          <p>Purpose</p>
          <strong>{purpose}</strong>
        </span>
      </div>
      <button onClick={handleTransfer}>Confirm</button>
      <button onClick={() => navigate('/dashboard')}>Cancel</button>
      <button onClick={() => setConfirmTransfer(false)}>Back</button>
    </div>
  );
};

export default PaymentInfo;
