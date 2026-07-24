// Ye middleware JWT token verify karta hai
// Middleware = ek function jo request aur response ke beech mein kaam karta hai
// Simple explanation: Jab bhi koi protected route access kare, pehle token check hoga

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { findMemoryUserById } = require('../utils/memoryStore');

const shouldUseMemoryMode = () => process.env.USE_MEMORY_DB === 'true' || mongoose.connection.readyState !== 1;

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (shouldUseMemoryMode()) {
        req.user = await findMemoryUserById(decoded.id);
      } else {
        req.user = await User.findById(decoded.id).select('-password');
      }

      if (!req.user) {
        return res.status(401).json({ message: 'Token invalid hai, please login karo' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalid hai, please login karo' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Login karo pehle - token nahi mila' });
  }
};

module.exports = { protect };
