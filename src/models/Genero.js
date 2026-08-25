const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Genero = sequelize.define(
  'Genero',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.ENUM('Activo', 'Inactivo'), allowNull: false, defaultValue: 'Activo' },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: 'generos',
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Genero;