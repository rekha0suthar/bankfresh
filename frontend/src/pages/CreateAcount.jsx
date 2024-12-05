import React, { useContext } from 'react';
import '../styles/account-form.css';
import { Context } from '../context/Context';
import ImageCaptcha from '../components/ImageCaptcha';
import InputGroup from '../components/InputGroup';
import Address from '../components/Address';
import { useNavigate } from 'react-router-dom';

const CreateAcount = () => {
  const {
    fullName,
    setFullName,
    dob,
    setDob,
    accountType,
    setAccountType,
    gender,
    setGender,
    identity,
    setIdentity,
    nationality,
    setNationality,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    createAccount,
  } = useContext(Context);

  const navigate = useNavigate();

  return (
    <div className="account-form wd-6">
      <h1>Open New Account</h1>
      {/* Full name field */}
      <InputGroup
        inputValue={fullName}
        setInputValue={setFullName}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Full Name"
        nameValue="fullname"
        placeHolder="Enter your full name"
      />
      {/* Date of Birth Field */}
      <InputGroup
        inputValue={dob}
        setInputValue={setDob}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Date of Birth"
        nameValue="dob"
        inputType="date"
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
      {/* Email Field */}
      <InputGroup
        inputValue={email}
        setInputValue={setEmail}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Email"
        nameValue="email"
        placeHolder="Enter your email"
        inputType="email"
      />
      {/* Mobile Number field */}
      <InputGroup
        inputValue={mobileNumber}
        setInputValue={setMobileNumber}
        divClass="account-form-field"
        inputClass="input-box"
        labelClass="label-box"
        labelValue="Mobile Number"
        nameValue="mobile-number"
        minLen={10}
        maxLen={12}
        placeHolder="Enter your mobile number"
      />
      {/* AccountType field */}
      <div className="account-form-field">
        {' '}
        <label className="label-box">
          Account Type<span>*</span>
        </label>
        <div className="input-box">
          <input
            type="radio"
            value="Saving"
            name="accountType"
            checked={accountType === 'Saving'}
            onChange={(e) => setAccountType(e.target.value)}
          />
          <label>Saving</label>
          <input
            type="radio"
            value="Current"
            name="accountType"
            checked={accountType === 'Current'}
            onChange={(e) => setAccountType(e.target.value)}
          />
          <label>Current</label>
        </div>
      </div>
      {/* Gender field */}
      <div className="account-form-field">
        <label className="label-box">
          Gender<span>*</span>
        </label>
        <div className="input-box">
          <input
            type="radio"
            value="Male"
            name="gender"
            checked={gender === 'Male'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label>Male</label>
          <input
            type="radio"
            value="Female"
            name="gender"
            checked={gender === 'Female'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label>Female</label>
          <input
            type="radio"
            value="Other"
            name="gender"
            checked={gender === 'Other'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label>Other</label>
        </div>
      </div>

      {/* Nationality field */}
      <div className="account-form-field">
        {' '}
        <label className="label-box">
          Nationality<span>*</span>
        </label>
        <div className="input-box">
          <input
            type="radio"
            value="Indian"
            name="nationality"
            checked={nationality === 'Indian'}
            onChange={(e) => setNationality(e.target.value)}
          />
          <label>Indian</label>
          <input
            type="radio"
            value="Non-Indian"
            name="nationality"
            checked={nationality === 'Non-Indian'}
            onChange={(e) => setNationality(e.target.value)}
          />
          <label>Non-Indian</label>
        </div>
      </div>
      {/* Address field Component */}
      <Address />
      <div>
        <label className="label-box">
          Enter Captcha<span>*</span>
        </label>
      </div>
      <ImageCaptcha />
      <button onClick={createAccount}>Save and Continue</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default CreateAcount;
