import api from './api';

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordWithTokenData {
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordData): Promise<void> => {
  await api.post('/auth/reset-password', data);
};

export const requestPasswordReset = async (data: ForgotPasswordData): Promise<void> => {
  await api.post('/auth/forgot-password', data);
};

export const resetPasswordWithToken = async (token: string, data: ResetPasswordWithTokenData): Promise<void> => {
  await api.post(`/auth/reset-password/${token}`, data);
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const getUser = (): { id: string; email: string } | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
