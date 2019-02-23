const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const logger = require('morgan');
const posts = require('./routes/posts.routes.js');

// Instance application
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'test') {
  app.use(logger('tiny'));
}

// Router posts
app.use('/', posts);

// Catch all others endpoint
app.use('*', (req, res, next) => {
  res.status(404);
  next(new Error('Not Found Endpoint'));
});

// Error handler
app.use((err, req, res, next) => {
  res.json({ data: err.message });
});

// Database configuration
mongoose.connect(config.get('database.url'), { useNewUrlParser: true });

// Get connection
const db = mongoose.connection;

// Event listener for case of error
db.on('error', console.error.bind(console, 'Connection error: '));

// Port listen
const port = process.env.PORT || 3000;

// Set port in application
app.set('port', port);

// Export app
module.exports = app;

