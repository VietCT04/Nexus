// middleware/getUserId.js
const jwt = require('jsonwebtoken');

function extractUserId(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // raw token, no extra replace
  const token = authHeader.slice(7).trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Accept several common payload keys to be safe
    const userId = decoded.userId || decoded.sub || decoded.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token payload' });
    }

    req.userId = userId;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = extractUserId;
