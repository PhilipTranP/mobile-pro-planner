const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

module.exports = passport => {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: require('./secret')
  };
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({_id:jwtPayload._doc._id}).populate('employee')
      .then(user => {
        if(user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => done(err, false));
  }));
}
