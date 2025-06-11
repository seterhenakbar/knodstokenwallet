import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { User, UserCreate, UserLogin, PasswordReset } from '../models/user.model';
import { PasswordResetRequest, PasswordResetConfirm } from '../models/passwordReset.model';
import {
  createUser,
  getUserByEmail,
  updateUserPassword,
  createPasswordResetToken,
  getPasswordResetToken,
  deletePasswordResetToken
} from './airtable.service';
import { sendPasswordResetEmail } from './email.service';

export const register = async (userData: UserCreate): Promise<User> => {
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = await createUser(userData);
  return newUser
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

export const requestPasswordReset = async (email: string): Promise<boolean> => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error(`Password reset requested for non-existent email: ${email}`)
  }

  const resetToken = await createPasswordResetToken(email);
  if (!resetToken) {
    throw new Error(`Failed to create password reset token for email: ${email}`)
  }

  const emailSent = await sendPasswordResetEmail(email, resetToken.token);
  return emailSent;
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

export const confirmPasswordReset = async (token: string, newPassword: string): Promise<boolean> => {
  try {
    const resetToken = await getPasswordResetToken(token);
    if (!resetToken) {
      console.error('Invalid or expired password reset token');
      return false;
    }

    const user = await getUserByEmail(resetToken.email);
    if (!user || !user.id) {
      console.error('User not found for password reset token');
      return false;
    }

    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    const updated = await updateUserPassword(user.id, newPasswordHash);
    if (!updated) {
      console.error('Failed to update user password');
      return false;
    }

    await deletePasswordResetToken(token);

    return true;
  } catch (error) {
    console.error('Error confirming password reset:', error);
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
