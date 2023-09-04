const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Secret key for JWT
const secretKey = 'your-secret-key';

// Sample user data (in production, this would be fetched from a database)
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'user' },
  { id: 2, username: 'admin', password: 'admin123', role: 'admin' },
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user based on the provided username
  const user = users.find((u) => u.username === username);

  // Check if the user exists and the password is correct
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a JWT token with the user's ID and role
  const token = jwt.sign({ id: user.id, role: user.role }, secretKey);

  // Return the token as the login response
  return res.status(200).json({ token });
});

// Protected route
app.get('/protected', (req, res) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, secretKey);

    // Access the user's ID and role from the decoded token
    const userId = decoded.id;
    const userRole = decoded.role;

    // Perform authorization based on the user's role
    if (userRole === 'admin') {
      return res.status(200).json({ message: 'Access granted for admin user' });
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});