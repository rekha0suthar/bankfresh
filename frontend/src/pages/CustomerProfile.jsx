import React, { useContext, useEffect } from 'react';
import Container from '../components/Container';
import { Context } from '../context/Context';
import '../styles/customer-profile.css';
import { formatDate } from '../utils';
import userAvatar from '../assets/user.png';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = () => {
  const { user, customerId, getUser, getUserAccount } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
    getUserAccount();
  }, []);
  return (
    <Container>
      <div className="main-container">
        <h2 className="heading">My Profile</h2>
        <div className="main-wrapper profile-wrapper">
          <h2
            style={{
              alignItems: 'center',
              display: 'flex',
              textTransform: 'uppercase',
            }}
          >
            <img src={userAvatar} alt="" /> {user.fullName}
          </h2>
          <h2>Login Information</h2>
          <div className="user-field">
            <span>User ID</span>
            <span>{customerId}</span>
          </div>
          <h2>Personal Information</h2>
          <div>
            <div className="user-field">
              <span>Date of Birth</span>
              <span>{formatDate(user.dateOfBirth)}</span>
            </div>
            <div className="user-field">
              <span>Aadhar Number</span>
              <span>{user.identityProof}</span>
            </div>
          </div>
          <h2>Contact Information</h2>
          <div>
            <div className="user-field">
              <span>Communication Address</span>
              <span className="address">
                {user.address?.street}, {user.address?.city},{' '}
                {user.address?.state}, {user.address?.country},{' '}
                {user.address?.postalCode}
              </span>
            </div>
            <div className="user-field">
              <span>Email ID</span>
              <span>{user.email}</span>
            </div>
            <div className="user-field">
              <span>Contact Number(Mobile)</span>
              <span>+91 {user.mobileNumber}</span>
            </div>
          </div>
          <button onClick={() => navigate('/dashboard')}>Ok</button>
        </div>
      </div>
    </Container>
  );
};

export default CustomerProfile;
