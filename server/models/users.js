const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not an email",
    },
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  // generate salt and hash with bcrypt
  let salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(user.password, salt, null);
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});

// toJSON method return email from model
userSchema.methods.toJSON = function () {
  return {
    email: this.email,
  };
};

// isValidPassword compares password and return boolean
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

// encryptPassword return hashed password
userSchema.methods.encryptPassword = function (password) {
  let salt = bcrypt.genSaltSync(10);
  console.log(salt, password);
  return bcrypt.hashSync(password, salt, null);
};

// findByCredentials returns promise with user
userSchema.statics.findByCredentials = function (email, password) {
  let user = this;
  return user.findOne({ email }).then((doc) => {
    if (!doc) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(doc);
        }
        reject();
      });
    });
  });
};
let User = mongoose.model("User", userSchema);
module.exports = User;
