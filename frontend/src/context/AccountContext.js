import { createContext, useState } from 'react';

const AccountContext = createContext({});

const AccountContextProvider = ({ children }) => {
  const [type, setType] = useState('all');
  const [time, setTime] = useState('current-month');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <AccountContext.Provider
      value={{
        type,
        setType,
        time,
        setTime,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountContextProvider }; // export both the context and the provider
