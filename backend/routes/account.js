import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  accountDetails,
  getBalance,
  getDebitCard,
  blockUnblockDebitCart,
  generateCardPin,
} from '../controllers/account.js';

const router = Router();

router.get('/:userId/balance', verifyToken, getBalance);
router.get('/:userId/debit-card', verifyToken, getDebitCard);
router.get('/:userId/account-summary', verifyToken, accountDetails);
router.post('/block-unblock-card', verifyToken, blockUnblockDebitCart);
router.post('/generate-pin', verifyToken, generateCardPin);

export default router;
