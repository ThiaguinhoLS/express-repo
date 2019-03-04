const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  messages: [
    { type: Schema.Types.ObjectId, ref: "Messages" }
  ]
});

// Instance methods

UsersSchema.methods.verify = function(password) {
  bcrypt.compare(password, this.password)
    .then(res => {
      return res;
    });
};

UsersSchema.methods.generate = function(password) {
  bcrypt.genSalt(10)
    .then(salt => {
      bcrypt.hash(password, salt)
        .then(hash => {
          user.password = hash;
      });
    })
    .catch(err => next(err));
};

// Middlewares

UsersSchema.pre("save", function(next) {
  const user = this;

  if(!user.isModified("password")) return next();

  // Generate salt
  bcrypt.genSalt(10)
    .then(salt => {

      // Generate hash
      bcrypt.hash(user.password, salt)
        .then(hash => {
          user.password = hash;
          next();
        });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = mongoose.model("Users", UsersSchema);
