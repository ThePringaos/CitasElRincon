const Sequelize = require('sequelize');
const database = require('../database/database');

const tableName = 'date-states';
const DateState = database.define(tableName,{
    //attributes
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    
},
//Special settings
{
    freezeTableName: true,
    timestamps : false
    
});

module.exports = DateState;