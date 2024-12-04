import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API_URL = 'http://localhost:8080/api';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [accountNumber, setAcountNumber] = useState('');
  const [debitCard, setDebitCard] = useState({});
  const [customerId, setCustomerId] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const isValidEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

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
    };

    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/account`,
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
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
      navigate('/signup');
    } catch (err) {
      console.error(err);
    }
  };

  // Method to fetch User details
  const getUserAccount = async () => {
    const userId = localStorage.getItem('userId');

    try {
      console.log(userId, 'id');
      const response = await axios.get(`${BASE_API_URL}/auth/${userId}`);
      console.log(response);
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

    const newUser = { userId, customerId, password };

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_API_URL}/auth/login`, newUser, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success(response.data.msg); // success alert
      localStorage.setItem('token', response.data.token); // storing token in localstorage
      localStorage.setItem('userId', response.data.user._id);

      navigate('/dashboard'); // redirecting to dashboard after successfull login
    } catch (err) {
      console.error(err);
      toast.error('Incorrect email/password'); // error alert
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Method for logout
  const logout = () => {
    localStorage.removeItem('token'); // removing token from localstorage
    localStorage.removeItem('userId');
    navigate('/'); // redirecting to login after logout
  };

  const forgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/forget-password`,
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem('userId', response.data.user._id);
        navigate('/reset-password');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem('userId');

      console.log(userId, password);
      if (password === confirmPassword) {
        const response = await axios.put(
          `${BASE_API_URL}/auth/reset-password`,
          { id, password },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log(response);

        navigate('/');
      } else {
        toast.error('Incorrect password match');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Method to update user secret

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
        signup,
        login,
        logout,
        user,
        setUser,
        getUserAccount,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        forgetPassword,
        resetPassword,
        createAccount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
