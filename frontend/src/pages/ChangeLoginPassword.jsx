import React, { lazy, Suspense, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

const Container = lazy(() => import('../components/dashboard/Container'));
const Wrapper = lazy(() => import('../components/dashboard/Wrapper'));
const Input = lazy(() => import('../components/form/Input'));

const ChangeLoginPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { changeLoginPassword } = useContext(Context);
  const navigate = useNavigate();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Wrapper heading="Change Login Password">
          <div className="main-wrapper change-password">
            <h4>Please change your login password for security reasons</h4>
            <div>
              <label>Current Password</label>
              <br />
              <Input
                type="password"
                value={currentPassword}
                setValue={setCurrentPassword}
              />
            </div>
            <div>
              <label>New Password</label>
              <br />
              <Input
                type="password"
                value={newPassword}
                onChange={setNewPassword}
              />
            </div>
            <div>
              <label>Re-enter Password</label>
              <br />
              <Input
                type="password"
                value={confirmPassword}
                setValue={setConfirmPassword}
              />
            </div>
            <button
              onClick={() =>
                changeLoginPassword(
                  currentPassword,
                  newPassword,
                  confirmPassword
                )
              }
            >
              Submit
            </button>
            <button onClick={() => navigate('/dashboard')}>Back</button>
          </div>
        </Wrapper>
      </Container>
    </Suspense>
  );
};

export default ChangeLoginPassword;
