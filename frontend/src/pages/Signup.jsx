import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';

const Signup = () => {
  const {
    mobileNumber,
    setMobileNumber,
    accountNumber,
    customerId,
    debitCard,
    getUserAccount,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    signup,
  } = useContext(Context);

  const navigate = useNavigate();
  useEffect(() => {
    getUserAccount();
  }, []);
  return (
    <div className="account-form wd-6">
      <h1>
        Register to <span>NetBanking</span>
      </h1>
      <div>
        <label className="label-box">Current/Saving Account Number</label>
        <input
          type="text"
          className="input-box"
          value={accountNumber}
          required
        />
      </div>
      <div>
        <label className="label-box">ATM cum Debit Card Number</label>
        <input
          type="text"
          className="input-box"
          value={debitCard?.cardNumber}
          required
        />
      </div>
      <div>
        <label className="label-box">Customer ID</label>
        <input type="text" className="input-box" value={customerId} required />
      </div>
      <div>
        <label className="label-box">Registered Mobile Number</label>
        <input
          type="phone"
          className="input-box"
          min={10}
          max={12}
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="label-box">Password</label>
        <input
          type="password"
          className="input-box"
          min={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="label-box">Confirm Password</label>
        <input
          type="password"
          className="input-box"
          min={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={signup}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default Signup;
