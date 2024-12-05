import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';
import InputGroup from '../components/InputGroup';

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
      <InputGroup
        inputValue={accountNumber}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Current/Saving Account Number"
        nameValue="account-number"
      />

      <InputGroup
        inputValue={debitCard?.cardNumber}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="ATM cum Debit Card Number"
        nameValue="card-number"
      />
      <InputGroup
        inputValue={customerId}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Customer ID"
        nameValue="customer-id"
      />

      <InputGroup
        inputValue={mobileNumber}
        setInputValue={setMobileNumber}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Registered Mobile Number"
        nameValue="mobile-number"
        minLen={10}
        maxLen={12}
      />
      <InputGroup
        inputValue={password}
        inputType="password"
        setInputValue={setPassword}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Password"
        nameValue="password"
        minLen={6}
      />
      <InputGroup
        inputValue={confirmPassword}
        inputType="password"
        setInputValue={setConfirmPassword}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Confirm Password"
        nameValue="confirm-password"
        minLen={6}
      />
      <button onClick={signup}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default Signup;
