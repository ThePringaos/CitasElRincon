const Sequelize = require('sequelize');
const database = require('../database/database');

const tableName = 'images';
const Image = database.define(tableName, {
  // attributes
  id: {
    type: Sequelize.STRING(128),
    primaryKey: true,
    autoIncrement: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.BLOB('long'),
    allowNull: false
  }
},
{ // Special settings
  freezeTableName: true,
  timestamps: false

});

module.exports = Image;
