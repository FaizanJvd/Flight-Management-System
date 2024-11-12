const jwt = require('jsonwebtoken');
const { getUserById } = require('../services/authServices');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await getUserById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ success:false, message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ success:false, message: 'Not authorized, no token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success:false, message: 'Forbidden: You do not have access' });
    }
    next();
  };
};

module.exports = { protect, authorize };
