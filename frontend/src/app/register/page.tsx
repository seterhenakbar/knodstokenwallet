'use client';

import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import Layout from '@/components/layout/Layout';

export default function RegisterPage() {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <RegisterForm />
      </div>
    </Layout>
  );
}
