const { Genero } = require('../models');

async function getAll(req, res) {
  try {
    const generos = await Genero.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json(generos);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar los generos', error: error.message });
  }
}

async function getById(req, res) {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ mensaje: 'Genero no encontrado' });
    return res.status(200).json(genero);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar el genero', error: error.message });
  }
}

async function create(req, res) {
  try {
    const { nombre, estado, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ mensaje: 'El campo nombre es obligatorio' });
    const nuevoGenero = await Genero.create({ nombre, estado, descripcion });
    return res.status(201).json(nuevoGenero);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al crear el genero', error: error.message });
  }
}

async function update(req, res) {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ mensaje: 'Genero no encontrado' });
    const { nombre, estado, descripcion } = req.body;
    await genero.update({ nombre, estado, descripcion });
    return res.status(200).json(genero);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al actualizar el genero', error: error.message });
  }
}

async function remove(req, res) {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ mensaje: 'Genero no encontrado' });
    await genero.destroy();
    return res.status(200).json({ mensaje: 'Genero eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el genero', error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };