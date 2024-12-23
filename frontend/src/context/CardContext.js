import { createContext, useState } from 'react';

const CardContext = createContext({});

const CardContextProvider = ({ children }) => {
  const [showBlockMsg, setShowBlockMsg] = useState(false);
  const [showPinMsg, setShowPinMsg] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCardDetail, setShowCardDetail] = useState(false);
  return (
    <CardContext.Provider
      value={{
        showBlockMsg,
        setShowBlockMsg,
        showPinMsg,
        setShowPinMsg,
        showCardDetail,
        setShowCardDetail,
        pin,
        setPin,
        confirmPin,
        setConfirmPin,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export { CardContext, CardContextProvider };
