import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Otp from '../models/otp.js';
import {
  generateAccountNumber,
  generateCustomerId,
  generateDebitCardDetails,
} from '../utils/index.js';
import Account from '../models/account.js';
import bcrypt from 'bcrypt';
import svgCaptcha from 'svg-captcha';

let sessionCaptcha = '';

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
      accountType,
      captcha,
    } = req.body;

    if (captcha != sessionCaptcha) {
      return res.status(400).json({ msg: 'Invalid captcha' });
    }

    const existUser = await User.findOne({
      $or: [{ email }, { identityProof }],
    });

    if (existUser) {
      const existAccount = await Account.findById(existUser._id);
      if (existAccount) {
        return res
          .status(403)
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
      accountType,
    }).save();

    const accountNumber = generateAccountNumber();
    const customerId = generateCustomerId();
    const debitCard = generateDebitCardDetails();

    const newAccount = await new Account({
      userId: newUser._id,
      accountNumber,
      accountType,
      customerId,
      debitCard,
    }).save();

    res
      .status(201)
      .json({ msg: 'Account created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  User Registeration
// @route POST /api/user/signup
// @access public
const signup = async (req, res) => {
  try {
    const { userId, password, mobileNumber } = req.body;

    // Validate input here (e.g., check if userId and password are provided)

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    if (!user) {
      return res.status(403).json({ msg: 'User  does not exist' });
    }

    if (user.mobileNumber !== mobileNumber) {
      return res.status(400).json({ msg: 'Incorrect mobile number' });
    }

    res.status(200).json({ msg: 'User  registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getCaptcha = async (req, res) => {
  try {
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    sessionCaptcha = captcha.text;
    console.log(captcha.text, req.session.captcha);
    res.type('svg');
    res.send(captcha.data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc  User Login
// @route POST /api/user/login
// @access public
const login = async (req, res) => {
  try {
    const { userId, customerId, password, captcha } = req.body;

    if (captcha != sessionCaptcha) {
      return res.status(400).json({ msg: 'Invalid captcha' });
    }
    const user = await User.findById(userId);

    const userAccount = await Account.findOne({ userId, customerId });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!userAccount) {
      return res.status(400).json({ msg: 'Incorrect customerID' });
    }

    const checkPassword = user.checkPassword(password);

    if (!checkPassword) {
      return res.status(401).json({ msg: 'Incorrect password' });
    }

    user.updateLogin();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ msg: 'User login successfull', token, user });
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

    const userAccount = await Account.findOne({ userId });

    if (!userAccount) {
      return res.status(403).json({ msg: ' User account does not found' });
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
      return res.status(403).json({ msg: ' User  does not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { createAccount, signup, login, getUserAccount, getUser, getCaptcha };
