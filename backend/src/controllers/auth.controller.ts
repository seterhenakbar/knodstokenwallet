import { Request, Response } from 'express';
import { register, login, resetPassword, requestPasswordReset, confirmPasswordReset } from '../services/auth.service';
import { UserCreate, UserLogin, PasswordReset } from '../models/user.model';
import { PasswordResetRequest, PasswordResetConfirm } from '../models/passwordReset.model';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: UserCreate = req.body;
    
    if (!userData.email || !userData.password) {
      res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await register(userData);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error in registerUser controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const credentials: UserLogin = req.body;
    
    if (!credentials.email || !credentials.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const result = await login(credentials);
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: result.user.id,
        email: result.user.email
      },
      token: result.token
    });
  } catch (error) {
    console.error('Error in loginUser controller:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetUserPassword = async (req: Request, res: Response) => {
  try {
    const resetData: PasswordReset = req.body;
    
    if (!resetData.email || !resetData.newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }
    
    const success = await resetPassword(resetData);
    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in resetUserPassword controller:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const requestPasswordResetEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    const success = await requestPasswordReset(email);
    
    return res.status(200).json({ 
      message: 'If your email exists in our system, you will receive a password reset link shortly' 
    });
  } catch (error) {
    console.error('Error in requestPasswordResetEmail controller:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const confirmPasswordResetWithToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'New password and confirmation are required' });
    }
    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    const success = await confirmPasswordReset(token, newPassword);
    if (!success) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    return res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error in confirmPasswordResetWithToken controller:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
