import React from 'react';

const InputGroup = ({
  inputType = 'text',
  inputValue,
  setInputValue,
  labelValue,
  nameValue,
  divClass,
  labelClass,
  inputClass,
  minLen,
  maxLen,
  placeHolder,
}) => {
  return (
    <div className={divClass}>
      <label className={labelClass}>{labelValue} *</label>

      <input
        className={inputClass}
        type={inputType}
        name={nameValue}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        min={minLen}
        max={maxLen}
        placeholder={placeHolder}
        onCopy={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        required
      />
    </div>
  );
};

export default InputGroup;
