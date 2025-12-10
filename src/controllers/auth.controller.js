import { signupService, loginService } from '../services/auth.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Controller: POST /auth/signup
 */
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return errorResponse(res, 400, 'All fields are required: name, email, password');
    }

    if (password.length < 6) {
      return errorResponse(res, 400, 'Password must be at least 6 characters');
    }

    const result = await signupService(name, email, password);

    return successResponse(res, 201, 'User registered successfully', result);
  } catch (error) {
    if (error.message === 'User with this email already exists') {
      return errorResponse(res, 400, error.message);
    }
    next(error);
  }
};

/**
 * Controller: POST /auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return errorResponse(res, 400, 'Email and password are required');
    }

    const result = await loginService(email, password);

    return successResponse(res, 200, 'Login successful', result);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return errorResponse(res, 401, error.message);
    }
    next(error);
  }
};

export { signup, login };
