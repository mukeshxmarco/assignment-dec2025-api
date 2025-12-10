import express from 'express';
import {
  updateBasicInfo,
  verifyOtp,
  addCard,
  getUserCards,
  getUserProfile
} from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import verifiedMiddleware from '../middlewares/verified.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

/**
 * @route   GET /user/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', getUserProfile);

/**
 * @route   POST /user/basic
 * @desc    Update basic information (Step 1)
 * @access  Private
 */
router.post('/basic', updateBasicInfo);

/**
 * @route   POST /user/verify
 * @desc    Verify OTP (Step 2)
 * @access  Private
 */
router.post('/verify', verifyOtp);

/**
 * @route   POST /user/cards
 * @desc    Add card (Step 3 - requires verification)
 * @access  Private + Verified
 */
router.post('/cards', verifiedMiddleware, addCard);

/**
 * @route   GET /user/cards
 * @desc    Get all user cards
 * @access  Private
 */
router.get('/cards', getUserCards);

export default router;
