require('dotenv').config();
const express = require('express');
const { body, validationResult } = require('express-validator');
const xss = require('xss');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const csurf = require('csurf');
const app = express();
const jwt = require('jsonwebtoken');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));

// Secret key for JWT
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkzNjc3MjkwfQ.rVXxouG3uMbTCi50t3GUyuD8pMS9eHrt084aQB8qGJQn';
app.use(session({ secret: secretKey, resave: false, saveUninitialized: false }));

// Sample user data (in production, this would be fetched from a database)
const user ={id: 1, username: 'admin', password: 'password', role: 'admin'}
;

// Routes
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

app.post('/login',[
  body('username').notEmpty().trim().escape(),
  body('password').isLength({ min: 6 }),
],(req, res) => {

  // Validate and authenticate the user
  // Implement appropriate validation and secure authentication mechanisms here
  // For simplicity, you can use a hardcoded username and password for demonstration purposes
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  const sanitizedData = {
    name: xss(username),
    password: xss(password),
  };
  // Check if the user exists and the password is correct
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }else {
  return res.status(200).json({ token });
  }
  if (username === 'admin' && password === 'password') {
    req.session.isAuthenticated = true;
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }

});

// app.get('/protected', (req, res) => {
//   // Extract the token from the Authorization header
//   const token = req.headers.authorization.split(' ')[1];

//   try {
//     // Verify and decode the JWT token
//     const decoded = jwt.verify(token, secretKey);

//     // Access the user's ID and role from the decoded token
//     const userId = decoded.id;
//     const userRole = decoded.role;

//     // Perform authorization based on the user's role
//     if (userRole === 'admin') {
//       return res.status(200).json({ message: 'Access granted for admin user' });
//     } else {
//       return res.status(403).json({ error: 'Access denied' });
//     }
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// });
app.get('/dashboard', (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  const authorizationHeader = req.headers["authorization"];
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const userName = decoded.username;
  if (req.session.isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
