import React from 'react';
import '../styles/money-transfer.css';
import { MoneyContextProvider } from '../context/MoneyContext';
import MoneyTransferWrapper from '../components/payment/MoneyTransferWrapper';

const MoneyTransfer = () => {
  return (
    <MoneyContextProvider>
      <MoneyTransferWrapper />
    </MoneyContextProvider>
  );
};

export default MoneyTransfer;
