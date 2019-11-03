const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: function() {
        return "invalid email";
      }
    }
  },
  number: {
    type: String,
    required: true,
    // unique:true,
    minlength: 10
    // maxlength:128
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 128
  },
  tokens: [
    {
      token: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

// pre hooks is used for updatig the record and iserting the record
userSchema.pre("save", function(next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10).then(function(salt) {
      bcryptjs.hash(user.password, salt).then(function(encryptedPassword) {
        user.password = encryptedPassword;
        next();
      });
    });
  } else {
    next();
  } // .catch()
});

// own static method
userSchema.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({ email })
    .then(function(user) {
      if (!user) {
        return Promise.reject({ errors: "invalid email/password" });
      }
      return bcryptjs.compare(password, user.password).then(function(result) {
        if (result) {
          return Promise.resolve(user);
        } else {
          return Promise.reject({ errors: "invalid email/passwor" });
        }
      });
    })
    .catch(function(err) {
      return Promise.reject(err);
      // return new Promise(function(resolve,reject){
      //     reject(err)
      // })
    });
};

// static method [collection of objects where we're seaching one object]
userSchema.statics.findByToken = function(token) {
  const User = this;
  let tokenData; //block scope
  try {
    //run time errors are
    tokenData = jwt.verify(token, "jwt@123");
  } catch (err) {
    return Promise.reject(err);
  }

  return User.findOne({
    _id: tokenData._id,
    "tokens.token": token
  });
};

// instance method {specifies an object}
userSchema.methods.generateToken = function() {
  const user = this;
  const tokenData = {
    _id: user._id,
    username: user.username,
    createdAt: Number(new Date()) //storing in milliseconds
  };

  const token = jwt.sign(tokenData, "jwt@123");
  user.tokens.push({
    token
  });

  return user
    .save()
    .then(function(user) {
      return Promise.resolve(token);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
};

const User = mongoose.model("User", userSchema);
module.exports = {
  User
};

// limit and offset
