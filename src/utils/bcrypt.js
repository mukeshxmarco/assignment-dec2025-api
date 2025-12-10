import bcrypt from 'bcryptjs';
import config from '../config/config.js';

/**
 * Hash password using bcrypt
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare plain password with hashed password
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
