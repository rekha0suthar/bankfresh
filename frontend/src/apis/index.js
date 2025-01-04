import axios from 'axios';

let env = 'dev';

const API = axios.create({
  baseURL:
    env === 'dev'
      ? 'http://localhost:8888/api'
      : 'https://bankfresh.onrender.com/api',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// User APIs
export const createAccountApi = (data) => API.post('/auth/account', data);

export const verifyOtpApi = (data) => API.post('/auth/verify-otp', data);

export const resendOtpApi = (data) => API.post('/auth/resend-otp', data);

export const getUserAccountApi = (userId) => API.get(`/auth/account/${userId}`);

export const signupApi = (data) => API.post('/auth/signup', data);

export const loginApi = (data) => API.post('/auth/login', data);

export const getUserApi = (userId) => API.get(`/auth/user/${userId}`);

export const fetchCaptchaApi = () =>
  API.get(`/auth/captcha?${new Date().getTime()}`);

export const changeLoginPasswordApi = (data) =>
  API.post('/auth/change-login-password', data);

export const forgetPasswordApi = (data) =>
  API.post('/auth/forget-password', data);

// ------------------------------------------------------------ //

// Account APIs
export const getBalanceApi = (accountId) =>
  API.get(`/account/${accountId}/balance`);

export const getDebitCardApi = (accountId) =>
  API.get(`/account/${accountId}/debit-card`);

export const accountSummaryApi = (accountId) =>
  API.get(`/account/${accountId}/account-summary`);

export const cardBlockUnblockApi = (data) =>
  API.post('/account/block-unblock-card', data);

export const cardPinApi = (data) => API.post('/account/generate-pin', data);

export const addBeneficiaryApi = (data) =>
  API.post('/account/add-beneficiary', data);

export const getBeneficiaryApi = (accountId) =>
  API.get(`/account/${accountId}/beneficiaries`);

export const applyCreditCardApi = (data) =>
  API.post('/account/apply-credit-card', data);

export const getCreditCardApi = (userId) =>
  API.get(`/account/${userId}/credit-card`);

export const blockUnblockCreditCartApi = (data) =>
  API.post('/account/block-unblock-credit-card', data);

// ------------------------------------------------------------ //

// Transaction APIs
export const getAccountApi = (data) => API.post('/account/', data);

export const setTransactionPasswordApi = (data) =>
  API.post('/transaction/set-transaction-password', data);

export const moneyTransferApi = (data) =>
  API.post('/transaction/money-transfer', data);

export const transactionOtpApi = (data) =>
  API.post('/transaction/transaction-otp', data);

export const transactionPasswordVerifyApi = (data) =>
  API.post('/transaction/verify-transaction-password', data);

export const getTransactionsApi = (
  accountId,
  currentPage,
  startDate,
  endDate,
  transactionType
) =>
  API.get(
    `/transaction/${accountId}/?page=${currentPage}&limit=5&startDate=${startDate}&endDate=${endDate}&transactionType=${transactionType}`
  );

export const downloadStatementApi = (
  accountId,
  type,
  startDate,
  endDate,
  transactionType
) =>
  API.get(
    `/transaction/${accountId}/download-statement/${type}/?startDate=${startDate}&endDate=${endDate}&transactionType=${transactionType}`,
    {
      responseType: 'blob',
    }
  );

// ------------------------------------------------------------ //

// Bill APIs
export const getBillsApi = (userId) => API.get(`/bill/${userId}`);

export const payUtilityBillApi = (data) =>
  API.post('/bill/pay-utility-bill', data);
