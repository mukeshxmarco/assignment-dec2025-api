import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @route   POST /auth/signup
 * @desc    Register new user
 * @access  Public
 */
router.post('/signup', signup);

/**
 * @route   POST /auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', login);

export default router;
