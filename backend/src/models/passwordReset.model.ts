export interface PasswordResetToken {
  id?: string;
  token: string;
  email: string;
  expiresAt: Date;
  used: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
