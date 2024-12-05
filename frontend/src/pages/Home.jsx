import React from 'react';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="nav-header">
        <h1>BankFresh</h1>
        <a href="/login">Log in</a>
      </div>
      <div className="home-section">
        <div className="links">
          <h1>Your money is where you are</h1>
          <p>
            Spend, save and manage your money, all at one place, open your
            account here
          </p>
          <a href="/create-account" className="account-link">
            Online Account Opening
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
