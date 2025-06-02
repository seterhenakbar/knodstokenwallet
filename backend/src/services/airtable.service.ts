import base from '../config/airtable';
import config from '../config/config';
import { User, UserCreate, UserInDB } from '../models/user.model';
import { Wallet, Transaction, WalletInDB, TransactionInDB } from '../models/wallet.model';
import bcrypt from 'bcrypt';

const getFieldMapping = async (tableId: string) => {
  try {
    const table = base(tableId);
    const records = await table.select({ maxRecords: 1 }).firstPage();
    
    if (records.length === 0) {
      return {};
    }
    
    const fields = records[0].fields;
    const fieldMapping: Record<string, string> = {};
    
    Object.keys(fields).forEach(fieldName => {
      fieldMapping[fieldName] = fieldName;
    });
    
    return fieldMapping;
  } catch (error) {
    console.error('Error getting field mapping:', error);
    return {};
  }
};

export const createUser = async (userData: UserCreate): Promise<User> => {
  const usersTable = base(config.airtable.tables.users.id);
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(userData.password, saltRounds);
  
  const records = await usersTable.create([
    {
      fields: {
        [config.airtable.tables.users.fields.email]: userData.email,
        [config.airtable.tables.users.fields.passwordHash]: passwordHash
      }
    }
  ]);
  
  await createWallet(userData.email);
  
  return {
    id: records[0].id,
    email: userData.email
  };
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const usersTable = base(config.airtable.tables.users.id);
  const emailField = config.airtable.tables.users.fields.email;
  
  const records = await usersTable.select({
    filterByFormula: `{${emailField}} = "${email}"`
  }).firstPage();
  
  if (records && records.length > 0) {
    const user: User = {
      id: records[0].id,
      email: records[0].fields['email'] as string,
      password: records[0].fields['password_hash'] as string
    };
    
    return user;
  }
  
  return null;
};

export const updateUserPassword = async (userId: string, newPasswordHash: string): Promise<boolean> => {
  try {
    const usersTable = base(config.airtable.tables.users.id);
    
    await usersTable.update([
      {
        id: userId,
        fields: {
          [config.airtable.tables.users.fields.passwordHash]: newPasswordHash
        }
      }
    ]);
    
    return true;
  } catch (error) {
    console.error('Error updating user password:', error);
    return false;
  }
};

export const createWallet = async (userEmail: string, initialBalance = 0): Promise<Wallet> => {
  if (!config.airtable.tables.wallets.id) {
    console.error('Wallet table ID not configured');
    throw new Error('Wallet table ID not configured');
  }
  
  const walletsTable = base(config.airtable.tables.wallets.id);
  
  const existingWallet = await getWalletByEmail(userEmail);
  if (existingWallet) {
    return existingWallet;
  }
  
  const records = await walletsTable.create([
    {
      fields: {
        [config.airtable.tables.wallets.fields.userId]: userEmail
      }
    }
  ]);

  // await createTransaction(userEmail, initialBalance, 'Initial balance');
  
  return {
    id: records[0].id,
    userEmail,
    balance: initialBalance,
    lastUpdated: new Date()
  };
};

export const getWalletByEmail = async (userEmail: string): Promise<Wallet | null> => {
  if (!config.airtable.tables.wallets.id) {
    console.error('Wallet table ID not configured, returning mock wallet');
    return {
      userEmail,
      balance: 1000, // Default balance for mock wallet
      lastUpdated: new Date()
    };
  }
  
  const walletsTable = base(config.airtable.tables.wallets.id);
  const userIdField = config.airtable.tables.wallets.fields.userId;
  
  const records = await walletsTable.select({
    filterByFormula: `{${userIdField}} = "${userEmail}"`
  }).firstPage();
  
  if (records && records.length > 0) {
    const wallet: Wallet = {
      id: records[0].id,
      userEmail,
      balance: records[0].fields['balance'] as number,
    };
    
    return wallet;
  }
  
  return null
};

export const getWalletBalance = async (userEmail: string): Promise<Wallet | null> => {
  try {
    return await getWalletByEmail(userEmail);
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    return {
      userEmail,
      balance: 1000, // Default balance for mock wallet
      lastUpdated: new Date()
    };
  }
};

export const createTransaction = async (
  userEmail: string, 
  amount: number, 
  description: string
): Promise<Transaction> => {
  if (!config.airtable.tables.transactions.id) {
    console.error('Transactions table ID not configured');
    throw new Error('Transactions table ID not configured');
  }
  
  const transactionsTable = base(config.airtable.tables.transactions.id);
  const timestamp = new Date();
  
  const records = await transactionsTable.create([
    {
      fields: {
        [config.airtable.tables.transactions.fields.userEmail]: userEmail,
        [config.airtable.tables.transactions.fields.amount]: amount,
        [config.airtable.tables.transactions.fields.timestamp]: timestamp.toISOString(),
        [config.airtable.tables.transactions.fields.description]: description
      }
    }
  ]);
  
  return {
    id: records[0].id,
    userEmail,
    amount,
    timestamp,
    description
  };
};

export const getTransactions = async (userEmail: string): Promise<Transaction[]> => {
  try {
    if (!config.airtable.tables.transactions.id) {
      console.error('Transactions table ID not configured, returning mock transactions');
      return getMockTransactions(userEmail);
    }
    
    const transactionsTable = base(config.airtable.tables.transactions.id);
    const userEmailField = config.airtable.tables.transactions.fields.userEmail;
    
    const records = await transactionsTable.select({
      filterByFormula: `{${userEmailField}} = "${userEmail}"`,
      sort: [{ field: config.airtable.tables.transactions.fields.timestamp, direction: 'desc' }]
    }).all();
    
    if (records && records.length > 0) {
      return records.map(record => ({
        id: record.id,
        userEmail,
        amount: record.fields['amount'] as number,
        timestamp: new Date(record.fields['timestamp'] as string),
        description: record.fields['description'] as string
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error getting transactions:', error);
    return getMockTransactions(userEmail);
  }
};

const getMockTransactions = (userEmail: string): Transaction[] => {
  return [
    {
      id: '1',
      userEmail,
      amount: 500,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      description: 'Initial deposit'
    },
    {
      id: '2',
      userEmail,
      amount: 250,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      description: 'Reward for task completion'
    },
    {
      id: '3',
      userEmail,
      amount: 250,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      description: 'Bonus reward'
    }
  ];
};
