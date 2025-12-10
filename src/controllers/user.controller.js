import {
  updateBasicInfoService,
  verifyOtpService,
  addCardService,
  getUserCardsService
} from '../services/user.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Controller: POST /user/basic
 * Step 1: Update basic information
 */
const updateBasicInfo = async (req, res, next) => {
  try {
    const { name, dob, address } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!dob || !address) {
      return errorResponse(res, 400, 'DOB and address are required');
    }

    const user = await updateBasicInfoService(userId, name, dob, address);

    return successResponse(res, 200, 'Basic information updated successfully', { user });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: POST /user/verify
 * Step 2: Verify OTP
 */
const verifyOtp = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!otp) {
      return errorResponse(res, 400, 'OTP is required');
    }

    const user = await verifyOtpService(userId, otp);

    return successResponse(res, 200, 'OTP verified successfully', { user });
  } catch (error) {
    if (error.message.includes('Invalid OTP') || error.message.includes('basic information')) {
      return errorResponse(res, 400, error.message);
    }
    next(error);
  }
};

/**
 * Controller: POST /user/cards
 * Step 3: Add card (only verified users)
 */
const addCard = async (req, res, next) => {
  try {
    const { cardNumber, expiryMonth, expiryYear } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!cardNumber || !expiryMonth || !expiryYear) {
      return errorResponse(res, 400, 'Card number, expiry month, and expiry year are required');
    }

    const card = await addCardService(userId, cardNumber, expiryMonth, expiryYear);

    return successResponse(res, 201, 'Card added successfully', { card });
  } catch (error) {
    if (error.message.includes('verify')) {
      return errorResponse(res, 403, error.message);
    }
    next(error);
  }
};

/**
 * Controller: GET /user/cards
 * Get all user's cards
 */
const getUserCards = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cards = await getUserCardsService(userId);

    return successResponse(res, 200, 'Cards retrieved successfully', { 
      count: cards.length,
      cards 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: GET /user/profile
 * Get user profile
 */
const getUserProfile = async (req, res) => {
  return successResponse(res, 200, 'Profile retrieved successfully', { 
    user: req.user 
  });
};

export {
  updateBasicInfo,
  verifyOtp,
  addCard,
  getUserCards,
  getUserProfile
};
