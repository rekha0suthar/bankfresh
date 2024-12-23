import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getBalance } from '../controllers/account.js';

const router = Router();

router.get('/:userId/balance', verifyToken, getBalance);

export default router;
