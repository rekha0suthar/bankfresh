import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import OtpVerfication from '../pages/OtpVerification';
import Home from '../pages/Home';
import CreateAcount from '../pages/CreateAcount';
import Dashboard from '../pages/Dashboard';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/create-account" Component={CreateAcount} />
      <Route path="/signup" Component={Signup} />
      <Route path="/login" Component={Login} />
      <Route path="/verify-otp" Component={OtpVerfication} />
    </Routes>
  );
};
