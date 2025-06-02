'use client';

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AlphaBanner from './AlphaBanner';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AlphaBanner />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
