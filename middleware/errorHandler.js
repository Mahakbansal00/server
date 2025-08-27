const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
    new winston.transports.Console(),
  ],
});

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { metadata: err });
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
