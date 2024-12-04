import React, { useContext } from 'react';
import '../styles/account-form.css';
import { Context } from '../context/Context';

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
    address,
    setAddress,
    createAccount,
  } = useContext(Context);
  return (
    <div className="account-form wd-7">
      <div>
        <label className="label-box">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          className="input-box"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="label-box">DOB</label>
        <input
          type="Date"
          className="input-box"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </div>

      <div>
        {' '}
        <label>Account Type</label>
        <input
          type="radio"
          value="Savings"
          name="accountType"
          checked={accountType === 'Savings'}
          onChange={(e) => setAccountType(e.target.value)}
        />
        <label>Savings</label>
        <input
          type="radio"
          value="Current"
          name="accountType"
          checked={accountType === 'Current'}
          onChange={(e) => setAccountType(e.target.value)}
        />
        <label>Current</label>
      </div>
      <div>
        <label>Gender</label>
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
      <div>
        {' '}
        <label className="label-box">Identity Proof</label>
        <input
          type="text"
          placeholder="Aadhar number"
          className="input-box"
          min={12}
          max={12}
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          required
        />
      </div>

      <div>
        {' '}
        <label>Nationality</label>
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
          value="Foreigner"
          name="nationality"
          checked={nationality === 'Foreigner'}
          onChange={(e) => setNationality(e.target.value)}
        />
        <label>Foreigner</label>
      </div>
      <div>
        <label className="label-box">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="label-box">Mobile Number</label>
        <input
          type="phone"
          placeholder="Enter your mobile number"
          className="input-box"
          min={10}
          max={12}
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
      </div>
      <div className="address">
        <label className="label-box">Address</label>
        <div>
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
          <br />
          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            required
          />
          <br />
          <input
            type="text"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
            min={6}
            max={6}
            required
          />
        </div>
      </div>

      <button onClick={createAccount}>Save and Continue</button>
    </div>
  );
};

export default CreateAcount;
