import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import '../styles/form.css';
import { useNavigate } from 'react-router-dom';
import ImageCaptcha from '../components/form/ImageCaptcha';
import InputGroup from '../components/form/InputGroup';

const Login = () => {
  const {
    customerId,
    setCustomerId,
    password,
    setPassword,
    loading,
    login,
    getUserAccount,
  } = useContext(Context); // all the states from context

  const navigate = useNavigate();

  useEffect(() => {
    const data = getUserAccount();
    setCustomerId(data.customerId);
  }, []);

  return (
    <div className="form-container">
      <h1>
        Welcome to <strong>NetBanking</strong>
      </h1>

      <InputGroup
        inputValue={customerId}
        setInputValue={setCustomerId}
        nameValue="cusomterId"
        labelValue="Customer ID"
      />

      <InputGroup
        inputValue={password}
        setInputValue={setPassword}
        nameValue="password"
        labelValue="Password"
        inputType="password"
      />

      <ImageCaptcha />

      <div className="btns">
        <button onClick={login}>{loading ? 'Logging ...' : 'Login'}</button>
        <button onClick={() => navigate('/forget-password')}>
          Forget/Rest Password
        </button>
        <button onClick={() => navigate('/signup')}>
          New User Registration
        </button>
      </div>
    </div>
  );
};

export default Login;
