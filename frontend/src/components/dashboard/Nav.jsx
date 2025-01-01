import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../styles/nav.css';
import { useNavigate } from 'react-router-dom';
import { FaUserCog } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Context } from '../../context/Context';

const Nav = () => {
  const [showProfile, setShowProfile] = useState(false);
  const userContainerRef = useRef(null);

  const navigate = useNavigate();

  const { user, getUser, logout } = useContext(Context);

  useEffect(() => {
    getUser();
    const handleClickOutside = (event) => {
      if (
        userContainerRef.current &&
        !userContainerRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div onClick={() => setShowProfile(false)}>
      <div className="nav-container" onClick={(e) => e.stopPropagation()}>
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
        <div className="user-container" ref={userContainerRef}>
          <p onClick={() => navigate('/customer-profile')}>Profile</p>
          <p onClick={() => navigate('/transaction-password')}>
            Generate New Transaction Password
          </p>
          <p onClick={() => navigate('/change-password')}>
            Change Login Password
          </p>
        </div>
      )}
    </div>
  );
};

export default Nav;
