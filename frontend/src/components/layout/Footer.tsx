import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Knods Token Wallet. All rights reserved.</p>
          <p className="mt-1">A secure platform for tracking your KND token rewards.</p>
          <div className="bg-yellow-50 text-yellow-800 text-center py-2 mt-2 rounded text-sm">
            Alpha Release – Use with caution. Data/features may change or be reset.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
