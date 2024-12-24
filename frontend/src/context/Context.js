import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { validityCheck } from '../utils';

const BASE_API_URL = 'http://localhost:8888/api';

const Context = createContext({});

const ContextProvider = ({ children }) => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(null);
  const [accountType, setAccountType] = useState('');
  const [gender, setGender] = useState('');
  const [identity, setIdentity] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const [accountNumber, setAcountNumber] = useState('');
  const [debitCard, setDebitCard] = useState({});
  const [customerId, setCustomerId] = useState('');
  const [captchaImg, setCaptchaImg] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [otp, setOtp] = useState('');

  const [balance, setBalance] = useState();
  const [account, setAccount] = useState({});
  const [userAccount, setUserAccount] = useState({});
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const accountId = localStorage.getItem('accountId');

  const createAccount = async () => {
    const newUser = {
      fullName,
      dateOfBirth: dob,
      gender,
      nationality,
      email,
      mobileNumber,
      address,
      identityProof: identity,
      accountType,
      captcha,
    };

    try {
      if (validityCheck(email, mobileNumber, identity)) {
        const response = await axios.post(
          `${BASE_API_URL}/auth/account`,
          newUser,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        localStorage.setItem('userId', response.data.user._id);
        setFullName('');
        setAccountType('');
        setAddress('');
        setDob('');
        setGender('');
        setIdentity('');
        setMobileNumber('');
        setNationality('');
        setEmail('');
        navigate('/verify-otp');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const verifyOtp = async (path) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/verify-otp`,
        { userId, otp },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(response.data.msg);
      if (path) {
        navigate('/dashboard');
      } else {
        navigate('/signup');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/resend-otp`,
        { userId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(response.data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  // Method to fetch User details
  const getUserAccount = async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.get(
        `${BASE_API_URL}/auth/account/${userId}`
      );
      setAcountNumber(response.data.accountNumber);
      setDebitCard(response.data.debitCard);
      setCustomerId(response.data.customerId);
    } catch (err) {
      console.error(err);
    }
  };

  // Method for Signup user --- input: name, email, password
  const signup = async () => {
    try {
      // setting loading true until we back response
      if (password === confirmPassword) {
        // calling api and store response
        const response = await axios.post(
          `${BASE_API_URL}/auth/signup`,
          { userId, password, mobileNumber },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        toast.success(response.data.msg); // success alert
        navigate('/login'); // redirect to login page
        setLoading(false); //setting loading false
      } else {
        toast.error('Password does not match');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || 'Signup failed';
      toast.error(errorMsg); // show specific error message if available
    } finally {
      setLoading(false);
    }
  };

  // Method for login --- input: email and password
  const login = async (e) => {
    // preventing page from refresh
    e.preventDefault();

    const newUser = { userId, customerId, password, captcha };

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_API_URL}/auth/login`, newUser, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success(response.data.msg); // success alert
      localStorage.setItem('token', response.data.token); // storing token in localstorage
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('accountId', response.data.accountId);

      navigate('/dashboard'); // redirecting to dashboard after successfull login
    } catch (err) {
      console.log(err);
      toast.error('Incorrect id or password/invalid captcha'); // error alert
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Method for logout
  const logout = () => {
    localStorage.clear(); // removing token from localstorage
    navigate('/'); // redirecting to login after logout
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/auth/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/auth/captcha?${new Date().getTime()}`
      );
      setCaptchaImg(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch User Account Balance
  const getBalance = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/account/${accountId}/balance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch User Debit Card
  const getDebitCard = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/account/${accountId}/debit-card`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDebitCard(response.data.debitCard);
    } catch (err) {
      console.error(err);
    }
  };

  const accountSummary = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/account/${accountId}/account-summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccount(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const blockUnblockDebitCart = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/account/block-unblock-card`,
        { debitCard },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.msg);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const generateCardPin = async (pin) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/account/generate-pin`,
        { debitCard, pin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.msg);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const getAccount = async (accountNumber) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/account/`,
        { accountNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserAccount(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const setTransactionPassword = async (transactionPassword) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/transaction/set-transaction-password`,
        { debitCard, transactionPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.msg);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMoney = async (
    accountId,
    receiverAccountNumber,
    amount,
    purpose
  ) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${BASE_API_URL}/transaction/money-transfer`,
        {
          accountId,
          receiverAccountNumber,
          amount,
          purpose,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(response.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const transactionOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_API_URL}/transaction/transaction-otp`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(response.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const transactionVerify = async (
    accountId,
    transactionPassword,
    receiverAccountNumber,
    amount,
    purpose
  ) => {
    try {
      setLoading(true);
      await axios.post(
        `${BASE_API_URL}/transaction/verify-transaction-password`,
        {
          accountId,
          transactionPassword,
          otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await verifyOtp('dashboard');
      await sendMoney(accountId, receiverAccountNumber, amount, purpose);
      getBalance();
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_API_URL}/transaction/${accountId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const downloadStatement = async (type) => {
    try {
      setLoading(true);
      const fileName =
        type === 'pdf' ? 'Account-statement.pdf' : 'Account-statement.csv'; // Set the file name based on type

      // Fetch the statement based on the type
      const response = await axios.get(
        `${BASE_API_URL}/transaction/${accountId}/download-statement/${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', // Ensure binary response type
        }
      );

      // Create a URL for the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Specify the file name
      document.body.appendChild(link);
      link.click();

      // Clean up the link element
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Release the blob URL
    } catch (err) {
      // Gracefully handle errors
      const errorMessage = err.message || 'Error downloading statement';
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <Context.Provider
      value={{
        fullName,
        setFullName,
        dob,
        setDob,
        accountType,
        setAccountType,
        gender,
        setGender,
        identity,
        setIdentity,
        nationality,
        setNationality,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        mobileNumber,
        setMobileNumber,
        address,
        setAddress,
        customerId,
        setCustomerId,
        accountNumber,
        setAcountNumber,
        debitCard,
        setDebitCard,
        loading,
        setLoading,
        captchaImg,
        setCaptchaImg,
        captcha,
        setCaptcha,
        otp,
        setOtp,
        balance,
        setBalance,
        account,
        setAccount,
        userAccount,
        setUserAccount,
        transactions,
        setTransactions,
        signup,
        login,
        logout,
        fetchCaptcha,
        user,
        setUser,
        getUserAccount,
        getUser,
        createAccount,
        verifyOtp,
        resendOtp,
        getBalance,
        getDebitCard,
        accountSummary,
        blockUnblockDebitCart,
        generateCardPin,
        setTransactionPassword,
        getAccount,
        sendMoney,
        transactionOtp,
        transactionVerify,
        getTransactions,
        downloadStatement,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
