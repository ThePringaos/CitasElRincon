const Sequelize = require('sequelize');
const database = require('../database/database');

//Other models 
const Professional = require('./Professional');

const tableName = 'timetables'

const Timetable = database.define(tableName,{
    //attributes
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
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

//para la FK
Timetable.belongsTo(Professional);

module.exports = Timetable;