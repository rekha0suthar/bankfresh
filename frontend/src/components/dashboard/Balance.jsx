import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css';
import QuickActions from './QuickActions';

const Balance = () => {
  const { balance, getBalance } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    getBalance();
  }, []);

  const currentDate = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;
  return (
    <div className="balance-container">
      <div>
        <p>My Net Worth till</p>
        <p className="date"> {currentDate}</p>
      </div>
      <div className="balance">
        <p>Balance</p>
        <p>₹ {balance}</p>
      </div>
      <QuickActions />
    </div>
  );
};

export default Balance;
