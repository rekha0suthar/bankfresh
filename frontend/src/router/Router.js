import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';

import ForgetPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';
import OtpVerfication from '../pages/OtpVerification';
import Home from '../pages/Home';
import CreateAcount from '../pages/CreateAcount';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/create-account" Component={CreateAcount} />
      <Route path="/signup" Component={Signup} />
      <Route path="/login" Component={Login} />
      <Route path="/forget-password" Component={ForgetPassword} />
      <Route path="/reset-password" Component={ResetPassword} />
      <Route path="verify-otp" Component={OtpVerfication} />
      <Route Component={ProtectedRoute}></Route>
    </Routes>
  );
};
