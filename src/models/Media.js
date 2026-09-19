const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Media = sequelize.define(
  'Media',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    serial: { type: DataTypes.STRING, allowNull: false, unique: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    sinopsis: { type: DataTypes.TEXT, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: false, unique: true },
    imagen: { type: DataTypes.STRING, allowNull: true },
    anio_estreno: { type: DataTypes.INTEGER, allowNull: true },
    genero_id: { type: DataTypes.INTEGER, allowNull: true },
    director_id: { type: DataTypes.INTEGER, allowNull: true },
    productora_id: { type: DataTypes.INTEGER, allowNull: true },
    tipo_id: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: 'media',
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
  }
);

module.exports = Media;
