# Knods Token Wallet

A full-stack web application for tracking KND token balances and transaction history, built with Node.js/Express/TypeScript backend and Next.js/TailwindCSS frontend.

## Features

- Secure user authentication with JWT
- View KND token balance
- Track transaction history
- Responsive design for all devices

## Tech Stack

### Backend
- Node.js LTS
- Express.js
- TypeScript
- Airtable.js SDK for database integration

### Frontend
- Next.js 14+
- TailwindCSS
- React Hook Form
- Axios

## Setup Instructions

### Prerequisites
- Node.js LTS
- npm or yarn
- Airtable API key

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your Airtable API key and other configuration values.

5. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file based on `.env.local.example`:
   ```
   cp .env.local.example .env.local
   ```

4. Update the API URL in `.env.local` if needed.

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Airtable Configuration

This application uses Airtable as its database. You need to configure the following tables:

1. **Users Table** (tblJHDEJbqKRXYiZV)
   - Email field (flddrB0ZSguoiEHtL)
   - Password hash field (fldkblrDfMa0PPJc9)

2. **Wallets Table** (create this in your Airtable base)
   - User ID field (reference to email in Users table)
   - Balance field (number)

3. **Transactions Table** (create this in your Airtable base)
   - User email field (text)
   - Amount field (number)
   - Timestamp field (date)
   - Description field (text)

## License

This project is licensed under the MIT License.
