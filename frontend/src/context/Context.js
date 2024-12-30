import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  isValidEmail,
  isValidAadharNumber,
  validityCheck,
  isValidMobileNumber,
  isValidPancard,
} from '../utils';
import {
  accountSummaryApi,
  addBeneficiaryApi,
  cardBlockUnblockApi,
  cardPinApi,
  changeLoginPasswordApi,
  createAccountApi,
  downloadStatementApi,
  fetchCaptchaApi,
  forgetPasswordApi,
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
  const [pancard, setPancard] = useState('');
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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
      pancard,
      accountType,
      captcha,
    };

    try {
      setLoading(true);
      if (validityCheck(email, mobileNumber, identity, pancard)) {
        const { data } = await createAccountApi(newUser);
        localStorage.setItem('userId', data.user._id);
        setFullName('');
        setAccountType('');
        setAddress('');
        setDob('');
        setGender('');
        setIdentity('');
        setPancard('');
        setMobileNumber('');
        setNationality('');
        setEmail('');
        toast.success(data.msg);
        navigate('/verify-otp');
      } else if (!isValidEmail(email)) {
        toast.warn('Invalid Email');
      } else if (!isValidAadharNumber(identity)) {
        toast.warn('Invalid Aadhar Number');
      } else if (!isValidMobileNumber(mobileNumber)) {
        toast.warn('Invalid Mobile Number');
      } else if (!isValidPancard(pancard)) {
        toast.warn('Invalid Pancard Number');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (path) => {
    try {
      setLoading(true);
      const { data } = await verifyOtpApi({ userId, otp });
      toast.success(data.msg);
      if (path) {
        navigate('/dashboard');
      } else {
        navigate('/signup');
      }
      setOtp('');
      return { status: 200 };
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      const { data } = resendOtpApi({ userId });
      toast.success(data.msg);
    } catch (err) {
      console.error(err);
      toast.error(err.response.data?.msg);
    } finally {
      setLoading(false);
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
      setLoading(true);
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
  const login = async () => {
    // preventing page from refresh
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
      console.error(err);
      toast.error(err.response.data?.msg); // error alert
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const changeLoginPassword = async (
    currentPassword,
    newPassword,
    confirmPassword
  ) => {
    try {
      setLoading(true);
      if (newPassword === confirmPassword) {
        const { data } = await changeLoginPasswordApi({
          userId,
          password: currentPassword,
          newPassword,
        });

        toast.success(data.msg); // success alert
        navigate('/login');
      } else {
        toast.error('Passwords do not match');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async () => {
    try {
      setLoading(true);
      if (password === confirmPassword) {
        const { data } = await forgetPasswordApi({
          customerId,
          accountNumber,
          identityProof: identity,
          password,
          captcha,
        });
        toast.success(data.msg); // success alert
        navigate('/login');
      } else {
        toast.error('Password does not match');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.msg);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  // Method for logout
  const logout = () => {
    localStorage.clear(); // removing token from localstorage
    navigate('/login'); // redirecting to login after logout
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
      setLoading(true);
      const { data } = await cardBlockUnblockApi({ debitCard });
      toast.success(data.msg);
      getDebitCard();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  const generateCardPin = async (pin) => {
    try {
      setLoading(true);
      const { data } = await cardPinApi({ debitCard, pin });
      toast.success(data.msg);
      getDebitCard();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Ensure loading state is reset
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
      setLoading(true);
      const { data } = await setTransactionPasswordApi({
        debitCard,
        transactionPassword,
      });
      toast.success(data.msg);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Ensure loading state is reset
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
      toast.success(data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  const transactionOtp = async () => {
    try {
      setLoading(true);
      const { data } = await transactionOtpApi({ userId });
      toast.success(data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    } finally {
      setLoading(false); // Ensure loading state is reset
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

      // Step 1: Verify transaction password
      const passwordVerification = await transactionPasswordVerifyApi({
        accountId,
        transactionPassword,
        otp,
      });
      if (passwordVerification?.status !== 200) {
        throw new Error('Transaction password verification failed');
      }

      // Step 2: Verify OTP
      const otpVerification = await verifyOtp('dashboard');
      if (otpVerification?.status !== 200) {
        throw new Error('OTP verification failed');
      }

      // Step 3: Transfer money
      await sendMoney(accountId, receiverAccountNumber, amount, purpose);

      // Step 4: Get updated balance
      await getBalance();
    } catch (err) {
      // Log the error
      console.error('Transaction error:', err.message);
      toast.error(err.message || 'An error occurred during the transaction.');
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  const getTransactions = async ({ transactionType, startDate, endDate }) => {
    try {
      setLoading(true);
      const { data } = await getTransactionsApi(
        accountId,
        currentPage,
        startDate,
        endDate,
        transactionType
      );
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };
  const downloadStatement = async (
    type,
    startDate,
    endDate,
    transactionType
  ) => {
    try {
      setLoading(true);
      const fileName =
        type === 'pdf' ? 'Bank-statement.pdf' : 'Bank-statement.csv'; // Set the file name based on type

      // Fetch the statement based on the type
      const { data } = await downloadStatementApi(
        accountId,
        type,
        startDate,
        endDate,
        transactionType
      );

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

  const addBeneficiary = async (accountNumber, beneficiaryName) => {
    try {
      setLoading(true);
      const { data } = await addBeneficiaryApi({
        accountId,
        accountNumber,
        beneficiaryName,
      });
      toast.success(data.msg);
      navigate('/money-transfer');
    } catch (err) {
      console.error(err);
      toast.error(err.response.data?.msg);
    } finally {
      setLoading(false);
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
        pancard,
        setPancard,
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
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
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
        changeLoginPassword,
        forgetPassword,
        addBeneficiary,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
