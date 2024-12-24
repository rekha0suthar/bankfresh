import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import '../styles/dashboard.css';

const Balance = () => {
  const { balance, getBalance } = useContext(Context);
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
        <p>Assets</p>
        <p>₹ {balance}</p>
      </div>
    </div>
  );
};

export default Balance;
