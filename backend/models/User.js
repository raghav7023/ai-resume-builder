// Ye file hamara User database model define karti hai
// Mongoose Schema batata hai ki User ka data kaisa dikhega database mein

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema - database mein user ka format
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Naam dena zaroori hai'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email dena zaroori hai'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password dena zaroori hai'],
      minlength: [6, 'Password kam se kam 6 characters ka hona chahiye'],
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    avatar: {
      type: String,
      default: '',
    },

    headline: {
      type: String,
      default: '',
    },

    location: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      default: '',
    },

    portfolio: {
      type: String,
      default: '',
    },

    github: {
      type: String,
      default: '',
    },

    linkedin: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Password save karne se pehle usse encrypt (hash) karo
// "pre" hook matlab - save se pehle ye code run hoga
userSchema.pre('save', async function (next) {
  // Agar password change nahi hua toh skip karo
  if (!this.isModified('password')) return next();

  // bcrypt se password hash karo - 10 rounds ka matlab zyada secure
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password compare karne ka method - login ke time use hoga
userSchema.methods.matchPassword = async function (enteredPassword) {
  // enteredPassword (plain) ko database ke hash se compare karo
  return await bcrypt.compare(enteredPassword, this.password);
};

// Model banao aur export karo
const User = mongoose.model('User', userSchema);
module.exports = User;
