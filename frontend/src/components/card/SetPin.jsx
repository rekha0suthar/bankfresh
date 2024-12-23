import React, { useContext } from 'react';
import { CardContext } from '../../context/CardContext';

const SetPin = () => {
  const {
    pin,
    setPin,
    confirmPin,
    setConfirmPin,
    handleGeneratePin,
    setShowPinMsg,
  } = useContext(CardContext);
  return (
    <div className="generate-pin">
      <h4>Generate PIN</h4>
      <input
        type="text"
        placeholder="Enter PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Re-enter PIN"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
      />
      <br />
      <button onClick={handleGeneratePin}>Submit</button>
      <button onClick={() => setShowPinMsg(false)}>Cancel</button>
    </div>
  );
};

export default SetPin;
