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
