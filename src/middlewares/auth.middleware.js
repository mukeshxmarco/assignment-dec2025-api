import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';
import User from '../models/User.js';

/**
 * Middleware to authenticate JWT token
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 401, 'No token provided. Authorization header required.');
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return errorResponse(res, 401, 'Invalid token format');
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return errorResponse(res, 401, 'User not found. Token invalid.');
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid or expired token') {
      return errorResponse(res, 401, error.message);
    }
    return errorResponse(res, 500, 'Authentication failed', error.message);
  }
};

export default authMiddleware;
