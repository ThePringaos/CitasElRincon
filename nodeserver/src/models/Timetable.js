const Sequelize = require('sequelize');
const database = require('../database/database');

const tableName = 'timetables'

const Timetable = database.define(tableName,{
    //attributes
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    monday:{
        type: Sequelize.STRING,
    },
    tuesday:{
        type: Sequelize.STRING,
    },
    wednesday:{
        type: Sequelize.STRING,
    },
    thursday:{
        type: Sequelize.STRING,
    },
    friday:{
        type: Sequelize.STRING,
    }

},
//Special settings
{
    freezeTableName: true,
    timestamps : false
    
});

module.exports = Timetable;