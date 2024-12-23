import React, { useContext, useEffect, useState } from 'react';
import '../styles/nav.css';
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Context } from '../context/Context';

const Nav = () => {
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const { user, getUser, logout } = useContext(Context);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="nav-container">
        <h1 onClick={() => navigate('/dashboard')}>BankFresh</h1>
        <div className="user-profile">
          <div onClick={() => setShowProfile(!showProfile)}>
            <h5>
              Welcome <br />
              {user.fullName}
            </h5>
          </div>
          <div
            className="user-icon"
            onClick={() => setShowProfile(!showProfile)}
          >
            <FaUserCog />
          </div>
          <div className="logout" onClick={logout}>
            <RiLogoutCircleRLine />
          </div>
        </div>
      </div>
      {showProfile && (
        <div className="user-container">
          <p onClick={() => navigate('/customer-profile')}>Profile</p>
          <p onClick={() => navigate('/transaction-password')}>
            Generate New Transaction Password
          </p>
          <p>Change Login Password</p>
        </div>
      )}
    </>
  );
};

export default Nav;
