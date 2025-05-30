'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Knods Token Wallet
        </Link>
        
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li>
                  <Link href="/dashboard" className="hover:text-blue-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={logout}
                    className="hover:text-blue-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="hover:text-blue-200">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-blue-200">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
