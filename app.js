const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { dbURI } = require('./thing');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(dbURI)
  .then(() => {
    console.log('app listening at http://localhost:3000');
    app.listen(3000)})
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {

  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true});

  res.send('you got the cookies!');

});

// cookies
app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);

});