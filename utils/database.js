const Sequelize = require('sequelize');

const sequelize = new Sequelize("jhonteck", "testUser1", "Ahmad45@2000", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
