const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Users = require("./../../models/users");

//This verifies that the token sent by the user is valid
passport.use(
  "jwt",
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: process.env.secret,
      //we expect the user to send the token as Bearer
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        // check for expiration of token
        if (token.timestamp > Date.now()) {
          return done(null, false, "jwt expired");
        }
        const user = await Users.findOne({ email: token.email });

        if (!user) {
          return done(null, false, "Token doesn't contain valid user");
        } else {
          return done(null, token);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
