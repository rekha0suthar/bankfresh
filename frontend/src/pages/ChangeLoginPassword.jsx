import React, { useContext, useState } from 'react';
import Container from '../components/Container';
import Wrapper from '../components/Wrapper';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

const ChangeLoginPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { changeLoginPassword } = useContext(Context);
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper heading="Change Login Password">
        <div className="main-wrapper change-password">
          <h4>Please change your login password for security reasons</h4>
          <div>
            <label>Current Password</label>
            <br />
            <input
              type="password"
              name="current_password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password</label>
            <br />
            <input
              type="password"
              name="new_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Re-enter Password</label>
            <br />
            <input
              type="password"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            onClick={() =>
              changeLoginPassword(currentPassword, newPassword, confirmPassword)
            }
          >
            Submit
          </button>
          <button onClick={() => navigate('/dashboard')}>Back</button>
        </div>
      </Wrapper>
    </Container>
  );
};

export default ChangeLoginPassword;
