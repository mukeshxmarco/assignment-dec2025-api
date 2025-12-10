import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';

/**
 * Service: User signup
 */
const signupService = async (name, email, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // Generate token
  const token = generateToken(user._id);

  return {
    user: user.toJSON(),
    token
  };
};

/**
 * Service: User login
 */
const loginService = async (email, password) => {
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = generateToken(user._id);

  return {
    user: user.toJSON(),
    token
  };
};

export { signupService, loginService };
