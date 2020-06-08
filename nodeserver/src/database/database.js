const Sequelize = require('sequelize');

const sequelize = new Sequelize('elrincon-project', 'root', 'ylenia', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000
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
