import { Router } from 'express';
import { getBalance, getTransactionHistory } from '../controllers/wallet.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/balance', authenticate, getBalance);

router.get('/transactions', authenticate, getTransactionHistory);

export default router;
