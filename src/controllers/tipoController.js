const { Tipo } = require('../models');

async function getAll(req, res) {
  try {
    const tipos = await Tipo.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json(tipos);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar los tipos', error: error.message });
  }
}

async function getById(req, res) {
  try {
    const tipo = await Tipo.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });
    return res.status(200).json(tipo);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar el tipo', error: error.message });
  }
}

async function create(req, res) {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ mensaje: 'El campo nombre es obligatorio' });
    const nuevoTipo = await Tipo.create({ nombre, descripcion });
    return res.status(201).json(nuevoTipo);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al crear el tipo', error: error.message });
  }
}

async function update(req, res) {
  try {
    const tipo = await Tipo.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });
    const { nombre, descripcion } = req.body;
    await tipo.update({ nombre, descripcion });
    return res.status(200).json(tipo);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al actualizar el tipo', error: error.message });
  }
}

async function remove(req, res) {
  try {
    const tipo = await Tipo.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });
    await tipo.destroy();
    return res.status(200).json({ mensaje: 'Tipo eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el tipo', error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };