const express = require('express');
const User = require('../modules/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

// Use environment variable in production
const JWT_SECRET = '$wasiisabadassboy$';

// ==========================
// ROUTE 1: Create a New User
// ==========================
router.post('/CreateUser', [
  body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const data = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    return res.status(201).json({ authToken });

  } catch (error) {
    console.error("CreateUser Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// ==========================
// ROUTE 2: Login User
// ==========================
router.post('/login', [
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const data = {
      user: {
        id: existingUser.id
      }
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    return res.json({ authToken });

  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});


//ROUTE GET USERS DETAILS
router.post('/getuser', fetchuser, async (req, res) => {
try {
   let userID = req.user.id
   const user = await User.findById(userID).select("-password")
   res.send(user)
}
catch (error) {
  console.error("Login Error:", error.message);
  return res.status(500).send("Internal Server Error");
}
})
module.exports = router;
