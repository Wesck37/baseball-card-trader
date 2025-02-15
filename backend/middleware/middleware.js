const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.REACT_APP_JWT_SECRET_KEY; // Use an environment variable in production

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
