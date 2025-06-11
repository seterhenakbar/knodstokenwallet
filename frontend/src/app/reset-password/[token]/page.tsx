'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import Layout from '@/components/layout/Layout';

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const { token } = params;

  if (!token) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Invalid Reset Link</h2>
            <p className="text-center text-red-600 mb-4">
              The password reset link is invalid or has expired.
            </p>
            <div className="text-center">
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Request a new password reset link
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <ResetPasswordForm token={token} />
      </div>
    </Layout>
  );
}
