const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/User.js');
const Invite = require('./models/Invite.js');

// Connect to db
mongoose.connect('mongodb://localhost:27017/mobilepro', {useMongoClient: true});
db = mongoose.connection;

// Listen for errors
// db.on('error', e => console.log(e));

// Create superuser invite if no superuser
db.once('open', () => {
  User.findOne({permissions: 3}).exec()
    .then(user => {
      if(!user) throw new Error('no superuser');
      return {permissions: 3};
    })
    .catch(e => {
      Invite.findOne({permissions: 3}).exec()
        .then(invite => {
          if(!invite) throw new Error('no invite');
        })
        .catch(e => {
          const newInvite = require('./config/make-super-user.js')()
          console.log(`New Superuser Invite code: ${newInvite}`);
        })
    })
})

// Instantiate app
const app = express();

// Uncomment next line to serve frontend without apache
// app.use(express.static('./frontend/build'));

// Parse JSON
app.use(bodyParser.json());

// Init passport
app.use(passport.initialize());
require('./config/jwtconfig')(passport);

// FOR DEVELOPMENT ONLY!
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.removeHeader('X-Powered-By')
  next();
});

// If serving without apache inverse commented app.use()
// Import routers
app.use(require('./controllers'));
// app.use('/api', require('./controllers'));


app.get('/', (req, res) => {
  res.send('<h1>Hi there</h1>');
});

// Start server
app.listen(5000, () => {
  const timestamp = new Date();
  const minutes = timestamp.getMinutes() > 9 ? timestamp.getMinutes() : `0${timestamp.getMinutes()}`
  const seconds = timestamp.getSeconds() > 9 ? timestamp.getSeconds() : `0${timestamp.getSeconds()}`
  console.log(`
Server started at ${timestamp.getHours()}:${minutes}:${seconds}`);
  console.log('Listning on http://localhost:5000');
});
