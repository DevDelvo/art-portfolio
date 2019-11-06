const router = require('express').Router();
const { User } = require('../models/user');

router.post('/login', (req, res, next) => {

});

router.post('/signup', (req, res, next) => {

});

router.post('/logout', (req, res) => {
  req.logOut;
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));

module.exports = router;