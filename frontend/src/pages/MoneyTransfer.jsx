import React, { lazy, Suspense } from 'react';
import '../styles/money-transfer.css';

import { MoneyContextProvider } from '../context/MoneyContext';
const MoneyTransferWrapper = lazy(() =>
  import('../components/payment/MoneyTransferWrapper')
);

const MoneyTransfer = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoneyContextProvider>
        <MoneyTransferWrapper />
      </MoneyContextProvider>
    </Suspense>
  );
};

export default MoneyTransfer;
