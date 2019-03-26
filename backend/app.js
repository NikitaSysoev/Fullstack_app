const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const router = express.Router();

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
app.use(logger('dev'));
app.use(cors());

router.get('/hello', (req, res) => {
  return res.send('hello');
});

router.get('/users', async (req, res, next) => {
  try {
    res.send('users');
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
