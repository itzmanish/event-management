const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Users = require("./../../models/users");

passport.use(
  "signup",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // we are checking to see if the user trying to login already exists
        const user = await Users.findOne({ email });
        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, "That email is already taken.");
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new Users({
            email,
            password,
          });

          // save the user
          const userData = await newUser.save();
          return done(null, userData);
        }
      } catch (error) {
        done(null, false, JSON.stringify(error));
      }
    }
  )
);

// Passport middleware to handle login
passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        //Find the user associated with the email provided by the user
        const user = await Users.findOne({ email });
        if (!user) {
          //If the user isn't found in the database, return a message
          return done(null, false, { message: "User not found" });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        //Send the user information to the next middleware
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});
