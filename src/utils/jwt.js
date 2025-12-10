import jwt from 'jsonwebtoken';
import config from '../config/config.js';

/**
 * Generate JWT token for user
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export { generateToken, verifyToken };
