const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./configs/db.config');
const { addAuthFeatures } = require('./middlewares/auth.middleware');
const routes = require('./routes/routes');

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
  const allowedOrigins = [process.env.CLIENT_URL];
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
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

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public'))); // Uncomment if images are saved locally

app.use(addAuthFeatures);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use('/', routes);

module.exports = app;
