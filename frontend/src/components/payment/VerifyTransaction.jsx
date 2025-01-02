import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '../../utils';
import { MoneyContext } from '../../context/MoneyContext';
import Input from '../form/Input';

const userId = localStorage.getItem('userId');

const VerifyTransaction = () => {
  const [timer, setTimer] = useState(300);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    transactionPassword,
    setTransactionPassword,
    inputAccount,
    inputAmount,
    purpose,
    isResendEnabled,
    setIsResendEnabled,
  } = useContext(MoneyContext);

  const {
    otp,
    setOtp,
    account,
    transactionVerify,
    loading,
    setLoading,
    resendOtp,
  } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendEnabled(true);
    }
  }, [timer, setIsResendEnabled]);

  const onResendOtp = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await resendOtp(userId);
      setTimer(300);
      setIsResendEnabled(false);
      setOtp(''); // Clear the OTP input
    } catch (error) {
      setErrorMessage('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="main-wrapper">
      <div className="verify-payment">
        <h2>Verify Payment</h2>
        <label>Transaction Password</label>
        <br />
        <Input
          type="password"
          value={transactionPassword}
          setValue={setTransactionPassword}
        />
        <br />
        <label>Otp</label>
        <br />
        <Input value={otp} setValue={setOtp} />{' '}
        <button disabled={!isResendEnabled} onClick={onResendOtp}>
          {loading ? 'Resending.....' : 'Resend'}
        </button>
        <br />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="otp-text">
          {isResendEnabled
            ? 'Resend OTP now'
            : `OTP valid till ${formatTime(timer)}`}
        </div>
      </div>
      <button
        onClick={() =>
          transactionVerify(
            account.accountId,
            transactionPassword,
            inputAccount,
            inputAmount,
            purpose
          )
        }
      >
        {loading ? 'Verifying.....' : 'Verify'}
      </button>
      <button onClick={() => navigate('/dashboard')}>Cancel</button>
    </div>
  );
};

export default VerifyTransaction;
