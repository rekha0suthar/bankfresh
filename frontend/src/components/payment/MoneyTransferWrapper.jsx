import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { MoneyContext } from '../../context/MoneyContext';
import { Context } from '../../context/Context';

const Container = lazy(() => import('../dashboard/Container'));
const Wrapper = lazy(() => import('../dashboard/Wrapper'));
const Payment = lazy(() => import('./Payment'));
const PaymentInfo = lazy(() => import('./PaymentInfo'));
const VerifyTransaction = lazy(() => import('./VerifyTransaction'));

const MoneyTransferWrapper = () => {
  const { confirmTransfer, verifyTransaction } = useContext(MoneyContext);
  const { getBalance, accountSummary } = useContext(Context);

  useEffect(() => {
    getBalance();
    accountSummary();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Wrapper heading="Money Transfer">
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
    </Suspense>
  );
};

export default MoneyTransferWrapper;
