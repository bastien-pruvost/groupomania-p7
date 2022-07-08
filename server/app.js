const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./configs/db.config');
const { addAuthFeatures } = require('./middlewares/auth.middleware');
const authRouter = require('./routes/auth.routes');
const postsRouter = require('./routes/posts.routes');

// Sync database
require('./models/db-relations');

db.sync({ alter: false, force: false })
  .then(console.log('Connexion a la base de données OK'))
  .catch((err) => {
    console.log(`Erreur de connexion a la base de données : ${err}`);
  });

// Initialize express
const app = express();

// Set headers for all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Use helmet middleware for all request (Add some recommended security headers)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(addAuthFeatures);

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

module.exports = app;
