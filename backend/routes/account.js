import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  accountDetails,
  getBalance,
  getDebitCard,
  blockUnblockDebitCart,
  generateCardPin,
  getAccount,
} from '../controllers/account.js';

const router = Router();

router.get('/:accountId/balance', verifyToken, getBalance);
router.get('/:accountId/debit-card', verifyToken, getDebitCard);
router.get('/:accountId/account-summary', verifyToken, accountDetails);
router.post('/block-unblock-card', verifyToken, blockUnblockDebitCart);
router.post('/generate-pin', verifyToken, generateCardPin);
router.post('/', verifyToken, getAccount);

export default router;
