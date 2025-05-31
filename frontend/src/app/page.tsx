'use client';

import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Knods Token Wallet
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A secure platform to track your KND token rewards and transaction history.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Login to Your Wallet
            </Link>
            <Link 
              href="/register" 
              className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 rounded-md border border-blue-600 transition-colors"
            >
              Create an Account
            </Link>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Secure Authentication</h2>
            <p className="text-gray-600">
              Your wallet is protected with industry-standard security practices and JWT authentication.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Real-time Balance</h2>
            <p className="text-gray-600">
              View your current KND token balance updated in real-time as you earn rewards.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Transaction History</h2>
            <p className="text-gray-600">
              Track all your KND token transactions with detailed history and descriptions.
            </p>
          </div>
        </div>
        
        {/* About Section */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Knods Tokens</h2>
          <p className="text-gray-600 mb-4">
            Knods Tokens (KND) are digital rewards earned through participation in the Knods community program. 
            These tokens represent your contributions and can be tracked in this wallet.
          </p>
          <p className="text-gray-600">
            This wallet provides a read-only view of your token balance and transaction history. 
            Tokens are earned through activities determined by the Knods program administrators.
          </p>
        </div>
      </div>
    </Layout>
  );
}
