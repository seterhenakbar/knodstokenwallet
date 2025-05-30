import api from './api';

export interface Wallet {
  balance: number;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  userEmail: string;
  amount: number;
  timestamp: string;
  description: string;
}

export const getWalletBalance = async (): Promise<Wallet> => {
  const response = await api.get('/wallet/balance');
  return response.data;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/wallet/transactions');
  return response.data.transactions;
};
