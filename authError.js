// authError.js
const authError = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      next(err);
    }
  };
  
  module.exports = authError;
  