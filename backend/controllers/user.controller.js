const User = require('../models/user.model');
const generateToken = require('../Config/jwt');

//Register new user
const registerUser = async (req, res) => {
  if(req.body){
    const { name, email, password } = req.body;
    console.log('User registration started',name,email,password);
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const user = await User.create({ name, email, password });
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }else{
    return res.status(400).json({
      message:"body (email ,name and  password) required !!!"
    })
    
  }
};

//Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('User login started',email,password);

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Get logged-in user details (used in /api/user/me)
const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // from middleware

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user details', error: error.message });
  }
};


// exporting controllers functions

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};