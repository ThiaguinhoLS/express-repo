const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const rfs = require("rotating-file-stream");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const users = require("./routes/users.routes");
const messages = require("./routes/messages.routes");
const authentication = require("./routes/authentication.routes");
const authMiddleware = require("./middlewares/authentication");
const app = express();

// File Log for application
const accessLog = rfs("access.log", {
  path: path.join(__dirname, "../log"),
  size: "10M",
  compress: true
});

// Filter logs
app.use(logger("combined", {
  skip(req, res) {
    return res.statusCode < 400;
  },
  stream: accessLog
}));

if (process.env.NODE_ENV === "development") {
  app.use(logger("tiny"));
}

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connection on database
mongoose.set("useFindAndModify", false);
mongoose.connect(config.database.url, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error: "));

// Set port
app.set("port", process.env.PORT || 8081);

// Routes
app.use("/users", users);
app.use("/messages", authMiddleware, messages);
app.use("/authenticate", authentication);

// Catch all requests
app.use("*", (req, res, next) => {
  res.statusCode = 404;
  next(new Error("Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  res.json({
    err: err.message
  });
});

module.exports = app;
