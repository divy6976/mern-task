const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'auth token missing' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('Missing JWT_SECRET env variable');
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;

    return next();
  } catch (error) {
    console.error('Auth middleware error', error);
    return res.status(401).json({ message: 'invalid or expired token' });
  }
};

module.exports = authMiddleware;

