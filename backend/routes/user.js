import { Router } from 'express';
import {
  createAccount,
  getUserAccount,
  login,
  signup,
} from '../controllers/user.js';

const router = Router();

router.post('/account', createAccount);
router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', getUserAccount);

export default router;
