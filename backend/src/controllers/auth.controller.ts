import { Request, Response } from 'express';
import { register, login, resetPassword } from '../services/auth.service';
import { UserCreate, UserLogin, PasswordReset } from '../models/user.model';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: UserCreate = req.body;
    
    if (!userData.email || !userData.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await register(userData);
    if (!user) {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error in registerUser controller:', error);
    return res.status(500).json({ message: 'Internal server error' });
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
