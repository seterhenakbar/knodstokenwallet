import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { getWalletBalance, getTransactions } from '../services/airtable.service';

export const getBalance = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const wallet = await getWalletBalance(req.user.email);
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }
    
    return res.status(200).json({
      balance: wallet.balance,
      lastUpdated: wallet.lastUpdated
    });
  } catch (error) {
    console.error('Error in getBalance controller:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTransactionHistory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const transactions = await getTransactions(req.user.email);
    
    return res.status(200).json({
      transactions
    });
  } catch (error) {
    console.error('Error in getTransactionHistory controller:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
