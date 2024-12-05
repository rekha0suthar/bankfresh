import { Router } from 'express';
import {
  createAccount,
  getCaptcha,
  getUser,
  getUserAccount,
  login,
  signup,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/account', createAccount);
router.post('/signup', signup);
router.post('/login', login);
router.get('/account/:id', getUserAccount);
router.get('/user/:id', verifyToken, getUser);
router.get('/captcha', getCaptcha);
export default router;
