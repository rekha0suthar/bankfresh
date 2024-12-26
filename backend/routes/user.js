import { Router } from 'express';
import {
  createAccount,
  getCaptcha,
  getUser,
  getUserAccount,
  login,
  signup,
  changeLoginPassword,
  forgetPassword,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { resendOtp, verifyOtp } from '../controllers/otp.js';

const router = Router();

router.post('/account', createAccount);
router.post('/signup', signup);
router.post('/login', login);
router.get('/account/:id', getUserAccount);
router.get('/user/:id', verifyToken, getUser);
router.get('/captcha', getCaptcha);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/change-login-password', verifyToken, changeLoginPassword);
router.post('/forget-password', forgetPassword);
export default router;
