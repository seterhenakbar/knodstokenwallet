import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { User, UserCreate, UserLogin, PasswordReset } from '../models/user.model';
import { createUser, getUserByEmail, updateUserPassword } from './airtable.service';

export const register = async (userData: UserCreate): Promise<User | null> => {
  try {
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      return null; // User already exists
    }
    
    const newUser = await createUser(userData);
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};

export const login = async (credentials: UserLogin): Promise<{ user: User; token: string } | null> => {
  try {
    const user = await getUserByEmail(credentials.email);
    if (!user || !user.password) {
      return null; // User not found or password not set
    }
    
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      return null; // Invalid password
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
    
    return {
      user: {
        id: user.id,
        email: user.email
      },
      token
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const resetPassword = async (resetData: PasswordReset): Promise<boolean> => {
  try {
    const user = await getUserByEmail(resetData.email);
    if (!user || !user.id) {
      return false; // User not found
    }
    
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(resetData.newPassword, saltRounds);
    
    const updated = await updateUserPassword(user.id, newPasswordHash);
    return updated;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
};

export const verifyToken = (token: string): { userId: string; email: string } | null => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string; email: string };
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
