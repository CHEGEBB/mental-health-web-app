const crypto = require('crypto');

// Generate encryption key from user secret
exports.generateEncryptionKey = (userSecret) => {
  return crypto.scryptSync(userSecret, process.env.ENCRYPTION_SALT, 32);
};

// Encrypt sensitive data
exports.encryptData = (data, encryptionKey) => {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

// Decrypt sensitive data
exports.decryptData = (encryptedData, iv, authTag, encryptionKey) => {
  try {
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm', 
      encryptionKey,
      Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Hash sensitive data with salt
exports.hashData = (data) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .createHmac('sha256', salt)
    .update(data)
    .digest('hex');
  return { hash, salt };
};

// Verify hashed data
exports.verifyHash = (data, hash, salt) => {
  const newHash = crypto
    .createHmac('sha256', salt)
    .update(data)
    .digest('hex');
  return newHash === hash;
};