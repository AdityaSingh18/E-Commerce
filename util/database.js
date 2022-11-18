const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'user', '1808', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
