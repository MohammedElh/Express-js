const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const moment = require('moment');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  const user = users.find((user) => user.email === email);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});

const users = [];

// Routes
app.get('/', (req, res) => {
  res.render('main')
})

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = { username: req.body.username, email: req.body.email, password: hashedPassword };
    users.push(newUser);
    registrationMail(newUser.email)
    res.redirect('/login');
  } catch (error) {
    res.redirect('/register');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(403).send('Invalid email or password');
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      req.session.isAuthenticated = true;
      req.session.username = user.username;
      req.session.email = user.email;
      req.session.password = user.password;
      res.redirect('/profile');
    } else {
      res.status(403).send('Invalid email or password');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/profile', (req, res) => {
  if (req.session.isAuthenticated) {
    res.send(`<h1>Welcome to your profile, ${req.session.username}</h1>`);
  } else {
    res.redirect('/login');
  }
});

app.get('/get-session', (req, res) => {
  const username = req.session.username;
  const password = req.session.password;
  res.send(`Username: ${username}<br>Password: ${password}`);
});


function registrationMail(email) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'habachi20000@gmail.com',
      pass: 'pobqwjgignekkpwj'
    }
  });
  const currentDay = moment().format('YYYY-MM-DD');
  const currentTime = moment().format('HH:mm');
  const mailOptions = {
    from: 'habachi20000@gmail.com',
    to: email,
    subject: 'Welcome to Our Website',
    text: `Thank you for registering in Our website ${currentDay} at ${currentTime}!`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
