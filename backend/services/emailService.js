const nodemailer = require('nodemailer');

/**
 * Email service for sending various types of emails
 */
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  /**
   * Send welcome email to newly registered user
   * @param {string} to - Recipient email address
   * @param {string} name - User's name
   * @returns {Promise} - Email sending result
   */
  async sendWelcomeEmail(to, name) {
    const mailOptions = {
      from: `MindHarmony <${process.env.EMAIL_FROM}>`,
      to,
      subject: 'Welcome to MindHarmony',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a6fa5;">Welcome to MindHarmony, ${name}!</h2>
          <p>Thank you for joining our mental wellness community. We're excited to help you on your journey to better mental health.</p>
          <p>With MindHarmony, you can:</p>
          <ul>
            <li>Track your moods and emotions</li>
            <li>Journal your thoughts and experiences</li>
            <li>Access helpful resources</li>
            <li>Connect with a supportive community</li>
          </ul>
          <p>To get started, simply log in to your account and explore the dashboard.</p>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Best regards,<br>The MindHarmony Team</p>
        </div>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  /**
   * Send password reset email with token
   * @param {string} to - Recipient email address
   * @param {string} token - Password reset token
   * @returns {Promise} - Email sending result
   */
  async sendPasswordResetEmail(to, token) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
      from: `MindHarmony <${process.env.EMAIL_FROM}>`,
      to,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a6fa5;">Password Reset Request</h2>
          <p>You have requested to reset your password. Please click the link below to set a new password:</p>
          <p><a href="${resetUrl}" style="display: inline-block; background-color: #4a6fa5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reset Password</a></p>
          <p>This link will expire in 30 minutes.</p>
          <p>If you didn't request this change, you can safely ignore this email.</p>
          <p>Best regards,<br>The MindHarmony Team</p>
        </div>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  /**
   * Send account verification email
   * @param {string} to - Recipient email address
   * @param {string} token - Verification token
   * @returns {Promise} - Email sending result
   */
  async sendVerificationEmail(to, token) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-account/${token}`;

    const mailOptions = {
      from: `MindHarmony <${process.env.EMAIL_FROM}>`,
      to,
      subject: 'Verify Your MindHarmony Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a6fa5;">Verify Your Email Address</h2>
          <p>Thank you for creating a MindHarmony account. Please click the link below to verify your email address:</p>
          <p><a href="${verificationUrl}" style="display: inline-block; background-color: #4a6fa5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a></p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The MindHarmony Team</p>
        </div>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  /**
   * Send appointment confirmation email
   * @param {Object} appointment - Appointment details
   * @param {Object} user - User information
   * @returns {Promise} - Email sending result
   */
  async sendAppointmentConfirmation(appointment, user) {
    const { date, time, therapistName } = appointment;

    const mailOptions = {
      from: `MindHarmony <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: 'Appointment Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a6fa5;">Your Appointment is Confirmed</h2>
          <p>Hello ${user.name},</p>
          <p>Your appointment with ${therapistName} has been confirmed for:</p>
          <p style="font-weight: bold; font-size: 18px;">${date} at ${time}</p>
          <p>If you need to reschedule or cancel, please do so at least 24 hours in advance.</p>
          <p>Best regards,<br>The MindHarmony Team</p>
        </div>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();