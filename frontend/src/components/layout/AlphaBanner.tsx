'use client';

import React, { useState } from 'react';

const AlphaBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="alpha-banner">
      🚧 <strong>Alpha Release:</strong> This is an early version of Knods Token Wallet. Features may be missing or change. Please report issues to <a href="mailto:knods@labtekindie.com">knods@labtekindie.com</a>.
      <button onClick={() => setIsVisible(false)} className="dismiss-btn">Dismiss</button>
      
      <style jsx>{`
        .alpha-banner {
          background: #ffefcb;
          color: #856404;
          border-bottom: 1px solid #ffe082;
          padding: 12px 20px;
          text-align: center;
          font-size: 1rem;
          position: relative;
          z-index: 1000;
        }
        .dismiss-btn {
          background: none;
          border: none;
          color: #856404;
          margin-left: 20px;
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AlphaBanner;
