const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to db
mongoose.connect('mogodb://localhost/mobilepro')

// Instantiate app
const app = express();

// Serve frontend
app.use(express.static('./frontend/build'));

// Parse JSON
app.use(bodyParser.json());

// FOR DEVELOPMENT ONLY!
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
})

// Import routers
app.use('/user', require('./controllers/user.js'));

// Start server
app.listen(process.env.PORT || 4000, () => {
  const timestamp = new Date();
  const minutes = timestamp.getMinutes() > 9 ? timestamp.getMinutes() : `0${timestamp.getMinutes()}`
  const seconds = timestamp.getSeconds() > 9 ? timestamp.getSeconds() : `0${timestamp.getSeconds()}`
  console.log(`Server started at
    ${timestamp.getHours()}:${minutes}:${seconds}`);
  console.log('Listning on http://localhost:4000');
});
