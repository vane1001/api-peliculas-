const { Productora } = require('../models');

async function getAll(req, res) {
  try {
    const productoras = await Productora.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json(productoras);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar las productoras', error: error.message });
  }
}

async function getById(req, res) {
  try {
    const productora = await Productora.findByPk(req.params.id);
    if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });
    return res.status(200).json(productora);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar la productora', error: error.message });
  }
}

async function create(req, res) {
  try {
    const { nombre, estado, slogan, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ mensaje: 'El campo nombre es obligatorio' });
    const nuevaProductora = await Productora.create({ nombre, estado, slogan, descripcion });
    return res.status(201).json(nuevaProductora);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al crear la productora', error: error.message });
  }
}

async function update(req, res) {
  try {
    const productora = await Productora.findByPk(req.params.id);
    if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });
    const { nombre, estado, slogan, descripcion } = req.body;
    await productora.update({ nombre, estado, slogan, descripcion });
    return res.status(200).json(productora);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al actualizar la productora', error: error.message });
  }
}

async function remove(req, res) {
  try {
    const productora = await Productora.findByPk(req.params.id);
    if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });
    await productora.destroy();
    return res.status(200).json({ mensaje: 'Productora eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar la productora', error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };