import { createContext, useState } from 'react';

const MoneyContext = createContext({});

const MoneyContextProvider = ({ children }) => {
  const [inputAccount, setInputAccount] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [confirmTransfer, setConfirmTransfer] = useState(false);
  const [verifyTransaction, setVerifyTransaction] = useState(false);
  const [transactionPassword, setTransactionPassword] = useState('');
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [purpose, setPurpose] = useState('');
  return (
    <MoneyContext.Provider
      value={{
        inputAccount,
        setInputAccount,
        inputAmount,
        setInputAmount,
        purpose,
        setPurpose,
        confirmTransfer,
        setConfirmTransfer,
        verifyTransaction,
        setVerifyTransaction,
        isResendEnabled,
        setIsResendEnabled,
        transactionPassword,
        setTransactionPassword,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
};

export { MoneyContext, MoneyContextProvider };
