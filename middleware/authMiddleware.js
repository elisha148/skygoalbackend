const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token after 'Bearer'
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user data to request
    next(); // Proceed to the next middleware/handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
