import React, { useState } from 'react';

const Otp = ({ length, onChangeOTP }) => {
  const [otpCode, setOtpCode] = useState(new Array(length).fill(''));
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = element.value;
    setOtpCode(newOtp);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
    onChangeOTP(newOtp.join(''));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpCode[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };
  return (
    <div className="otp">
      {otpCode.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default Otp;
