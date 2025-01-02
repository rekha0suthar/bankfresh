import React, { useContext } from 'react';
import { CardContext } from '../../context/CardContext';
import Input from '../form/Input';

const SetPin = ({ handleGeneratePin }) => {
  const { pin, setPin, confirmPin, setConfirmPin, setShowPinMsg } =
    useContext(CardContext);
  return (
    <div className="generate-pin">
      <h4>Generate PIN</h4>
      <Input placeholder="Enter PIN" value={pin} setValue={setPin} />
      <br />
      <Input
        placeholder="Re-enter PIN"
        value={confirmPin}
        setValue={setConfirmPin}
      />
      <br />
      <button onClick={handleGeneratePin}>Submit</button>
      <button onClick={() => setShowPinMsg(false)}>Cancel</button>
    </div>
  );
};

export default SetPin;
