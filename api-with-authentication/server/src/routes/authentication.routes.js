const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const Users = require("../models/users.models");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  Users.findOne({ username })
    .then(user => {
      bcrypt.compare(password, user.password).then(result => {
        if (result) {
          jwt.sign({ userId: user._id, username }, config.secret, (err, token) => {
            if (err) {
              res.status(401).json({ auth: false, token: null });
            } else {
              res.json({ auth: true, token });
            }
          })
        } else {
          res.status(401).json({ auth: false, message: "Authentication failed" });
        }
      })
    })
    .catch(err => {
      res.status(401).json({ auth: false, messages: "Authentication failed" });
    })
});

router.get("/logout", (req, res, next) => {
  res.json({ auth: false, token: null });
});

module.exports = router;
