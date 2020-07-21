/*
 *  Copyright (C) 2020  Unknown
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const Sequelize = require('sequelize');
const database = require('../database/database');

// Other models
const Professional = require('./Professional');
const DateType = require('./DateType');
const DateState = require('./DateState');

const tableName = 'dates';

const Date = database.define(tableName, {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Foreign key
  professionalId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Professional,
      key: 'id'
    }
  },
  // Foreign key
  dateTypeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: DateType,
      key: 'id'
    }
  },
  // Foreign key
  dateStateId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: DateState,
      key: 'id'
    }
  }
},
// Special settings
{
  freezeTableName: true,
  timestamps: false

});

// para la FK
Date.belongsTo(Professional);
Date.belongsTo(DateType);
Date.belongsTo(DateState);

module.exports = Date;
