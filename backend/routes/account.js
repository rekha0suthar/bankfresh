import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  accountSummary,
  getBalance,
  getDebitCard,
  blockUnblockDebitCart,
  generateCardPin,
  getAccount,
  addBeneficiary,
  getBeneficiaries,
} from '../controllers/account.js';
import {
  applyCreditCard,
  blockUnblockCreditCart,
  getCreditCard,
} from '../controllers/creditCard.js';
const router = Router();

router.get('/:accountId/balance', verifyToken, getBalance);
router.get('/:accountId/debit-card', verifyToken, getDebitCard);
router.get('/:accountId/account-summary', verifyToken, accountSummary);
router.post('/block-unblock-card', verifyToken, blockUnblockDebitCart);
router.post('/generate-pin', verifyToken, generateCardPin);
router.post('/', verifyToken, getAccount);
router.post('/add-beneficiary', verifyToken, addBeneficiary);
router.get('/:accountId/beneficiaries', verifyToken, getBeneficiaries);

router.post('/apply-credit-card', verifyToken, applyCreditCard);
router.get('/:userId/credit-card', verifyToken, getCreditCard);
router.post('/block-unblock-credit-card', verifyToken, blockUnblockCreditCart);
export default router;
