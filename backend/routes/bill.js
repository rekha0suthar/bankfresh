import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getBills, payBill } from '../controllers/bill.js';

const router = Router();

router.get('/:userId', verifyToken, getBills);
router.post('/pay-utility-bill', verifyToken, payBill);

export default router;
