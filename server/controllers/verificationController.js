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


      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
      
        res.status(200).json({
          success: true,
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            totalScans: user.totalScans,
            scamsCaught: user.scamsCaught
          }
        });
