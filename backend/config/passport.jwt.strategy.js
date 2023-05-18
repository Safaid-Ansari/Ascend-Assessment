const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWTStrategy = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const options = {
  jwtFromRequest: ExtractJWTStrategy.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JWTStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload._id, (err, user) => {
      if (err) {
        console.log("Error:", err);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
