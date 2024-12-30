import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  accountDetails,
  getBalance,
  getDebitCard,
  blockUnblockDebitCart,
  generateCardPin,
  getAccount,
  addBeneficiary,
  getBeneficiaries,
} from '../controllers/account.js';

const router = Router();

router.get('/:accountId/balance', verifyToken, getBalance);
router.get('/:accountId/debit-card', verifyToken, getDebitCard);
router.get('/:accountId/account-summary', verifyToken, accountDetails);
router.post('/block-unblock-card', verifyToken, blockUnblockDebitCart);
router.post('/generate-pin', verifyToken, generateCardPin);
router.post('/', verifyToken, getAccount);
router.post('/add-beneficiary', verifyToken, addBeneficiary);
router.get('/:accountId/beneficiaries', verifyToken, getBeneficiaries);
export default router;
