const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

require('dotenv').config();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID/secret not found. Skipping Google OAuth.');
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value

    User.findById(googleId).then(foundUser => {
      if (foundUser) {
        done(null, foundUser)
      } else {
        const user = new User({name, email, googleId});
        user.save((err, user) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err)
            });
          }
          user.salt = undefined;
          user.hashed_password = undefined;
        })
      }
    })
    .catch(done)
  });

  passport.use(strategy);

  router.get('/', passport.authenticate('google', { scope:  'email'}));

  router.get('/callback', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }));
}

module.exports = router;