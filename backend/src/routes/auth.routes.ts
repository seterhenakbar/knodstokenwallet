import { Router } from 'express';
import { registerUser, loginUser, resetUserPassword } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/reset-password', resetUserPassword);

export default router;
