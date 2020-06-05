const Sequelize = require('sequelize');
const database = require('../database/database');

//Other models 
const Professional = require('./Professional');
const DateType = require('./DateType');
const DateState = require('./DateState');

const tableName = 'dates';
const Date = database.define(tableName,{
    //attributes
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    date:{
        type: Sequelize.STRING,
        allowNull: false
    },
    time:{
        type: Sequelize.STRING,
        allowNull: false
    },
    //Foreign key
    professionalId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
            model: Professional,
            key: 'id'
        }
    },
    //Foreign key
    dateTypeId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
            model: DateType,
            key: 'id'
        }
    },
    //Foreign key
    dateStateId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
            model: DateState,
            key: 'id'
        }
    }
},
//Special settings
{
    freezeTableName: true,
    timestamps : false
    
});

//para la FK
Date.belongsTo(Professional);
Date.belongsTo(DateType);
Date.belongsTo(DateState);

module.exports = Date;