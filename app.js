const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect('mongodb+srv://xmt:vtgFA1z4GDVDYxkB@cluster0.6t38aqi.mongodb.net/')
  .then(() => {
    console.log('app listening at http://localhost:3000');
    app.listen(3000)})
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);