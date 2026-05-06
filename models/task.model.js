const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// BKAV HaiHS : Định nghĩa model Task với Sequelize ORM - start
const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: '',
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: 'tasks',
    timestamps: true
});
// BKAV HaiHS : Định nghĩa model Task với Sequelize ORM - end

module.exports = Task;