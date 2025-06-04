import { Router } from 'express';
import { 
  loginUser, 
  registerUser, 
  resetUserPassword, 
  requestPasswordResetEmail,
  confirmPasswordResetWithToken
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/reset-password', resetUserPassword);

router.post('/forgot-password', requestPasswordResetEmail);

router.post('/reset-password/:token', confirmPasswordResetWithToken);

export default router;
