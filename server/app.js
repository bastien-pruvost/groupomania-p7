const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./configs/db.config');
const usersRouter = require('./routes/users.routes');
const { addAuthFeatures } = require('./middlewares/auth.middleware');

// Initialize express
const app = express();

// Connect to database
// db.sync({ force: true })
// db.sync({ alter: true })
db.sync()
  .then(console.log('Connexion a la base de données OK'))
  .catch((err) =>
    console.log(`Erreur de connexion a la base de données : ${err}`)
  );

// Set headers for all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

// Use helmet middleware for all request (Add some recommended security headers)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(addAuthFeatures);

app.use('/api/users', usersRouter);

module.exports = app;
