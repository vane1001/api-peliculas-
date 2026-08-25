const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Productora = sequelize.define(
  'Productora',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.ENUM('Activo', 'Inactivo'), allowNull: false, defaultValue: 'Activo' },
    slogan: { type: DataTypes.STRING, allowNull: true },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: 'productoras',
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Productora;