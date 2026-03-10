const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      totalScans: user.totalScans,

      const login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
      
        // Find user and include password
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
      
        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {