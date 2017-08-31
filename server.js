/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/User.js');
const Invite = require('./models/Invite.js');

// Connect to db
mongoose.connect('mongodb://localhost:27017/mobilepro', {useMongoClient: true});
let db = mongoose.connection;

// Listen for errors
// db.on('error', e => console.log(e));

// Create superuser invite if no superuser
db.once('open', () => {
  User.findOne({permissions: 3}).exec()
    .then(user => {
      if(!user) throw new Error('no superuser');
      return {permissions: 3};
    })
    .catch(() => {
      Invite.findOne({permissions: 3}).exec()
        .then(invite => {
          if(!invite) throw new Error('no invite');
        })
        .catch(() => {
          const newInvite = require('./config/make-super-user.js')();
          console.log(`New Superuser Invite code: ${newInvite}`);
        });
    });
});

// Instantiate app
const app = express();

// Uncomment next line to serve frontend without apache
// app.use(express.static('./view/build'));

// Parse JSON
app.use(bodyParser.json());

// Init passport
app.use(passport.initialize());
require('./config/jwtconfig')(passport);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.removeHeader('X-Powered-By');
  next();
});


app.use('/api', require('./controllers'));

if(process.env.NODE_ENV === 'dev') {
  const compiler = require('webpack')(require('./webpack.config.dev'));

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/'
  }));

  app.use(require('webpack-hot-middleware')(compiler));
  app.get('*', (req, res) => {
    const index = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(index, (e, file) => {
      res.set('Content-Type', 'text/html');
      res.send(file);
    });
  });
} else {
  app.get('*', (req, res) => {
    const index = path.join(__dirname, 'view', 'dist', 'index.html');
    res.set('Content-Type', 'text/html');
    res.sendFile(index);
  });
}


// Start server
app.listen(process.env.PORT || 1337, () => {
  const timestamp = new Date();
  const minutes = timestamp.getMinutes() > 9 ? timestamp.getMinutes() : `0${timestamp.getMinutes()}`;
  const seconds = timestamp.getSeconds() > 9 ? timestamp.getSeconds() : `0${timestamp.getSeconds()}`;
  console.log(`Server started at ${timestamp.getHours()}:${minutes}:${seconds}z`);
  console.log('Listning on http://localhost:1337');
});
