'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const { resetPasswordWithToken } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormData>();
  const password = watch('newPassword');
  
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);
      await resetPasswordWithToken(token, {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      });
      setSuccess('Password reset successful. You can now login with your new password.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Password reset failed. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>

        
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.newPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
            {...register('newPassword', { 
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.newPassword && (
            <p className="mt-1 text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
            {...register('confirmPassword', { 
              required: 'Please confirm your new password',
              validate: value => value === password || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-600">
          Remember your password?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
