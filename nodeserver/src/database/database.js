const Sequelize = require('sequelize');

const sequelize = new Sequelize('datesDB', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    port:3307,
    pool: {
        max: 5,
        min: 0,
        //acquire: 30000
        //idle: 10000
    }
});
sequelize.authenticate()
  .then(() => {
    console.log('Connected')
  })
  .catch(err => {
    console.log('Failed attempt to connect')
  })

module.exports=sequelize;
