const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User.js')
const Invite = require('./models/Invite.js')

// Connect to db
mongoose.connect('mogodb://localhost/mobilepro')

// Create superuser invite if no superuser
mongoose.commection.once('open', () => {
  User.findOne({permissions: 3}).exec();
    .then(user => {
      user.permissions === 3 || throw new Error('no superuser');
      return {permissions: 3};
    })
    .catch(e => {
      e === 'no superuser' &&
      Invite.findOne({permissions: 3}).exec()
        .then(invite => {
          invite.permissions === 3 || throw new Error('no invite');
        });
    })
    .catch(e => {
      e === 'no invite' && console.log('New Superuser Invite code: '+require('./make-super-user.js')());
    })
})

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
