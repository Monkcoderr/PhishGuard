const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../utils/helpers');

const verification = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;


  const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const loginVerification = asyncHandler(async (req, res) => {
      const { email, password } = req.body;
