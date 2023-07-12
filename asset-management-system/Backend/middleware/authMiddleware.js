const { verifyToken } = require('./tokenUtils');

const authenticateToken = (req, res, next) => {
  // Get the authentication token from the request headers or any other source
  const authToken = req.headers.authorization;

  // Verify the token
  if (!authToken) {
    return res.status(401).json({ error: 'Authentication token required.' });
  }

  try {
    const user = verifyToken(authToken); // Assuming verifyToken function validates and decodes the token

    // Attach the user object to the request for further use
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

const checkPermissions = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== requiredRole) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  checkPermissions,
};
