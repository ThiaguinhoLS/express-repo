const express = require('express');
const app = express();

// Routing
app.get('/', (req, res) => {
  res.send('Hello World with Express.js');
});

// Generate custom error
app.get('/error', (req, res, next) => {
  res.status(400);
  next(new Error('Error page'));
});


// Catch all requests
app.get('*', (req, res, next) => {
  res.status(400).send('Not Found');
});

// Error handler
app.use((err, req, res, next) => {
  res.send(err.message);
});

module.exports = app;
