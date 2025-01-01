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
import Cards from '../pages/Cards';
import CustomerProfile from '../pages/CustomerProfile';
import TransactionPassword from '../pages/TransactionPassword';
import ChangeLoginPassword from '../pages/ChangeLoginPassword';
import ForgetPassword from '../pages/ForgetPassword';
import AddBeneficiary from '../pages/AddBeneficiary';
import PayBills from '../pages/PayBills';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<CreateAcount />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<OtpVerfication />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-summary" element={<AccountServices />} />
        <Route path="/money-transfer" element={<MoneyTransfer />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/transaction-password" element={<TransactionPassword />} />
        <Route path="/change-password" element={<ChangeLoginPassword />} />
        <Route path="/manage-debit-card" element={<Cards />} />
        <Route path="/apply-credit-card" element={<Cards />} />
        <Route path="/add-beneficiary" element={<AddBeneficiary />} />
        <Route path="/pay-bills" element={<PayBills />} />
      </Route>
    </Routes>
  );
};
