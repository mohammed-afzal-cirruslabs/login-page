const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Authentication endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      message: 'Both email and password are required'
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
      message: 'Please provide a valid email address'
    });
  }

  // Validate password length (minimum 6 characters)
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Invalid password',
      message: 'Password must be at least 6 characters long'
    });
  }

  // Mock authentication - in a real app, this would check against a database
  // For demo purposes, accept any valid format
  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        email: email,
        id: 'mock-user-id-' + Date.now()
      },
      token: 'mock-jwt-token-' + Buffer.from(email).toString('base64')
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
