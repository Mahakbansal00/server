// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());

// Debug logging for all requests
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url, 'Body:', req.body);
  next();
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Skills routes (protected)
app.use('/api/skills', require('./routes/skill')); // <- add this line

// Centralized error handling middleware
app.use(errorHandler);

app.use('/api/match', require('./routes/match'));

const PORT = 4001; // Explicitly set to 4001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
