export interface Wallet {
  id?: string;
  userEmail: string;
  balance: number;
  lastUpdated?: Date;
}

export interface WalletInDB {
  id: string;
  fields: {
    [key: string]: any;
  };
}

export interface Transaction {
  id?: string;
  userEmail: string;
  amount: number;
  timestamp: Date;
  description: string;
}

export interface TransactionInDB {
  id: string;
  fields: {
    [key: string]: any;
  };
}
