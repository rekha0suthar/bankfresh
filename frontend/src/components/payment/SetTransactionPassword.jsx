import React from 'react';

const TransactionPassword = ({
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
      <input
        type="password"
        placeholder="Transaction Password"
        value={transPass}
        onChange={(e) => setTransPass(e.target.value)}
        min={6}
        required
        className="trans-input"
      />
      <br />
      <input
        type="password"
        placeholder="Confirm Transaction Password"
        value={confirmTransPass}
        onChange={(e) => setConfirmTransPass(e.target.value)}
        min={6}
        required
        className="trans-input"
      />
      <br />
      {error && <p style={{ color: 'red' }}>Incorrect match</p>}
      <button onClick={handleTransactionPassword}>Save</button>
      <button onClick={clearInput}>Clear</button>
    </>
  );
};

export default TransactionPassword;
