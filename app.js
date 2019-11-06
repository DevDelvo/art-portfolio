const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const artRoutes = require('./routes/art');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
const auth = require('./auth');

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected'));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors()); // allows our app to handle requests from different origins

// session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'whos dat gurl?!',
    store: sessionStorage,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes middleware
app.use('/auth', auth)
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', artRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
