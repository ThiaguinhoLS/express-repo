const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      auth: false, message: "No token provided"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        auth: false, message: "Failed to authenticate token"
      });
    }
    req.userId = decoded.id;
    req.userUsername = decoded.username;
    next();
  });
};
