const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pdf:{
    type: Sequelize.STRING,
    allowNull : true
  }
});
module.exports = Product;