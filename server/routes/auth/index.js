/**
 * this route is the authentication route
 * endpoint: /auth/login, /auth/register
 * 
 */

const express = require('express');
const rateLimit = require('express-rate-limit');
const { registerController, loginController } = require('../../controllers/auth.controller');

const router = express.Router();

// Login limiter
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 5,
  message: { error: "Too many login attempts, please try again later." },
  skipSuccessfulRequests: true // optional
});

// Register limiter
const registerLimiter = rateLimit({
  windowMs: 60 * 10000, // 1 minute
  limit: 2,
  message: { error: "Too many registration attempts, please try again later." }
});

router.post('/login', loginLimiter, loginController);
router.post('/register', registerLimiter, registerController);

module.exports = router;