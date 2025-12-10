import { errorResponse } from '../utils/response.js';

/**
 * Middleware to check if user is verified
 */
const verifiedMiddleware = (req, res, next) => {
  if (!req.user.isVerified) {
    return errorResponse(res, 403, 'Access denied. Please complete OTP verification first.');
  }
  next();
};

export default verifiedMiddleware;
