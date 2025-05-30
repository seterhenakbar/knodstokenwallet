'use client';

import React from 'react';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import Layout from '@/components/layout/Layout';

export default function ResetPasswordPage() {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <ResetPasswordForm />
      </div>
    </Layout>
  );
}
