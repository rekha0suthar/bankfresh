import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  addTransaction,
  sendOtp,
  verifyTransactionPassword,
  setTransactionPassword,
} from '../controllers/transaction.js';

const router = Router();

router.post('/set-transaction-password', verifyToken, setTransactionPassword);
router.post('/money-transfer', verifyToken, addTransaction);
router.post('/transaction-otp', verifyToken, sendOtp);
router.post(
  '/verify-transaction-password',
  verifyToken,
  verifyTransactionPassword
);
export default router;
