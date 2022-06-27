const Sequelize = require('sequelize');

const db = new Sequelize(
  'groupomania',
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mariadb',
    host: 'localhost',
    port: 3306,
    connectTimeout: 10000
  }
);

module.exports = db;
