// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

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

const PORT = 4001; // Explicitly set to 4001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
