import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  addTransaction,
  sendOtp,
  verifyTransactionPassword,
  setTransactionPassword,
  getTransactions,
  downLoadStatement,
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
router.get('/:accountId', verifyToken, getTransactions);
router.get(
  '/:accountId/download-statement/:type',
  verifyToken,
  downLoadStatement
);

export default router;
