const bcrypt = require('bcryptjs');
const crypto = require('crypto');

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} - Hashed password
 */
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - Plain text password to check
 * @param {string} hashedPassword - Stored hashed password to compare against
 * @returns {Promise<boolean>} - True if passwords match
 */
exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate a random reset token
 * @returns {Object} - Object containing reset token and hashed token
 */
exports.generateResetToken = () => {
  // Generate random token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash token for storage in the database
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expiry to 30 minutes
  const resetTokenExpire = Date.now() + 30 * 60 * 1000;

  return {
    resetToken,        // Original token to send to user
    resetTokenHash,    // Hashed token to store in DB
    resetTokenExpire   // Token expiry timestamp
  };
};

/**
 * Hash a token using SHA-256
 * @param {string} token - Plain token to hash
 * @returns {string} - Hashed token
 */
exports.hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};