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

const keysDatabase = require('../keys/keys');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(keysDatabase.database, keysDatabase.user, keysDatabase.password, {
  host: keysDatabase.host,
  dialect: keysDatabase.dialect,
  port: keysDatabase.port,
  pool: {
    max: 5,
    min: 0
  },
  logging: true
});

sequelize.authenticate()
  .then(() => {
    console.log(`Connect the bd with sequelize: ${keysDatabase.database}`);
  })
  .catch(err => {
    console.log(`Exits the error ${err}`);
  });

module.exports = sequelize;
