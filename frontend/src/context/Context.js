import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validityCheck } from '../utils';
import {
  accountSummaryApi,
  cardBlockUnblockApi,
  cardPinApi,
  createAccountApi,
  downloadStatementApi,
  fetchCaptchaApi,
  getAccountApi,
  getBalanceApi,
  getDebitCardApi,
  getTransactionsApi,
  getUserAccountApi,
  getUserApi,
  loginApi,
  moneyTransferApi,
  resendOtpApi,
  setTransactionPasswordApi,
  signupApi,
  transactionOtpApi,
  transactionPasswordVerifyApi,
  verifyOtpApi,
} from '../apis';

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
        const { data } = await createAccountApi(newUser);
        localStorage.setItem('userId', data.user._id);
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
      const { data } = await verifyOtpApi({ userId, otp });
      toast.success(data.msg);
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
      const { data } = resendOtpApi({ userId });
      toast.success(data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  // Method to fetch User details
  const getUserAccount = async () => {
    try {
      const { data } = await getUserAccountApi(userId);
      setAcountNumber(data.accountNumber);
      setDebitCard(data.debitCard);
      setCustomerId(data.customerId);
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
        const { data } = await signupApi({ userId, password, mobileNumber });

        toast.success(data.msg); // success alert
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
      const { data } = await loginApi(newUser);
      toast.success(data.msg); // success alert
      localStorage.setItem('token', data.token); // storing token in localstorage
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('accountId', data.accountId);

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
      const { data } = await getUserApi(userId);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCaptcha = async () => {
    try {
      const { data } = await fetchCaptchaApi();
      setCaptchaImg(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch User Account Balance
  const getBalance = async () => {
    try {
      const { data } = await getBalanceApi(accountId);
      setBalance(data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch User Debit Card
  const getDebitCard = async () => {
    try {
      const { data } = await getDebitCardApi(accountId);
      setDebitCard(data.debitCard);
    } catch (err) {
      console.error(err);
    }
  };

  const accountSummary = async () => {
    try {
      const { data } = await accountSummaryApi(accountId);
      setAccount(data);
    } catch (err) {
      console.error(err);
    }
  };

  const blockUnblockDebitCart = async () => {
    try {
      const { data } = await cardBlockUnblockApi({ debitCard });
      toast.success(data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  const generateCardPin = async (pin) => {
    try {
      const { data } = await cardPinApi({ debitCard, pin });
      toast.success(data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  const getAccount = async (accountNumber) => {
    try {
      const { data } = await getAccountApi({ accountNumber });
      setUserAccount(data);
    } catch (err) {
      console.error(err);
    }
  };

  const setTransactionPassword = async (transactionPassword) => {
    try {
      const { data } = await setTransactionPasswordApi({
        debitCard,
        transactionPassword,
      });
      toast.success(data.msg);
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

      const { data } = await moneyTransferApi({
        accountId,
        receiverAccountNumber,
        amount,
        purpose,
      });
      setLoading(false);
      toast.success(data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const transactionOtp = async () => {
    try {
      setLoading(true);
      const { data } = await transactionOtpApi({ userId });
      setLoading(false);
      toast.success(data.msg);
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
      await transactionPasswordVerifyApi({
        accountId,
        transactionPassword,
        otp,
      });
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
      const { data } = await getTransactionsApi(accountId);
      setTransactions(data);
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
      const { data } = await downloadStatementApi(accountId, type);

      // Create a URL for the blob response
      const url = window.URL.createObjectURL(new Blob([data]));
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
