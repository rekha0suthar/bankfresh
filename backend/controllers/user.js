import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import {
  generateAccountNumber,
  generateCustomerId,
  generateDebitCardDetails,
  sendEmail,
} from '../utils/index.js';
import Account from '../models/account.js';
import bcrypt from 'bcrypt';
import svgCaptcha from 'svg-captcha';
import { generateAndSendOtp } from './otp.js';

let sessionCaptcha = '';

// @desc  Create Account
// @route POST /api/auth/create-account
// @access public
const createAccount = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      nationality,
      email,
      mobileNumber,
      address,
      identityProof,
      pancard,
      accountType,
      captcha,
    } = req.body;

    if (captcha != sessionCaptcha) {
      return res.status(401).json({ msg: 'Invalid captcha' });
    }

    const existUser = await User.findOne({
      $or: [{ email }, { identityProof }],
    });

    if (existUser) {
      const existAccount = await Account.findById(existUser._id);
      if (existAccount) {
        return res
          .status(409)
          .json({ msg: 'Account for this user already exists' });
      }
    }

    const newUser = await new User({
      fullName,
      dateOfBirth,
      gender,
      nationality,
      email,
      mobileNumber,
      address,
      identityProof,
      pancard,
      accountType,
    }).save();

    const accountNumber = generateAccountNumber();
    const customerId = generateCustomerId();
    const debitCard = generateDebitCardDetails();

    await new Account({
      userId: newUser._id,
      accountNumber,
      accountType,
      customerId,
      debitCard,
    }).save();

    const subject = 'Your Bank Account Details';
    const text = `Hello ${newUser.fullName}, \n\nYour account has been created successfully on BankFresh. \n\nBelow is your account details. \nAccount Number: ${accountNumber}\nCustomer ID: ${customerId}\n Debit Card Number: ${debitCard.cardNumber}.\n\nThank you for choosing us.`;

    await sendEmail(email, subject, text);
    await generateAndSendOtp(email, mobileNumber);

    res
      .status(201)
      .json({ msg: 'Account created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  User Registeration
// @route POST /api/auth/signup
// @access public
const signup = async (req, res) => {
  try {
    const { userId, password, mobileNumber } = req.body;

    // Validate input here (e.g., check if userId and password are provided)

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found, Create an account' });
    }

    if (user.password) {
      return res.status(409).json({ msg: 'User already exists, Kindly Login' });
    }

    if (user.mobileNumber !== mobileNumber) {
      return res.status(401).json({ msg: 'Incorrect mobile number' });
    }

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getCaptcha = async (req, res) => {
  try {
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    sessionCaptcha = captcha.text;
    res.type('svg');
    res.send(captcha.data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  User Login
// @route POST /api/auth/login
// @access public
const login = async (req, res) => {
  try {
    const { userId, customerId, password, captcha } = req.body;

    if (captcha != sessionCaptcha) {
      return res.status(401).json({ msg: 'Invalid captcha' });
    }

    let user;

    if (userId !== null) {
      user = await User.findById({ _id: userId });
    } else {
      const account = await Account.findOne(
        { customerId },
        { userId: 1, _id: 0 }
      );
      user = await User.findById({ _id: account.userId });
    }

    const userAccount = await Account.findOne({ customerId });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!userAccount) {
      return res.status(401).json({ msg: 'Incorrect customerID' });
    }

    const checkPassword = user.checkPassword(password);

    if (!checkPassword) {
      return res.status(401).json({ msg: 'Incorrect password' });
    }

    user.updateLogin();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      msg: 'User login successfull',
      token,
      user,
      accountId: userAccount._id,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Set Change User Password
// @route POST /api/auth/change-password
// @access private
const changeLoginPassword = async (req, res) => {
  const { userId, password, newPassword } = req.body;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const checkPassword = user.checkPassword(password);
    if (!checkPassword) {
      return res.status(403).json({ msg: 'Incorrect current password' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ msg: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Set Forget User Password
// @route POST /api/auth/forget-password
// @access public
const forgetPassword = async (req, res) => {
  const { customerId, accountNumber, identityProof, password, captcha } =
    req.body;
  try {
    const account = await Account.findOne({ accountNumber, customerId });
    let user = await User.findOne({ identityProof });

    if (captcha != sessionCaptcha) {
      return res.status(403).json({ msg: 'Invalid captcha' });
    }

    if (!user) {
      return res.status(403).json({ msg: 'Incorrect identity proof' });
    }
    if (!account) {
      return res.status(403).json({ msg: 'Incorrect user info' });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).json({ msg: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Fetch User Account
// @route GET /api/auth/account/:id
// @access private
const getUserAccount = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const userAccount = await Account.findOne(
      { userId },
      { accountNumber: 1, customerId: 1, debitCard: 1 }
    );

    if (!userAccount) {
      return res.status(404).json({ msg: 'User account not found' });
    }

    res.status(200).json(userAccount);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  Fetch User Profile
// @route GET /api/auth/user/:id
// @access private
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: ' User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export {
  createAccount,
  signup,
  login,
  changeLoginPassword,
  getUserAccount,
  getUser,
  getCaptcha,
  forgetPassword,
};
