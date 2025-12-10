import User from '../models/User.js';
import Card from '../models/Card.js';

const FIXED_OTP = '123456';

/**
 * Service: Update basic info
 */
const updateBasicInfoService = async (userId, name, dob, address) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  // Update fields
  user.name = name || user.name;
  user.dob = dob;
  user.address = address;

  await user.save();
  return user.toJSON();
};

/**
 * Service: Verify OTP
 */
const verifyOtpService = async (userId, otp) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  // Verify OTP
  if (otp !== FIXED_OTP) {
    throw new Error('Invalid OTP. Please try again.');
  }

  // Mark as verified
  user.isVerified = true;
  await user.save();

  return user.toJSON();
};

/**
 * Service: Add card (only for verified users)
 */
const addCardService = async (userId, cardNumber, expiryMonth, expiryYear) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.isVerified) {
    throw new Error('Please verify your account first');
  }

  // Create card
  const card = await Card.create({
    userId,
    cardNumber,
    expiryMonth,
    expiryYear
  });

  return card;
};

/**
 * Service: Get all cards for user
 */
const getUserCardsService = async (userId) => {
  const cards = await Card.find({ userId }).sort({ createdAt: -1 });
  return cards;
};

export {
  updateBasicInfoService,
  verifyOtpService,
  addCardService,
  getUserCardsService
};
