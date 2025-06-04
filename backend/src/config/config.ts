import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  mandrillApiKey: process.env.MANDRILL_API_KEY || '',
  frontendUrl: process.env.FRONTEND_URL || 'https://knodstokenwallet.labtekdev.site',
  airtable: {
    apiKey: process.env.AIRTABLE_API_KEY || '',
    baseId: process.env.AIRTABLE_BASE_ID || 'appI99LawK0adzvsw',
    tables: {
      users: {
        id: process.env.USERS_TABLE_ID || 'tblJHDEJbqKRXYiZV',
        fields: {
          email: process.env.EMAIL_FIELD_ID || 'flddrB0ZSguoiEHtL',
          passwordHash: process.env.PASSWORD_HASH_FIELD_ID || 'fldkblrDfMa0PPJc9'
        }
      },
      wallets: {
        id: process.env.WALLETS_TABLE_ID || '',
        fields: {
          userId: process.env.WALLET_USER_ID_FIELD_ID || '',
          balance: process.env.WALLET_BALANCE_FIELD_ID || ''
        }
      },
      transactions: {
        id: process.env.TRANSACTIONS_TABLE_ID || '',
        fields: {
          txId: process.env.TX_ID_FIELD_ID || '',
          userEmail: process.env.TX_USER_EMAIL_FIELD_ID || '',
          amount: process.env.TX_AMOUNT_FIELD_ID || '',
          timestamp: process.env.TX_TIMESTAMP_FIELD_ID || '',
          description: process.env.TX_DESCRIPTION_FIELD_ID || ''
        }
      },
      passwordResetTokens: {
        id: process.env.PASSWORD_RESET_TOKENS_TABLE_ID || 'tblwQxlszel6C2580',
        fields: {
          token: process.env.RESET_TOKEN_FIELD_ID || 'fldOGsVCkdFd6tWqL',
          email: process.env.RESET_EMAIL_FIELD_ID || 'fldtKt6siB9hJPrKu',
          expiresAt: process.env.RESET_EXPIRES_AT_FIELD_ID || 'flduh7V6EKAzFGSNj',
          used: process.env.RESET_USED_FIELD_ID || 'fldVcWlrksnHjwv8C'
        }
      }
    }
  }
};

export default config;
