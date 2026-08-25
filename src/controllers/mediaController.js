const { Media, Genero, Director, Productora, Tipo } = require('../models');

const INCLUDES = [
  { model: Genero, as: 'genero' },
  { model: Director, as: 'director' },
  { model: Productora, as: 'productora' },
  { model: Tipo, as: 'tipo' },
];

async function validarRelaciones({ genero_id, director_id, productora_id, tipo_id }) {
  const errores = [];

  if (genero_id) {
    const genero = await Genero.findByPk(genero_id);
    if (!genero) errores.push('El genero_id indicado no existe');
    else if (genero.estado !== 'Activo') errores.push('El genero seleccionado no esta Activo');
  } else {
    errores.push('El campo genero_id es obligatorio');
  }

  if (director_id) {
    const director = await Director.findByPk(director_id);
    if (!director) errores.push('El director_id indicado no existe');
    else if (director.estado !== 'Activo') errores.push('El director seleccionado no esta Activo');
  } else {
    errores.push('El campo director_id es obligatorio');
  }

  if (productora_id) {
    const productora = await Productora.findByPk(productora_id);
    if (!productora) errores.push('El productora_id indicado no existe');
    else if (productora.estado !== 'Activo') errores.push('La productora seleccionada no esta Activa');
  } else {
    errores.push('El campo productora_id es obligatorio');
  }

  if (tipo_id) {
    const tipo = await Tipo.findByPk(tipo_id);
    if (!tipo) errores.push('El tipo_id indicado no existe');
  } else {
    errores.push('El campo tipo_id es obligatorio');
  }

  return errores;
}

async function getAll(req, res) {
  try {
    const medias = await Media.findAll({ include: INCLUDES, order: [['id', 'ASC']] });
    return res.status(200).json(medias);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar las producciones', error: error.message });
  }
}

async function getById(req, res) {
  try {
    const media = await Media.findByPk(req.params.id, { include: INCLUDES });
    if (!media) return res.status(404).json({ mensaje: 'Produccion no encontrada' });
    return res.status(200).json(media);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar la produccion', error: error.message });
  }
}

async function create(req, res) {
  try {
    const {
      serial, titulo, sinopsis, url, imagen, anio_estreno,
      genero_id, director_id, productora_id, tipo_id,
    } = req.body;

    if (!serial || !titulo || !url) {
      return res.status(400).json({ mensaje: 'Los campos serial, titulo y url son obligatorios' });
    }

    const errores = await validarRelaciones({ genero_id, director_id, productora_id, tipo_id });
    if (errores.length > 0) {
      return res.status(400).json({ mensaje: 'No se pudo crear la produccion', errores });
    }

    const nuevaMedia = await Media.create({
      serial, titulo, sinopsis, url, imagen, anio_estreno,
      genero_id, director_id, productora_id, tipo_id,
    });

    const mediaCreada = await Media.findByPk(nuevaMedia.id, { include: INCLUDES });
    return res.status(201).json(mediaCreada);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al crear la produccion', error: error.message });
  }
}

async function update(req, res) {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ mensaje: 'Produccion no encontrada' });

    const {
      serial, titulo, sinopsis, url, imagen, anio_estreno,
      genero_id, director_id, productora_id, tipo_id,
    } = req.body;

    const errores = await validarRelaciones({
      genero_id: genero_id ?? media.genero_id,
      director_id: director_id ?? media.director_id,
      productora_id: productora_id ?? media.productora_id,
      tipo_id: tipo_id ?? media.tipo_id,
    });
    if (errores.length > 0) {
      return res.status(400).json({ mensaje: 'No se pudo actualizar la produccion', errores });
    }

    await media.update({
      serial, titulo, sinopsis, url, imagen, anio_estreno,
      genero_id, director_id, productora_id, tipo_id,
    });

    const mediaActualizada = await Media.findByPk(media.id, { include: INCLUDES });
    return res.status(200).json(mediaActualizada);
  } catch (error) {
    return res.status(400).json({ mensaje: 'Error al actualizar la produccion', error: error.message });
  }
}

async function remove(req, res) {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ mensaje: 'Produccion no encontrada' });
    await media.destroy();
    return res.status(200).json({ mensaje: 'Produccion eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar la produccion', error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };