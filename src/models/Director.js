const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Director = sequelize.define(
  'Director',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombres: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.ENUM('Activo', 'Inactivo'), allowNull: false, defaultValue: 'Activo' },
  },
  {
    tableName: 'directores',
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Director;