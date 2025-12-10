import { signupService, loginService } from '../services/auth.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Validate password strength
 */
const validatePassword = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  return null;
};

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

    // Validate password strength
    const passwordError = validatePassword(password);
    if (passwordError) {
      return errorResponse(res, 400, passwordError);
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
