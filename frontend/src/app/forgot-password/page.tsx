'use client';

import React from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Layout from '@/components/layout/Layout';

const ForgotPasswordPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <ForgotPasswordForm />
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
