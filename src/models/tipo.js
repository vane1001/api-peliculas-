const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tipo = sequelize.define(
  'Tipo',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: 'tipos',
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Tipo;