import React, { useContext } from 'react';
import { Context } from '../context/Context';
import '../styles/form.css';
import InputGroup from '../components/InputGroup';
import { useNavigate } from 'react-router-dom';
import ImageCaptcha from '../components/ImageCaptcha';

const ForgetPassword = () => {
  const {
    identity,
    setIdentity,
    accountNumber,
    setAcountNumber,
    customerId,
    setCustomerId,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    forgetPassword,
  } = useContext(Context); // all the states from context

  const navigate = useNavigate();

  return (
    <div className="account-form wd-6">
      <h1>Reset Password</h1>
      <InputGroup
        inputValue={customerId}
        setInputValue={setCustomerId}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Customer ID"
        nameValue="customer-id"
      />
      <InputGroup
        inputValue={accountNumber}
        setInputValue={setAcountNumber}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Current/Saving Account Number"
        nameValue="account-number"
      />
      {/* Identity Field */}
      <InputGroup
        inputValue={identity}
        setInputValue={setIdentity}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Identity Proof"
        nameValue="identity"
        minLen={12}
        maxLen={12}
        placeHolder="Enter your aadhar number"
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
        labelValue="Re-enter Password"
        nameValue="confirm-password"
        minLen={6}
      />
      <div>
        <label className="label-box">Enter Captcha *</label>
      </div>
      <ImageCaptcha />
      <button onClick={forgetPassword}>Submit</button>
      <button onClick={() => navigate('/login')}>Cancel</button>
    </div>
  );
};

export default ForgetPassword;
