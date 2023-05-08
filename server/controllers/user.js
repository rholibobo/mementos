import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id },secret, { expiresIn: "1h" } );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // POST route for creating a new user
// router.post('/signup', async (req, res) => {
//   try {
//     // Check if email already exists in database
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }
    
//     // Create new user with submitted data
//     const newUser = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password
//     });
    
//     // Save new user to database
//     const savedUser = await newUser.save();
    
//     // Generate JWT token and send it in response
//     const token = jwt.sign({ userId: savedUser._id }, 'mySecretKey', { expiresIn: '1h' });
//     res.status(200).json({ message: 'User created successfully', token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;

