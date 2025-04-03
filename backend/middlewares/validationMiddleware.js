const { validationResult } = require('express-validator');

// Validation middleware
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false, 
      errors: errors.array().map(error => ({
        field: error.param,
        message: error.msg
      }))
    });
  }
  next();
};

// Rate limiting middleware for sensitive routes
exports.rateLimiter = (limit, timeWindow) => {
  const requestCounts = new Map();
  
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, { count: 1, resetTime: now + timeWindow });
      return next();
    }
    
    const requestData = requestCounts.get(ip);
    
    if (now > requestData.resetTime) {
      requestData.count = 1;
      requestData.resetTime = now + timeWindow;
      return next();
    }
    
    if (requestData.count >= limit) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later'
      });
    }
    
    requestData.count++;
    next();
  };
};

// Sanitize data middleware
exports.sanitizeData = () => {
  return (req, res, next) => {
    // Basic sanitization logic
    if (req.body) {
      Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string') {
          req.body[key] = req.body[key].trim();
        }
      });
    }
    next();
  };
};