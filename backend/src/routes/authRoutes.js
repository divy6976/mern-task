const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/usermodel');

const authRouter = express.Router();

const createToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('Missing JWT_SECRET env variable');
  }

  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
};

authRouter.post('/signup', async (req, res) => {
  try {
    // user se email, username, password lo
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'email, username aur password chahiye' });
    }

    // check kro if already exist or not
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ message: 'email ya username already exists' });
    }

    // password hash kro
    const hashedPassword = await bcrypt.hash(password, 10);

    // new user create kro
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // token generate kro
    const token = createToken(user._id);

    // token cookie me bhejo
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: 'signup success',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Signup error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    // user se username, password lo
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'username aur password chahiye' });
    }

    // check kro user exist krta hai ya nahi
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // password verify kro
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'wrong password' });
    }

    // token generate kro
    const token = createToken(user._id);

    // token cookie me bhejo
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // login success response
    return res.status(200).json({
      message: 'login success',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Login error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

authRouter.post('/forgot-password', async (req, res) => {
  try {
    // user se email aur newPassword lo
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'email aur newPassword chahiye' });
    }

    // user find kro
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // password ko hash kro aur update kro
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: 'password reset success' });
  } catch (error) {
    console.error('Forgot password error', error);
    return res.status(500).json({ message: 'internal server error' });
  }
});

module.exports = authRouter;
