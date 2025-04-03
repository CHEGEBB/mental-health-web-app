const nodemailer = require('nodemailer');
const { logger } = require('../middlewares/loggerMiddleware');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send welcome email
exports.sendWelcomeEmail = async (user) => {
  try {
    await transporter.sendMail({
      from: `"MindHarmony Support" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: 'Welcome to MindHarmony!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to MindHarmony, ${user.name}!</h2>
          <p>Thank you for joining our community dedicated to mental wellness and personal growth.</p>
          <p>Here are some tips to get started:</p>
          <ul>
            <li>Complete your profile</li>
            <li>Start your first journal entry</li>
            <li>Explore our resource hub</li>
            <li>Join a support group</li>
          </ul>
          <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
          <p>Wishing you well,<br>The MindHarmony Team</p>
        </div>
      `
    });
    
    return true;
  } catch (error) {
    logger.error('Email sending error:', error);
    return false;
  }
};

// Send password reset email
exports.sendPasswordResetEmail = async (user, resetToken, resetUrl) => {
  try {
    await transporter.sendMail({
      from: `"MindHarmony Support" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You are receiving this email because you (or someone else) has requested to reset your password.</p>
          <p>Please click the link below to reset your password:</p>
          <p><a href="${resetUrl}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a></p>
          <p>This link will expire in 30 minutes.</p>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </div>
      `
    });
    
    return true;
  } catch (error) {
    logger.error('Password reset email error:', error);
    return false;
  }
};

// Send appointment confirmation
exports.sendAppointmentConfirmation = async (user, appointment, therapist) => {
  try {
    await transporter.sendMail({
      from: `"MindHarmony Support" <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: 'Appointment Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Appointment Confirmed</h2>
          <p>Your appointment with ${therapist.name} has been confirmed.</p>
          <p><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date(appointment.date).toLocaleTimeString()}</p>
          <p><strong>Format:</strong> ${appointment.format}</p>
          <p>If you need to reschedule or cancel, please do so at least 24 hours in advance.</p>
          <p>Wishing you well,<br>The MindHarmony Team</p>
        </div>
      `
    });
    
    return true;
  } catch (error) {
    logger.error('Appointment confirmation email error:', error);
    return false;
  }
};