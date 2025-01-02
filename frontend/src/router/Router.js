import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const Signup = lazy(() => import('../pages/Signup'));
const Login = lazy(() => import('../pages/Login'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute'));
const OtpVerfication = lazy(() => import('../pages/OtpVerification'));
const Home = lazy(() => import('../pages/Home'));
const CreateAcount = lazy(() => import('../pages/CreateAcount'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const AccountServices = lazy(() => import('../pages/Account&Services'));
const MoneyTransfer = lazy(() => import('../pages/MoneyTransfer'));
const Cards = lazy(() => import('../pages/Cards'));
const CustomerProfile = lazy(() => import('../pages/CustomerProfile'));
const TransactionPassword = lazy(() => import('../pages/TransactionPassword'));
const ChangeLoginPassword = lazy(() => import('../pages/ChangeLoginPassword'));
const ForgetPassword = lazy(() => import('../pages/ForgetPassword'));
const AddBeneficiary = lazy(() => import('../pages/AddBeneficiary'));
const PayBills = lazy(() => import('../pages/PayBills'));

export const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <Route
            path="/transaction-password"
            element={<TransactionPassword />}
          />
          <Route path="/change-password" element={<ChangeLoginPassword />} />
          <Route path="/manage-debit-card" element={<Cards />} />
          <Route path="/apply-credit-card" element={<Cards />} />
          <Route path="/add-beneficiary" element={<AddBeneficiary />} />
          <Route path="/pay-bills" element={<PayBills />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
