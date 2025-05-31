'use client';

import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Layout from '@/components/layout/Layout';

export default function LoginPage() {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <LoginForm />
      </div>
    </Layout>
  );
}
