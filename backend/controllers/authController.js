// Ye file authentication ka logic handle karti hai
// Signup aur Login dono functions yahan hain

const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {
  createMemoryUser,
  findMemoryUserByEmail,
  findMemoryUserById,
  updateMemoryUser,
} = require('../utils/memoryStore');

const shouldUseMemoryMode = () => process.env.USE_MEMORY_DB === 'true' || mongoose.connection.readyState !== 1;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  headline: user.headline,
  location: user.location,
  bio: user.bio,
  portfolio: user.portfolio,
  github: user.github,
  linkedin: user.linkedin,
});

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Naam, email aur password sab do' });
    }

    const useMemoryMode = shouldUseMemoryMode();

    const existingUser = useMemoryMode ? await findMemoryUserByEmail(email) : await User.findOne({ email }).catch(() => null);
    if (existingUser) {
      return res.status(400).json({ message: 'Is email se account pehle se bana hua hai' });
    }

    let user;
    if (useMemoryMode) {
      user = await createMemoryUser({ name, email, password });
    } else {
      user = await User.create({ name, email, password });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      ...sanitizeUser(user),
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server mein kuch problem aayi', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email aur password dono do' });
    }

    const useMemoryMode = shouldUseMemoryMode();
    let user = useMemoryMode ? await findMemoryUserByEmail(email) : await User.findOne({ email }).catch(() => null);

    if (!user) {
      return res.status(401).json({ message: 'Email ya password galat hai' });
    }

    if (useMemoryMode) {
      const bcrypt = require('bcryptjs');
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Email ya password galat hai' });
      }
    } else if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Email ya password galat hai' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Email ya password galat hai' });
    }

    const token = generateToken(user._id);

    res.json({
      ...sanitizeUser(user),
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server mein kuch problem aayi', error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const useMemoryMode = shouldUseMemoryMode();
    let user = useMemoryMode ? await findMemoryUserById(req.user._id) : await User.findById(req.user._id).select('-password').catch(() => null);

    if (!user) {
      return res.status(404).json({ message: 'User nahi mila' });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    res.status(500).json({ message: 'Auth profile load nahi hui', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const allowedFields = ['name', 'headline', 'location', 'bio', 'portfolio', 'github', 'linkedin', 'avatar'];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const useMemoryMode = shouldUseMemoryMode();
    let user;
    if (useMemoryMode) {
      user = await updateMemoryUser(req.user._id, updates);
    } else {
      user = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
      }).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User nahi mila' });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    res.status(500).json({ message: 'Profile update nahi hua', error: error.message });
  }
};

module.exports = { signup, login, getMe, updateProfile };
