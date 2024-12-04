import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import '../styles/form.css';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

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
    <>
      <div className="account-form wd-5">
        <h1>
          Welcome to <span>NetBanking</span>
        </h1>

        <div>
          <label className="label-box">Customer ID</label>

          <input
            type="text"
            className="input-box"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label-box">Password</label>

          <input
            type="password"
            className="input-box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="cc-number"
          />
        </div>

        <button onClick={login}>{loading ? 'Logging ...' : 'Login'}</button>
        <button onClick={() => navigate('/forget-password')}>
          Forget Password
        </button>
        <button onClick={() => navigate('/signup')}>
          New User Registration
        </button>
      </div>
    </>
  );
};

export default Login;
