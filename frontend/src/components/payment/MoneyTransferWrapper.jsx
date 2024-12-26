import React, { useContext, useEffect } from 'react';
import Container from '../Container';
import { MoneyContext } from '../../context/MoneyContext';
import Payment from './Payment';
import PaymentInfo from './PaymentInfo';
import VerifyTransaction from './VerifyTransaction';
import { Context } from '../../context/Context';
import Wrapper from '../Wrapper';

const MoneyTransferWrapper = () => {
  const { confirmTransfer, verifyTransaction } = useContext(MoneyContext);
  const { getBalance, accountSummary } = useContext(Context);

  useEffect(() => {
    getBalance();
    accountSummary();
  }, []);
  return (
    <Container>
      <Wrapper heading="Manage Debit Card">
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
      </Wrapper>
    </Container>
  );
};

export default MoneyTransferWrapper;
