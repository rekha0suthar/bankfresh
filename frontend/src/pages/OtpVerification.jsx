import React, { useContext, useEffect, useState } from 'react';
import Otp from '../components/Otp';
import { Context } from '../context/Context';
import '../styles/otp.css';

const OtpVerification = () => {
  const { setOtp, verifyOtp, resendOtp, userId } = useContext(Context);
  const [timer, setTimer] = useState(300);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendEnabled(true);
    }
  }, [timer]);

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

  const onVerifyOtp = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await verifyOtp(); // Ensure you pass the OTP and userId
    } catch (error) {
      setErrorMessage('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      secs < 10 ? '0' : ''
    }${secs}`;
  };

  return (
    <div className="container">
      <h2>Enter the OTP</h2>
      <Otp length={6} onChangeOTP={setOtp} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="otp-text">
        {isResendEnabled
          ? 'Resend OTP now'
          : `OTP valid till ${formatTime(timer)}`}
      </div>
      <button onClick={onVerifyOtp} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
      <button onClick={onResendOtp} disabled={!isResendEnabled || loading}>
        {loading ? 'Resending...' : 'Resend OTP'}
      </button>
    </div>
  );
};

export default OtpVerification;
