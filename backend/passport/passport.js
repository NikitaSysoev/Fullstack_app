const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password'
    },
    (login, password, done) => {
      User.findOne({ login }, (err, user) => {
        if (err) done(err);
        if (!user) done(null, false, { message: 'Incorrect username.' });
        if (user && password !== user.password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return err ? done(err) : done(null, user);
  });
});

module.exports = passport;
