import React, { useContext, useEffect } from 'react';
import HigherOrderComponent from '../HigherOrderComponent';
import { MoneyContext } from '../../context/MoneyContext';
import Payment from './Payment';
import PaymentInfo from './PaymentInfo';
import VerifyTransaction from './VerifyTransaction';
import { Context } from '../../context/Context';

const MoneyTransferWrapper = () => {
  const { confirmTransfer, verifyTransaction } = useContext(MoneyContext);
  const { getBalance, accountSummary } = useContext(Context);

  useEffect(() => {
    getBalance();
    accountSummary();
  }, []);
  return (
    <HigherOrderComponent>
      <div className="main-container">
        <h2 className="heading">Transfer Money</h2>
        <p>Transfer Type</p>
        <div className="money-transfer-header">
          <h2>Within Bank</h2>
          {/* <h2>Other Bank</h2>
          <h2>Own Accounts</h2> */}
        </div>
        {!confirmTransfer && !verifyTransaction && (
          // Component: to send money using account number -- fetch account details, and add amount and proceed
          <Payment />
        )}{' '}
        {confirmTransfer && !verifyTransaction && (
          // Component: Once account details are fetched, add amount and proceed -- confirm all details
          <PaymentInfo />
        )}
        {verifyTransaction && (
          // Component: Add Transaction password and otp -- verify transaction
          <VerifyTransaction />
        )}
      </div>
    </HigherOrderComponent>
  );
};

export default MoneyTransferWrapper;
