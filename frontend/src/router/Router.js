import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import OtpVerfication from '../pages/OtpVerification';
import Home from '../pages/Home';
import CreateAcount from '../pages/CreateAcount';
import Dashboard from '../pages/Dashboard';
import AccountServices from '../pages/Account&Services';
import MoneyTransfer from '../pages/MoneyTransfer';
import Cards from '../pages/CardManagment';
import CustomerProfile from '../pages/CustomerProfile';
import TransactionPassword from '../pages/TransactionPassword';
import ChangeLoginPassword from '../pages/ChangeLoginPassword';
import ForgetPassword from '../pages/ForgetPassword';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/create-account" Component={CreateAcount} />
      <Route path="/signup" Component={Signup} />
      <Route path="/login" Component={Login} />
      <Route path="/verify-otp" Component={OtpVerfication} />
      <Route path="/forget-password" Component={ForgetPassword} />
      <Route Component={ProtectedRoute}>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/account-summary" Component={AccountServices} />
        <Route path="/money-transfer" Component={MoneyTransfer} />
        <Route path="/cards" Component={Cards} />
        <Route path="/customer-profile" Component={CustomerProfile} />
        <Route path="/transaction-password" Component={TransactionPassword} />
        <Route path="/change-password" Component={ChangeLoginPassword} />
      </Route>
    </Routes>
  );
};
