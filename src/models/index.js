const sequelize = require('../config/db');
const Genero = require('./Genero');
const Director = require('./Director');
const Productora = require('./Productora');
const Tipo = require('./Tipo');
const Media = require('./Media');

Genero.hasMany(Media, { foreignKey: 'genero_id', as: 'medias' });
Media.belongsTo(Genero, { foreignKey: 'genero_id', as: 'genero' });

Director.hasMany(Media, { foreignKey: 'director_id', as: 'medias' });
Media.belongsTo(Director, { foreignKey: 'director_id', as: 'director' });

Productora.hasMany(Media, { foreignKey: 'productora_id', as: 'medias' });
Media.belongsTo(Productora, { foreignKey: 'productora_id', as: 'productora' });

Tipo.hasMany(Media, { foreignKey: 'tipo_id', as: 'medias' });
Media.belongsTo(Tipo, { foreignKey: 'tipo_id', as: 'tipo' });

module.exports = {
  sequelize,
  Genero,
  Director,
  Productora,
  Tipo,
  Media,
};