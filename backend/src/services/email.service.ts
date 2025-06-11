import mailchimp from '@mailchimp/mailchimp_transactional'
import config from '../config/config';
import { AxiosError } from 'axios';

const client = mailchimp(config.mandrillApiKey);

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
): Promise<boolean> => {
  try {
    const resetLink = `${config.frontendUrl}/reset-password/${resetToken}`;
    
    const message = {
      to: [{ email }],
      from_email: 'noreply@knodstokenwallet.labtekdev.site',
      from_name: 'Knods Token Wallet',
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Reset Your Password</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password for your Knods Token Wallet account. Click the button below to reset your password:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
          </p>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p>This link will expire in 1 hour for security reasons.</p>
          <p>Thank you,<br>Knods Token Wallet Team</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #666;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p><strong>Note:</strong> This is an alpha release of Knods Token Wallet. Features may change or be reset.</p>
          </div>
        </div>
      `,
    };

    const response = await client.messages.send({ message });
    console.log(response)
    
    if(response instanceof AxiosError){
      console.error('Error sending password reset email:', response);
      return false;
    }

    if(response[0].status !== 'sent' && response[0].status !== 'queued'){
      console.error('Error sending password reset email:', response[0]);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};
