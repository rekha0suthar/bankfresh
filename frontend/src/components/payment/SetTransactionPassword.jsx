import React from 'react';
import Input from '../form/Input';

const SetTransactionPassword = ({
  transPass,
  setTransPass,
  confirmTransPass,
  setConfirmTransPass,
  handleTransactionPassword,
  error,
  clearInput,
}) => {
  return (
    <>
      <h4>Set Transaction Password</h4>
      <Input
        type="password"
        placeholder="Transaction Password"
        value={transPass}
        setValue={setTransPass}
        className="trans-input"
      />
      <br />
      <Input
        type="password"
        placeholder="Confirm Transaction Password"
        value={confirmTransPass}
        setValue={setConfirmTransPass}
        className="trans-input"
      />
      <br />
      {error && (
        <p style={{ color: 'red' }}>
          Incorrect match or Password length should be more than 6 characters
        </p>
      )}
      <button onClick={handleTransactionPassword}>Save</button>
      <button onClick={clearInput}>Clear</button>
    </>
  );
};

export default SetTransactionPassword;
