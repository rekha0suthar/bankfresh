import User from '../models/user.js';
import Otp from '../models/otp.js';
import { sendEmail } from '../utils/index.js';

// Function to send OTP on mail
const sendEmailOtp = async (email, otp) => {
  const subject = 'Verification OTP code';
  const text = `Your new account verification OTP ${otp}`;

  sendEmail(email, subject, text);
};

// Function to generate otp and store it in db and send to email otp handler
export const generateAndSendOtp = async (email, mobileNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Check if an OTP already exists for this user
  const existingOtp = await Otp.findOne({ email, mobileNumber });

  if (existingOtp) {
    // Update the existing OTP and timestamp
    existingOtp.otp = otp;
    existingOtp.createdAt = Date.now(); // Update the timestamp
    await existingOtp.save();
  } else {
    // Create a new OTP entry if none exists
    const newOtp = new Otp({ email, mobileNumber, otp, createdAt: Date.now() });
    await newOtp.save();
  }

  await sendEmailOtp(email, otp);
};

// Resend OTP API controller
// @desc  Resend Otp
// @route POST /api/user/resend-otp
// @access private
export const resendOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId, { email: 1, mobileNumber: 1 });

    if (!user) {
      return res.status(404).json({ msg: 'User does not found' });
    }
    // Calling generate otp function
    await generateAndSendOtp(user.email, user.mobileNumber);

    res.status(200).json({ msg: 'Otp sent successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Verify OTP controller
// @desc  Verify Otp
// @route POST /api/user/verify-otp
// @access private
export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);
  const otpEntry = await Otp.findOne({
    email: user.email,
    mobileNumber: user.mobileNumber,
  });

  // Check if OTP entry exists
  if (!otpEntry) {
    return res.status(400).json({ msg: 'No OTP found for this user' });
  }

  // Check if OTP is expired (e.g., 5 minutes)
  const isExpired = Date.now() - otpEntry.createdAt > 5 * 60 * 1000; // 5 minutes in milliseconds
  if (isExpired) {
    return res.status(400).json({ msg: 'OTP has expired' });
  }

  // Verify the OTP
  if (otpEntry.otp === otp) {
    user.isVerified = true;
    await user.save(); // Don't forget to save the user after verification
    return res.status(200).json({ msg: 'OTP verified successfully' });
  }

  res.status(400).json({ msg: 'Invalid OTP' });
};
