import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Knods Token Wallet. All rights reserved.</p>
          <p className="mt-1">A secure platform for tracking your KND token rewards.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
