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
const Department = require('./Department');
const Role = require('./Role');
const Image = require('./Image');
const Tutor = require('./Tutor');
const Timetable = require('./Timetable');

const tableName = 'professionals';
const Professional = database.define(tableName, {
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
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Foreign key
  departmentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: 'id'
    }
  },
  // Foreign key
  timetableId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Timetable,
      key: 'id'
    }
  },
  // Foreign key
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id'
    }
  },
  // Foreign key
  tutorId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Tutor,
      key: 'id'
    }
  },
  comment: Sequelize.STRING,
  // Foreign key
  imageId: {
    type: Sequelize.STRING(128),
    allowNull: true,
    references: {
      model: Image,
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
Professional.belongsTo(Department);
Professional.belongsTo(Role);
Professional.belongsTo(Image);
Professional.belongsTo(Tutor);
Professional.belongsTo(Timetable);

module.exports = Professional;
