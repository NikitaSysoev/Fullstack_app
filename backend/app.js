const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const router = express.Router();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const User = require('./model/User');
const passport = require('./passport/passport');

// User.collection.dropIndexes()

// MongoDB database url
const uri = 'mongodb+srv://admin:g4C4fPPCTFFBqic@cluster0-wyalb.mongodb.net/test?retryWrites=true';
// подключаем наш бэкенд код с бд
mongoose.connect(uri, { useNewUrlParser: true });
// получаем состояние соединения
let db = mongoose.connection;
// в случае успешного подключения выводим сообщение
db.once('open', () => console.log('connected to the database'));
// в случае неудачного подключения выводим ошибку
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }));
app.use(logger('dev'));
app.use(cors());

// Passport:
app.use(passport.initialize());
app.use(passport.session());

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.send('logout');
});

router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save();
  res.redirect('/');
});

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

router.get('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.put('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findOneAndUpdate(id, { $set: req.body });
    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
});

router.delete('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete(id);
    res.send(deletedUser);
  } catch (e) {
    next(e);
  }
});

router.delete('/users/', async (req, res, next) => {
  try {
    const delUsers = await User.deleteMany({});
    res.send(delUsers);
  } catch (e) {
    next(e);
  }
});

// append /api for our http requests
app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = app;
