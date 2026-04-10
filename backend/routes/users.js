const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "l52026_secret_key"; // In production, use environment variables

// Register a new user
router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        // Check if user already exists with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, firstName, lastName });
        const savedUser = await user.save();

        res.status(201).json({ message: 'User registered successfully ', user: savedUser });
    } catch (err) {
        res.status(500).json({ message: "Failed to register user" });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
});


module.exports = router;
