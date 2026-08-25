const { Director } = require('../models');

async function getAll(req, res) {
  try {
    const directores = await Director.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json(directores);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar los directores', error: error.message });
  }
}

async function getById(req, res) {
  try {
    const director = await Director.findByPk(req.params.id);
    if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });
    return res.status(200).json(director);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar el director', error: error.message });
  }
}

async function create(req, res) {
  try {
    const { nombres, estado } = req.body;
    if (!nombres) return res.status(400).json({ mensaje: 'El campo nombres es obligatorio' });
    const nuevoDirector = await Director.create({ nombres, estado });
    return res.status(201).json(nuevoDirector);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al crear el director', error: error.message });
  }
}

async function update(req, res) {
  try {
    const director = await Director.findByPk(req.params.id);
    if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });
    const { nombres, estado } = req.body;
    await director.update({ nombres, estado });
    return res.status(200).json(director);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al actualizar el director', error: error.message });
  }
}

async function remove(req, res) {
  try {
    const director = await Director.findByPk(req.params.id);
    if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });
    await director.destroy();
    return res.status(200).json({ mensaje: 'Director eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el director', error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };